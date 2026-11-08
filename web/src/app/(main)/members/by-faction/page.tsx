import type { Metadata } from "next";
import { MemberByFactionPage } from "@/features/members/server/components/member-by-faction-page";
import { routes } from "@/lib/routes";
import { PAGE_COPY } from "@/lib/seo/page-copy";
import { buildPageShareMetadata } from "@/lib/seo/share-metadata";

// 議員一覧（/members）と同じく1時間ごとに作り直す
export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_COPY.membersByFaction.title,
  description: PAGE_COPY.membersByFaction.description,
  alternates: {
    canonical: routes.memberByFaction(),
  },
  ...buildPageShareMetadata({
    ...PAGE_COPY.membersByFaction,
    path: routes.memberByFaction(),
  }),
};

export default function MembersByFactionPage() {
  return <MemberByFactionPage />;
}
