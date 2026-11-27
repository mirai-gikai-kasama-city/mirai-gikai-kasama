/**
 * 笠間市議会の議案データを、seed:csv が読む CSV に書き出す。
 *
 * 実行方法:
 *   pnpm --filter @mirai-gikai/seed kasama:build-csv
 *
 * そのあと pnpm seed:csv で DB に投入する。
 * packages/seed/csv/data/ のフォーク元（田川市）の CSV は、これで置き換わる
 */
import fs from "node:fs";
import path from "node:path";
import { buildCsvRows } from "./csv-rows";
import { KASAMA_SESSIONS } from "./sessions";

const CSV_DATA_DIR = path.join(import.meta.dirname, "../csv/data");

function csvField(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function writeCsv(
  filename: string,
  headers: string[],
  rows: Record<string, unknown>[]
) {
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => csvField(row[h])).join(",")),
  ];
  fs.writeFileSync(
    path.join(CSV_DATA_DIR, filename),
    `${lines.join("\n")}\n`,
    "utf-8"
  );
  console.log(`✅ ${filename}: ${rows.length}件`);
}

const rows = buildCsvRows(KASAMA_SESSIONS);

writeCsv(
  "diet_sessions_rows.csv",
  [
    "id",
    "name",
    "start_date",
    "end_date",
    "created_at",
    "updated_at",
    "slug",
    "shugiin_url",
    "is_active",
  ],
  rows.sessionRows
);
writeCsv(
  "tags_rows.csv",
  ["id", "label", "created_at", "updated_at", "featured_priority", "description"],
  rows.tagRows
);
writeCsv(
  "bills_rows.csv",
  [
    "id",
    "name",
    "originating_house",
    "status",
    "status_note",
    "submitted_date",
    "created_at",
    "updated_at",
    "thumbnail_url",
    "publish_status",
    "is_featured",
    "featured_priority",
    "share_thumbnail_url",
    "shugiin_url",
    "diet_session_id",
    "knowledge_source",
    "use_knowledge_source_in_chat",
    "explanation_material_urls",
    "member_votes",
    "sponsors",
  ],
  rows.billRows
);
writeCsv(
  "bill_contents_rows.csv",
  [
    "id",
    "bill_id",
    "difficulty_level",
    "title",
    "summary",
    "content",
    "created_at",
    "updated_at",
  ],
  rows.contentRows
);
writeCsv(
  "bills_tags_rows.csv",
  ["bill_id", "tag_id", "created_at"],
  rows.billTagRows
);
// 選挙期間中はAIインタビューを止めているので、設定は持たない
writeCsv(
  "interview_configs_rows.csv",
  ["id", "bill_id", "name", "status", "themes", "created_at", "updated_at"],
  []
);
writeCsv(
  "interview_questions_rows.csv",
  [
    "id",
    "interview_config_id",
    "question",
    "follow_up_guide",
    "quick_replies",
    "question_order",
    "created_at",
    "updated_at",
  ],
  []
);
