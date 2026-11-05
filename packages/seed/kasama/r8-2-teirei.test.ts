import { describe, expect, it } from "vitest";
import { R8_2_BILLS, R8_2_MEMBERS } from "./r8-2-teirei";

const votedBills = R8_2_BILLS.filter((bill) => bill.vote != null);

describe("令和8年第2回定例会の賛否データ", () => {
  it("賛否が分かれた議案は議会だよりどおり第34号と第37号の2件", () => {
    expect(votedBills.map((bill) => bill.billNumberLabel)).toEqual([
      "議案第34号",
      "議案第37号",
    ]);
  });

  it.each(votedBills)("$billNumberLabel の賛否一覧は全議員分ある", ({ vote }) => {
    expect(vote?.marks).toHaveLength(R8_2_MEMBERS.length);
  });

  it.each(
    votedBills
  )("$billNumberLabel の賛否一覧は会議録の採決人数と一致する", ({ vote }) => {
    const count = (mark: string) =>
      vote?.marks.filter((item) => item === mark).length;
    expect(count("○")).toBe(vote?.minutes.for);
    expect(count("●")).toBe(vote?.minutes.against);
    expect(
      (count("○") ?? 0) + (count("●") ?? 0)
    ).toBe(vote?.minutes.total);
  });

  it("議長は採決に加わらない", () => {
    const chair = R8_2_MEMBERS.indexOf("畑岡洋二");
    for (const { vote } of votedBills) {
      expect(vote?.marks[chair]).toBe("－");
    }
  });
});

describe("令和8年第2回定例会の解説文", () => {
  it("全議案に一覧用の要約と本文がある", () => {
    for (const bill of R8_2_BILLS) {
      expect(bill.summary.length).toBeGreaterThan(0);
      expect(bill.body.length).toBeGreaterThan(0);
    }
  });

  it("議案番号が重複していない", () => {
    const labels = R8_2_BILLS.map((bill) => bill.billNumberLabel);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
