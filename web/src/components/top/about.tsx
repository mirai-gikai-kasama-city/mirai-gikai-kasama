import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { routes } from "@/lib/routes";
import { OPERATOR_NAME, OPERATOR_ROLE } from "@/lib/seo/operator-json-ld";

export function About() {
  return (
    <div id="about" className="py-10 scroll-mt-24">
      <div className="flex flex-col gap-4">
        {/* ヘッダー */}
        <SectionHeading>かさま議会ノートとは</SectionHeading>

        {/* コンテンツ */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold leading-[43.2px]">
              笠間市議会での議論を
              <br />
              できる限りわかりやすく
            </h3>
            <p className="text-[15px] leading-[28px] text-black">
              かさま議会ノートは、笠間市議会で今どんな議案が検討されているか、わかりやすく伝えるプラットフォームです。市民の意見を政治に届けることを目指して、継続的にアップデートしていきます。
            </p>
            <p className="text-[15px] leading-[28px] text-black">
              載せている内容は、市と市議会の公式サイト・会議録、公式YouTube中継の文字起こし、情報開示請求で入手した文書をもとにしています。ページや記録ごとに、どれがもとになっているかを示しています。
            </p>
            <p className="text-[15px] leading-[28px] text-black">
              {`このサイトは${OPERATOR_NAME}が運営しています。${OPERATOR_NAME}は${OPERATOR_ROLE}です。`}
            </p>
            <TextLink href={routes.sources()} className="text-sm">
              情報のもと（出典）について
            </TextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
