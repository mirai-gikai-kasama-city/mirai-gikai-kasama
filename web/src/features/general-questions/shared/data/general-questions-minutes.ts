/**
 * 一般質問通告が公開されていない時期（平成26年8月まで）の一般質問を、会議録から起こしたもの。
 *
 * - 会議録検索システムの「一般質問通告」は平成26年第3回定例会（2014年9月）からで、それより前は無い。
 *   通告が無い時期も載せる（運営者の判断。2026-11-23）
 * - 質問した議員と順番は、会議録の発言の順。質問事項（items）は、議員が会議録で読み上げた題をそのまま写す。
 *   要約や言い換えはしない
 * - 答弁の要約は付けない。議会だよりの「問」「答」を general-questions-dayori.ts に写して、読み込み時に合わせる
 */
import type { GeneralQuestionRecord } from "@mirai-gikai/shared/council/types";

function fromMinutes(input: {
  sessionKey: string;
  sessionName: string;
  questionDate: string;
  dayIndex: number;
  order: number;
  memberName: string;
  items: string[];
  minutesPdfUrl: string;
}): GeneralQuestionRecord {
  return {
    id: `kasama-${input.sessionKey}-${input.order}`,
    sessionKey: `kasama-${input.sessionKey}`,
    sessionName: input.sessionName,
    questionDate: input.questionDate,
    dayIndex: input.dayIndex,
    order: input.order,
    memberName: input.memberName,
    familyName: input.memberName.split(" ")[0],
    faction: null,
    isRepresentative: false,
    format: null,
    items: input.items,
    itemsSource: "minutes",
    outline: null,
    videoUrl: null,
    minutesUrl: input.minutesPdfUrl,
    sourceUrl: input.minutesPdfUrl,
    pdfUrl: null,
  };
}

/** 平成24年第4回定例会（12月）。一般質問は13日・14日・17日の3日間で10人 */
const H24_4 = {
  sessionKey: "h24-4-teirei",
  sessionName: "平成24年第4回定例会",
} as const;
const H24_4_DAY1 = {
  ...H24_4,
  questionDate: "2012-12-13",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1360799867_doc_56_2.pdf",
} as const;
const H24_4_DAY2 = {
  ...H24_4,
  questionDate: "2012-12-14",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1360799867_doc_56_3.pdf",
} as const;
const H24_4_DAY3 = {
  ...H24_4,
  questionDate: "2012-12-17",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1360799867_doc_56_4.pdf",
} as const;

export const MINUTES_GENERAL_QUESTIONS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H24_4_DAY1,
    order: 1,
    memberName: "鹿志村 清一",
    items: [
      "秋葉原－笠間間の高速バス運行の乗り入れについて",
      "笠間市内トイレ施設のあり方",
      "住宅市街地内道路の路面改修について",
    ],
  }),
  fromMinutes({
    ...H24_4_DAY1,
    order: 2,
    memberName: "横倉 きん",
    items: [
      "国民健康保険の改善について",
      "笠間市健康づくり計画の推進について",
      "東海第二原発の再稼働問題に対する市長の見解",
    ],
  }),
  fromMinutes({
    ...H24_4_DAY1,
    order: 3,
    memberName: "石田 安夫",
    items: ["街路灯のＬＥＤ化について"],
  }),
  fromMinutes({
    ...H24_4_DAY1,
    order: 4,
    memberName: "鈴木 裕士",
    items: ["産業立地、主として加工産業の立地について", "税金の収納に関して"],
  }),
  fromMinutes({
    ...H24_4_DAY2,
    order: 5,
    memberName: "鈴木 貞夫",
    items: ["健康都市宣言にふさわしい環境対策を"],
  }),
  fromMinutes({
    ...H24_4_DAY2,
    order: 6,
    memberName: "西山 猛",
    items: ["総合計画３カ年実施計画について", "区長制度の見直しについて"],
  }),
  fromMinutes({
    ...H24_4_DAY2,
    order: 7,
    memberName: "野口 圓",
    items: ["いじめの問題"],
  }),
  fromMinutes({
    ...H24_4_DAY2,
    order: 8,
    memberName: "石松 俊雄",
    // 会議録で題として読み上げたのは2問目（「通告２問目の行政外部評価制度の結果について」）だけ。
    // 1問目は質問の趣旨を述べた文（「…行政評価制度の現状と課題、さらには今後について質問をいたします」）、
    // 3問目は前置きの文（「…コミュニティセンターの整備、検討について説明がございました」）から写した
    items: [
      "笠間市における行政評価制度の現状と課題、さらには今後について",
      "行政外部評価制度の結果について",
      "コミュニティセンターの整備、検討について",
    ],
  }),
  fromMinutes({
    ...H24_4_DAY3,
    order: 9,
    memberName: "大関 久義",
    items: ["笠間市のし尿処理について"],
  }),
  fromMinutes({
    ...H24_4_DAY3,
    order: 10,
    memberName: "飯田 正憲",
    items: ["鳥獣被害防止特措法一部改正について", "有害鳥獣対策について"],
  }),
];
