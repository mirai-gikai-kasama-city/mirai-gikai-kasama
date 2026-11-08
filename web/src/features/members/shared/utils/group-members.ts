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
