import { getAllGeneralQuestions } from "@/features/general-questions/server/loaders/get-general-questions";
import {
  COUNCIL_SEATS,
  MEMBER_PROFILES,
  VACANT_SEATS,
} from "../../shared/data/member-profiles";
import { listMembersBySeat } from "../../shared/utils/group-members";
import { MemberCard } from "./member-card";
import { MemberListShell } from "./member-list-shell";

/**
 * 議員一覧ページ
 *
 * 笠間市議会の現職議員を議席番号の順に並べる。
 * 党派・会派ごと、所属委員会ごとの見せ方は別ページ（MemberListShell の切り替えから開く）
 */
export function MemberListPage() {
  const questions = getAllGeneralQuestions();
  const members = listMembersBySeat(MEMBER_PROFILES);

  return (
    <MemberListShell
      view="seat"
      title="議員一覧"
      lead="笠間市議会の現職の議員を議席番号の順に並べ、党派・会派・役職・所属委員会と一般質問の回数を載せています。名前を選ぶと、賛否が分かれた議案での賛否と一般質問をまとめた議員ごとのページを開きます。"
    >
      <p className="mb-3 text-sm text-mirai-text-secondary">
        現職 {members.length}人
        <span className="ml-1 inline-block text-xs text-mirai-text-muted">
          （定数{COUNCIL_SEATS}・欠員{VACANT_SEATS.length}）
        </span>
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {members.map(({ key, profile }) => (
          <MemberCard
            key={key}
            memberKey={key}
            profile={profile}
            questions={questions}
          />
        ))}
      </div>
    </MemberListShell>
  );
}
