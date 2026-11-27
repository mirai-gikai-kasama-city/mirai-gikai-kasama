import { describe, expect, it } from "vitest";
import { alignOutlineWithItems, resolveMemberPageKey } from "./question-links";

const context = {
  memberNames: new Set(["田村幸子", "田村泰之", "石井栄"]),
};

describe("resolveMemberPageKey", () => {
  it("議員ページがあれば、空白を除いたフルネームを返す", () => {
    expect(resolveMemberPageKey({ name: "石井 栄" }, context)).toBe("石井栄");
  });

  it("同じ名字の別人をフルネームで見分ける", () => {
    expect(resolveMemberPageKey({ name: "田村 幸子" }, context)).toBe(
      "田村幸子"
    );
    expect(resolveMemberPageKey({ name: "田村　泰之" }, context)).toBe(
      "田村泰之"
    );
  });

  it("議員ページが無い人（前の任期の議員など）にはリンクしない", () => {
    expect(resolveMemberPageKey({ name: "長谷川 愛子" }, context)).toBeNull();
  });
});

describe("alignOutlineWithItems", () => {
  const outline = [{ title: "A", points: [] }];

  it("項目数が一致するときだけ要旨を返す", () => {
    expect(alignOutlineWithItems({ items: ["A"], outline })).toEqual(outline);
    expect(alignOutlineWithItems({ items: ["A", "B"], outline })).toBeNull();
    expect(alignOutlineWithItems({ items: ["A"], outline: null })).toBeNull();
  });
});
