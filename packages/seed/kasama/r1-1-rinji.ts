/**
 * 令和元年第1回笠間市議会臨時会（10月21日）の議案データ
 *
 * 事実（番号・件名・結果・議決日）は 第1回臨時会 会議録 から転記している。
 * 議長が欠席したため、副議長（石田安夫）が議事を進めた。賛否が分かれた議案は無い。
 *
 * 解説文はこれらをもとにAIが下書きしたもの。運営者の確認が済むまで公開しない。
 */
import { type KasamaBill, SENKETSU_NOTE } from "./types";

export const R1_1_RINJI_SESSION = {
  key: "r1-1-rinji",
  name: "令和元年第1回臨時会",
  startDate: "2019-10-21",
  endDate: "2019-10-21",
} as const;

const DAY = "2019-10-21";

const SAME_DAY_COMMITTEE =
  "会議の途中で所管の常任委員会が審査し、全会一致で可決すべきものとしました。同じ日の本会議で異議なく可決されました。";

/** 消費税の引き上げ（8％→10％）に伴う契約額の変更（議案第93〜95号） */
function taxChange(input: {
  number: number;
  title: string;
  original: string;
  approvedIn: string;
  counterpart: string;
  before: string;
  increase: string;
  committee: string;
}): KasamaBill {
  return {
    billNumberLabel: `議案第${input.number}号`,
    title: input.title,
    resultLabel: "原案可決",
    decidedOn: DAY,
    source: "minutes",
    summary: `令和元年10月の消費税の引き上げに合わせ、${input.original}の契約額を消費税分の${input.increase}増やす議案。全会一致で可決。`,
    body: `## ポイント解説
- ${input.approvedIn}で議決した${input.original}の契約を変更します
- 令和元年10月1日に消費税が8％から10％に引き上げられたことに伴う変更です
- ${input.counterpart}と随意契約で仮契約を結び、契約額${input.before}に消費税分の${input.increase}を加えます

## 審議の経過
${input.committee}が会議の途中で審査し、全会一致で可決すべきものとしました。同じ日の本会議で異議なく可決されました。`,
  };
}

export const R1_1_RINJI_BILLS: readonly KasamaBill[] = [
  {
    billNumberLabel: "報告第6号",
    title:
      "専決処分の承認を求めることについて（損害賠償の額を定めることについて）",
    resultLabel: "原案承認",
    decidedOn: DAY,
    source: "minutes",
    summary:
      "平成30年の台風24号で道路にあったイチョウの枝が折れ、近くの家の屋根などを壊した損害として、222万8,945円を払うことを市長が先に決めたことの承認を求める報告。異議なく承認された。",
    body: `## ポイント解説
- ${SENKETSU_NOTE}
- 平成30年10月1日の台風24号の暴風雨で、笠間市泉の道路の敷地にあったイチョウの木の枝が折れ、隣の個人の家の屋根と犬小屋を壊しました
- 責任は市が100％とし、相手に222万8,945円を払いました

## 審議の経過
委員会での審査は省略され、10月21日に異議なく承認されました。`,
  },
  {
    billNumberLabel: "議案第92号",
    title: "工事請負契約の締結について（本所改修工事）",
    resultLabel: "原案可決",
    decidedOn: DAY,
    source: "minutes",
    summary:
      "市役所本所の改修工事を、鈴縫工業株式会社水戸営業所と5億7,640万円で契約する議案。全会一致で可決。",
    body: `## ポイント解説
- 市役所の本所を改修する工事です
- 条件付き一般競争入札で、鈴縫工業株式会社水戸営業所と5億7,640万円（うち消費税5,240万円）で契約します
- 工期は議決の翌日から令和3年3月12日までです
- 予定価格が一定の額を超えるため、議会の議決が必要です

## 議会での質疑
消費税額の根拠を問う質疑があり、市は税抜きの5億2,400万円の10％を消費税として計算したと答えました。

## 委員会での審査
総務産業委員会では、前回の入札が不調だったことをふまえた設計の変更の内容を問う質疑があり、市は屋根付きの優先駐車場の仕様を落とさずに規模を縮め、窓口のカウンターを備品の購入に回したと答えました。

## 審議の経過
${SAME_DAY_COMMITTEE}`,
  },
  taxChange({
    number: 93,
    title: "工事請負契約の変更について（友部第二中学校校舎改修工事）",
    original: "友部第二中学校の校舎の改修工事",
    approvedIn: "令和元年第2回定例会（議案第75号）",
    counterpart: "株式会社進貢",
    before: "2億2,572万円",
    increase: "418万円",
    committee: "教育福祉委員会",
  }),
  taxChange({
    number: 94,
    title: "工事請負契約の変更について（みなみ学園義務教育学校整備工事）",
    original: "みなみ学園義務教育学校の整備工事",
    approvedIn: "令和元年第3回定例会（議案第82号）",
    counterpart: "コスモ・芳野特定建設工事共同企業体",
    before: "9億9,036万円",
    increase: "1,834万円",
    committee: "教育福祉委員会",
  }),
  taxChange({
    number: 95,
    title: "動産購入契約の変更について（消防団消防ポンプ自動車購入）",
    original: "消防団の消防ポンプ自動車の購入",
    approvedIn: "令和元年第2回定例会（議案第67号）",
    counterpart: "有限会社鈴機",
    before: "3,564万円",
    increase: "66万円",
    committee: "総務産業委員会",
  }),
  {
    billNumberLabel: "議案第96号",
    title: "令和元年度笠間市一般会計補正予算（第３号）",
    resultLabel: "原案可決",
    decidedOn: DAY,
    source: "minutes",
    summary:
      "豚コレラの侵入を防ぐ緊急対策への補助と、笠間土地改良区の総代の補欠選挙の費用に666万6,000円を追加する補正予算。全会一致で可決。",
    body: `## ポイント解説
- 予算に666万6,000円を追加し、一般会計の総額を316億5,979万5,000円にします
- 広がりが心配されている豚コレラの侵入を防ぐ国の緊急対策事業で、市が負担する8分の1の補助金（644万円）を計上します
- 箱田中央土地改良区が笠間土地改良区に合併されることに伴う、総代の補欠選挙の費用（22万6,000円、笠間土地改良区が負担）を計上します
- 財源は財政調整基金からの繰り入れです

## 委員会での審査
総務産業委員会では、補助の要件と市内の養豚農家の規模を確認しました。

## 審議の経過
${SAME_DAY_COMMITTEE}`,
  },
];
