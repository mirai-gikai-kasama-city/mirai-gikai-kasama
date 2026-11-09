import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layouts/container";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { ShowMoreList } from "@/components/ui/show-more-list";
import {
  VOTE_ARIA_LABEL,
  VOTE_CHIP_CLASS,
  VOTE_LABEL,
} from "@/features/bills/shared/utils/member-vote-display";
import { MemberQuestionsSection } from "@/features/general-questions/server/components/member-questions-section";
import {
  groupByTerm,
  termForDate,
} from "@/features/general-questions/shared/utils/council-terms";
import { SourceBadge } from "@/features/sources/shared/components/source-badge";
import { env } from "@/lib/env";
import { routes } from "@/lib/routes";
import { formatDateWithDots } from "@/lib/utils/date";
import {
  affiliationOf,
  familyNameOf,
  getMemberProfile,
  ROSTER_AS_OF,
  ROSTER_SOURCES,
} from "../../shared/data/member-profiles";
import { collectMemberVoteRecords } from "../../shared/utils/aggregate-members";
import { NO_FACTION_LABEL } from "../../shared/utils/group-members";
import { getBillsWithMemberVotes } from "../loaders/get-member-vote-data";

interface MemberDetailPageProps {
  /** 議員ページのキー（空白なしのフルネーム、デコード済み） */
  memberKey: string;
}

/**
 * 議員個人ページ（現職のみ）
 *
 * 公式名簿の会派・役職・所属委員会と、一般質問、賛否が分かれた議案での
 * この議員の賛否（賛成・反対・欠席・採決に加わらず）を議決日の新しい順に載せる
 */
export async function MemberDetailPage({ memberKey }: MemberDetailPageProps) {
  const profile = getMemberProfile(memberKey);
  if (!profile) {
    notFound();
  }

  const items = await getBillsWithMemberVotes();
  const records = collectMemberVoteRecords(items, memberKey);
  const termOf = (record: (typeof records)[number]) =>
    record.bill.submitted_date ? termForDate(record.bill.submitted_date) : null;
  // 議決日が分からず任期を決められない記録（通常は無い）は末尾にまとめる
  const undated = records.filter((record) => termOf(record) === null);
  const voteGroups = [
    ...groupByTerm(records, termOf).map(({ term, records }) => ({
      key: String(term.endYear),
      label: term.label,
      records,
    })),
    ...(undated.length > 0
      ? [{ key: "unknown", label: "任期を確認中", records: undated }]
      : []),
  ];

  // 議員個人の構造化データ（Person）。検索エンジンが人物ページとして理解できるようにする
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    url: new URL(routes.memberDetail(memberKey), env.webUrl).toString(),
    jobTitle: "笠間市議会議員",
    ...((profile.party || profile.faction) && {
      affiliation: [profile.party, profile.faction]
        .filter((name) => name !== null)
        .map((name) => ({ "@type": "Organization", name })),
    }),
    memberOf: {
      "@type": "GovernmentOrganization",
      name: "笠間市議会",
    },
  };

  return (
    <div className="bg-mirai-surface-muted">
      <JsonLd data={personJsonLd} />
      <Container className="py-8">
        <div className="flex flex-col gap-1.5 pb-6">
          <p className="text-xs text-mirai-text-muted">{profile.reading}</p>
          <h1 className="text-[22px] font-bold text-black leading-[1.48]">
            {profile.fullName} 議員
          </h1>
        </div>

        {/* 名簿の情報 */}
        <section className="mb-8 rounded-md bg-white px-4 py-5">
          <h2 className="text-sm font-bold text-mirai-text">
            この議員について
          </h2>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-mirai-text-muted">党派・会派</dt>
            <dd className="text-mirai-text">
              {affiliationOf(profile) ?? NO_FACTION_LABEL}
            </dd>
            {profile.role && (
              <>
                <dt className="text-mirai-text-muted">役職</dt>
                <dd className="text-mirai-text">{profile.role}</dd>
              </>
            )}
            <dt className="text-mirai-text-muted">所属委員会</dt>
            <dd className="text-mirai-text">
              {profile.committees.length > 0 ? (
                <ul className="flex flex-col gap-0.5">
                  {profile.committees.map((committee) => (
                    <li key={committee}>{committee}</li>
                  ))}
                </ul>
              ) : (
                "名簿に記載なし"
              )}
            </dd>
            <dt className="text-mirai-text-muted">議席番号</dt>
            <dd className="text-mirai-text">{profile.seat}番</dd>
          </dl>
          {profile.note && (
            <p className="mt-3 text-xs text-mirai-text-muted">
              ※{profile.note}
            </p>
          )}
          <p className="mt-3 text-xs text-mirai-text-note">
            ※{ROSTER_AS_OF}現在の公式名簿より。
            {ROSTER_SOURCES.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-primary-accent underline underline-offset-[3px] hover:opacity-70"
              >
                {source.label}
              </a>
            ))}
          </p>
        </section>

        {/* 一般質問で取り上げたこと（公式サイトの一般質問一覧より。無ければ非表示） */}
        <MemberQuestionsSection
          familyName={familyNameOf(profile)}
          fullName={profile.fullName}
        />

        {/* 議案ごとの投票記録 */}
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-mirai-text">
              賛否が分かれた議案での賛否（新しい順）
            </h2>
            {records.length === 0 && (
              <p className="text-xs text-mirai-text-secondary">
                賛否が分かれた議案の記録はまだありません。
              </p>
            )}
          </div>
          {voteGroups.map((group) => {
            const counts = { yes: 0, no: 0, absent: 0, not_voting: 0 };
            for (const record of group.records) {
              counts[record.vote] += 1;
            }
            return (
              <div key={group.key} className="flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-bold text-mirai-text-secondary">
                    {group.label}
                    <span className="ml-2 font-medium text-mirai-text-muted">
                      {group.records.length}議案
                    </span>
                  </h3>
                  <p className="text-xs text-mirai-text-secondary">
                    賛成{counts.yes}・反対{counts.no}
                    {counts.absent > 0 && `・欠席${counts.absent}`}
                    {counts.not_voting > 0 &&
                      `・採決に加わらず${counts.not_voting}`}
                  </p>
                </div>
                <ShowMoreList
                  initialCount={5}
                  step={50}
                  className="flex flex-col gap-3"
                >
                  {group.records.map(({ bill, vote }) => (
                    <Link
                      key={bill.id}
                      href={routes.billDetail(bill.id) as Route}
                    >
                      <Card className="flex flex-col gap-2 border-mirai-border p-4 transition-colors hover:bg-muted/50">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="line-clamp-2 text-[15px] font-bold leading-[1.6]">
                            {bill.bill_content?.title || bill.name}
                          </h4>
                          <span
                            className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium ${VOTE_CHIP_CLASS[vote]}`}
                          >
                            {VOTE_ARIA_LABEL[vote]}
                            <span aria-hidden="true">{VOTE_LABEL[vote]}</span>
                          </span>
                        </div>
                        {bill.submitted_date && (
                          <p className="text-xs text-mirai-text-muted">
                            {formatDateWithDots(bill.submitted_date)} 議決
                          </p>
                        )}
                      </Card>
                    </Link>
                  ))}
                </ShowMoreList>
              </div>
            );
          })}
        </section>

        <div className="mt-10 flex flex-col gap-1 rounded-md bg-white px-4 py-4 text-xs leading-[1.8] text-mirai-text-note">
          <SourceBadge
            kind="official"
            detail="議員名簿・議会だより・会議録"
            className="mb-1"
          />
          <p>
            ※賛否は、議会だよりの賛否一覧などに載る「賛否が分かれた議案」だけを載せています（議会だよりに賛否一覧が載り始めた平成28年12月からの記録）。それより前の採決は、議会だより・会議録に議員ごとの記録がありません。全会一致で議決された議案は含みません。
          </p>
          <p>
            ※「採決に加わらず」は、議長として採決に加わらないことなどを表します。賛成・反対の数は議員の評価を示すものではありません。個々の議案の内容とあわせてご覧ください。
          </p>
        </div>
      </Container>

      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "TOP", href: routes.home() },
            { label: "議員一覧", href: routes.memberArchive() },
            { label: `${profile.fullName} 議員` },
          ]}
        />
      </Container>
    </div>
  );
}
