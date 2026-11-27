/**
 * 一般質問通告（general-questions-data.ts、自動生成）の題の誤りを直したもの。一般質問の記録の id ごと。
 *
 * - 題は通告を優先する（通告 → 議会だよりの見出し → 会議録。運営者の判断。2026-11-26）。
 *   ここには、通告のページの書き方の誤りで題が崩れているものだけを入れ、運営者が直すと決めたものに限る
 * - 自動生成のファイルは書き換えず、読み込むときにここで差し替える。通告を取り込み直しても消えない
 */
import type { GeneralQuestionRecord } from "@mirai-gikai/shared/council/types";

export const QUESTION_ITEM_FIXES: Readonly<Record<string, readonly string[]>> =
  {
    // 令和7年第1回定例会。通告のページで「デジタル田園都市国家構想」の「都市」が抜けている。会議録・議会だよりのとおり直す（運営者の判断。2026-11-26）
    "kasama-r7-1-teirei-10": [
      "笠間市デジタル田園都市国家構想創生総合戦略について",
      "帯状疱疹ワクチン定期接種化について",
    ],
    // 令和7年第1回定例会。通告のページで1つ目の副題が番号の無い別の行に書かれていて、取り込みで2つの題に割れた。
    // 会議録で名乗ったとおり1つにまとめる（運営者の判断。2026-11-26）
    "kasama-r7-1-teirei-11": [
      "だれもがお金の心配なく医療が受けられるように（新しい国民健康保険制度の運用について）",
      "核兵器廃絶の声を日本の隅々から",
    ],
  };

/** 通告の題の誤りを直したものがあれば差し替える */
export function withItemFixes(
  record: GeneralQuestionRecord
): GeneralQuestionRecord {
  const items = QUESTION_ITEM_FIXES[record.id];
  return items ? { ...record, items: [...items] } : record;
}
