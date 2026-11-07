/**
 * 笠間市議会の議案データを、seed:csv が読む CSV の行へ変換する（純粋関数）。
 * 実際の書き出しは build-csv.ts が行う
 */
import { buildBillSourceSection } from "@mirai-gikai/shared/council/bill-source-section";
import { uuidv5 } from "../tagawa/uuidv5";
import {
  type KasamaBill,
  type KasamaSession,
  REJECTED_RESULT_LABELS,
  type VoteMark,
} from "./types";

/** 笠間市版のシードID専用の名前空間。変えると /bills/{id} の URL がすべて変わる */
const KASAMA_SEED_NAMESPACE = "6f1d2c7e-3b84-4a59-9e21-7c0a5d8b4f13";

export function seedId(name: string): string {
  return uuidv5(KASAMA_SEED_NAMESPACE, name);
}

export type KasamaCategory = "予算" | "条例" | "人事" | "契約・工事" | "その他";

export function categorizeBill(title: string): KasamaCategory {
  if (title.includes("予算")) return "予算";
  // 「選挙」は条例名にも出てくるので、条例を先に判定する
  if (title.includes("条例")) return "条例";
  if (/選任|任命|推薦|選挙/.test(title)) return "人事";
  if (/契約|工事/.test(title)) return "契約・工事";
  return "その他";
}

const CATEGORY_THUMBNAIL: Record<KasamaCategory, string> = {
  予算: "/img/bill-thumbnails/budget.webp",
  条例: "/img/bill-thumbnails/ordinance.webp",
  人事: "/img/bill-thumbnails/personnel.webp",
  "契約・工事": "/img/bill-thumbnails/contract.webp",
  その他: "/img/bill-thumbnails/other.webp",
};

/** トップページのタグ別セクションに出すもの（小さいほど上） */
const FEATURED_TAGS: Partial<
  Record<KasamaCategory, { priority: number; description: string }>
> = {
  予算: { priority: 1, description: "市のお金の使いみちを決める予算案" },
  条例: { priority: 2, description: "市民生活に関わるルールを定める条例案" },
};

const VOTE_VALUE: Record<VoteMark, "yes" | "no" | "absent" | "not_voting"> = {
  "○": "yes",
  "●": "no",
  欠: "absent",
  "－": "not_voting",
};

/** bills.member_votes の中身。会派は名簿に無いので、全員を同じ「議員」の枠に入れる */
export function buildMemberVotes(session: KasamaSession, bill: KasamaBill) {
  if (!bill.vote) return null;
  const { marks } = bill.vote;
  if (!marks) {
    // 賛否が分かれたことだけを残す目印。entries が空なので web は議員別の表を出さず、
    // 全会一致とも表示しない（notes・URL は今は表示されないが、出典として残しておく）
    return {
      imageUrl: session.voteSourceUrl,
      sourceUrl: session.voteSourceUrl,
      notes: ["議会だよりの賛否一覧に載っていません"],
      entries: [],
    };
  }
  if (marks.length !== session.members.length) {
    throw new Error(`${bill.billNumberLabel}: 賛否の数が議員数と違います`);
  }
  return {
    imageUrl: session.voteSourceUrl,
    sourceUrl: session.voteSourceUrl,
    notes: ["議長は採決に加わりません"],
    entries: session.members.map((name, index) => ({
      name,
      faction: "議員",
      vote: VOTE_VALUE[marks[index]],
    })),
  };
}

export function buildBillContent(session: KasamaSession, bill: KasamaBill): string {
  return [
    "## 解説",
    "",
    bill.body,
    "",
    "## 議案情報",
    "",
    `- **議案番号**: ${bill.billNumberLabel}`,
    `- **件名**: ${bill.title}`,
    ...(bill.submitter === null
      ? []
      : [`- **提出者**: ${bill.submitter ?? "市長提出"}`]),
    `- **会期**: ${session.name}（${session.startDate}〜${session.endDate}）`,
    `- **議決結果**: ${bill.resultLabel}`,
    `- **議決日**: ${bill.decidedOn}`,
    "",
    ...buildBillSourceSection({
      sessionName: session.name,
      sourceUrl: session.sourceUrl,
      officialPageTitle: session.sourceTitle,
      isOngoing: false,
      descriptionSource: bill.source,
    }),
  ].join("\n");
}

export function buildCsvRows(sessions: readonly KasamaSession[]) {
  const sessionRows: Record<string, unknown>[] = [];
  const billRows: Record<string, unknown>[] = [];
  const contentRows: Record<string, unknown>[] = [];
  const billTagRows: Record<string, unknown>[] = [];
  const tagRows = new Map<KasamaCategory, Record<string, unknown>>();

  for (const session of sessions) {
    const sessionId = seedId(`session:${session.slug}`);
    const sessionAt = `${session.startDate}T00:00:00.000Z`;
    sessionRows.push({
      id: sessionId,
      name: session.name,
      start_date: session.startDate,
      end_date: session.endDate,
      created_at: sessionAt,
      updated_at: sessionAt,
      slug: session.slug,
      shugiin_url: session.sourceUrl,
      is_active: false,
    });

    for (const bill of session.bills) {
      const billId = seedId(`bill:${session.slug}:${bill.billNumberLabel}`);
      const decidedAt = `${bill.decidedOn}T00:00:00.000Z`;
      const category = categorizeBill(bill.title);
      const memberVotes = buildMemberVotes(session, bill);

      billRows.push({
        id: billId,
        name: `${bill.billNumberLabel}　${bill.title}`,
        originating_house: "HR",
        status: REJECTED_RESULT_LABELS.has(bill.resultLabel)
          ? "rejected"
          : "enacted",
        status_note: bill.resultLabel,
        submitted_date: bill.decidedOn,
        created_at: decidedAt,
        updated_at: decidedAt,
        thumbnail_url: CATEGORY_THUMBNAIL[category],
        publish_status: "published",
        is_featured: false,
        featured_priority: null,
        share_thumbnail_url: null,
        shugiin_url: session.sourceUrl,
        diet_session_id: sessionId,
        knowledge_source: null,
        use_knowledge_source_in_chat: false,
        explanation_material_urls: null,
        member_votes: memberVotes ? JSON.stringify(memberVotes) : null,
        sponsors: null,
      });

      contentRows.push({
        id: seedId(`bill_content:${billId}:normal`),
        bill_id: billId,
        difficulty_level: "normal",
        title: bill.title,
        summary: bill.summary,
        content: buildBillContent(session, bill),
        created_at: decidedAt,
        updated_at: decidedAt,
      });

      const tagId = seedId(`tag:${category}`);
      if (!tagRows.has(category)) {
        const featured = FEATURED_TAGS[category];
        tagRows.set(category, {
          id: tagId,
          label: category,
          created_at: sessionAt,
          updated_at: sessionAt,
          featured_priority: featured?.priority ?? null,
          description: featured?.description ?? null,
        });
      }
      billTagRows.push({
        bill_id: billId,
        tag_id: tagId,
        created_at: decidedAt,
      });
    }
  }

  return {
    sessionRows,
    billRows,
    contentRows,
    billTagRows,
    tagRows: [...tagRows.values()],
  };
}
