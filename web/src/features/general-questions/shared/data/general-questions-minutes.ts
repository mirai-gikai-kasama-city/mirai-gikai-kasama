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

/** 平成23年第4回定例会（12月）。一般質問は9日・12日・13日の3日間で12人 */
const H23_4 = {
  sessionKey: "h23-4-teirei",
  sessionName: "平成23年第4回定例会",
} as const;
const H23_4_DAY1 = {
  ...H23_4,
  questionDate: "2011-12-09",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1370327262_doc_56_1.pdf",
} as const;
const H23_4_DAY2 = {
  ...H23_4,
  questionDate: "2011-12-12",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1329443117_doc_56_3.pdf",
} as const;
const H23_4_DAY3 = {
  ...H23_4,
  questionDate: "2011-12-13",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1329443117_doc_56_4.pdf",
} as const;

const H23_4_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H23_4_DAY1,
    order: 1,
    memberName: "鹿志村 清一",
    items: [
      "青年海外派遣事業について",
      "展望台の眺望の確保について",
      "福島県の避難自治体の子どもたちの交流を進めることについて",
    ],
  }),
  fromMinutes({
    ...H23_4_DAY1,
    order: 2,
    memberName: "鈴木 貞夫",
    items: [
      "福島原発事故放射能汚染への対応について",
      "東海原発から30キロ圏内地域防災計画について",
      "イノシシ対策について",
      "エコフロンティアかさまに搬入されている廃棄物について",
    ],
  }),
  fromMinutes({
    ...H23_4_DAY1,
    order: 3,
    memberName: "町田 征久",
    items: [
      "交通安全対策について",
      "公共下水道、農業集落排水の今後の計画について",
      "スポーツ施設の改善について",
      "各種予防接種について",
      "岩間支所の１階フロア事務スペースについて",
    ],
  }),
  fromMinutes({
    ...H23_4_DAY1,
    order: 4,
    memberName: "小磯 節子",
    items: ["地場農産物振興拡大事業について", "県道上吉影岩間線の堅倉街道踏切の改良工事について"],
  }),
  fromMinutes({
    ...H23_4_DAY1,
    order: 5,
    memberName: "石松 俊雄",
    items: [
      "これまで運用してきた本市の指定管理者制度の評価と今後の指定管理者制度の最適化について",
      "笠間市の福島第一原発事故による放射能汚染対策について",
      "電力自由化に対する取り組みについて",
    ],
  }),
  fromMinutes({
    ...H23_4_DAY2,
    order: 6,
    memberName: "大関 久義",
    items: ["笠間市の地域集会所について", "狭あい道路整備事業について"],
  }),
  fromMinutes({
    ...H23_4_DAY2,
    order: 7,
    memberName: "石田 安夫",
    items: ["拠点避難所整備について", "定住化対策について"],
  }),
  fromMinutes({
    ...H23_4_DAY2,
    order: 8,
    memberName: "畑岡 洋二",
    items: ["市政情報の市民への提供方法について", "笠間市一般廃棄物処理手数料収納事務委託手数料について"],
  }),
  fromMinutes({
    ...H23_4_DAY2,
    order: 9,
    memberName: "西山 猛",
    items: [
      "行政区制度の適正運営について",
      "通年型「かさまの観光」の実現について",
      "「統計かさま」から見えてくる市の実情について",
    ],
  }),
  fromMinutes({
    ...H23_4_DAY2,
    order: 10,
    memberName: "横倉 きん",
    items: [
      "保育行政について",
      "水道料金の統一に向けて",
      "放射能から子どもの健康を守る放射能汚染の問題について",
    ],
  }),
  fromMinutes({
    ...H23_4_DAY3,
    order: 11,
    memberName: "野口 圓",
    items: [
      "東日本大震災後の対応について",
      "災害復旧の進捗状況について",
      "防災計画について",
      "災害復旧と建設業界の問題について",
    ],
  }),
  fromMinutes({
    ...H23_4_DAY3,
    order: 12,
    memberName: "萩原 瑞子",
    items: ["水道料金の滞納対策について", "観光振興について"],
  }),
];

/** 平成24年第1回定例会（3月）。一般質問は13日・14日・15日の3日間で11人 */
const H24_1 = {
  sessionKey: "h24-1-teirei",
  sessionName: "平成24年第1回定例会",
} as const;
const H24_1_DAY1 = {
  ...H24_1,
  questionDate: "2012-03-13",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1338428457_doc_56_2.pdf",
} as const;
const H24_1_DAY2 = {
  ...H24_1,
  questionDate: "2012-03-14",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1338428457_doc_56_3.pdf",
} as const;
const H24_1_DAY3 = {
  ...H24_1,
  questionDate: "2012-03-15",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1338428457_doc_56_4.pdf",
} as const;

const H24_1_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H24_1_DAY1,
    order: 1,
    memberName: "鹿志村 清一",
    items: [
      "市庁舎内の相談室の整備について",
      "介護保険における要介護度４以上の方の在宅介護における在宅介護慰労金の増額を検討したらどうか",
      "自主防災組織について",
    ],
  }),
  fromMinutes({
    ...H24_1_DAY1,
    order: 2,
    memberName: "石田 安夫",
    items: ["都市鉱山活用について", "歩道グレードアップ事業について", "デマンド交通について"],
  }),
  fromMinutes({
    ...H24_1_DAY1,
    order: 3,
    memberName: "鈴木 貞夫",
    // 会議録で題を読み上げたのは2つ目だけなので、議会だより第25号の見出しを使う（2つ目も見出しと同じ）
    items: [
      "安心して住み続けられるために",
      "自然エネルギー太陽光発電の促進について",
      "エコフロンティアかさまに搬入される廃棄物の放射能の汚染について",
      "耕作放棄地と山林の荒廃対策について",
    ],
  }),
  fromMinutes({
    ...H24_1_DAY1,
    order: 4,
    memberName: "石松 俊雄",
    // 2つ目は題を読み上げておらず、議会だよりにも載っていないので、会議録の質問の中の言葉を使う
    items: ["合併10年後からの地方交付税の動向と市の財政計画について", "地域主権関連３法について"],
  }),
  fromMinutes({
    ...H24_1_DAY1,
    order: 5,
    memberName: "町田 征久",
    items: [
      "市税滞納の徴収について",
      "空き家、空き店舗対策について",
      "市の省エネルギー対策について",
      "生活道路の改善について",
    ],
  }),
  fromMinutes({
    ...H24_1_DAY2,
    order: 6,
    memberName: "西山 猛",
    items: ["都市計画について", "通年型観光について", "男女共同参画について", "応急仮設住宅"],
  }),
  fromMinutes({
    ...H24_1_DAY2,
    order: 7,
    memberName: "横倉 きん",
    items: [
      "高齢者福祉計画と介護保険について",
      "子育て支援対策について",
      "児童館について",
      "災害に強いまちづくりについて",
    ],
  }),
  fromMinutes({
    ...H24_1_DAY2,
    order: 8,
    memberName: "小薗江 一三",
    items: [
      "学校教育必修科目について",
      "市立病院の改革について",
      "友部駅周辺今後の計画並びに建設会社のモラルについて",
    ],
  }),
  fromMinutes({
    ...H24_1_DAY2,
    order: 9,
    memberName: "大関 久義",
    items: ["笠間市公用車の利用について", "笠間稲荷門前通り拠点整備事業及び周辺関連事業と観光について"],
  }),
  fromMinutes({
    ...H24_1_DAY3,
    order: 10,
    memberName: "飯田 正憲",
    items: ["野犬対策について", "笠間市から配布される印刷物について"],
  }),
  fromMinutes({
    ...H24_1_DAY3,
    order: 11,
    memberName: "鈴木 裕士",
    items: ["人口対策について", "防災無線について", "先の震災に伴う廃棄物の処理に関して"],
  }),
];

/** 平成24年第2回定例会（6月）。一般質問は12日・13日・14日の3日間で12人 */
const H24_2 = {
  sessionKey: "h24-2-teirei",
  sessionName: "平成24年第2回定例会",
} as const;
const H24_2_DAY1 = {
  ...H24_2,
  questionDate: "2012-06-12",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1346026201_doc_56_2.pdf",
} as const;
const H24_2_DAY2 = {
  ...H24_2,
  questionDate: "2012-06-13",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1346026201_doc_56_3.pdf",
} as const;
const H24_2_DAY3 = {
  ...H24_2,
  questionDate: "2012-06-14",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1346026201_doc_56_4.pdf",
} as const;

const H24_2_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H24_2_DAY1,
    order: 1,
    memberName: "西山 猛",
    items: ["地域の復旧・復興について", "高速バス復活と笠間の復興について"],
  }),
  fromMinutes({
    ...H24_2_DAY1,
    order: 2,
    memberName: "横倉 きん",
    items: ["教育環境について", "原子力防災について", "国保税の改善について"],
  }),
  fromMinutes({
    ...H24_2_DAY1,
    order: 3,
    memberName: "野口 圓",
    // 会議録では題を読み上げていないので、議会だより第26号の見出しを使う
    items: ["若年労働者の非正規雇用とワーキングプアの問題について"],
  }),
  fromMinutes({
    ...H24_2_DAY1,
    order: 4,
    memberName: "上野 登",
    items: ["茨城中央工業団地予定地について", "生活道路について"],
  }),
  fromMinutes({
    ...H24_2_DAY1,
    order: 5,
    memberName: "大関 久義",
    items: ["畜産試験場跡地の雨水排水処理施設整備について", "自警団への補助金制度について"],
  }),
  fromMinutes({
    ...H24_2_DAY2,
    order: 6,
    memberName: "石松 俊雄",
    items: ["笠間市の情報化政策", "市民と行政の協働について"],
  }),
  fromMinutes({
    ...H24_2_DAY2,
    order: 7,
    memberName: "萩原 瑞子",
    items: [
      "観光名刺と観光年賀状について",
      "エコフロンティアかさま内の教育施設の利活用について",
      "がん対策について",
    ],
  }),
  fromMinutes({
    ...H24_2_DAY2,
    order: 8,
    memberName: "石田 安夫",
    items: [
      "中小企業グループ等災害復旧補助金について",
      "地域グリーンニューディール基金について",
      "原子力災害周辺地域産業復興企業立地補助金について",
      "笠間給食センターについて",
    ],
  }),
  fromMinutes({
    ...H24_2_DAY2,
    order: 9,
    memberName: "鹿志村 清一",
    items: [
      "生物多様性への取り組みについて",
      "石づくり彫刻による野外彫刻ミュージアム公園建設について",
      "防災教育に、震災、風水害記録映像の活用を図ってはいかがか",
      "笠間の観光ＰＲ媒体について",
    ],
  }),
  fromMinutes({
    ...H24_2_DAY2,
    order: 10,
    memberName: "鈴木 貞夫",
    items: [
      "東海原発30キロ圏内の市町村の安全協定問題について",
      "市内の放射能測定について",
      "市内の除染した汚染土壌の処理について",
      "瓦れきの広域処理の問題",
      "環境保全委員会の問題",
      "エコフロンティアかさまの最終処分場の発生ガス問題について",
      "エコフロンティアかさまの処分場の山積みされた産業廃棄物問題について",
      "森林の荒廃問題と河川の保護について",
    ],
  }),
  fromMinutes({
    ...H24_2_DAY3,
    order: 11,
    memberName: "町田 征久",
    items: [
      "学校給食費の無料化",
      "岩間地区弁天池の下の排水路清掃について",
      "通学路の安全対策について",
      "愛宕山道の側溝清掃について",
    ],
  }),
  fromMinutes({
    ...H24_2_DAY3,
    order: 12,
    memberName: "畑岡 洋二",
    items: ["市税等の納付方法について", "公衆無線ＬＡＮについて", "笠間の菊まつりについて"],
  }),
];

/** 平成24年第3回定例会（9月）。一般質問は18日・19日・20日の3日間で11人 */
const H24_3 = {
  sessionKey: "h24-3-teirei",
  sessionName: "平成24年第3回定例会",
} as const;
const H24_3_DAY1 = {
  ...H24_3,
  questionDate: "2012-09-18",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1354152863_doc_56_2.pdf",
} as const;
const H24_3_DAY2 = {
  ...H24_3,
  questionDate: "2012-09-19",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1354152863_doc_56_3.pdf",
} as const;
const H24_3_DAY3 = {
  ...H24_3,
  questionDate: "2012-09-20",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1354152863_doc_56_4.pdf",
} as const;

const H24_3_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H24_3_DAY1,
    order: 1,
    memberName: "町田 征久",
    items: [
      "県道南指原岩間停車場線の工事の進捗状況について",
      "県道石岡城里線下安居十字路のバイパスの進捗状況",
      "笠間市の小・中学校のいじめの実態。また、対策はどのようにしているのか",
      "岩間海洋センターのプールの屋根の修理について",
      "肺炎球菌ワクチン接種の無料化について",
    ],
  }),
  fromMinutes({
    ...H24_3_DAY1,
    order: 2,
    memberName: "畑岡 洋二",
    items: [
      "笠間市の道路行政における交通安全総点検とバリアフリーについて",
      "笠間市の魅力発信について",
      "笠間市のいな吉の使用方法について",
    ],
  }),
  fromMinutes({
    ...H24_3_DAY1,
    order: 3,
    memberName: "萩原 瑞子",
    items: [
      "芸術の森公園の整備について",
      "工芸の丘内の登り窯の修復について",
      "笠間のいなり寿司が観光の目玉について",
    ],
  }),
  fromMinutes({
    ...H24_3_DAY1,
    order: 4,
    memberName: "小磯 節子",
    items: ["６次産業化について"],
  }),
  fromMinutes({
    ...H24_3_DAY1,
    order: 5,
    memberName: "横倉 きん",
    items: ["消防行政について", "原子力防災について", "図書館の拡充について"],
  }),
  fromMinutes({
    ...H24_3_DAY2,
    order: 6,
    memberName: "石松 俊雄",
    // 2問目・3問目は「通告二問目の…」「通告３問目の…」と読み上げている。1問目は題を読み上げていないので、
    // 「災害時要援護者への対応について課題となったこと…」の文から写した
    items: [
      "災害時要援護者への対応について",
      "笠間芸術の森公園の維持管理費用について",
      "生活道路の整備と適切な維持管理費について",
    ],
  }),
  fromMinutes({
    ...H24_3_DAY2,
    order: 7,
    memberName: "西山 猛",
    items: [
      "いじめ問題と対策について",
      "虐待と社会情勢について",
      "復旧から復興に向けた「まちづくり」について",
    ],
  }),
  fromMinutes({
    ...H24_3_DAY2,
    order: 8,
    memberName: "鹿志村 清一",
    // 2問目は題を読み上げていないので、「…非核平和都市宣言の市であることを表明し、内外にアピールするための標柱設置を考えてはいかがか」の文から写した
    items: [
      "市内小・中学校における原子力エネルギー等の教育について",
      "非核平和都市宣言の市であることを表明し、内外にアピールするための標柱設置",
    ],
  }),
  fromMinutes({
    ...H24_3_DAY2,
    order: 9,
    memberName: "石田 安夫",
    items: ["自然エネルギー活用助成事業について", "地域維持型契約方式の活用について"],
  }),
  fromMinutes({
    ...H24_3_DAY3,
    order: 10,
    memberName: "鈴木 貞夫",
    items: ["放射能汚染から市民の安全を守るために"],
  }),
  fromMinutes({
    ...H24_3_DAY3,
    order: 11,
    memberName: "大関 久義",
    items: ["笠間支所の整備について"],
  }),
];

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
  ...H23_4_RECORDS,
  ...H24_1_RECORDS,
  ...H24_2_RECORDS,
  ...H24_3_RECORDS,
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
