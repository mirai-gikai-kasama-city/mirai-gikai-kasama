import type { GeneralQuestionRecord } from "@mirai-gikai/shared/council/types";
import { detectBillThemes } from "@/features/search/shared/data/bill-themes";
import {
  includesAllTerms,
  normalizeSearchText,
  splitSearchTerms,
} from "@/features/search/shared/utils/search-text";
import { compactMemberName } from "./group-questions";

/** 一般質問の検索用の軽量データ（要旨の本文は含めない） */
export interface QuestionSearchItem {
  id: string;
  sessionKey: string;
  sessionName: string;
  questionDate: string | null;
  order: number;
  memberName: string;
  /** 空白なしの氏名（現職なら議員ページのキーと同じ） */
  memberKey: string;
  /** 質問事項 */
  items: string[];
  /** 質問事項・通告書の要旨から判定したテーマの id */
  themes: string[];
}

/** 通告書の要旨の文字列（テーマの判定にだけ使う） */
function outlineText(record: GeneralQuestionRecord): string {
  return (record.outline ?? [])
    .flatMap((item) => [
      item.title,
      ...item.points.flatMap((point) => [point.text, ...point.subPoints]),
    ])
    .join(" ");
}

/** 一般質問の記録から検索用データを作る（質問日の新しい順） */
export function buildQuestionSearchItems(
  records: readonly GeneralQuestionRecord[]
): QuestionSearchItem[] {
  return [...records]
    .sort(
      (a, b) =>
        (b.questionDate ?? "").localeCompare(a.questionDate ?? "") ||
        a.order - b.order
    )
    .map((record) => ({
      id: record.id,
      sessionKey: record.sessionKey,
      sessionName: record.sessionName,
      questionDate: record.questionDate,
      order: record.order,
      memberName: record.memberName,
      memberKey: compactMemberName(record.memberName),
      items: record.items,
      themes: detectBillThemes(
        `${record.items.join(" ")} ${outlineText(record)}`
      ),
    }));
}

/**
 * キーワードで絞り込む（議員名・会期名・質問事項からAND検索。並び順は入力のまま）。
 * 検索用の文字列はページに送るデータを増やさないよう、ここでその都度作る
 */
export function searchQuestions(
  items: readonly QuestionSearchItem[],
  query: string
): QuestionSearchItem[] {
  const terms = splitSearchTerms(query);
  if (terms.length === 0) return [];
  return items.filter((item) =>
    includesAllTerms(
      normalizeSearchText(
        [item.memberName, item.sessionName, ...item.items].join(" ")
      ),
      terms
    )
  );
}

/** テーマで絞り込む */
export function selectQuestionsByTheme(
  items: readonly QuestionSearchItem[],
  themeId: string
): QuestionSearchItem[] {
  return items.filter((item) => item.themes.includes(themeId));
}

/** 議員（空白なしの氏名）で絞り込む */
export function selectQuestionsByMemberKey(
  items: readonly QuestionSearchItem[],
  memberKey: string
): QuestionSearchItem[] {
  return items.filter((item) => item.memberKey === memberKey);
}
