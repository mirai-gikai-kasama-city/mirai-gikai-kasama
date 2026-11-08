import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { TextLink } from "@/components/ui/text-link";
import { getAllGeneralQuestions } from "@/features/general-questions/server/loaders/get-general-questions";
import { selectQuestionsByMember } from "@/features/general-questions/shared/utils/group-questions";
import { SourceBadge } from "@/features/sources/shared/components/source-badge";
import { routes } from "@/lib/routes";
import {
  COUNCIL_SEATS,
  familyNameOf,
  MEMBER_PROFILES,
  ROSTER_AS_OF,
  ROSTER_SOURCES,
  VACANT_SEATS,
} from "../../shared/data/member-profiles";
import { aggregateMemberSummaries } from "../../shared/utils/aggregate-members";
import {
  groupMembersByFaction,
  NO_FACTION_LABEL,
} from "../../shared/utils/group-members";
import { getBillsWithMemberVotes } from "../loaders/get-member-vote-data";

/**
 * 議員一覧ページ
 *
 * 笠間市議会の現職議員を、公式名簿の会派ごとに並べる。
 * 各議員の会派・役職・所属委員会と、賛否が分かれた議案での賛否の記録数、一般質問の回数を載せる
 */
export async function MemberListPage() {
  const items = await getBillsWithMemberVotes();
  const voteCountByKey = new Map(
    aggregateMemberSummaries(items).map((member) => [
      member.name,
      member.billCount,
    ])
  );
  const questions = getAllGeneralQuestions();
  const groups = groupMembersByFaction(MEMBER_PROFILES);
  const memberCount = Object.keys(MEMBER_PROFILES).length;
  const factionCount = groups.filter(
    (group) => group.label !== NO_FACTION_LABEL
  ).length;

  return (
    <div className="bg-mirai-surface-muted" data-wide-column>
      <Container className="py-8">
        <div className="flex flex-col gap-1.5 pb-6">
          <h1 className="text-[22px] font-bold text-black leading-[1.48]">
            議員一覧
          </h1>
          <p className="text-xs text-mirai-text-secondary">
            笠間市議会の現職の議員の会派・役職・所属委員会と、賛否が分かれた議案での賛否、一般質問をまとめています。名前を選ぶと議員ごとのページを開きます。
          </p>
        </div>

        <dl className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-md bg-white px-4 py-3">
            <dt className="text-xs text-mirai-text-muted">現職の議員</dt>
            <dd className="text-lg font-bold text-mirai-text">
              {memberCount}人
              <span className="ml-1 text-xs font-normal text-mirai-text-muted">
                （定数{COUNCIL_SEATS}・欠員{VACANT_SEATS.length}）
              </span>
            </dd>
          </div>
          <div className="rounded-md bg-white px-4 py-3">
            <dt className="text-xs text-mirai-text-muted">会派</dt>
            <dd className="text-lg font-bold text-mirai-text">
              {factionCount}会派
            </dd>
          </div>
        </dl>

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
                {group.members.map(({ key, profile }) => {
                  const voteCount = voteCountByKey.get(key) ?? 0;
                  const questionCount = selectQuestionsByMember(questions, {
                    familyName: familyNameOf(profile),
                    fullName: profile.fullName,
                  }).length;
                  return (
                    <Link key={key} href={routes.memberDetail(key) as Route}>
                      <Card className="flex h-full flex-col gap-2 border-mirai-border p-4 transition-colors hover:bg-muted/50">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-mirai-text-muted">
                              {profile.reading}
                            </span>
                            <span className="flex flex-wrap items-center gap-x-2 font-bold text-mirai-text">
                              {profile.fullName}
                              {profile.role && (
                                <span className="rounded bg-mirai-surface-key px-1.5 py-0.5 text-xs font-medium">
                                  {profile.role}
                                </span>
                              )}
                            </span>
                          </div>
                          <ChevronRight className="mt-4 h-4 w-4 shrink-0 text-mirai-text-muted" />
                        </div>
                        {profile.committees.length > 0 && (
                          <p className="text-xs leading-[1.7] text-mirai-text-secondary">
                            {profile.committees.join("・")}
                          </p>
                        )}
                        <p className="text-xs text-mirai-text-muted">
                          賛否の記録 {voteCount}議案・一般質問 {questionCount}回
                        </p>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-1 rounded-md bg-white px-4 py-4 text-xs leading-[1.8] text-mirai-text-note">
          <SourceBadge
            kind="official"
            detail="議員名簿・議会だより・会議録"
            className="mb-1"
          />
          <p>
            ※現職の議員だけを載せています（{ROSTER_AS_OF}
            現在の公式名簿より）。前の任期の議員や、任期の途中で辞職した議員は載せていません。議席
            {VACANT_SEATS.join("番・")}番は欠員です。
          </p>
          <p>
            ※氏名・ふりがな・会派・役職・所属委員会は公式名簿のとおりです。名簿の会派の欄が空欄の議員は「
            {NO_FACTION_LABEL}」にまとめています。
          </p>
          <p>
            ※賛否の記録は、議会だよりの賛否一覧などに載る「賛否が分かれた議案」の数です（平成30年12月からの記録。全会一致の議案は含みません）。賛否の数は議員の評価を示すものではありません。
          </p>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            {ROSTER_SOURCES.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-accent underline underline-offset-[3px] hover:opacity-70"
              >
                {source.label}（笠間市公式サイト）
              </a>
            ))}
          </div>
          <TextLink href={routes.sources()} className="mt-1 text-xs">
            出典の種類と読み方について
          </TextLink>
        </div>
      </Container>

      <Container className="py-8">
        <Breadcrumb
          items={[{ label: "TOP", href: routes.home() }, { label: "議員一覧" }]}
        />
      </Container>
    </div>
  );
}
