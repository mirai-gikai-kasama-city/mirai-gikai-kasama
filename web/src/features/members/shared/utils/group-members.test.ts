import { describe, expect, it } from "vitest";
import type { MemberProfile } from "../data/member-profiles";
import { groupMembersByFaction, NO_FACTION_LABEL } from "./group-members";

function profile(
  seat: number,
  fullName: string,
  faction: string | null,
  party: string | null = null
): MemberProfile {
  return {
    seat,
    fullName,
    reading: "よみ がな",
    faction,
    party,
    role: null,
    committees: [],
  };
}

const PROFILES: Record<string, MemberProfile> = {
  乙山二郎: profile(3, "乙山 二郎", "A会"),
  甲野一郎: profile(1, "甲野 一郎", "A会"),
  丙川三郎: profile(2, "丙川 三郎", null),
  丁田四郎: profile(4, "丁田 四郎", "B会"),
  戊井五郎: profile(5, "戊井 五郎", "A会"),
};

describe("groupMembersByFaction", () => {
  it("会派は人数の多い順にし、会派の中は議席番号の順に並べる", () => {
    const groups = groupMembersByFaction(PROFILES);
    expect(groups.map((g) => g.label)).toEqual([
      "A会",
      "B会",
      NO_FACTION_LABEL,
    ]);
    expect(groups[0].members.map((m) => m.key)).toEqual([
      "甲野一郎",
      "乙山二郎",
      "戊井五郎",
    ]);
  });

  it("会派に入っていない議員は党派でまとめ、会派と党派の両方がある議員は会派に入れる", () => {
    const groups = groupMembersByFaction({
      ...PROFILES,
      己野六郎: profile(6, "己野 六郎", null, "C党"),
      庚田七郎: profile(7, "庚田 七郎", "B会", "C党"),
    });
    expect(groups.map((g) => [g.label, g.members.length])).toEqual([
      ["A会", 3],
      ["B会", 2],
      ["C党", 1],
      [NO_FACTION_LABEL, 1],
    ]);
  });

  it("党派・会派の欄が空の議員は「党派・会派の記載なし」として最後にまとめる", () => {
    const groups = groupMembersByFaction(PROFILES);
    const last = groups[groups.length - 1];
    expect(last.label).toBe(NO_FACTION_LABEL);
    expect(last.members.map((m) => m.key)).toEqual(["丙川三郎"]);
  });

  it("全員が会派に入っていれば「会派の記載なし」の枠を作らない", () => {
    const groups = groupMembersByFaction({ 甲野一郎: PROFILES.甲野一郎 });
    expect(groups.map((g) => g.label)).toEqual(["A会"]);
  });
});
