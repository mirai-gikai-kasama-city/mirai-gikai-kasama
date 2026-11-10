import { MEMBER_PROFILES } from "../../shared/data/member-profiles";
import {
  groupMembersByFaction,
  NO_FACTION_LABEL,
} from "../../shared/utils/group-members";
import { MemberCard } from "./member-card";
import { MemberListShell } from "./member-list-shell";

/**
 * 党派・会派ごとの議員一覧
 *
 * 会派に入っている議員は会派で、入っていない議員は党派でまとめる
 */
export function MemberByFactionPage() {
  const groups = groupMembersByFaction(MEMBER_PROFILES);
  const named = groups.filter((group) => group.label !== NO_FACTION_LABEL);

  return (
    <MemberListShell
      view="faction"
      title="党派・会派ごとの議員"
      lead="笠間市議会の現職の議員を、公式名簿の党派・会派ごとにまとめています。会派に入っている議員は会派で、会派に入っていない議員は党派でまとめ、人数の多い順に並べています。"
    >
      <div className="mb-8 rounded-md bg-white px-4 py-3">
        <p className="text-xs text-mirai-text-muted">党派・会派</p>
        <p className="text-lg font-bold text-mirai-text">{named.length}つ</p>
        <p className="mt-0.5 text-xs leading-[1.7] text-mirai-text-secondary">
          {named.map((group, index) => (
            // 名前と人数の途中で改行しないよう、1つずつまとめる（改行は区切りの後だけ）
            <span key={group.label} className="inline-block">
              {group.label}
              {group.members.length}人{index < named.length - 1 && "、"}
            </span>
          ))}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <section key={group.label} className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-mirai-text">
              {group.label}
              <span className="ml-2 text-sm font-medium text-mirai-text-muted">
                {group.members.length}人
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {group.members.map(({ key, profile }) => (
                <MemberCard key={key} memberKey={key} profile={profile} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </MemberListShell>
  );
}
