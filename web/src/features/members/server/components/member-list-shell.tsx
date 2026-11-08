import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layouts/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TextLink } from "@/components/ui/text-link";
import { SourceBadge } from "@/features/sources/shared/components/source-badge";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  ROSTER_AS_OF,
  ROSTER_SOURCES,
  VACANT_SEATS,
} from "../../shared/data/member-profiles";
import { NO_FACTION_LABEL } from "../../shared/utils/group-members";

/** 議員一覧の見せ方 */
export type MemberListView = "seat" | "faction" | "committee";

const VIEWS: { view: MemberListView; label: string; href: string }[] = [
  { view: "seat", label: "議席番号順", href: routes.memberArchive() },
  { view: "faction", label: "党派・会派ごと", href: routes.memberByFaction() },
  {
    view: "committee",
    label: "所属委員会ごと",
    href: routes.memberByCommittee(),
  },
];

interface MemberListShellProps {
  view: MemberListView;
  title: string;
  lead: string;
  children: ReactNode;
}

/** 議員一覧の3つの見せ方に共通する枠（見出し・切り替え・注記・パンくず） */
export function MemberListShell({
  view,
  title,
  lead,
  children,
}: MemberListShellProps) {
  const isTop = view === "seat";
  return (
    <div className="bg-mirai-surface-muted" data-wide-column>
      <Container className="py-8">
        <div className="flex flex-col gap-1.5 pb-4">
          <h1 className="text-[22px] font-bold text-black leading-[1.48]">
            {title}
          </h1>
          <p className="text-xs text-mirai-text-secondary">{lead}</p>
        </div>

        <nav aria-label="議員一覧の見せ方" className="mb-6">
          <ul className="flex flex-wrap gap-2">
            {VIEWS.map((item) => {
              const current = item.view === view;
              return (
                <li key={item.view}>
                  <Link
                    href={item.href as Route}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "inline-flex rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      current
                        ? "border-primary-accent bg-primary-accent text-white"
                        : "border-mirai-border bg-white text-mirai-text hover:bg-muted/50"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {children}

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
            ※氏名・ふりがな・党派・会派・役職・所属委員会は公式名簿のとおりです。党派・会派は名簿の「党派「所属会派」」の欄で、空欄の議員は「
            {NO_FACTION_LABEL}」としています。
          </p>
          <p>
            ※一般質問の回数は、市の一般質問一覧に載る平成26年9月からの分を、議員の任期ごとに数えています（任期は12月の一般選挙で変わります）。回数は議員の評価を示すものではありません。賛否が分かれた議案での賛否は、議員ごとのページで確認できます。
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
          items={
            isTop
              ? [{ label: "TOP", href: routes.home() }, { label: "議員一覧" }]
              : [
                  { label: "TOP", href: routes.home() },
                  { label: "議員一覧", href: routes.memberArchive() },
                  { label: title },
                ]
          }
        />
      </Container>
    </div>
  );
}
