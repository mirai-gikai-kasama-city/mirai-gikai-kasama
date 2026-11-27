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
import { H18_H22_GENERAL_QUESTIONS } from "./general-questions-minutes-h18";

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

/** 平成23年第2回定例会（6月）。一般質問は13日・14日・15日の3日間で13人（平成23年第1回は震災で一般質問が中止） */
const H23_2 = {
  sessionKey: "h23-2-teirei",
  sessionName: "平成23年第2回定例会",
} as const;
const H23_2_DAY1 = {
  ...H23_2,
  questionDate: "2011-06-13",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1319073938_doc_56_2.pdf",
} as const;
const H23_2_DAY2 = {
  ...H23_2,
  questionDate: "2011-06-14",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1319073938_doc_56_3.pdf",
} as const;
const H23_2_DAY3 = {
  ...H23_2,
  questionDate: "2011-06-15",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1319073938_doc_56_4.pdf",
} as const;

const H23_2_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H23_2_DAY1,
    order: 1,
    memberName: "横倉 きん",
    items: ["震災復旧と防災対策について", "福島第一原発関連の問題について", "就学援助制度について"],
  }),
  fromMinutes({
    ...H23_2_DAY1,
    order: 2,
    memberName: "西山 猛",
    items: [
      "少子化に対する対策の現在とこれからの考え方、今後の考え方について",
      "入札制度と笠間の復興について",
      "東日本大震災における地域消防の実務について",
      "公用車の管理運営について",
    ],
  }),
  fromMinutes({
    ...H23_2_DAY1,
    order: 3,
    memberName: "小薗江 一三",
    items: ["東日本大震災に思う", "環境衛生について"],
  }),
  fromMinutes({
    ...H23_2_DAY1,
    order: 4,
    memberName: "鈴木 貞夫",
    items: [
      "市内の放射能の測定と公表について",
      "市内の道路の復旧とインフラの整備について",
      "市民生活を回復するための市民への助成について",
    ],
  }),
  fromMinutes({
    ...H23_2_DAY1,
    order: 5,
    memberName: "石田 安夫",
    items: ["公共施設の耐震化について", "学校の放射線量について", "英語指導助手について", "通学路の安全対策について"],
  }),
  fromMinutes({
    ...H23_2_DAY2,
    order: 6,
    memberName: "大関 久義",
    items: [
      "笠間市の防災と防犯について",
      "笠間市の雨水排水事業について",
      "運転免許証返納者の支援制度とデマンドタクシーについて",
    ],
  }),
  fromMinutes({
    ...H23_2_DAY2,
    order: 7,
    memberName: "小磯 節子",
    items: ["今回の震災の対応について"],
  }),
  fromMinutes({
    ...H23_2_DAY2,
    order: 8,
    memberName: "鈴木 裕士",
    // 会議録では題を名乗っていないので、議会だより第22号の見出しを使う
    items: ["防災について", "米粉について"],
  }),
  fromMinutes({
    ...H23_2_DAY2,
    order: 9,
    memberName: "野口 圓",
    // 会議録では題を名乗っていないので、議会だより第22号の見出しを使う
    items: ["大震災関連について", "放射能関連について", "ＴＰＰ関連について", "捨て犬、捨て猫の問題について"],
  }),
  fromMinutes({
    ...H23_2_DAY2,
    order: 10,
    memberName: "石松 俊雄",
    // 1つ目は題を名乗っていないので議会だより第22号の見出しを使う。
    // 3つ目は会議録で「土地改良区の施設使用料に関する質問」と言っているので、「に関して」の形で切り出す（運営者の判断。2026-11-24）
    items: ["大震災と防災計画について", "河川の被災と洪水対策について", "土地改良区の施設使用料に関して"],
  }),
  fromMinutes({
    ...H23_2_DAY3,
    order: 11,
    memberName: "鹿志村 清一",
    items: [
      "まちづくりでの自転車利用の促進",
      "東日本大震災の対応と今後の対応について",
      "ネット販売による地場産品の販路拡大について",
    ],
  }),
  fromMinutes({
    ...H23_2_DAY3,
    order: 12,
    memberName: "萩原 瑞子",
    items: [
      "選挙投票率のアップと選挙開票事務の迅速効率化について",
      "高齢者支援の充実について",
      "男女共同参画計画推進について",
    ],
  }),
  fromMinutes({
    ...H23_2_DAY3,
    order: 13,
    memberName: "畑岡 洋二",
    items: ["災害廃棄物の処理について", "防災行政無線について"],
  }),
];

/** 平成23年第3回定例会（9月）。一般質問は13日・14日・15日の3日間で14人 */
const H23_3 = {
  sessionKey: "h23-3-teirei",
  sessionName: "平成23年第3回定例会",
} as const;
const H23_3_DAY1 = {
  ...H23_3,
  questionDate: "2011-09-13",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1322549192_doc_56_2.pdf",
} as const;
const H23_3_DAY2 = {
  ...H23_3,
  questionDate: "2011-09-14",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1322549192_doc_56_3.pdf",
} as const;
const H23_3_DAY3 = {
  ...H23_3,
  questionDate: "2011-09-15",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1322549192_doc_56_4.pdf",
} as const;

const H23_3_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H23_3_DAY1,
    order: 1,
    memberName: "鈴木 裕士",
    items: ["市有地等の管理について"],
  }),
  fromMinutes({
    ...H23_3_DAY1,
    order: 2,
    memberName: "鹿志村 清一",
    items: [
      "犯罪被害者支援の取り組みについて",
      "空き家の適正管理に関する対応について",
      "酸性雨対策について",
      "恋人の聖地イベントの安全対策について",
    ],
  }),
  fromMinutes({
    ...H23_3_DAY1,
    order: 3,
    memberName: "町田 征久",
    items: [
      "岩間中学校に合気道部の創設を",
      "第一東宝ランドの道路の側溝の改善について",
      "県道南指原岩間停車場線の進捗状況について",
      "岩間工業団地内の交通安全対策について",
    ],
  }),
  fromMinutes({
    ...H23_3_DAY1,
    order: 4,
    memberName: "橋本 良一",
    items: [
      "友部地区２カ所の道路整備進捗状況について",
      "北山公園と周辺道路の整備状況について",
      "宍戸駅周辺の安全対策について",
    ],
  }),
  fromMinutes({
    ...H23_3_DAY1,
    order: 5,
    memberName: "萩原 瑞子",
    items: ["東日本大震災を踏まえた防災計画について"],
  }),
  fromMinutes({
    ...H23_3_DAY2,
    order: 6,
    memberName: "西山 猛",
    items: ["安心・安全な笠間づくりについて", "入札制度の見直しについて"],
  }),
  fromMinutes({
    ...H23_3_DAY2,
    order: 7,
    memberName: "市村 博之",
    // 会議録では題を名乗らずに3つの問いを読み上げているので、議会だより第23号の見出しを使う
    items: ["日本語教育について"],
  }),
  fromMinutes({
    ...H23_3_DAY2,
    order: 8,
    memberName: "大関 久義",
    items: ["東日本大震災について", "岩間地域の安戸地区の道路について"],
  }),
  fromMinutes({
    ...H23_3_DAY2,
    order: 9,
    memberName: "鈴木 貞夫",
    // 1つ目と4つ目は題を名乗っていないので、議会だより第23号の見出しを使う
    items: [
      "原発問題について",
      "東日本大震災と福島原発事故に対する対応について",
      "防災ラジオの問題",
      "河川での除草剤の使用について",
    ],
  }),
  fromMinutes({
    ...H23_3_DAY2,
    order: 10,
    memberName: "石田 安夫",
    items: ["防災授業を含めた救命士育成について", "東日本大震災復興基本法について"],
  }),
  fromMinutes({
    ...H23_3_DAY3,
    order: 11,
    memberName: "飯田 正憲",
    items: ["岩間八郷線について", "有害鳥獣など駆除について"],
  }),
  fromMinutes({
    ...H23_3_DAY3,
    order: 12,
    memberName: "横倉 きん",
    items: ["国民健康保険について", "市民の健康づくりについて", "放射能汚染対策について"],
  }),
  fromMinutes({
    ...H23_3_DAY3,
    order: 13,
    memberName: "石松 俊雄",
    // 1つ目は題を名乗っておらず、議会だよりにも載っていないので、会議録の質問の中の言葉を使う
    items: ["基準モデルと改定モデルの違いについて", "ファシリティーマネジメントについて", "廃棄物処理について"],
  }),
  fromMinutes({
    ...H23_3_DAY3,
    order: 14,
    memberName: "藤枝 浩",
    // 会議録では題を名乗っていないので、議会だより第23号の見出しを使う
    items: ["震災の復旧状況について", "放射能測定器の管理運用について", "笠間給食センターの建て替えについて"],
  }),
];

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

/** 平成25年第1回定例会（3月）。一般質問は13日・14日・15日の3日間で11人 */
const H25_1 = {
  sessionKey: "h25-1-teirei",
  sessionName: "平成25年第1回定例会",
} as const;
const H25_1_DAY1 = {
  ...H25_1,
  questionDate: "2013-03-13",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1369887087_doc_56_2.pdf",
} as const;
const H25_1_DAY2 = {
  ...H25_1,
  questionDate: "2013-03-14",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1369887087_doc_56_3.pdf",
} as const;
const H25_1_DAY3 = {
  ...H25_1,
  questionDate: "2013-03-15",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1369887087_doc_56_4.pdf",
} as const;

const H25_1_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H25_1_DAY1,
    order: 1,
    memberName: "横倉 きん",
    items: [
      "生活保護制度の基準引き下げに伴う市民の生活支援策について",
      "介護保険制度の生活援助時間の改善、介護士の待遇改善について",
      "県地域原子力防災計画について",
    ],
  }),
  fromMinutes({
    ...H25_1_DAY1,
    order: 2,
    memberName: "鈴木 貞夫",
    // 1つ目は題を名乗っていないので議会だより第29号の見出しを使う。
    // 3つ目は「三つ目に、森林湖沼環境税ですね」と名乗っているが形が外れるので、議会だよりの見出しを使う（運営者の判断。2026-11-24）
    items: ["笠間市防災計画について（原子力災害対策）", "エコフロンティアの問題について", "森林湖沼環境税の継続について"],
  }),
  fromMinutes({
    ...H25_1_DAY1,
    order: 3,
    memberName: "萩原 瑞子",
    // 題は一つで、その中で「一つ目」〜「四つ目」と分けて質問している
    items: ["重要施策並びに事業について"],
  }),
  fromMinutes({
    ...H25_1_DAY1,
    order: 4,
    memberName: "西山 猛",
    items: ["笠間市駅周辺整備活性化プランとまちづくりについて", "県との連携について"],
  }),
  fromMinutes({
    ...H25_1_DAY1,
    order: 5,
    memberName: "石松 俊雄",
    // 2つ目は「地域包括ケア体制に関する質問」と名乗っているので「に関して」の形にする
    items: ["公共交通政策について", "地域包括ケア体制に関して", "地域医療と市立病院整備方針について"],
  }),
  fromMinutes({
    ...H25_1_DAY2,
    order: 6,
    memberName: "野口 圓",
    items: ["校舎の耐震化について", "通学路について", "防災について"],
  }),
  fromMinutes({
    ...H25_1_DAY2,
    order: 7,
    memberName: "鹿志村 清一",
    // 1つ目は題を名乗っていないので、議会だより第29号の見出しを使う
    items: ["低炭素循環型社会の取り組みについて", "笠間市の定住化対策について"],
  }),
  fromMinutes({
    ...H25_1_DAY2,
    order: 8,
    memberName: "大関 久義",
    items: ["生活保護制度について"],
  }),
  fromMinutes({
    ...H25_1_DAY2,
    order: 9,
    memberName: "石田 安夫",
    items: [
      "防災について",
      "学校などの耐震化について",
      "太陽光システム助成制度について",
      "通学路の安全対策について",
      "子育て支援について",
    ],
  }),
  fromMinutes({
    ...H25_1_DAY3,
    order: 10,
    memberName: "町田 征久",
    // 2つ目は会議録の言い方では形が外れるので、議会だより第29号の見出しを使う（運営者の判断。2026-11-24）
    items: [
      "小学校の統合について",
      "吉岡地区の弁天池の土砂除去について",
      "学校の教師の体罰について",
      "グラウンドの整備について",
      "衆議院議員選挙投票所の変更について",
    ],
  }),
  fromMinutes({
    ...H25_1_DAY3,
    order: 11,
    memberName: "橋本 良一",
    items: ["動物愛護に関する市の取り組みについて"],
  }),
];

/** 平成25年第2回定例会（6月）。一般質問は12日・13日・14日の3日間で11人 */
const H25_2 = {
  sessionKey: "h25-2-teirei",
  sessionName: "平成25年第2回定例会",
} as const;
const H25_2_DAY1 = {
  ...H25_2,
  questionDate: "2013-06-12",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1376352164_doc_56_2.pdf",
} as const;
const H25_2_DAY2 = {
  ...H25_2,
  questionDate: "2013-06-13",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1376352164_doc_56_3.pdf",
} as const;
const H25_2_DAY3 = {
  ...H25_2,
  questionDate: "2013-06-14",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1376352164_doc_56_4.pdf",
} as const;

const H25_2_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H25_2_DAY1,
    order: 1,
    memberName: "西山 猛",
    // 3つ目は「懸案であります畜産試験場跡地、そして、そのまちづくり」と名乗っていて形が外れるので、議会だより第30号の見出しを案として入れている（運営者が了承。2026-11-24）
    items: [
      "スポーツ振興と健康増進について",
      "ボートピア岩間の環境整備協力費について",
      "畜産試験場跡地とまちづくりについて",
    ],
  }),
  fromMinutes({
    ...H25_2_DAY1,
    order: 2,
    memberName: "石松 俊雄",
    // 3つ目は「消費税増税による市政への影響と対応の質問」と名乗っていて形が外れる。議会だよりにも載っていない（運営者が了承。2026-11-24）
    items: ["情報化政策について", "教育の情報化について", "消費税増税による市政への影響と対応"],
  }),
  fromMinutes({
    ...H25_2_DAY1,
    order: 3,
    memberName: "石田 安夫",
    items: ["選挙制度改正について", "電線の地中化について", "通学路の改善について"],
  }),
  fromMinutes({
    ...H25_2_DAY1,
    order: 4,
    memberName: "鈴木 貞夫",
    items: ["笠間市の原子力災害対策計画について", "エコフロンティア問題の管理について"],
  }),
  fromMinutes({
    ...H25_2_DAY1,
    order: 5,
    memberName: "萩原 瑞子",
    items: ["市民実感度調査について", "市民憲章を子どもたちの郷土愛について"],
  }),
  fromMinutes({
    ...H25_2_DAY2,
    order: 6,
    memberName: "畑岡 洋二",
    items: [
      "行政から市民への情報伝達の方法と表現方法について",
      "笠間市の歴史的遺産を通したふるさと教育と地域振興について",
    ],
  }),
  fromMinutes({
    ...H25_2_DAY2,
    order: 7,
    memberName: "野口 圓",
    items: ["学校におけるいじめについて", "笠間市防災計画の中の原子力対策計画について"],
  }),
  fromMinutes({
    ...H25_2_DAY2,
    order: 8,
    memberName: "横倉 きん",
    items: [
      "風疹予防接種の取り組みについて",
      "子宮頸がんワクチンの接種について",
      "東海第二原発の再稼働と地域防災計画原子力災害対策編について",
    ],
  }),
  fromMinutes({
    ...H25_2_DAY2,
    order: 9,
    memberName: "大関 久義",
    items: ["笠間市のごみ問題について"],
  }),
  fromMinutes({
    ...H25_2_DAY3,
    order: 10,
    memberName: "町田 征久",
    // 4つ目は「〜に信号機の設置を」と名乗っていて形が外れるので、議会だより第30号の見出しを案として入れている（運営者が了承。2026-11-24）
    items: [
      "岩間工業団地交差点の信号機設置について",
      "県道石岡城里線下安居バイパス計画のその後について",
      "少子化対策について",
      "主要地方道茨城岩間線押辺（椚山）ＢＧ入口十字路について",
    ],
  }),
  fromMinutes({
    ...H25_2_DAY3,
    order: 11,
    memberName: "鈴木 裕士",
    items: ["協議会や審議会について", "外国人登録者との交流について"],
  }),
];

/** 平成25年第3回定例会（9月）。一般質問は17日・18日・19日の3日間で12人 */
const H25_3 = {
  sessionKey: "h25-3-teirei",
  sessionName: "平成25年第3回定例会",
} as const;
const H25_3_DAY1 = {
  ...H25_3,
  questionDate: "2013-09-17",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1386037928_doc_78_3.pdf",
} as const;
const H25_3_DAY2 = {
  ...H25_3,
  questionDate: "2013-09-18",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1386037928_doc_78_4.pdf",
} as const;
const H25_3_DAY3 = {
  ...H25_3,
  questionDate: "2013-09-19",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1386037928_doc_78_5.pdf",
} as const;

const H25_3_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H25_3_DAY1,
    order: 1,
    memberName: "野口 圓",
    items: ["ＮＰＯ法人と市のかかわりについて", "社会福祉協議会と市のかかわりについて"],
  }),
  fromMinutes({
    ...H25_3_DAY1,
    order: 2,
    memberName: "横倉 きん",
    items: [
      "友部小学校校庭の排水問題の改善について",
      "子育て支援の取り組みについて",
      "地域防災計画原子力災害対策編について",
    ],
  }),
  fromMinutes({
    ...H25_3_DAY1,
    order: 3,
    memberName: "畑岡 洋二",
    // 2つ目は会議録で読み上げたとおり
    items: ["観光事業の国際化戦略について", "農産物「梅」というもののブランド戦略について"],
  }),
  fromMinutes({
    ...H25_3_DAY1,
    order: 4,
    memberName: "西山 猛",
    items: ["明日の笠間市のあり方について"],
  }),
  fromMinutes({
    ...H25_3_DAY1,
    order: 5,
    memberName: "石田 安夫",
    items: ["外部委託について", "子どもたちの情報モラルと危機回避能力について"],
  }),
  fromMinutes({
    ...H25_3_DAY2,
    order: 6,
    memberName: "鹿志村 清一",
    items: [
      "笠間市への視察研修状況と対応について",
      "受動喫煙防止策と健康増進法について",
      "笠間市におけるＮＰＯ育成策について",
      "松山団地及び友部高校正門前の市道の街灯の管理について",
      "がんばろう笠間商品券発行支援事業補助金交付要綱廃止に伴う新たな笠間商品券発行支援事業補助金交付について",
    ],
  }),
  fromMinutes({
    ...H25_3_DAY2,
    order: 7,
    memberName: "鈴木 裕士",
    // 2つ目から4つ目は会議録で題を読み上げていないので、議会だより第31号の見出しを使っている
    items: [
      "防災無線等による情報の伝達について",
      "かさめーるについて",
      "消防の立ち入り検査について（火災予防査察規定・違反処理規定関係）",
      "家庭用火災報知器の設置推進策について",
    ],
  }),
  fromMinutes({
    ...H25_3_DAY2,
    order: 8,
    memberName: "鈴木 貞夫",
    // 3つ目は「市民の安全安心のために市内の放射線の定期的な測定を」と名乗っていて形が外れるので、議会だより第31号の見出しを使っている（運営者が選んだ。2026-11-24）
    // 4つ目は読み上げた言い方の形が外れるので、議会だより第31号の見出しを使っている
    items: [
      "笠間市の原子力災害対策計画、東海第二原発の再稼働問題について",
      "再生可能な自然エネルギーの促進の問題について",
      "市民の安心安全のために市内の放射線の定期的な測定を",
      "「平成25年度笠間産米の放射性物質検査」の報告について",
      "エコフロンティアの問題について",
    ],
  }),
  fromMinutes({
    ...H25_3_DAY2,
    order: 9,
    memberName: "町田 征久",
    items: [
      "合併後の市政について",
      "空き家等の管理に関する条例について",
      "給食アレルギーについて",
      "高齢者対策について",
    ],
  }),
  fromMinutes({
    ...H25_3_DAY2,
    order: 10,
    memberName: "石松 俊雄",
    items: [
      "第二次情報化基本計画（案）とオープンデータについて",
      "学校給食におけるアレルギー対策について",
    ],
  }),
  fromMinutes({
    ...H25_3_DAY3,
    order: 11,
    memberName: "萩原 瑞子",
    items: [
      "笠間稲荷門前周辺事業の状況について",
      "佐白山整備について",
      "茨城県の畜産試験場跡地について",
    ],
  }),
  fromMinutes({
    ...H25_3_DAY3,
    order: 12,
    memberName: "大関 久義",
    items: [
      "笠間市の消防団について",
      "笠間市のヘルスロードについて",
      "笠間市駅周辺整備活性化プランについて",
    ],
  }),
];

/** 平成25年第4回定例会（12月）。一般質問は16日・17日・18日の3日間で12人 */
const H25_4 = {
  sessionKey: "h25-4-teirei",
  sessionName: "平成25年第4回定例会",
} as const;
const H25_4_DAY1 = {
  ...H25_4,
  questionDate: "2013-12-16",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1392362820_doc_56_2.pdf",
} as const;
const H25_4_DAY2 = {
  ...H25_4,
  questionDate: "2013-12-17",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1392362820_doc_56_3.pdf",
} as const;
const H25_4_DAY3 = {
  ...H25_4,
  questionDate: "2013-12-18",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1392362820_doc_56_4.pdf",
} as const;

const H25_4_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H25_4_DAY1,
    order: 1,
    memberName: "西山 猛",
    items: ["笠間市総合計画について", "行政機構及び執行について"],
  }),
  fromMinutes({
    ...H25_4_DAY1,
    order: 2,
    memberName: "畑岡 洋二",
    // 2つ目は「学校教育に関しましてですけれども、薬物乱用防止教育について」と読み上げているので、議会だより第32号の見出しを使っている（運営者が選んだ。2026-11-24）
    items: [
      "佐白山富士山（つつじ公園）周辺の環境整備について",
      "学校教育における薬物乱用防止教育について",
    ],
  }),
  fromMinutes({
    ...H25_4_DAY1,
    order: 3,
    memberName: "町田 征久",
    items: [
      "生活保護について",
      "岩間地区弁天池下の排水路の改善について",
      "笠間市の公共下水道、農業集落排水事業の今後の計画について",
    ],
  }),
  fromMinutes({
    ...H25_4_DAY1,
    order: 4,
    memberName: "横倉 きん",
    items: [
      "都市宣言について",
      "マル福制度について",
      "高齢者社会の取り組みについて",
      "災害に強いまちづくりについて",
    ],
  }),
  fromMinutes({
    ...H25_4_DAY1,
    order: 5,
    memberName: "鈴木 貞夫",
    // 1つ目（再稼働と原子力災害対策）は会議録で題を読み上げていないので、議会だより第32号の見出しを使っている
    items: ["福島原発と東海第二原発の再稼働問題について", "エコフロンティアの問題について"],
  }),
  fromMinutes({
    ...H25_4_DAY2,
    order: 6,
    memberName: "野口 圓",
    items: ["地域福祉の支援体制について", "児童虐待について", "自殺者について"],
  }),
  fromMinutes({
    ...H25_4_DAY2,
    order: 7,
    memberName: "飯田 正憲",
    items: ["旧石岡採石場跡地埋め立てについて", "廃食油の再生利用のメリットについて"],
  }),
  fromMinutes({
    ...H25_4_DAY2,
    order: 8,
    memberName: "大関 久義",
    // 会議録で題を読み上げていないので、議会だより第32号の見出しを使っている
    items: ["笠間市総合計画３カ年実施計画について（Ｈ26～Ｈ28年度）"],
  }),
  fromMinutes({
    ...H25_4_DAY2,
    order: 9,
    memberName: "鈴木 裕士",
    // 1つ目は「友部駅プラットホームのブラインドに関連すること」と名乗っていて形が外れるので、議会だより第32号の見出しを使っている（運営者が了承。2026-11-24）
    items: ["ＪＲ友部駅について", "道路わきに設置されています道路案内標識について"],
  }),
  fromMinutes({
    ...H25_4_DAY2,
    order: 10,
    memberName: "石松 俊雄",
    // 3つ目の通告は時間の都合で取り下げ（次回に再通告）
    items: [
      "し尿・浄化槽清掃業務の現状と今後について",
      "「笠間学校給食配送及び回収業務の委託」に関する入札中止と入札制度改革について",
    ],
  }),
  fromMinutes({
    ...H25_4_DAY3,
    order: 11,
    memberName: "石田 安夫",
    items: [
      "防災について",
      "太陽光発電施設について",
      "佐白山及び芸術の森公園周辺の事業について",
    ],
  }),
  fromMinutes({
    ...H25_4_DAY3,
    order: 12,
    memberName: "鹿志村 清一",
    items: [
      "笠間市防災計画について",
      "平成25年度全国学力・学習状況調査の結果における笠間市の教育について",
      "児童館・児童クラブの図書室及び図書について",
    ],
  }),
];

/** 平成26年第1回定例会（3月）。一般質問は10日・11日・13日の3日間で10人 */
const H26_1 = {
  sessionKey: "h26-1-teirei",
  sessionName: "平成26年第1回定例会",
} as const;
const H26_1_DAY1 = {
  ...H26_1,
  questionDate: "2014-03-10",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1409720684_doc_153_2.pdf",
} as const;
const H26_1_DAY2 = {
  ...H26_1,
  questionDate: "2014-03-11",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1409720684_doc_153_3.pdf",
} as const;
const H26_1_DAY3 = {
  ...H26_1,
  questionDate: "2014-03-13",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1409720684_doc_153_4.pdf",
} as const;

const H26_1_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H26_1_DAY1,
    order: 1,
    memberName: "石田 安夫",
    items: [
      "防犯灯のＬＥＤ化について",
      "国道355号バイパス及び来栖・本戸線について",
      "ホテルステノの撤退について",
    ],
  }),
  fromMinutes({
    ...H26_1_DAY1,
    order: 2,
    memberName: "鹿志村 清一",
    // 3つ目は「学校給食と食育、地産地消を推進するためにということで」と読み上げていて形が外れるので、議会だより第33号の見出しを使っている（運営者が了承。2026-11-24）
    items: [
      "筑波海軍航空隊記念館について",
      "防災・観光・まちづくりにラジコンヘリの活用について",
      "学校給食と食育、地産地消を推進するために",
    ],
  }),
  fromMinutes({
    ...H26_1_DAY1,
    order: 3,
    memberName: "鈴木 貞夫",
    // 2つ目・3つ目は「介護保険制度の改正なのか、改悪なのか」「エコフロンティアの問題」と名乗っていて形が外れるので、議会だより第33号の見出しを使っている。
    // 4つ目は運営者が会議録の言い方「森林湖沼税の問題」を選んだ（2026-11-24）
    items: [
      "原子力災害対策計画について",
      "介護保険の見直しについて",
      "エコフロンティアかさまに埋立てられている放射性物質について",
      "森林湖沼税の問題",
    ],
  }),
  fromMinutes({
    ...H26_1_DAY1,
    order: 4,
    memberName: "野口 圓",
    // 1つ目は運営者が会議録の言い方「児童虐待の件」を選んだ。3つ目は運営者が議会だより第33号の見出し「企業誘致について」を選んだ（2026-11-24）
    items: ["児童虐待の件", "雇用対策について", "企業誘致について", "大雪災害について"],
  }),
  fromMinutes({
    ...H26_1_DAY2,
    order: 5,
    memberName: "横倉 きん",
    items: ["原子力防災について", "高齢化社会の課題について"],
  }),
  fromMinutes({
    ...H26_1_DAY2,
    order: 6,
    memberName: "石松 俊雄",
    items: ["受動喫煙防止対策について", "子ども・子育て新制度と市の対応について"],
  }),
  fromMinutes({
    ...H26_1_DAY2,
    order: 7,
    memberName: "鈴木 裕士",
    // 1つ目は会議録で題を読み上げていないので、議会だより第33号の見出しを使っている。2つ目は「ふるさと納税制度、これについて」と読み上げている
    items: ["先般の雪と地元業者の育成について", "ふるさと納税制度について"],
  }),
  fromMinutes({
    ...H26_1_DAY2,
    order: 8,
    memberName: "西山 猛",
    items: ["市内の環境保全施設について", "教育に投じる予算について"],
  }),
  fromMinutes({
    ...H26_1_DAY3,
    order: 9,
    memberName: "大関 久義",
    items: ["平成26年度に予算化された新規事業について"],
  }),
  fromMinutes({
    ...H26_1_DAY3,
    order: 10,
    memberName: "萩原 瑞子",
    items: ["道路行政について", "定住化対策について"],
  }),
];

/** 平成26年第2回定例会（6月）。一般質問は11日・12日・13日の3日間で13人 */
const H26_2 = {
  sessionKey: "h26-2-teirei",
  sessionName: "平成26年第2回定例会",
} as const;
const H26_2_DAY1 = {
  ...H26_2,
  questionDate: "2014-06-11",
  dayIndex: 1,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1407463864_doc_56_3.pdf",
} as const;
const H26_2_DAY2 = {
  ...H26_2,
  questionDate: "2014-06-12",
  dayIndex: 2,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1407463864_doc_56_4.pdf",
} as const;
const H26_2_DAY3 = {
  ...H26_2,
  questionDate: "2014-06-13",
  dayIndex: 3,
  minutesPdfUrl: "https://www.city.kasama.lg.jp/data/doc/1407463864_doc_56_5.pdf",
} as const;

const H26_2_RECORDS: readonly GeneralQuestionRecord[] = [
  fromMinutes({
    ...H26_2_DAY1,
    order: 1,
    memberName: "鈴木 貞夫",
    // 2つ目は会議録で題を読み上げていないので、議会だより第34号の見出しを使っている
    items: [
      "東海第二原発の安全審査、いわゆる再稼働の申請等について",
      "原子力災害対策計画について",
      "環境保全の問題について",
    ],
  }),
  fromMinutes({
    ...H26_2_DAY1,
    order: 2,
    memberName: "鹿志村 清一",
    items: ["笠間の科学理科教育について", "洪水への防災・減災への取り組みについて"],
  }),
  fromMinutes({
    ...H26_2_DAY1,
    order: 3,
    memberName: "大貫 千尋",
    // 会議録で題を読み上げているのは5つ目（市の外交について）だけ。1つ目・2つ目は議会だより第34号の見出し（形が外れる）、
    // 3つ目は議会だよりの見出し、4つ目は会議録の問いから言葉を切り出した。どれも運営者が了承（2026-11-25）
    items: [
      "子育てするなら笠間に住もう",
      "笠間市に大学を誘致しよう",
      "観光都市笠間市総合計画の策定について",
      "北川根地区の流通業務団地として取得した土地について",
      "市の外交について",
    ],
  }),
  fromMinutes({
    ...H26_2_DAY1,
    order: 4,
    memberName: "横倉 きん",
    items: [
      "教育環境の整備について",
      // 2つ目は運営者が議会だより第34号の見出しを選んだ（会議録は「市民交流センターの運営について」。2026-11-25）
      "友部地区地域交流センターについて",
      "東海第二原発と避難計画について",
    ],
  }),
  fromMinutes({
    ...H26_2_DAY1,
    order: 5,
    memberName: "飯田 正憲",
    items: [
      "肺炎球菌その他予防接種に関する公費の助成について",
      "お年寄りに優しく体をいたわるごみ出しについて",
      "通学路が危険な道路について",
    ],
  }),
  fromMinutes({
    ...H26_2_DAY2,
    order: 6,
    memberName: "石松 俊雄",
    // 2つ目のほかは会議録で題を読み上げていない。3つ目は議会だより第34号の見出し、1つ目・4つ目は会議録の問いから言葉を切り出した。運営者が了承（2026-11-25）
    items: [
      "医療介護一括改正法案の笠間市への影響と対策について",
      "介護健診クラウド事業の進捗状況について",
      "笠間市立病院建設事業について",
      "公共施設の資産管理について",
    ],
  }),
  fromMinutes({
    ...H26_2_DAY2,
    order: 7,
    memberName: "畑岡 洋二",
    items: [
      "筑波山地域ジオパーク構想について",
      "国際化に対応した人事交流について",
      "外国人観光客受け入れ対策について",
    ],
  }),
  fromMinutes({
    ...H26_2_DAY2,
    order: 8,
    memberName: "市村 博之",
    // 1つ目は「３期目の市政運営を担うに当たっての政治姿勢」と名乗っていて形が外れるので、議会だより第34号の見出しを使っている（運営者が了承。2026-11-25）
    items: [
      "３期目の市政を担うに当たっての市長の政治姿勢を問う",
      "市財政運営について",
      "広域行政の推進について",
      "教育行政について",
      "産業振興について",
    ],
  }),
  fromMinutes({
    ...H26_2_DAY2,
    order: 9,
    memberName: "鈴木 裕士",
    // 1つ目は会議録で題を読み上げていないので、議会だより第34号の見出しを使っている。
    // 3つ目は運営者が議会だよりの見出しを選んだ（会議録は「道路の里親制度について」。2026-11-25）
    items: ["認知症対策について", "農地・水環境保全活動について", "道路里親制度について"],
  }),
  fromMinutes({
    ...H26_2_DAY2,
    order: 10,
    memberName: "大関 久義",
    items: [
      "笠間市の防犯活動について",
      "子ども・子育て支援新制度について",
      "友部地区の歩道整備について",
    ],
  }),
  fromMinutes({
    ...H26_2_DAY3,
    order: 11,
    memberName: "野口 圓",
    // 2つとも運営者が会議録の言い方を選んだ（2026-11-25）
    items: ["人口減少をいかに食いとめるか", "子どもを褒めて育てるまちづくり"],
  }),
  fromMinutes({
    ...H26_2_DAY3,
    order: 12,
    memberName: "石田 安夫",
    items: ["ごみの収集について", "地域包括ケアシステムについて"],
  }),
  fromMinutes({
    ...H26_2_DAY3,
    order: 13,
    memberName: "町田 征久",
    // 2〜4つ目は形が外れるが、運営者が会議録の言い方を選んだ（2026-11-25）
    items: [
      "子育て支援について",
      "教育施設の改善",
      "保育料の無料化",
      "ターゲットバードゴルフ場の新設及び増設を",
      "高齢者対策について",
      "笠間市民球場、電光掲示板について",
    ],
  }),
];

export const MINUTES_GENERAL_QUESTIONS: readonly GeneralQuestionRecord[] = [
  // 平成18〜22年は会議録の順番＋議会だよりの題（別ファイルに書き出したもの）
  ...H18_H22_GENERAL_QUESTIONS,
  ...H23_2_RECORDS,
  ...H23_3_RECORDS,
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
  ...H25_1_RECORDS,
  ...H25_2_RECORDS,
  ...H25_3_RECORDS,
  ...H25_4_RECORDS,
  ...H26_1_RECORDS,
  ...H26_2_RECORDS,
];
