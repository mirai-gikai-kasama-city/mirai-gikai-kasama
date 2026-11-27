/**
 * AIチャットとAIインタビューを動かすかどうか。
 *
 * 運営者が候補者となる市議会議員選挙の期間中は動かさない。false の間は、
 * 画面から入口を消し、ミドルウェアで API とページも止める。
 * 再開するときは、運営者の確認のうえで true にする
 */
export const AI_FEATURES_ENABLED: boolean = false;

const AI_FEATURE_PATHS = [
  /^\/api\/chat(\/|$)/,
  /^\/api\/interview(\/|$)/,
  /^\/api\/bills\/[^/]+\/topic-analysis(\/|$)/,
  /^\/api\/og\/report(\/|$)/,
  /^(\/preview)?\/bills\/[^/]+\/interview(\/|$)/,
  /^\/bills\/[^/]+\/(topics|opinions)(\/|$)/,
  /^\/report(\/|$)/,
];

/** AIチャット・AIインタビューと、その回答を見せるページや API かどうか */
export function isAiFeaturePath(pathname: string): boolean {
  return AI_FEATURE_PATHS.some((pattern) => pattern.test(pathname));
}
