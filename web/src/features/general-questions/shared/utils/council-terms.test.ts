import type { GeneralQuestionRecord } from "@mirai-gikai/shared/council/types";
import { describe, expect, it } from "vitest";
import {
  groupQuestionsByTerm,
  sessionKeyYear,
  termForSessionKey,
} from "./council-terms";

describe("sessionKeyYear", () => {
  it("笠間市の会期のキー（kasama- 付き）も読み、元号の年を西暦にする", () => {
    expect(sessionKeyYear("kasama-r8-3-teirei")).toBe(2026);
    expect(sessionKeyYear("kasama-h26-3-teirei")).toBe(2014);
    expect(sessionKeyYear("r1-2")).toBe(2019);
    expect(sessionKeyYear("その他")).toBeNull();
  });
});

describe("termForSessionKey", () => {
  it("12月の改選の前の定例会は、その年に終わる任期に入る", () => {
    expect(termForSessionKey("kasama-r4-4-teirei")?.endYear).toBe(2022);
    expect(termForSessionKey("kasama-r5-1-teirei")?.endYear).toBe(2026);
    expect(termForSessionKey("kasama-h31-1-teirei")?.endYear).toBe(2022);
    expect(termForSessionKey("kasama-h26-3-teirei")?.endYear).toBe(2014);
  });

  it("表に無い年は null", () => {
    expect(termForSessionKey("kasama-h20-1-teirei")).toBeNull();
  });
});

describe("groupQuestionsByTerm", () => {
  const record = (id: string, sessionKey: string) =>
    ({ id, sessionKey }) as GeneralQuestionRecord;

  it("新しい任期から並べ、記録の無い任期は出さない", () => {
    const groups = groupQuestionsByTerm([
      record("a", "kasama-r8-3-teirei"),
      record("b", "kasama-r2-1-teirei"),
      record("c", "kasama-r7-1-teirei"),
    ]);
    expect(groups.map((g) => g.term.endYear)).toEqual([2026, 2022]);
    expect(groups[0].records.map((r) => r.id)).toEqual(["a", "c"]);
  });
});
