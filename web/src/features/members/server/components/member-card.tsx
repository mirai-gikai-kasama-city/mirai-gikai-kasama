import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";
import {
  affiliationOf,
  type MemberProfile,
} from "../../shared/data/member-profiles";
import { NO_FACTION_LABEL } from "../../shared/utils/group-members";

interface MemberCardProps {
  memberKey: string;
  profile: MemberProfile;
}

/**
 * 議員一覧のカード1枚。議員ページへのリンク。
 * 一般質問や賛否は議員ページで見せ、一覧には名簿の情報だけを載せる
 */
export function MemberCard({ memberKey, profile }: MemberCardProps) {
  return (
    <Link href={routes.memberDetail(memberKey) as Route}>
      <Card className="flex h-full flex-col gap-2 border-mirai-border p-4 transition-colors hover:bg-muted/50">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-mirai-text-muted">
              議席{profile.seat}番・{profile.reading}
            </span>
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-bold text-mirai-text">
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
        <p className="text-xs leading-[1.7] text-mirai-text-secondary">
          党派・会派：{affiliationOf(profile) ?? NO_FACTION_LABEL}
        </p>
        {profile.committees.length > 0 && (
          <p className="text-xs leading-[1.7] text-mirai-text-secondary">
            {profile.committees.join("・")}
          </p>
        )}
      </Card>
    </Link>
  );
}
