import type { Metadata } from "next";
import { MemberByCommitteePage } from "@/features/members/server/components/member-by-committee-page";
import { routes } from "@/lib/routes";
import { PAGE_COPY } from "@/lib/seo/page-copy";
import { buildPageShareMetadata } from "@/lib/seo/share-metadata";

// 議員一覧（/members）と同じく1時間ごとに作り直す
export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_COPY.membersByCommittee.title,
  description: PAGE_COPY.membersByCommittee.description,
  alternates: {
    canonical: routes.memberByCommittee(),
  },
  ...buildPageShareMetadata({
    ...PAGE_COPY.membersByCommittee,
    path: routes.memberByCommittee(),
  }),
};

export default function MembersByCommitteePage() {
  return <MemberByCommitteePage />;
}
