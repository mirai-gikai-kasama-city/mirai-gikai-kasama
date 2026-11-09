import { describe, expect, it } from "vitest";
import {
  billNumberSortKey,
  compareBillNumbers,
  compareSessionBills,
} from "./bill-number-order";

describe("billNumberSortKey", () => {
  it("種類・番号・枝番号を取り出し、全角数字も読む", () => {
    expect(billNumberSortKey("議案第53号　笠間市火災予防条例")).toEqual([
      3, 53, 0,
    ]);
    expect(billNumberSortKey("請願第27-4号　通学路")).toEqual([5, 27, 4]);
    expect(billNumberSortKey("議案第１２号　財産の取得")).toEqual([3, 12, 0]);
    expect(billNumberSortKey("会期の決定")).toBeNull();
  });
});

describe("compareBillNumbers", () => {
  it("番号を数として比べ、第9号が第10号より前に来る", () => {
    const names = ["議案第10号　B", "議案第9号　A", "議案第62号　C"];
    expect([...names].sort(compareBillNumbers)).toEqual([
      "議案第9号　A",
      "議案第10号　B",
      "議案第62号　C",
    ]);
  });

  it("種類の順（報告→議案→請願→委員会提出議案）で並べ、番号の無い議案は後ろ", () => {
    const names = [
      "委員会提出議案第1号　意見書",
      "請願第28-1号　請願",
      "番号の無い議案",
      "議案第1号　条例",
      "報告第1号　専決処分",
    ];
    expect([...names].sort(compareBillNumbers)).toEqual([
      "報告第1号　専決処分",
      "議案第1号　条例",
      "請願第28-1号　請願",
      "委員会提出議案第1号　意見書",
      "番号の無い議案",
    ]);
  });
});

describe("compareSessionBills", () => {
  const bill = (name: string, date: string, status_order = 0) => ({
    name,
    submitted_date: date,
    status_order,
  });

  it("審議の進み具合→日付の新しい順を保ち、同じ日の議案だけ番号順にする", () => {
    const bills = [
      bill("議案第62号", "2026-11-05"),
      bill("議案第1号", "2026-03-01"),
      bill("議案第53号", "2026-11-05"),
      bill("議案第2号", "2026-11-05", 1),
    ];
    expect([...bills].sort(compareSessionBills).map((b) => b.name)).toEqual([
      "議案第53号",
      "議案第62号",
      "議案第1号",
      "議案第2号",
    ]);
  });
});
