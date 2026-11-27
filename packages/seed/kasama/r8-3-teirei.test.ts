import { describe, expect, it } from "vitest";
import { R8_3_BILLS, R8_3_MEMBERS } from "./r8-3-teirei";

describe("令和8年第3回定例会の賛否データ", () => {
  it("議会だよりの審議結果の表どおり26件", () => {
    expect(R8_3_BILLS).toHaveLength(26);
  });

  it("賛否が分かれた議案は議会だよりどおり認定第1号と議案第39・40・42号の4件", () => {
    expect(
      R8_3_BILLS.filter((bill) => bill.vote != null).map(
        (bill) => bill.billNumberLabel
      )
    ).toEqual(["認定第1号", "議案第39号", "議案第40号", "議案第42号"]);
  });

  it("賛否一覧の人数が会議録の票数と合う", () => {
    for (const bill of R8_3_BILLS) {
      const vote = bill.vote;
      if (vote == null || vote.marks == null || vote.minutes == null) continue;
      expect(vote.marks).toHaveLength(R8_3_MEMBERS.length);
      expect(vote.marks.filter((m) => m === "○")).toHaveLength(
        vote.minutes.for
      );
      expect(vote.marks.filter((m) => m === "●")).toHaveLength(
        vote.minutes.against
      );
    }
  });
});
