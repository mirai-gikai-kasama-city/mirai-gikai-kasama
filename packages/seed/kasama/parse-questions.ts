/**
 * 笠間市議会「一般質問通告」のページを読み取る（純粋関数）。
 * 通告の内容はそのまま転記し、要約や言い換えはしない
 */
import type { GeneralQuestionRecord } from "@mirai-gikai/shared/council/types";

const SITE_BASE = "http://kasama.gijiroku.com/";
export const QUESTIONS_SOURCE_URL = `${SITE_BASE}g07_Shitsumon.asp`;

/** 全角の数字を半角に直し、空白をなくす */
export function normalizeText(text: string): string {
  return text
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[\s　]+/g, "");
}

const ERA_START = { 令和: 2018, 平成: 1988 } as const;
const ERA_PREFIX = { 令和: "r", 平成: "h" } as const;

function eraYear(text: string): number {
  return text === "元" ? 1 : Number(text);
}

/** 「令和８年第　３回定例会」→ 会期キーと会期名。形が違えば null */
export function parseSessionHeading(
  heading: string
): { key: string; name: string } | null {
  const m = normalizeText(heading).match(
    /^(令和|平成)(元|\d+)年第(\d+)回(定例会|臨時会)$/
  );
  if (!m) return null;
  const era = m[1] as keyof typeof ERA_START;
  const kind = m[4] === "定例会" ? "teirei" : "rinji";
  return {
    key: `kasama-${ERA_PREFIX[era]}${eraYear(m[2])}-${m[3]}-${kind}`,
    name: `${era}${eraYear(m[2])}年第${m[3]}回${m[4]}`,
  };
}

/** 「令和8年9月11日」→ 2026-09-11。形が違えば null */
export function parseDateHeading(heading: string): string | null {
  const m = normalizeText(heading).match(
    /^(令和|平成)(元|\d+)年(\d+)月(\d+)日$/
  );
  if (!m) return null;
  const year = ERA_START[m[1] as keyof typeof ERA_START] + eraYear(m[2]);
  return `${year}-${m[3].padStart(2, "0")}-${m[4].padStart(2, "0")}`;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).trim();
}

/** 「1.中東情勢について」→「中東情勢について」 */
export function stripItemNumber(item: string): string {
  return item.replace(/^\s*[0-9０-９]+\s*[.．、]\s*/, "").trim();
}

/** 読み取りの途中経過。ページをまたいで見出しを引き継ぐ */
export interface ParseState {
  session: { key: string; name: string } | null;
  date: string | null;
}

export interface ParsedQuestionRow {
  session: { key: string; name: string };
  date: string | null;
  memberName: string;
  familyName: string;
  items: string[];
  minutesUrl: string | null;
  videoUrl: string | null;
}

const ROW_PATTERN =
  /<tr><td colspan="4" class="kaigi_midashi">([\s\S]*?)<\/td><\/tr>|<tr><td colspan="4" class="kaigi_midashi2">([\s\S]*?)<\/td><\/tr>|<tr>\s*<td class="tright">\d+<\/td>([\s\S]*?)<\/tr>/g;

function absoluteUrl(href: string): string {
  return new URL(decodeEntities(href), SITE_BASE).toString();
}

/** 1ページ分の HTML から質問の行を読み取る。state は次のページへ引き継ぐ */
export function parseQuestionPage(
  html: string,
  state: ParseState
): ParsedQuestionRow[] {
  const rows: ParsedQuestionRow[] = [];
  for (const match of html.matchAll(ROW_PATTERN)) {
    if (match[1] !== undefined) {
      const session = parseSessionHeading(stripTags(match[1]));
      if (!session) throw new Error(`会期名を読めません: ${match[1]}`);
      state.session = session;
      state.date = null;
      continue;
    }
    if (match[2] !== undefined) {
      const date = parseDateHeading(stripTags(match[2]));
      if (!date) throw new Error(`日付を読めません: ${match[2]}`);
      state.date = date;
      continue;
    }

    const body = match[3];
    const rawName = body.match(/<strong>([\s\S]*?)<\/strong>/)?.[1];
    if (!state.session || !rawName) {
      throw new Error(`質問の行を読めません: ${body.slice(0, 120)}`);
    }
    const nameParts = stripTags(rawName).split(/[\s　]+/).filter(Boolean);
    const items = [...body.matchAll(/class='comment4'>([\s\S]*?)<\/div>/g)]
      .map((m) => stripItemNumber(stripTags(m[1])))
      .filter((item) => item !== "");
    const minutes = body.match(/href='(g07_Shitsumon\.asp\?Kmode=1[^']*)'/)?.[1];
    const video = body.match(/href='(g07_Video_View\.asp\?[^']*)'/)?.[1];

    rows.push({
      session: state.session,
      date: state.date,
      memberName: nameParts.join(" "),
      familyName: nameParts[0],
      items,
      minutesUrl: minutes ? absoluteUrl(minutes) : null,
      videoUrl: video ? absoluteUrl(video) : null,
    });
  }
  return rows;
}

/** 読み取った行を一般質問の記録にする。順番と何日目かは会期ごとに振り直す */
export function buildQuestionRecords(
  rows: readonly ParsedQuestionRow[]
): GeneralQuestionRecord[] {
  const orderBySession = new Map<string, number>();
  const datesBySession = new Map<string, string[]>();
  return rows.map((row) => {
    const order = (orderBySession.get(row.session.key) ?? 0) + 1;
    orderBySession.set(row.session.key, order);

    const dates = datesBySession.get(row.session.key) ?? [];
    if (row.date && !dates.includes(row.date)) dates.push(row.date);
    datesBySession.set(row.session.key, dates);

    return {
      id: `${row.session.key}-${order}`,
      sessionKey: row.session.key,
      sessionName: row.session.name,
      questionDate: row.date,
      dayIndex: row.date ? dates.indexOf(row.date) + 1 : null,
      order,
      memberName: row.memberName,
      familyName: row.familyName,
      faction: null,
      isRepresentative: false,
      format: null,
      items: row.items,
      outline: null,
      videoUrl: row.videoUrl,
      minutesUrl: row.minutesUrl,
      sourceUrl: QUESTIONS_SOURCE_URL,
      pdfUrl: null,
    };
  });
}
