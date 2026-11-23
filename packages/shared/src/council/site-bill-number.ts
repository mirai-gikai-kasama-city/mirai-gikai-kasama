/**
 * 市の番号（「議案第1号」「選挙第2号」など）が無い議事に、当サイトが便宜的に付ける番号。
 * 「種類-番号」の形（例: 選任-1）にして、市の「第○号」の形と見分けられるようにする。
 * 番号は会期ごと・種類ごとに、議事の順に 1 から振る（あとで別の会期を足しても番号がずれない）
 */

/**
 * 種類（2文字）。並びは、同じ日の議事を並べるときの順。
 * BEFORE_NUMBERED の種類は市の番号がある議案より前、それ以外は後ろに並べる
 */
export const SITE_NUMBER_KINDS = [
  /** 会期の決定、会議録署名議員の指名 */
  "手続",
  /** 諸般の報告 */
  "諸般",
  /** 市長の施政方針 */
  "施政",
  /** 請願・陳情の委員会への付託 */
  "付託",
  /** 委員会の閉会中の継続審査・継続調査 */
  "継続",
  /** 議長・副議長の辞職の許可 */
  "辞職",
  /** 番号の無い選挙（議長・副議長、一部事務組合の議会議員など） */
  "選挙",
  /** 仮議席・議席の指定、議席の変更 */
  "議席",
  /** 委員会の委員の選任 */
  "選任",
  /** 農業委員の推薦 */
  "推薦",
  /** 特別委員会の設置 */
  "設置",
  /** 議員の派遣 */
  "派遣",
  /** 特別委員会の中間報告 */
  "中間",
] as const;

export type SiteNumberKind = (typeof SITE_NUMBER_KINDS)[number];

/** 会期の初めに行われる種類。同じ日の中では、市の番号がある議案より前に並べる */
const BEFORE_NUMBERED: ReadonlySet<SiteNumberKind> = new Set([
  "手続",
  "諸般",
  "施政",
  "付託",
]);

/** 議案のページで番号に添える説明 */
export const SITE_NUMBER_NOTE =
  "この番号は当サイトで便宜的に付けたものです（市側が付けた番号ではありません）";

export function siteNumber(kind: SiteNumberKind, number: number): string {
  return `${kind}-${number}`;
}

const SITE_NUMBER_PATTERN = new RegExp(
  `^(${SITE_NUMBER_KINDS.join("|")})-(\\d+)(?=\\s|$)`
);

/** 名前の先頭が当サイトの番号なら、その種類と番号を返す */
export function parseSiteNumber(
  name: string
): { label: string; kind: SiteNumberKind; number: number } | null {
  const m = SITE_NUMBER_PATTERN.exec(name);
  if (!m) return null;
  return {
    label: m[0],
    kind: m[1] as SiteNumberKind,
    number: Number(m[2]),
  };
}

/**
 * 同じ日の議事を並べるときの位置。市の番号がある議案の位置を 0 として、
 * 前に置く種類は負、後ろに置く種類は正の数を返す
 */
export function siteNumberKindOrder(kind: SiteNumberKind): number {
  const index = SITE_NUMBER_KINDS.indexOf(kind);
  return BEFORE_NUMBERED.has(kind)
    ? index - SITE_NUMBER_KINDS.length
    : index + 1;
}
