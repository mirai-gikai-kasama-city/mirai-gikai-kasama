import { describe, expect, it } from "vitest";
import type { MemberProfile } from "../data/member-profiles";
import {
  CHAIR_LABEL,
  groupMembersByCommittee,
  groupMembersByFaction,
  listMembersBySeat,
  NO_COMMITTEE_LABEL,
  NO_FACTION_LABEL,
  parseCommittee,
} from "./group-members";

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

describe("listMembersBySeat", () => {
  it("議席番号の順に並べる", () => {
    expect(listMembersBySeat(PROFILES).map((m) => m.profile.seat)).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });
});

describe("parseCommittee", () => {
  it("かっこ書きの役職を分ける", () => {
    expect(parseCommittee("教育福祉委員会（副委員長）")).toEqual({
      name: "教育福祉委員会",
      position: "副委員長",
    });
    expect(parseCommittee("広報委員会")).toEqual({
      name: "広報委員会",
      position: null,
    });
  });
});

describe("groupMembersByCommittee", () => {
  const withCommittees = (
    seat: number,
    fullName: string,
    committees: string[]
  ): MemberProfile => ({ ...profile(seat, fullName, null), committees });

  it("委員会の決まった順に並べ、委員会の中は委員長・副委員長・議席番号の順", () => {
    const groups = groupMembersByCommittee({
      甲野一郎: withCommittees(1, "甲野 一郎", [
        "広報委員会",
        "総務企画委員会",
      ]),
      乙山二郎: withCommittees(2, "乙山 二郎", ["総務企画委員会（副委員長）"]),
      丙川三郎: withCommittees(3, "丙川 三郎", ["総務企画委員会（委員長）"]),
      丁田四郎: withCommittees(4, "丁田 四郎", []),
    });
    expect(groups.map((g) => g.label)).toEqual([
      "総務企画委員会",
      "広報委員会",
      NO_COMMITTEE_LABEL,
    ]);
    expect(groups[0].members.map((m) => [m.key, m.position])).toEqual([
      ["丙川三郎", "委員長"],
      ["乙山二郎", "副委員長"],
      ["甲野一郎", null],
    ]);
    expect(groups[2].members.map((m) => m.key)).toEqual(["丁田四郎"]);
  });

  it("委員会に所属しない議長は「記載なし」ではなく議長として先頭に出す", () => {
    const groups = groupMembersByCommittee({
      甲野一郎: withCommittees(1, "甲野 一郎", ["総務企画委員会"]),
      乙山二郎: { ...withCommittees(2, "乙山 二郎", []), role: "議長" },
    });
    expect(groups.map((g) => [g.label, g.members.map((m) => m.key)])).toEqual([
      [CHAIR_LABEL, ["乙山二郎"]],
      ["総務企画委員会", ["甲野一郎"]],
    ]);
  });
});
