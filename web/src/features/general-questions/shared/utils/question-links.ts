import type {
  GeneralQuestionRecord,
  QuestionOutlineItem,
} from "@mirai-gikai/shared/council/types";
import { compactMemberName } from "./group-questions";

/** 議員ページへリンクしてよいか判定するための情報 */
export interface MemberLinkContext {
  /** 議員ページがある議員のキー（空白なしのフルネーム） */
  memberNames: ReadonlySet<string>;
}

/**
 * 記録の氏名が指す議員のページがあれば、そのキー（空白なしのフルネーム）を返す。
 * 名字だけでは同じ名字の別人（田村幸子・田村泰之）を見分けられないため、フルネームで照合する
 */
export function resolveMemberPageKey(
  person: { name: string },
  context: MemberLinkContext
): string | null {
  const key = compactMemberName(person.name);
  return context.memberNames.has(key) ? key : null;
}

/**
 * 公式ページの質問事項と項目数が一致する要旨だけを返す。
 * 一致しない要旨（PDFの区切りが違う）は項目に紐付けず、別枠で出す
 */
export function alignOutlineWithItems(
  record: Pick<GeneralQuestionRecord, "items" | "outline">
): QuestionOutlineItem[] | null {
  return record.outline && record.outline.length === record.items.length
    ? record.outline
    : null;
}
