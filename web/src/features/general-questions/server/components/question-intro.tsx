import { SourceNote } from "@/components/ui/source-note";
import { TextLink } from "@/components/ui/text-link";
import { SourceBadge } from "@/features/sources/shared/components/source-badge";
import { routes } from "@/lib/routes";

/** 一般質問とは何か（一覧・会期ページの冒頭で共通に使う説明）と、このページのもとの資料 */
export function QuestionIntro() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm leading-relaxed text-mirai-text-secondary">
        一般質問は、定例会ごとに議員が市長や市の担当部署に対して市政全般について質問する場です。
        質問する内容は事前に「通告」されます。
        ここでは笠間市議会が公開している通告の内容を、そのまま載せ、公式の会議録と録画へのリンクを添えています。
      </p>
      <SourceBadge kind="official" detail="一般質問通告" className="bg-white" />
    </div>
  );
}

/** 出典と注意書き */
export function QuestionSourceNote() {
  return (
    <SourceNote>
      質問者と質問事項は、笠間市議会の「一般質問通告」の内容をそのまま転記したものです。AIによる要約や評価はしていません。
      実際の質問・答弁の内容は、各質問のリンクから公式の会議録や録画をご確認ください。
      <TextLink href={routes.sources()} className="ml-1">
        出典の種類と読み方について
      </TextLink>
    </SourceNote>
  );
}
