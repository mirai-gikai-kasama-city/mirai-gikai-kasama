/** クエリ分割用: 半角・全角スペースを区切り文字とする */
const QUERY_SPLIT_PATTERN = /[\s　]+/;

/** カタカナ（ァ〜ヶ）をひらがなに変換する */
function katakanaToHiragana(text: string): string {
  return text.replace(/[ァ-ヶ]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0x60)
  );
}

/** 検索用に文字列を正規化する: NFKC → 小文字化 → カタカナをひらがなに変換 */
export function normalizeSearchText(text: string): string {
  return katakanaToHiragana(text.normalize("NFKC").toLowerCase());
}

/** クエリを正規化して空白で分ける（空の語は捨てる） */
export function splitSearchTerms(query: string): string[] {
  return normalizeSearchText(query)
    .split(QUERY_SPLIT_PATTERN)
    .filter((term) => term.length > 0);
}

/** 正規化済みの文字列に、すべての語が含まれるか（AND検索） */
export function includesAllTerms(
  normalizedText: string,
  terms: readonly string[]
): boolean {
  return terms.every((term) => normalizedText.includes(term));
}
