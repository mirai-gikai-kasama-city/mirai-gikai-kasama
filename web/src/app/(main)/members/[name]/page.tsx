import type { Metadata } from "next";
import { MemberDetailPage } from "@/features/members/server/components/member-detail-page";
import { getMemberProfile } from "@/features/members/shared/data/member-profiles";
import { routes } from "@/lib/routes";
import { describeMember } from "@/lib/seo/page-copy";
import { buildPageShareMetadata } from "@/lib/seo/share-metadata";

type Props = {
  params: Promise<{ name: string }>;
};

// ISR: データ更新時は /api/revalidate（revalidateTag）で即時反映され、
// 会期バナー等の日付起因の表示は最長1日遅れる。ページ数が多く、クローラーの巡回のたびに作り直すと Vercel の無料枠（ISR Writes・CPU）を使い切るため。データの更新はタグの再検証で即時に反映する
export const revalidate = 86400;

// 全パスをリクエスト時に生成してキャッシュする（オンデマンドISR）。
// これが無いと動的パラメータルートはISR対象にならず毎回SSRされる
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const memberKey = decodeURIComponent(name);
  const profile = getMemberProfile(memberKey);
  // 名簿に無い（現職でない）議員のページは無い。中身は notFound() になる
  if (!profile) {
    return {};
  }

  const title = `${profile.fullName} 議員（笠間市議会）の会派・賛否・一般質問`;
  const description = describeMember({
    displayName: profile.fullName,
    faction: profile.faction,
  });

  return {
    title,
    description,
    alternates: {
      canonical: routes.memberDetail(memberKey),
    },
    // SNSで共有したときの題名・説明は議員ごと、画像はサイト共通
    ...buildPageShareMetadata({
      title,
      description,
      path: routes.memberDetail(memberKey),
    }),
  };
}

export default async function MemberPage({ params }: Props) {
  const { name } = await params;
  return <MemberDetailPage memberKey={decodeURIComponent(name)} />;
}
