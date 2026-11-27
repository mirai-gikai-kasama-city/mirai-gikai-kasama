/**
 * 平成23年第1回笠間市議会臨時会（1月5日）の議案データ
 *
 * 平成22年12月12日の市議会議員一般選挙（24人が当選）の後、最初の議会。議長・副議長などを選んだ。
 * 事実（番号・件名・結果・議決日）は 第1回臨時会 会議録 から転記し、
 * かさま市議会だより 第20号（平成23年第1回臨時会）と照らし合わせた。
 *
 * 解説文はこれらをもとにAIが下書きしたもの。運営者の確認が済むまで公開しない。
 * 常任委員会・議会運営委員会・議会だより編集委員会の委員の選任と、笠間市農業委員会の委員の推薦
 * （蛯澤幸一・西山猛・上野登の3議員を推薦）は、議案番号が無いので載せていない。
 * 議長・副議長の選挙は投票で行われたが、選挙なので vote は付けていない（手本 h26-1-rinji と同じ）。
 * 議員の氏名は会議録の表記のまま（「石﨑勝三」など）。
 */
import type { KasamaBill } from "./types";

export const H23_1_RINJI_SESSION = {
  key: "h23-1-rinji",
  name: "平成23年第1回臨時会",
  startDate: "2011-01-05",
  endDate: "2011-01-05",
} as const;

const DAY = "2011-01-05";

const GENERIC_UNION = "笠間市がほかの市町村と共同で事務を行う団体（一部事務組合）です";

function delegateElection(input: {
  number: number;
  body: string;
  role: string;
  members: string;
  title?: string;
}): KasamaBill {
  return {
    billNumberLabel: `選挙第${input.number}号`,
    title: input.title ?? `${input.body}議会議員の選挙について`,
    resultLabel: "当選",
    decidedOn: DAY,
    submitter: null,
    source: "minutes",
    summary: `${input.body}の議会に、笠間市議会から送る議員を選ぶ選挙。議長の指名で${input.members}が当選した。`,
    body: `${input.body}は、${input.role}。その議会の議員を、笠間市議会の議員の中から選びます。市議会議員選挙の後の最初の議会で選びました。投票ではなく議長が指名する方法（指名推選）をとることに異議はなく、1月5日に${input.members}が当選しました。`,
  };
}

export const H23_1_RINJI_BILLS: readonly KasamaBill[] = [
  {
    billNumberLabel: "選挙第1号",
    title: "議長の選挙について",
    resultLabel: "当選",
    decidedOn: DAY,
    submitter: null,
    source: "minutes",
    summary:
      "市議会議員選挙の後の最初の議会で、議長を選ぶ選挙。投票の結果、柴沼広議員が20票を得て当選した。",
    body: `## ポイント解説
- 平成22年12月12日の市議会議員一般選挙の後、最初に開かれた議会で議長を選びました
- 議長が決まるまでは、年長の議員（鈴木貞夫議員）が臨時議長を務めました。単記無記名の投票で行いました
- 投票総数24票のうち有効投票22票（無効2票）で、柴沼広議員20票、横倉きん議員2票となり、柴沼広議員が当選しました

## その後の手続き
同じ日に、副議長の選挙（選挙第2号）や、常任委員会・議会運営委員会・議会だより編集委員会の委員の選任も行われました。`,
  },
  {
    billNumberLabel: "選挙第2号",
    title: "副議長の選挙について",
    resultLabel: "当選",
    decidedOn: DAY,
    submitter: null,
    source: "minutes",
    summary:
      "副議長を選ぶ選挙。投票の結果、海老澤勝議員が21票を得て当選した。",
    body: `副議長の選挙は、単記無記名の投票で行われました。投票総数24票（すべて有効）で、海老澤勝議員21票、鈴木貞夫議員2票、藤枝浩議員1票となり、海老澤勝議員が当選しました。`,
  },
  delegateElection({
    number: 3,
    body: "茨城県後期高齢者医療広域連合",
    title: "茨城県後期高齢者医療広域連合議会議員補欠選挙について",
    role: "75歳以上の医療制度を県内の全市町村で運営する組織です。今回は欠けた1人を補う選挙（補欠選挙）でした",
    members: "萩原瑞子議員",
  }),
  delegateElection({
    number: 4,
    body: "水戸地方広域市町村圏事務組合",
    role: GENERIC_UNION,
    members: "鹿志村清一、鈴木裕士の2議員",
  }),
  delegateElection({
    number: 5,
    body: "笠間地方広域事務組合",
    role: GENERIC_UNION,
    members:
      "橋本良一、小磯節子、飯田正憲、蛯澤幸一、野口圓、横倉きんの6議員",
  }),
  delegateElection({
    number: 6,
    body: "筑北環境衛生組合",
    role: GENERIC_UNION,
    members: "石田安夫、蛯澤幸一、鈴木貞夫、小薗江一三の4議員",
  }),
  delegateElection({
    number: 7,
    body: "笠間・水戸環境組合",
    role: GENERIC_UNION,
    members: "西山猛、石松俊雄、上野登、町田征久の4議員",
  }),
  delegateElection({
    number: 8,
    body: "茨城地方広域環境事務組合",
    role: GENERIC_UNION,
    members: "鈴木裕士、萩原瑞子、大関久義、石﨑勝三の4議員",
  }),
  {
    billNumberLabel: "議案第1号",
    title: "笠間市監査委員の選任に同意を求めることについて",
    resultLabel: "原案同意",
    decidedOn: DAY,
    source: "minutes",
    summary:
      "議員の中から選ぶ監査委員に、中澤猛議員を選ぶことに議会が同意するかを決める議案。異議なく同意された。",
    body: `監査委員は、市のお金の使い方や事務が適正かを調べる役職で、議員の中からも選ばれます。市議会議員選挙の後の最初の議会で、市長が中澤猛議員を監査委員に選ぶことを提案しました（地方自治法第196条第１項）。選任には議会の同意が必要です。本人は採決の間退席し、委員会への付託と討論を省いて、1月5日に異議なく同意されました。`,
  },
  {
    billNumberLabel: "報告第1号",
    title:
      "専決処分の承認を求めることについて（工事請負契約の変更について）",
    resultLabel: "原案承認",
    decidedOn: DAY,
    source: "minutes",
    summary:
      "笠間小学校の校舎の耐震補強と改修の工事で、契約金額を630万円増やし、工期を10日のばした専決処分の承認を求める報告。異議なく承認された。",
    body: `## ポイント解説
- 専決処分は、議会を開く時間がないときなどに、市長が議会の代わりに決めることです。決めた後で議会に報告し、承認を求めます（地方自治法第179条）
- 笠間小学校の校舎の耐震補強と改修の工事の契約（平成22年第2回定例会で議決）を変えました
- 耐震補強では補強の部材の数量が減り、改修では屋外の防水工事の下地の調整の工程が加わり、外壁の補修の箇所が増えたため、請負の金額を消費税込みで630万円増やし、総額を2億1,787万5,000円にしました
- 工事の期限を平成22年12月10日から12月20日まで、10日間のばしました
- 変更の額が決まったのが第4回定例会の後だったため、議会を開く時間がないとして専決処分にしました

## 審議の経過
委員会への付託と討論は省略され、1月5日に異議なく承認されました。`,
  },
];
