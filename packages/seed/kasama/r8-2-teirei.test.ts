import { describe, expect, it } from "vitest";
import { R8_2_BILLS } from "./r8-2-teirei";

describe("令和8年第2回定例会の賛否データ", () => {
  it("賛否が分かれた議案は議会だよりどおり第34号と第37号の2件", () => {
    expect(
      R8_2_BILLS.filter((bill) => bill.vote != null).map(
        (bill) => bill.billNumberLabel
      )
    ).toEqual(["議案第34号", "議案第37号"]);
  });
});
