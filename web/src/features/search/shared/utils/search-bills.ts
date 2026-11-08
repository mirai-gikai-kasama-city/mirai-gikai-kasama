import type { SearchItem } from "../types";

/** 検索結果の最大表示件数 */
const MAX_RESULTS = 100;

/** クエリ分割用: 半角・全角スペースを区切り文字とする */
const QUERY_SPLIT_PATTERN = /[\s　]+/;

/** カタカナ（ァ〜ヶ）をひらがなに変換する */
function katakanaToHiragana(text: string): string {
  return text.replace(/[ァ-ヶ]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0x60)
  );
}

/** 検索用に文字列を正規化する: NFKC → 小文字化 → カタカナをひらがなに変換 */
function normalize(text: string): string {
  return katakanaToHiragana(text.normalize("NFKC").toLowerCase());
}

/** SearchItemを検索対象として連結した正規化済み文字列を返す */
function buildSearchableText(item: SearchItem): string {
  return normalize(
    [item.title, item.name, item.summary, ...item.tags].join(" ")
  );
}

/**
 * クエリで議案一覧を絞り込む（AND検索）
 *
 * クエリを空白（全角含む）で分割し、全termが title/name/summary/tags の
 * 連結文字列に含まれる議案をヒットとする。結果はsubmittedDate降順、
 * 最大100件にスライスする。
 */
export function searchBills(items: SearchItem[], query: string): SearchItem[] {
  const terms = normalize(query)
    .split(QUERY_SPLIT_PATTERN)
    .filter((term) => term.length > 0);

  const matched =
    terms.length === 0
      ? items
      : items.filter((item) => {
          const searchableText = buildSearchableText(item);
          return terms.every((term) => searchableText.includes(term));
        });

  return sortByDateDesc(matched).slice(0, MAX_RESULTS);
}

/** 議決日の新しい順（日付の無いものは末尾）に並べたコピーを返す */
function sortByDateDesc(items: readonly SearchItem[]): SearchItem[] {
  return [...items].sort((a, b) => {
    if (a.submittedDate === b.submittedDate) return 0;
    if (a.submittedDate === null) return 1;
    if (b.submittedDate === null) return -1;
    return b.submittedDate.localeCompare(a.submittedDate);
  });
}

/** テーマに入る議案を新しい順に返す（件数の上限なし。表示側で段階表示する） */
export function selectBillsByTheme(
  items: readonly SearchItem[],
  themeId: string
): SearchItem[] {
  return sortByDateDesc(items.filter((item) => item.themes.includes(themeId)));
}

/** テーマごとの議案数（themeId → 件数） */
export function countBillsByTheme(
  items: readonly SearchItem[]
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const id of item.themes) {
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }
  return counts;
}
