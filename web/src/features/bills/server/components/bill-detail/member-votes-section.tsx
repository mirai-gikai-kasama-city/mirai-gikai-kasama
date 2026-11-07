import { ExternalLink } from "lucide-react";
import type { Bill } from "../../../shared/types";
import {
  VOTE_ARIA_LABEL,
  VOTE_CHIP_CLASS,
  VOTE_LABEL,
} from "../../../shared/utils/member-vote-display";
import {
  countVotes,
  formatVoteCounts,
  groupEntriesByFaction,
  parseMemberVotes,
} from "../../../shared/utils/member-votes";
import { resolveVoteDisclosure } from "../../../shared/utils/vote-disclosure";

interface MemberVotesSectionProps {
  bill: Bill;
  /** 所属会期のslug（全会一致・無記名投票の判定に使用）。不明ならnull */
  sessionSlug: string | null;
}

/**
 * 異議なく議決された（賛否が分かれなかった）議案の表示。
 * 欠席者や採決に加わらない議長がいるので「全員賛成」とは書かない
 */
function UnanimousVotesBody() {
  return (
    <>
      <p className="mt-2 text-sm text-mirai-text">
        異議なく議決（賛否は分かれませんでした）
      </p>

      {/* 異議が無かったことを示すバー（賛否表がある議案とビジュアルを揃える） */}
      <div
        className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-mirai-surface-muted"
        role="img"
        aria-label="異議なく議決"
      >
        <div className="grow bg-vote-for" />
      </div>

      <details className="mt-4 text-xs text-mirai-text-note">
        <summary className="cursor-pointer select-none text-mirai-text-secondary">
          注記・出典を見る
        </summary>
        <div className="mt-2 space-y-2">
          <p>
            ※議会だよりには、賛否が分かれた議案だけ議員別の賛否が載っています。この議案は載っておらず、会議録では異議なく議決されています（欠席した議員がいる場合があります）
          </p>
          <p>出典: かさま市議会だより、笠間市議会 会議録</p>
        </div>
      </details>
    </>
  );
}

/**
 * 無記名投票（議員別の賛否が公表されていない議案）の表示
 */
function SecretBallotVotesBody() {
  return (
    <p className="mt-2 text-sm text-mirai-text">
      この議案は無記名投票で採決されたため、議員別の賛否は公表されていません
    </p>
  );
}

/**
 * 議員別の賛否セクション
 *
 * 議会だよりに載っている「賛否が分かれた議案」の議員ごとの賛否を、
 * 比率バー＋チップで一覧表示する。全議員を同じ形で並べ、順位付けはしない。
 * 賛否表が無い議案でも、可決系の結果であれば「全会一致」、無記名投票の
 * 議案であれば「非公表」の説明を表示する（判定はvote-disclosure.ts）。
 * 判定できない議案では何も表示しない
 */
export function MemberVotesSection({
  bill,
  sessionSlug,
}: MemberVotesSectionProps) {
  const memberVotes = parseMemberVotes(bill.member_votes);
  if (memberVotes === null) {
    const disclosure = resolveVoteDisclosure({
      hasMemberVotes: false,
      hasRecordedVote: bill.member_votes != null,
      billName: bill.name,
      sessionSlug,
      statusNote: bill.status_note,
    });

    if (disclosure === "unanimous" || disclosure === "secret_ballot") {
      return (
        <section className="my-8 rounded-md bg-white px-4 py-6">
          <h3 className="text-sm font-bold text-black">議員別の賛否</h3>
          {disclosure === "unanimous" ? (
            <UnanimousVotesBody />
          ) : (
            <SecretBallotVotesBody />
          )}
        </section>
      );
    }

    return null;
  }

  const { entries, notes, sourceUrl } = memberVotes;
  const factionGroups = groupEntriesByFaction(entries);
  const { yes, no } = countVotes(entries);
  const absentCount = entries.filter((entry) => entry.vote === "absent").length;
  const notVotingCount = entries.filter(
    (entry) => entry.vote === "not_voting"
  ).length;
  const decisiveCount = yes + no;
  const voteLabel = formatVoteCounts(yes, no);

  return (
    <section className="my-8 rounded-md bg-white px-4 py-6">
      <h3 className="text-sm font-bold text-black">議員別の賛否</h3>
      <p className="mt-2 text-sm text-mirai-text">
        {voteLabel.text}
        {absentCount > 0 && `・欠席${absentCount}`}
        {notVotingCount > 0 && `・採決に加わらず${notVotingCount}`}
      </p>

      {/* 賛成・反対の比率バー（幅は票数比によるレイアウト計算のため style を使用。
          色指定はクラスで行っておりインラインカラーコードではない） */}
      {decisiveCount > 0 && (
        <div
          className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-mirai-surface-muted"
          role="img"
          aria-label={voteLabel.ariaLabel}
        >
          <div className="basis-0 bg-vote-for" style={{ flexGrow: yes }} />
          <div className="basis-0 bg-stance-against" style={{ flexGrow: no }} />
        </div>
      )}

      {/* 会派別の議員名チップ */}
      <div className="mt-4 space-y-4">
        {factionGroups.map((group) => (
          <div key={group.faction}>
            <h4 className="text-xs font-bold text-mirai-text-secondary">
              {group.faction}
            </h4>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {group.members.map((member) => (
                <span
                  key={member.name}
                  className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium ${VOTE_CHIP_CLASS[member.vote]}`}
                >
                  {member.name}
                  <span aria-hidden="true">{VOTE_LABEL[member.vote]}</span>
                  <span className="sr-only">
                    （{VOTE_ARIA_LABEL[member.vote]}）
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <details className="mt-4 text-xs text-mirai-text-note">
        <summary className="cursor-pointer select-none text-mirai-text-secondary">
          注記・出典を見る
        </summary>
        <div className="mt-2 space-y-2">
          <p>凡例: ○賛成　×反対　欠=欠席　−=採決に加わらず</p>

          {notes !== undefined && notes.length > 0 && (
            <ul className="space-y-1">
              {notes.map((note) => (
                <li key={note}>※ {note}</li>
              ))}
            </ul>
          )}

          <p>※賛否が分かれた議案のみ、議会だよりに議員別の賛否が載っています</p>

          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary underline underline-offset-[3px] hover:opacity-70"
          >
            出典: かさま市議会だより
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </details>
    </section>
  );
}
