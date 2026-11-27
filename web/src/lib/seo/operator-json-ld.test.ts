import { describe, expect, it } from "vitest";
import { buildOperatorJsonLd, OPERATOR_NAME } from "./operator-json-ld";

describe("buildOperatorJsonLd", () => {
  it("運営者名とサイトの URL だけを載せる", () => {
    expect(buildOperatorJsonLd("https://tagawa-gikai.jp")).toEqual({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://tagawa-gikai.jp/#operator",
      name: "すがのゆういち",
      url: "https://tagawa-gikai.jp/",
    });
  });

  it("連絡先・SNS・ロゴは載せない", () => {
    const data = buildOperatorJsonLd("https://tagawa-gikai.jp");
    for (const key of [
      "email",
      "telephone",
      "sameAs",
      "logo",
      "contactPoint",
    ]) {
      expect(key in data).toBe(false);
    }
  });

  it("運営者名は「すがのゆういち」（フッターや構造化データの表記を、この定数にそろえている）", () => {
    expect(OPERATOR_NAME).toBe("すがのゆういち");
  });
});
