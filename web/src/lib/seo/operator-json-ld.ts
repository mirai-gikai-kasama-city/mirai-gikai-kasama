/**
 * サイトの運営者名。フッターの「運営: …」、WebSite 構造化データの publisher
 * （app/layout.tsx）、Organization 構造化データ、議案・委員会記録の Article の
 * author が共有する（運営者は個人なので、いずれも schema.org の Person として出す）
 */
export const OPERATOR_NAME = "すがのゆういち";

/** 運営者の立場。サイトを見る人が判断できるよう、フッターとサイトの説明に表示する */
export const OPERATOR_ROLE = "笠間市議会議員一般選挙の候補者";

/** 運営者の連絡先。フッターとプライバシーポリシーに表示する */
export const OPERATOR_EMAIL = "yuichi.sugano.ksm@gmail.com";

/**
 * 運営者の Person 構造化データ。トップページに置く。
 * 運営者名とサイトの URL だけを載せる。連絡先・SNS・ロゴなど、サイトの
 * どこにも定めていない項目は入れない
 */
export function buildOperatorJsonLd(baseUrl: string): Record<string, unknown> {
  const siteUrl = new URL("/", baseUrl).toString();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}#operator`,
    name: OPERATOR_NAME,
    url: siteUrl,
  };
}
