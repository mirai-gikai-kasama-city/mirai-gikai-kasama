/**
 * 笠間市議会の議案データの形と、会期のデータファイルが共通で使う部品
 */
import type { BillDescriptionSource } from "@mirai-gikai/shared/council/bill-source-section";

/** ○賛成 ●反対 欠欠席 －議長（採決に加わらない） */
export type VoteMark = "○" | "●" | "欠" | "－";

/** 会議録に記録された本会議の採決結果（採決システムの票数） */
export interface VoteMinutes {
  total: number;
  for: number;
  against: number;
}

export type RecordedVote =
  | {
      /** 起立による採決（令和2年第2回定例会ごろまで）は人数が記録されていないので省く */
      minutes?: VoteMinutes;
      /** 議会だよりの賛否一覧。その会期の議員名簿（KasamaSession.members）と同じ順 */
      marks: readonly VoteMark[];
      /**
       * 賛否一覧の人数が会議録の票数と合わないときの説明。どちらかに寄せて直さず、
       * 両方をそのまま載せ、解説の本文にも食い違いを書く
       */
      mismatchNote?: string;
    }
  | {
      /**
       * 賛否は分かれたが、議会だよりの賛否一覧に載っていない議案（会議録の票数だけがある）。
       * 議員別の賛否は空のまま bills.member_votes に入り、web では「全会一致」と表示しない
       */
      minutes: VoteMinutes;
      marks?: undefined;
      mismatchNote?: undefined;
      unpublished?: undefined;
    }
  | {
      /**
       * 賛否は分かれた（起立多数・起立少数など）が、議員ごとの賛否の記録が無い採決。
       * 議会だよりに賛否一覧が載るのは第44号（平成28年第1回臨時会・第4回定例会）からで、
       * それより前は起立による採決のため会議録にも人数が無い（第35〜43号は全ページを確かめた）。
       * 第44号以降でも、賛否一覧に載らなかった起立採決にはこれを使う。
       * 議員別の賛否は空のまま bills.member_votes に入り、web では「全会一致」と表示しない
       */
      unpublished: true;
      /** サイトに出す注記を、既定の文（記録が無い）から差し替えるとき（無記名投票など） */
      note?: string;
      minutes?: undefined;
      marks?: undefined;
      mismatchNote?: undefined;
    };

/** 議会だよりの審議結果欄の言葉 */
export type KasamaResultLabel =
  | "原案同意"
  | "原案可決"
  | "原案承認"
  | "原案認定"
  | "採択"
  /** 願意は酌むが、内容のすべてには賛成できないときの採択 */
  | "趣旨採択"
  | "棄却すべきと答申"
  | "当選"
  | "否決"
  | "不採択";

/** 成立しなかった結果。bills.status を rejected にする */
export const REJECTED_RESULT_LABELS: ReadonlySet<KasamaResultLabel> = new Set([
  "否決",
  "不採択",
]);

export interface KasamaBill {
  billNumberLabel: string;
  title: string;
  /** 議決結果。会期中でまだ議決されていない議案は null（サイトでは「審議中」） */
  resultLabel: KasamaResultLabel | null;
  /** 議決日（YYYY-MM-DD）。まだ議決されていない議案（resultLabel が null）は提出日 */
  decidedOn: string;
  /** 省略時は市長提出。選挙のように提出者がいないものは null */
  submitter?: "議員提出" | "委員会提出" | "請願者" | null;
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

/** 賛否一覧から「賛成18、反対2」の形の文を作る（起立採決で会議録に人数が無いとき用） */
export const tallyText = (votes: readonly VoteMark[]): string => {
  const count = (mark: VoteMark) => votes.filter((v) => v === mark).length;
  return `賛成${count("○")}、反対${count("●")}`;
};

/**
 * 起立による採決の賛否（会議録に人数が無い会期用）。議会だよりの賛否一覧から、
 * 議案の vote と「賛成18、反対2」の文をまとめて作る
 */
export function standingVote<K extends PropertyKey>(
  split: Readonly<Partial<Record<K, readonly VoteMark[]>>>,
  key: K
) {
  const votes = split[key];
  if (!votes) throw new Error(`${String(key)}: 賛否一覧がありません`);
  return { vote: { marks: votes }, tally: tallyText(votes) };
}

/** 専決処分の報告で共通する説明 */
export const SENKETSU_NOTE =
  "急ぎで議会を開く時間がないとき、市長は議会の議決を待たずに決めることができます（専決処分）。その場合、次の議会に報告して承認を求めます。";
