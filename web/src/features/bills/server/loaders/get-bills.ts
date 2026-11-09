import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { BillWithContentLite } from "../../shared/types";
import {
  findBillIdsWithPublicInterview,
  findPublishedBillsLiteWithContentsRange,
  findTagsByBillIds,
} from "../repositories/bill-repository";

/**
 * 公開済み議案の全件一覧を軽量フィールド（bill_contents.contentなし）で取得する。
 *
 * content込みの全件レスポンスは約2.2MBあり、Vercel Data Cacheの
 * 1エントリ2MB上限を超えてキャッシュ自体が保存されず、ISR再生成のたびに
 * Supabaseから全件を引き直していた（クローラー巡回で月間Egress上限を超過）。
 * 本文が必要な画面は個別議案のローダー（getBillById等）を使うこと。
 *
 * 本文を省いても議案が1,600件ほどになると全件で2MBを超えるため、
 * LITE_CHUNK_SIZE 件ずつ別のキャッシュに分けて保存し、ここでつなげる。
 *
 * React cache() でリクエスト内の呼び出しを重複排除する（unstable_cacheには
 * リクエスト内メモ化が無く、generateMetadataとページ本体・同一ページ内の
 * 複数ローダーが並行で呼ぶとData Cache読みとmiss時のDBアクセスが多重になる）
 */
export const getBillsLite = cache(async (): Promise<BillWithContentLite[]> => {
  // キャッシュ外でcookiesにアクセス
  const difficultyLevel = await getDifficultyLevel();
  const bills: BillWithContentLite[] = [];
  // 最後の塊は LITE_CHUNK_SIZE 件に満たない（ちょうど割り切れるときは空の塊で終わる）
  for (let index = 0; ; index++) {
    const chunk = await _getCachedBillsLiteChunk(difficultyLevel, index);
    bills.push(...chunk);
    if (chunk.length < LITE_CHUNK_SIZE) return bills;
  }
});

/**
 * キャッシュ1件あたりの議案数。1件あたり約1.5KB（議員ごとの賛否を含む）なので、
 * 2MBの上限に余裕を持たせる。PostgREST の1回の取得上限（1000）以下にする
 */
const LITE_CHUNK_SIZE = 800;

const _getCachedBillsLiteChunk = unstable_cache(
  async (
    difficultyLevel: DifficultyLevelEnum,
    chunkIndex: number
  ): Promise<BillWithContentLite[]> => {
    const data = await findPublishedBillsLiteWithContentsRange(
      difficultyLevel,
      chunkIndex * LITE_CHUNK_SIZE,
      LITE_CHUNK_SIZE
    );

    // タグ情報とインタビュー状態を一括取得
    const billIds = data.map((item) => item.id);
    const [tagsByBillId, interviewBillIds] = await Promise.all([
      findTagsByBillIds(billIds),
      findBillIdsWithPublicInterview(billIds),
    ]);

    const bills: BillWithContentLite[] = data.map((item) => {
      const { bill_contents, ...bill } = item;
      return {
        ...bill,
        bill_content: Array.isArray(bill_contents)
          ? bill_contents[0]
          : undefined,
        tags: tagsByBillId.get(item.id) ?? [],
        hasPublicInterview: interviewBillIds.has(item.id),
      };
    });

    return bills;
  },
  ["bills-list-lite-chunk"],
  {
    // データ更新はadmin操作時の/api/revalidate（revalidateTag）で即時反映される
    // ため、タイマーは保険。Egress削減のため短い間隔での引き直しはしない
    revalidate: 86400, // 1日（データの更新は /api/revalidate のタグで即時に反映する）
    tags: [CACHE_TAGS.BILLS, CACHE_TAGS.INTERVIEW_CONFIGS],
  }
);
