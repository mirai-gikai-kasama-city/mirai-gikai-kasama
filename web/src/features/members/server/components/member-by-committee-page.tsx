import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { routes } from "@/lib/routes";
import {
  affiliationOf,
  MEMBER_PROFILES,
} from "../../shared/data/member-profiles";
import {
  CHAIR_LABEL,
  groupMembersByCommittee,
  NO_FACTION_LABEL,
} from "../../shared/utils/group-members";
import { MemberListShell } from "./member-list-shell";

/**
 * 所属委員会ごとの議員一覧
 *
 * 1人が複数の委員会に入るので、同じ議員が複数の委員会に出る。
 * 委員会の中は委員長・副委員長・議席番号の順
 */
export function MemberByCommitteePage() {
  const groups = groupMembersByCommittee(MEMBER_PROFILES);

  return (
    <MemberListShell
      view="committee"
      title="所属委員会ごとの議員"
      lead="笠間市議会の現職の議員を、公式名簿の所属委員会ごとにまとめています。議員は複数の委員会に入るため、同じ議員が複数の委員会に出ます。委員会の中は委員長・副委員長・議席番号の順です。"
    >
      <nav aria-label="委員会" className="mb-8 rounded-md bg-white px-4 py-3">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {groups.map((group, index) => (
            <li key={group.label}>
              <a
                href={`#committee-${index}`}
                className="text-primary-accent underline underline-offset-[3px] hover:opacity-70"
              >
                {group.label === CHAIR_LABEL
                  ? group.label
                  : `${group.label}（${group.members.length}人）`}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-8">
        {groups.map((group, index) => (
          <section
            key={group.label}
            id={`committee-${index}`}
            className="flex scroll-mt-24 flex-col gap-3"
          >
            {group.label === CHAIR_LABEL ? (
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-mirai-text">
                  {group.label}
                </h2>
                <p className="text-xs text-mirai-text-secondary">
                  議長のため、委員会には所属していません（公式名簿でも所属委員会の欄は空です）。
                </p>
              </div>
            ) : (
              <h2 className="text-lg font-bold text-mirai-text">
                {group.label}
                <span className="ml-2 text-sm font-medium text-mirai-text-muted">
                  {group.members.length}人
                </span>
              </h2>
            )}
            {/* 同じ議員が何度も出るので、カードではなく1人1行で並べる */}
            <ul className="grid grid-cols-1 gap-x-3 overflow-hidden rounded-md border border-mirai-border bg-white sm:grid-cols-2">
              {group.members.map(({ key, profile, position }) => (
                <li key={key} className="border-b border-mirai-border">
                  <Link
                    href={routes.memberDetail(key) as Route}
                    className="flex items-center gap-2 px-4 py-2.5 transition-colors hover:bg-muted/50"
                  >
                    <span className="w-14 shrink-0 text-xs text-mirai-text-muted">
                      議席{profile.seat}番
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm font-bold text-mirai-text">
                        {profile.fullName}
                        {(position ?? profile.role) && (
                          <span className="rounded bg-mirai-surface-key px-1.5 py-0.5 text-xs font-medium">
                            {position ?? profile.role}
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-mirai-text-secondary">
                        {affiliationOf(profile) ?? NO_FACTION_LABEL}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-mirai-text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </MemberListShell>
  );
}
