/**
 * 笠間市議会の議案データの形と、会期のデータファイルが共通で使う部品
 */
import type { BillDescriptionSource } from "@mirai-gikai/shared/council/bill-source-section";

/** ○賛成 ●反対 欠欠席 －議長（採決に加わらない） */
export type VoteMark = "○" | "●" | "欠" | "－";

export interface RecordedVote {
  /** 会議録に記録された本会議の採決結果 */
  minutes: { total: number; for: number; against: number };
  /** 議会だよりの賛否一覧。その会期の議員名簿（KasamaSession.members）と同じ順 */
  marks: readonly VoteMark[];
}

export interface KasamaBill {
  billNumberLabel: string;
  title: string;
  resultLabel:
    | "原案同意"
    | "原案可決"
    | "原案承認"
    | "棄却すべきと答申"
    | "当選";
  /** YYYY-MM-DD */
  decidedOn: string;
  /** 省略時は市長提出。選挙のように提出者がいないものは null */
  submitter?: "議員提出" | null;
  vote?: RecordedVote;
  source: BillDescriptionSource;
  summary: string;
  body: string;
}

export interface KasamaSession {
  /** 田川市の静的データと混ざらないよう、必ず kasama- で始める */
  slug: `kasama-${string}`;
  name: string;
  startDate: string;
  endDate: string;
  /** 審議結果を確かめられる公式サイトのページ */
  sourceUrl: string;
  sourceTitle: string;
  /** 賛否一覧が載っている PDF */
  voteSourceUrl: string;
  members: readonly string[];
  bills: readonly KasamaBill[];
}

/** 賛否一覧の記号の並びを、1人ずつの配列にする */
export const marks = (text: string): VoteMark[] => [...text] as VoteMark[];

/** 専決処分の報告で共通する説明 */
export const SENKETSU_NOTE =
  "急ぎで議会を開く時間がないとき、市長は議会の議決を待たずに決めることができます（専決処分）。その場合、次の議会に報告して承認を求めます。";
