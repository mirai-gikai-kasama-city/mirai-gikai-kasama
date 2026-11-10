import type { BillWithContentLite } from "@/features/bills/shared/types";
import { detectBillThemes } from "../data/bill-themes";
import type { SearchItem } from "../types";

/** 検索結果カードに表示するsummaryの最大文字数 */
const SUMMARY_MAX_LENGTH = 120;

function truncateSummary(summary?: string | null): string {
  if (!summary) return "";
  return summary.length > SUMMARY_MAX_LENGTH
    ? `${summary.slice(0, SUMMARY_MAX_LENGTH)}…`
    : summary;
}

/**
 * 議案データから検索ページ用の軽量データを作る
 * contentは含めないため、ページに渡すデータ量を抑えられる
 */
export function buildSearchItems(bills: BillWithContentLite[]): SearchItem[] {
  return bills.map((bill) => {
    const title = bill.bill_content?.title || bill.name;
    const summary = bill.bill_content?.summary ?? "";
    return {
      id: bill.id,
      title,
      name: bill.name,
      summary: truncateSummary(summary),
      submittedDate: bill.submitted_date,
      status: bill.status,
      statusNote: bill.status_note,
      tags: bill.tags.map((tag) => tag.label),
      // 概要は切り詰める前の全文で判定する
      themes: detectBillThemes(`${title} ${bill.name} ${summary}`),
    };
  });
}
