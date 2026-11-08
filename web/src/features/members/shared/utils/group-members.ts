import type { MemberProfile } from "../data/member-profiles";

/** 議員一覧の1人分（議員ページのキーと名簿の情報） */
export interface MemberListEntry {
  key: string;
  profile: MemberProfile;
}

/** 議員一覧の1グループ（会派、または会派に入っていない議員の党派） */
export interface MemberListGroup {
  label: string;
  members: MemberListEntry[];
}

/** 議員を議席番号の順に並べる */
export function listMembersBySeat(
  profiles: Readonly<Record<string, MemberProfile>>
): MemberListEntry[] {
  return Object.entries(profiles)
    .map(([key, profile]) => ({ key, profile }))
    .sort((a, b) => a.profile.seat - b.profile.seat);
}

/**
 * 名簿の党派・会派の欄が空の議員のグループ名。
 * 空欄を「無所属」とは言い切れないので、名簿のとおり「記載なし」と書く
 */
export const NO_FACTION_LABEL = "党派・会派の記載なし";

/**
 * 現職議員を名簿の党派・会派ごとにまとめる。
 * 会派に入っている議員は会派で、入っていない議員は党派でまとめる。
 * 人数の多い順（同数なら名前順）で、「党派・会派の記載なし」は最後。グループの中は議席番号の順
 */
export function groupMembersByFaction(
  profiles: Readonly<Record<string, MemberProfile>>
): MemberListGroup[] {
  const byLabel = new Map<string, MemberListEntry[]>();
  for (const [key, profile] of Object.entries(profiles)) {
    const label = profile.faction ?? profile.party ?? NO_FACTION_LABEL;
    const members = byLabel.get(label) ?? [];
    members.push({ key, profile });
    byLabel.set(label, members);
  }

  const groups = [...byLabel.entries()].map(([label, members]) => ({
    label,
    members: members.sort((a, b) => a.profile.seat - b.profile.seat),
  }));

  return groups.sort((a, b) => {
    if (a.label === NO_FACTION_LABEL) return 1;
    if (b.label === NO_FACTION_LABEL) return -1;
    return (
      b.members.length - a.members.length ||
      a.label.localeCompare(b.label, "ja")
    );
  });
}

/** 名簿に所属委員会が書かれていない議員（議長など）のグループ名 */
export const NO_COMMITTEE_LABEL = "所属委員会の記載なし";

/** 委員会を並べる順（常任委員会、議会運営委員会、予算決算の委員会、広報委員会）。無いものは末尾に名前順 */
const COMMITTEE_ORDER = [
  "総務企画委員会",
  "教育福祉委員会",
  "建設産業委員会",
  "議会運営委員会",
  "予算決算委員会",
  "予算決算運営委員会",
  "広報委員会",
];

/** 委員会での役職（名簿のかっこ書き） */
export type CommitteePosition = "委員長" | "副委員長";

/** 委員会ごとの1人分。委員会での役職を添える */
export interface CommitteeMemberEntry extends MemberListEntry {
  position: CommitteePosition | null;
}

export interface CommitteeGroup {
  label: string;
  members: CommitteeMemberEntry[];
}

/** 「教育福祉委員会（副委員長）」→ 委員会名と役職に分ける */
export function parseCommittee(text: string): {
  name: string;
  position: CommitteePosition | null;
} {
  const m = text.match(/^(.+?)（(委員長|副委員長)）$/);
  return m
    ? { name: m[1], position: m[2] as CommitteePosition }
    : { name: text, position: null };
}

const POSITION_RANK: Record<CommitteePosition, number> = {
  委員長: 0,
  副委員長: 1,
};

/**
 * 現職議員を所属委員会ごとにまとめる（1人が複数の委員会に入る）。
 * 委員会の中は委員長・副委員長・議席番号の順。所属委員会の無い議員は最後にまとめる
 */
export function groupMembersByCommittee(
  profiles: Readonly<Record<string, MemberProfile>>
): CommitteeGroup[] {
  const byName = new Map<string, CommitteeMemberEntry[]>();
  for (const entry of listMembersBySeat(profiles)) {
    const committees =
      entry.profile.committees.length > 0
        ? entry.profile.committees.map(parseCommittee)
        : [{ name: NO_COMMITTEE_LABEL, position: null }];
    for (const { name, position } of committees) {
      const members = byName.get(name) ?? [];
      members.push({ ...entry, position });
      byName.set(name, members);
    }
  }

  const rank = (name: string) => {
    if (name === NO_COMMITTEE_LABEL) return Number.MAX_SAFE_INTEGER;
    const index = COMMITTEE_ORDER.indexOf(name);
    return index === -1 ? COMMITTEE_ORDER.length : index;
  };
  const positionRank = (position: CommitteePosition | null) =>
    position ? POSITION_RANK[position] : 2;

  return [...byName.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b, "ja"))
    .map(([label, members]) => ({
      label,
      members: members.sort(
        (a, b) =>
          positionRank(a.position) - positionRank(b.position) ||
          a.profile.seat - b.profile.seat
      ),
    }));
}
