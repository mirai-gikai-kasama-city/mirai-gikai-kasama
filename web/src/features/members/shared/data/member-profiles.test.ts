import { describe, expect, it } from "vitest";
import {
  COUNCIL_SEATS,
  getMemberProfile,
  MEMBER_PROFILES,
  toMemberKey,
  VACANT_SEATS,
} from "./member-profiles";

describe("MEMBER_PROFILES", () => {
  const entries = Object.entries(MEMBER_PROFILES);

  it("キーは空白を除いたフルネームと一致する（賛否データの氏名と同じ形）", () => {
    for (const [key, profile] of entries) {
      expect(toMemberKey(profile.fullName)).toBe(key);
    }
  });

  it("フルネームとふりがなは「姓 名」の形", () => {
    for (const [, profile] of entries) {
      expect(profile.fullName).toMatch(/^\S+ \S+$/);
      expect(profile.reading).toMatch(/^\S+ \S+$/);
    }
  });

  it("議席は欠員を除いてちょうど1人ずつ埋まっている", () => {
    const seats = entries
      .map(([, profile]) => profile.seat)
      .sort((a, b) => a - b);
    const expected = Array.from(
      { length: COUNCIL_SEATS },
      (_, i) => i + 1
    ).filter((seat) => !VACANT_SEATS.includes(seat));
    expect(seats).toEqual(expected);
  });

  it("同じ名字の議員（田村幸子・田村泰之）を別の人として持つ", () => {
    expect(getMemberProfile("田村幸子")?.faction).toBeNull();
    expect(getMemberProfile("田村泰之")?.faction).toBe("市政会");
  });

  it("名簿に無い人やプロトタイプのプロパティ名は null", () => {
    expect(getMemberProfile("長谷川愛子")).toBeNull();
    expect(getMemberProfile("constructor")).toBeNull();
  });
});
