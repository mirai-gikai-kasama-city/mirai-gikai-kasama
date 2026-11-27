import { describe, expect, it } from "vitest";
import { marks, tallyText } from "./types";

describe("tallyText", () => {
  it("賛成と反対だけを数え、欠席と議長は数えない", () => {
    expect(tallyText(marks("○○●欠－"))).toBe("賛成2、反対1");
  });
});
