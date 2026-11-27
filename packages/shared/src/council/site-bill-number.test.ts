import { describe, expect, test } from "vitest";
import {
  parseSiteNumber,
  siteNumber,
  siteNumberKindOrder,
} from "./site-bill-number";

describe("parseSiteNumber", () => {
  test("名前の先頭の「種類-番号」を取り出す", () => {
    expect(parseSiteNumber(`${siteNumber("選任", 2)}　議会運営委員会委員の選任について`)).toEqual({
      label: "選任-2",
      kind: "選任",
      number: 2,
    });
  });

  test("市の番号や、知らない種類は当サイトの番号ではない", () => {
    expect(parseSiteNumber("選挙第1号　議長の選挙について")).toBeNull();
    expect(parseSiteNumber("議案-1　なにか")).toBeNull();
    expect(parseSiteNumber("会期の決定について")).toBeNull();
  });

  test("番号のあとに文字が続くものは当てはめない", () => {
    expect(parseSiteNumber("選任-1号")).toBeNull();
  });
});

describe("siteNumberKindOrder", () => {
  test("会期の初めの種類は市の番号がある議案（0）より前、ほかは後ろ", () => {
    expect(siteNumberKindOrder("手続")).toBeLessThan(0);
    expect(siteNumberKindOrder("付託")).toBeLessThan(0);
    expect(siteNumberKindOrder("選挙")).toBeGreaterThan(0);
    expect(siteNumberKindOrder("辞職")).toBeLessThan(siteNumberKindOrder("選挙"));
  });
});
