/**
 * 笠間市議会「一般質問通告」を読み取り、web の静的データを書き出す。
 *
 * 実行方法:
 *   pnpm --filter @mirai-gikai/seed kasama:scrape-questions
 *
 * 公式サイトに負担をかけないよう、1ページずつ間を空けて取得する
 */
import fs from "node:fs";
import path from "node:path";
import {
  buildQuestionRecords,
  type ParsedQuestionRow,
  type ParseState,
  parseQuestionPage,
  QUESTIONS_SOURCE_URL,
} from "./parse-questions";

const OUTPUT = path.join(
  import.meta.dirname,
  "../../../web/src/features/general-questions/shared/data/general-questions-data.ts"
);
const WAIT_MS = 1500;
const USER_AGENT = "kasama-gikai-note-seed";

function pageUrl(page: number): string {
  const params = new URLSearchParams({
    kword1: "",
    giin1: "",
    kaigi: "",
    kubun: "",
    party: "",
    amode: "0",
    Sflg: "1",
    Kmode: "0",
    FBKEY1: "",
    FBKEY2: "",
    TITL: "",
    FYY: "",
    FMM: "",
    FDD: "",
    TYY: "",
    TMM: "",
    TDD: "",
    NAME: "",
    iPageNum: String(page),
  });
  return `${QUESTIONS_SOURCE_URL}?${params}`;
}

async function fetchPage(page: number): Promise<string> {
  const res = await fetch(pageUrl(page), {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!res.ok) throw new Error(`${page}ページ目の取得に失敗: ${res.status}`);
  return new TextDecoder("shift_jis").decode(await res.arrayBuffer());
}

function countOf(html: string): number {
  const m = html.match(/登録件数\s*([\d,]+)\s*件/);
  if (!m) throw new Error("登録件数を読めません");
  return Number(m[1].replace(/,/g, ""));
}

async function main() {
  const state: ParseState = { session: null, date: null };
  const rows: ParsedQuestionRow[] = [];
  let expected = 0;

  for (let page = 1; ; page++) {
    const html = await fetchPage(page);
    if (page === 1) expected = countOf(html);
    const pageRows = parseQuestionPage(html, state);
    rows.push(...pageRows);
    console.log(`${page}ページ目: ${pageRows.length}件（累計 ${rows.length}件）`);
    if (rows.length >= expected || pageRows.length === 0) break;
    await new Promise((resolve) => setTimeout(resolve, WAIT_MS));
  }

  if (rows.length !== expected) {
    throw new Error(`件数が合いません: ${rows.length}件 / 公式 ${expected}件`);
  }

  const records = buildQuestionRecords(rows);
  const sessions = new Set(records.map((r) => r.sessionKey));
  const today = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(
    OUTPUT,
    `/**
 * 【自動生成】手で編集しないでください。
 * 生成コマンド: pnpm --filter @mirai-gikai/seed kasama:scrape-questions
 * 出典: 笠間市議会「一般質問通告」 ${QUESTIONS_SOURCE_URL}
 * ${records.length}件（${sessions.size}会期）、${today} 取得
 */

import type { GeneralQuestionRecord } from "@mirai-gikai/shared/council/types";

export const GENERAL_QUESTIONS: readonly GeneralQuestionRecord[] = ${JSON.stringify(records, null, 2)};
`,
    "utf-8"
  );
  console.log(`✅ ${records.length}件（${sessions.size}会期）を書き出しました`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
