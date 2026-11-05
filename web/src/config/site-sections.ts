/**
 * まだ笠間市のデータが無いページ。
 * フォーク元（田川市）の内容が出ないよう、ミドルウェア・メニュー・サイトマップから外している。
 * 笠間市のデータを用意できたページは、ここから消して公開する
 */
const HIDDEN_SECTION_PREFIXES = [
  "/mayor",
  "/elections",
  "/attendance",
  "/committees",
  "/questions",
  "/petitions",
  "/members",
  "/proposers",
] as const;

/** 笠間市のデータが無く、公開していないページかどうか */
export function isHiddenSectionPath(pathname: string): boolean {
  return HIDDEN_SECTION_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
