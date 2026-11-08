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

  it("どのテーマの言葉も無ければ空", () => {
    expect(detectBillThemes("議長の選挙について")).toEqual([]);
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
