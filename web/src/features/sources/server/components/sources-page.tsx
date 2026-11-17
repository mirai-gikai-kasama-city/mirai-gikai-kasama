import type { Route } from "next";
import { Container } from "@/components/layouts/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { routes } from "@/lib/routes";
import { OPERATOR_NAME } from "@/lib/seo/operator-json-ld";
import { SourceBadge } from "../../shared/components/source-badge";
import { SOURCE_KINDS } from "../../shared/data/source-kinds";
import { SOURCE_ORIGINS, SOURCE_USAGES } from "../../shared/data/source-usage";

/** 情報のもと（出典）の説明ページ（/sources） */
export function SourcesPage() {
  const info = SOURCE_KINDS.official;

  return (
    <div>
      <div className="bg-mirai-surface-key md:rounded-lg">
        <Container className="flex flex-col gap-5 py-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-mirai-text">
              情報のもと（出典）について
            </h1>
            <p className="text-sm leading-relaxed text-mirai-text-secondary">
              このサイトに載せている内容は、笠間市と笠間市議会が公開している資料をもとにしています。
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-4">
            <SectionHeading>{info.label}</SectionHeading>
            <div className="flex flex-col gap-3">
              <SourceBadge kind="official" className="px-2.5 py-1" />
              <p className="text-sm leading-relaxed text-mirai-text">
                {info.description}
              </p>
              <p className="rounded-lg bg-mirai-surface px-4 py-3 text-sm leading-relaxed text-mirai-text-secondary">
                <span className="font-bold">読むときの注意: </span>
                {info.caution}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-mirai-text-secondary">
                このサイトでの使いみち
              </h3>
              <ul className="flex flex-col divide-y divide-mirai-border-muted border-y border-mirai-border-muted">
                {SOURCE_USAGES.map((usage) => (
                  <li
                    key={usage.material}
                    className="flex flex-col gap-1 py-3 text-sm leading-relaxed"
                  >
                    <span className="font-bold text-mirai-text">
                      {usage.material}
                    </span>
                    <span className="text-mirai-text-secondary">
                      {usage.usedFor}
                    </span>
                    {usage.page && (
                      <TextLink
                        href={usage.page.href as Route}
                        className="text-xs"
                      >
                        {usage.page.label}を見る
                      </TextLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-mirai-text-secondary">
                もとの資料を自分で確かめる
              </h3>
              <ul className="flex flex-col gap-1.5">
                {SOURCE_ORIGINS.map((origin) => (
                  <li key={origin.url}>
                    <TextLink external href={origin.url} className="text-sm">
                      {origin.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeading>資料どうしが食い違うとき</SectionHeading>
            <p className="text-sm leading-relaxed text-mirai-text">
              議会だよりと会議録の内容が食い違うときは、発言や採決をそのまま記録した会議録を優先します。
            </p>
            <p className="text-sm leading-relaxed text-mirai-text-secondary">
              見出し・要約・解説は運営者（{OPERATOR_NAME}
              ）がAIを使って書いたもので、
              市や市議会の公式の見解ではありません。数字・人名・採決の結果はもとの資料と照らして確かめていますが、
              誤りに気づかれた場合は
              <TextLink href={routes.privacy() as Route} className="mx-1">
                お問い合わせ窓口
              </TextLink>
              までお知らせください。
            </p>
          </section>
        </div>
      </Container>

      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "TOP", href: routes.home() },
            { label: "情報のもと（出典）について" },
          ]}
        />
      </Container>
    </div>
  );
}
