/**
 * 市の番号が無い議事（会期の決定、会議録署名議員の指名、委員の選任など）を、会期ファイルに書くための共通の部品。
 * 当サイトの番号「種類-番号」（種類ごとに会議録の議事の順で1から）を付ける。
 * 種類と結果の語は docs/20261123_2044_当サイトで付ける番号の種類.md による。
 * 平成24年第4回定例会（h24-4-teirei.ts）の試作を、ほかの会期でも使えるように切り出したもの。
 */
import {
  type SiteNumberKind,
  siteNumber,
} from "@mirai-gikai/shared/council/site-bill-number";
import type { KasamaBill } from "./types";

/** 番号の無い議事1件。billNumberLabel は「種類-番号」、提出者は無し、出典は会議録 */
export function unnumbered(
  kind: SiteNumberKind,
  number: number,
  bill: Omit<KasamaBill, "billNumberLabel" | "submitter" | "source">
): KasamaBill {
  return {
    billNumberLabel: siteNumber(kind, number),
    submitter: null,
    source: "minutes",
    ...bill,
  };
}

/**
 * 会議録署名議員の指名。本会議の日ごとに行われるが、会期ごとに1件にまとめる（運営者の判断）。
 * 日付は会期の最終日、本文に日ごとの指名を並べる。番号は「手続」の中での順
 */
export function signers(input: {
  number: number;
  /** 会期の最終日（YYYY-MM-DD） */
  lastDay: string;
  /** 「平成22年第4回定例会」のような会期の名前（本文に入れる） */
  sessionName: string;
  days: readonly { dateText: string; names: string }[];
}): KasamaBill {
  const kind = input.sessionName.endsWith("臨時会") ? "臨時会" : "定例会";
  return unnumbered("手続", input.number, {
    title: "会議録署名議員の指名について",
    resultLabel: "指名",
    decidedOn: input.lastDay,
    summary: `本会議の日ごとに、その日の会議録に署名する議員を議長が指名した（${input.days.length}日分）。`,
    body: `会議録署名議員は、その日の本会議の会議録に、議長とともに署名する議員です。会議規則第81条により、本会議の日ごとに議長が指名します。この${kind}では、次のとおり指名されました。

${input.days.map((day) => `- ${day.dateText}：${day.names}`).join("\n")}`,
  });
}

/** 一部事務組合などの説明に使う文 */
export const UNION_NOTE =
  "笠間市がほかの市町村と共同で事務を行う団体（一部事務組合）です";
