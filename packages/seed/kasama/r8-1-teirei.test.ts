import { describe, expect, it } from "vitest";
import { R8_1_RINJI_BILLS } from "./r8-1-rinji";
import { R8_1_MEMBERS, R8_1_TEIREI_BILLS } from "./r8-1-teirei";

/** ●の議員名を返す */
const opponents = (label: string) => {
  const bill = R8_1_TEIREI_BILLS.find((b) => b.billNumberLabel === label);
  return R8_1_MEMBERS.filter((_, index) => bill?.vote?.marks[index] === "●");
};

describe("令和8年第1回定例会の賛否データ", () => {
  it("賛否が分かれた議案は議会だよりどおり6件", () => {
    expect(
      R8_1_TEIREI_BILLS.filter((bill) => bill.vote != null).map(
        (bill) => bill.billNumberLabel
      )
    ).toEqual([
      "議案第2号",
      "議案第3号",
      "議案第20号",
      "議案第21号",
      "議案第22号",
      "議案第28号",
    ]);
  });

  it("反対した議員は PDF の列位置で確かめた結果と一致する", () => {
    expect(opponents("議案第2号")).toEqual([
      "林田美代子",
      "田村泰之",
      "石井栄",
      "小薗江一三",
    ]);
    expect(opponents("議案第3号")).toEqual([
      "川村和夫",
      "林田美代子",
      "田村泰之",
      "石井栄",
    ]);
    for (const label of [
      "議案第20号",
      "議案第21号",
      "議案第22号",
      "議案第28号",
    ]) {
      expect(opponents(label)).toEqual(["林田美代子", "石井栄"]);
    }
  });
});

describe("令和8年第1回の解説文", () => {
  it("定例会の議案は審議結果の一覧と同じ数だけある", () => {
    // 議案第2〜28号 27件、報告第2号、諮問第1〜5号、決議案第1号、選挙第1号
    expect(R8_1_TEIREI_BILLS).toHaveLength(35);
  });

  it("解説文で議員の名前を討論者に結びつけない", () => {
    for (const bill of [...R8_1_RINJI_BILLS, ...R8_1_TEIREI_BILLS]) {
      expect(bill.body).not.toMatch(/(石井|村上|飯田)[^。]*(討論|主張)/);
    }
  });
});
