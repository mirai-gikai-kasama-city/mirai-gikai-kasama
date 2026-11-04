/**
 * 外部リンク定数
 */
export const EXTERNAL_LINKS = {
  /**
   * 「問題を報告する」の送信先フォーム。null の間はボタンを表示しない。
   * 運営者のフォームができたら URL を入れると、すべての画面に表示される
   */
  REPORT: null as string | null,
  /** フォーク元「みらい議会」本家サイト（チームみらい運営） */
  UPSTREAM_MIRAI_GIKAI: "https://gikai.team-mir.ai/",
  /** 本サイトの改変後ソースコード（AGPL-3.0 に基づく公開） */
  SOURCE_CODE: "https://github.com/mirai-gikai-kasama-city/mirai-gikai-kasama",
} as const;
