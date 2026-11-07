/**
 * 令和8年第4回笠間市議会定例会（11月5日〜11月20日）【会期中】
 *
 * 会期は、市が公開した「令和８年第４回笠間市議会定例会会期日程（案）」による。
 * 11月5日 開会・議案上程、9日 議案質疑・委員会付託、10〜12日 常任委員会、
 * 13・16・17日 一般質問、17日 予算決算委員会（全体会）、20日 委員長報告・採決・閉会。
 *
 * 議案の一覧と中身はまだ公開資料で確かめていないので、議案は載せていない。
 * 議会だより・会議録が出たら、ほかの会期と同じように議案を足す。
 */
import type { KasamaBill } from "./types";

export const R8_4_TEIREI_SESSION = {
  key: "r8-4-teirei",
  name: "令和8年第4回定例会",
  startDate: "2026-11-05",
  endDate: "2026-11-20",
} as const;

/** 会期日程（案）の PDF */
export const R8_4_SCHEDULE_URL =
  "https://www.city.kasama.lg.jp/data/doc/1789717872_doc_56_0.pdf";

export const R8_4_TEIREI_BILLS: readonly KasamaBill[] = [];
