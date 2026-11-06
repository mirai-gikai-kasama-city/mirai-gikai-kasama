/**
 * 令和4年第1回笠間市議会臨時会（12月27日）の議案データ
 *
 * 令和4年12月の市議会議員一般選挙の後、最初の議会。議長・副議長などを選んだ。
 * 事実（番号・件名・結果・議決日）は 第1回臨時会 会議録 から転記している。
 * かさま市議会だより 第68号 P2 にも審議結果があるが、PDF の文字が図形で読み取れない。
 *
 * 解説文はこれらをもとにAIが下書きしたもの。運営者の確認が済むまで公開しない。
 * 常任委員会・議会運営委員会・広報委員会の委員の選任は、議案番号が無いので載せていない。
 */
import { type KasamaBill, SENKETSU_NOTE } from "./types";

export const R4_1_RINJI_SESSION = {
  key: "r4-1-rinji",
  name: "令和4年第1回臨時会",
  startDate: "2022-12-27",
  endDate: "2022-12-27",
} as const;

const DAY = "2022-12-27";

const GENERIC_UNION = "笠間市がほかの市町村と共同で事務を行う団体（一部事務組合）です";

function delegateElection(input: {
  number: number;
  body: string;
  role: string;
  members: string;
}): KasamaBill {
  return {
    billNumberLabel: `選挙第${input.number}号`,
    title: `${input.body}議会議員の選挙について`,
    resultLabel: "当選",
    decidedOn: DAY,
    submitter: null,
    source: "minutes",
    summary: `${input.body}の議会に、笠間市議会から送る議員を選ぶ選挙。議長の指名で${input.members}が当選した。`,
    body: `${input.body}は、${input.role}。その議会の議員を、笠間市議会の議員の中から選びます。市議会議員選挙の後の最初の議会で選びました。投票ではなく議長が指名する方法（指名推選）をとることに異議はなく、12月27日に${input.members}が当選しました。`,
  };
}

export const R4_1_RINJI_BILLS: readonly KasamaBill[] = [
  {
    billNumberLabel: "選挙第2号",
    title: "議長の選挙について",
    resultLabel: "当選",
    decidedOn: DAY,
    submitter: null,
    source: "minutes",
    summary:
      "市議会議員選挙の後の最初の議会で、議長を選ぶ選挙。投票の結果、大関久義議員が12票、畑岡洋二議員が10票で、大関久義議員が当選した。",
    body: `## ポイント解説
- 令和4年12月の市議会議員一般選挙の後、最初に開かれた議会で議長を選びました
- 年長の議員（石﨑勝三議員）が臨時議長を務め、立候補者の所信表明会の後、無記名の投票で行いました
- 投票総数22票のうち、大関久義議員12票、畑岡洋二議員10票で、大関久義議員が当選しました

## その後の手続き
同じ日に、副議長の選挙（選挙第3号）や、常任委員会・議会運営委員会・広報委員会の委員の選任も行われました。`,
  },
  {
    billNumberLabel: "選挙第3号",
    title: "副議長の選挙について",
    resultLabel: "当選",
    decidedOn: DAY,
    submitter: null,
    source: "minutes",
    summary:
      "副議長を選ぶ選挙。投票の結果、内桶克之議員が12票、村上寿之議員が10票で、内桶克之議員が当選した。",
    body: `副議長の選挙は、所信表明会の後、無記名の投票で行われました。投票総数22票のうち、内桶克之議員12票、村上寿之議員10票で、内桶克之議員が当選しました。`,
  },
  delegateElection({
    number: 4,
    body: "茨城県後期高齢者医療広域連合",
    role: "75歳以上の医療制度を県内の全市町村で運営する組織です",
    members: "田村泰之議員",
  }),
  delegateElection({
    number: 5,
    body: "筑北環境衛生組合",
    role: GENERIC_UNION,
    members: "河原井信之、田村幸子、田村泰之、石井栄の4議員",
  }),
  delegateElection({
    number: 6,
    body: "茨城地方広域環境事務組合",
    role: GENERIC_UNION,
    members: "内桶克之、西山猛、大貫千尋、石﨑勝三の4議員",
  }),
  delegateElection({
    number: 7,
    body: "笠間地方広域事務組合",
    role: GENERIC_UNION,
    members:
      "長谷川愛子、鈴木宏治、益子康子、田村泰之、西山猛、石﨑勝三の6議員",
  }),
  {
    billNumberLabel: "報告第11号",
    title:
      "専決処分の承認を求めることについて（令和４年度笠間市一般会計補正予算（第１０号））",
    resultLabel: "原案承認",
    decidedOn: DAY,
    source: "minutes",
    summary:
      "妊娠から子育てまでの相談支援と経済的支援（出産・子育て応援）や、学校の感染症対策のため、4,587万9,000円を追加する予算を市長が先に決めたことの承認を求める報告。異議なく承認された。",
    body: `## ポイント解説
- ${SENKETSU_NOTE}
- 妊娠期から出産・子育てまで一貫した相談支援と経済的支援、小中学校の感染症対策のため、令和4年12月16日に予算を決めました
- 予算に4,587万9,000円を追加し、一般会計の総額を356億3,980万3,000円にした
- 出産・子育て応援補助金に4,190万円（国の交付金2,863万2,000円を活用。県の補助分は県の補正予算の成立後に計上する）
- 小中学校の感染症対策に必要な物品の購入（国の補助金を活用）

## 審議の経過
委員会での審査は省略され、12月27日に異議なく承認されました。`,
  },
  {
    billNumberLabel: "議案第91号",
    title: "笠間市監査委員の選任に同意を求めることについて",
    resultLabel: "原案同意",
    decidedOn: DAY,
    source: "minutes",
    summary:
      "議員の中から選ぶ監査委員に、飯田正憲議員を選ぶことに議会が同意するかを決める議案。異議なく同意された。",
    body: `監査委員は、市のお金の使い方や事務が適正かを調べる役職で、議員の中からも選ばれます。市議会議員選挙の後の最初の議会で、市長が飯田正憲議員を監査委員に選ぶことを提案しました。選任には議会の同意が必要です。本人は採決の間退席し、12月27日に異議なく同意されました。`,
  },
];
