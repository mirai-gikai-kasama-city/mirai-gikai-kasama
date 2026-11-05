import { Container } from "@/components/layouts/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import type { BillWithContent } from "@/features/bills/shared/types";
import { SourceBadge } from "@/features/sources/shared/components/source-badge";
import { formatDate } from "@/lib/utils/date";
import { BillListWithStatusFilter } from "../../../client/components/bill-list-with-status-filter";
import type { DietSession } from "../../../shared/types";
import { buildSessionSummaryBreadcrumbItems } from "../../../shared/utils/session-breadcrumb";
import {
  pickSessionHighlights,
  summarizeSessionResults,
} from "../../../shared/utils/session-summary";
import { getAdjacentSessions } from "../../loaders/get-adjacent-sessions";
import { SessionHighlightsSection } from "./session-highlights-section";
import { SessionNav } from "./session-nav";
import { SessionSummaryStats } from "./session-summary-stats";
import { SplitVoteSection } from "./split-vote-section";

const HIGHLIGHT_COUNT = 3;

interface SessionSummaryLayoutProps {
  session: DietSession;
  bills: BillWithContent[];
}

/**
 * 会期まとめページ（/sessions/[id]）本体。
 * 既存DBデータ（bills / bill_contents / member_votes / タグ）から
 * 数字・ハイライト・賛否割れ議案・全議案リスト・前後ナビを自動集計して表示する
 */
export async function SessionSummaryLayout({
  session,
  bills,
}: SessionSummaryLayoutProps) {
  const adjacent = await getAdjacentSessions(session.id);

  const summary = summarizeSessionResults(bills);
  const highlights = pickSessionHighlights(bills, HIGHLIGHT_COUNT);

  return (
    <div className="bg-mirai-surface-muted">
      <Container className="py-8">
        <div className="flex flex-col gap-10">
          <Breadcrumb
            items={buildSessionSummaryBreadcrumbItems(session.name)}
          />

          <header className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold leading-[1.4] text-mirai-text">
              {session.name}のまとめ
            </h1>
            <p className="text-sm font-medium text-mirai-text-muted">
              {formatDate(session.start_date)} 〜 {formatDate(session.end_date)}
            </p>
            {/* このページのもとになっている公式の資料 */}
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              <SourceBadge
                kind="official"
                detail="市議会の公開資料"
                className="bg-white"
              />
              {session.shugiin_url && (
                <TextLink
                  external
                  href={session.shugiin_url}
                  className="text-xs"
                >
                  もとの資料
                </TextLink>
              )}
            </div>
          </header>

          <SessionSummaryStats summary={summary} />

          <SessionHighlightsSection bills={highlights} />

          <SplitVoteSection bills={bills} />

          <section className="flex flex-col gap-4">
            <SectionHeading>全議案リスト</SectionHeading>
            {bills.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">
                この会期の議案はまだありません
              </p>
            ) : (
              <BillListWithStatusFilter bills={bills} />
            )}
          </section>

          <SessionNav adjacent={adjacent} />
        </div>
      </Container>
    </div>
  );
}
