import { describe, expect, it } from "vitest";
import { BILL_THEMES, detectBillThemes, findBillTheme } from "./bill-themes";

describe("detectBillThemes", () => {
  it("議案名・概要の言葉からテーマを判定し、複数のテーマにも入る", () => {
    expect(
      detectBillThemes("笠間市立小学校の給食費を無償化する条例について")
    ).toEqual(["kids"]);
    expect(
      detectBillThemes(
        "指定管理者の指定について（笠間市地域交流センターいわま）"
      )
    ).toEqual(["community"]);
    expect(
      detectBillThemes("笠間市国民健康保険税条例の一部を改正する条例について")
    ).toEqual(["welfare", "cityhall"]);
  });

  it("議会の運営は、議長の選挙や会議規則などに絞り、意見書の「議長あて」は拾わない", () => {
    expect(detectBillThemes("副議長の選挙について")).toEqual(["assembly"]);
    expect(
      detectBillThemes("笠間市議会会議規則の一部を改正する規則について")
    ).toEqual(["assembly"]);
    expect(
      detectBillThemes(
        "核兵器禁止条約への参加を求める意見書について 衆議院議長あてに提出する"
      )
    ).not.toContain("assembly");
  });

  it("どのテーマの言葉も無ければ「その他」に入れる", () => {
    expect(
      detectBillThemes("笠間市監査委員の選任に同意を求めることについて")
    ).toEqual(["other"]);
  });
});

describe("BILL_THEMES / findBillTheme", () => {
  it("id は重複しない", () => {
    const ids = BILL_THEMES.map((theme) => theme.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("URL の値からテーマを引き、未定義なら null", () => {
    expect(findBillTheme("kids")?.label).toBe("子育て・教育");
    expect(findBillTheme("unknown")).toBeNull();
    expect(findBillTheme(null)).toBeNull();
  });
});
