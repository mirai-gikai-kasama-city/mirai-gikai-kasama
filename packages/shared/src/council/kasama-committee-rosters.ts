/**
 * 笠間市議会の委員会の顔ぶれ（歴代）と、議員が就いている議会の外の役職。
 *
 * あとで「歴代の委員会メンバー」のページを作るときに使う（運営者の依頼。2026-11-24）。
 * 選任のたびに1件（RosterSnapshot）を足す。議長の交代などで一部だけ変わったときも、その時点の全体を書く。
 *
 * 名前の出どころ:
 * - 常任委員会・議会運営委員会・議会だより編集委員会: 会議録には「お手元の名簿のとおり」とだけあり名前が無いので、
 *   選任の後に出た議会だよりの名簿（常任委員会の紹介・各種委員会等の構成）を画像にして読んだ。
 *   画像では一部の字が欠ける（「石﨑」の「﨑」など）ので、会議録の出席議員の名前と照らし合わせて補っている
 * - 特別委員会（予算・決算など）: 会議録で議長が委員の名前を読み上げている。委員長は、本会議で委員長報告をした議員。
 *   副委員長は会議録に出てこないので null
 * - 議会の外の役職（outsideCouncilPosts）: 議会だよりの「各種委員会等の構成」の表
 */

/** 議会の委員会 */
export interface CommitteeRoster {
  /** 委員会の名前（「総務委員会」など） */
  committee: string;
  kind: "常任委員会" | "議会運営委員会" | "議会だより編集委員会" | "特別委員会";
  /** 委員長。資料で分からないときは null */
  chair: string | null;
  /** 副委員長。資料で分からないときは null */
  viceChair: string | null;
  /** 委員長・副委員長を除く委員（資料の並びのまま） */
  members: readonly string[];
  /** 補足（委員長が途中で変わったように見えるときなど） */
  note?: string;
}

/**
 * 議員が議会から出ている、議会の外の役職（一部事務組合の議会、監査委員、市の審議会など）。
 * 議会の委員会ではない。ページにするときは議会の委員会と分け、議会の外の役職であることが
 * 分かるように出す（運営者の指示。2026-11-24）
 */
export interface OutsideCouncilPost {
  /** 団体・会議の名前（議会だよりの表のまま） */
  body: string;
  /** その団体での役（「議員」「委員」「理事」など） */
  posts: readonly { role: string; name: string }[];
}

export type RosterSource =
  | { kind: "議会だより"; issue: number; pages: readonly number[]; url: string }
  | { kind: "会議録"; note: string };

export interface RosterSnapshot {
  /** 委員を選任した日（YYYY-MM-DD） */
  selectedOn: string;
  /** 選任した会期（seed の会期キー。kasama- は付けない） */
  sessionKey: string;
  /** どういうときの選任か */
  occasion: string;
  source: RosterSource;
  committees: readonly CommitteeRoster[];
  /** 議会の外の役職（議会だよりの表があるときだけ） */
  outsideCouncilPosts?: readonly OutsideCouncilPost[];
}

const member = (name: string) => ({ role: "委員", name });
const unionMember = (name: string) => ({ role: "議員", name });

/** 特別委員会（予算・決算）の選任。委員の名前は会議録の読み上げのまま（平成26年までは8人、それ以降は9人） */
function specialCommittee(input: {
  selectedOn: string;
  sessionKey: string;
  committee: string;
  occasion: string;
  names: readonly string[];
  chair: string;
  chairReportedOn: string;
}): RosterSnapshot {
  return {
    selectedOn: input.selectedOn,
    sessionKey: input.sessionKey,
    occasion: input.occasion,
    source: {
      kind: "会議録",
      note: `${input.selectedOn} の本会議で議長が委員を指名。委員長は ${input.chairReportedOn} の本会議で委員長報告をした議員`,
    },
    committees: [
      {
        committee: input.committee,
        kind: "特別委員会",
        chair: input.chair,
        viceChair: null,
        members: input.names.filter((name) => name !== input.chair),
      },
    ],
  };
}

export const KASAMA_COMMITTEE_ROSTERS: readonly RosterSnapshot[] = [
  {
    selectedOn: "2011-01-05",
    sessionKey: "h23-1-rinji",
    occasion: "平成22年12月の市議会議員一般選挙の後、最初の議会（第1回臨時会）",
    source: {
      kind: "議会だより",
      issue: 20,
      pages: [4, 5, 6, 7],
      url: "https://www.city.kasama.lg.jp/page/page000048.html",
    },
    committees: [
      {
        committee: "総務委員会",
        kind: "常任委員会",
        chair: "蛯澤幸一",
        viceChair: "上野登",
        members: ["畑岡洋二", "藤枝浩", "横倉きん", "柴沼広"],
      },
      {
        committee: "文教厚生委員会",
        kind: "常任委員会",
        chair: "石松俊雄",
        viceChair: "小磯節子",
        members: ["石田安夫", "鈴木貞夫", "萩原瑞子", "中澤猛"],
      },
      {
        committee: "産業経済委員会",
        kind: "常任委員会",
        chair: "野口圓",
        viceChair: "飯田正憲",
        members: ["橋本良一", "鹿志村清一", "海老澤勝", "町田征久"],
      },
      {
        committee: "土木建設委員会",
        kind: "常任委員会",
        chair: "西山猛",
        viceChair: "鈴木裕士",
        members: ["大関久義", "市村博之", "小薗江一三", "石﨑勝三"],
      },
      {
        committee: "議会運営委員会",
        kind: "議会運営委員会",
        chair: "藤枝浩",
        viceChair: "石松俊雄",
        members: ["飯田正憲", "野口圓", "鈴木貞夫", "西山猛", "上野登", "大関久義"],
      },
      {
        committee: "議会だより編集委員会",
        kind: "議会だより編集委員会",
        chair: "鈴木貞夫",
        viceChair: "橋本良一",
        members: ["畑岡洋二", "鹿志村清一", "野口圓", "大関久義"],
      },
    ],
    outsideCouncilPosts: [
      { body: "茨城県後期高齢者医療広域連合議会", posts: [unionMember("萩原瑞子")] },
      {
        body: "水戸地方広域市町村圏事務組合議会（ひぬま荘）",
        posts: ["鹿志村清一", "鈴木裕士"].map(unionMember),
      },
      {
        body: "笠間地方広域事務組合議会（斎場）",
        posts: ["橋本良一", "小磯節子", "飯田正憲", "蛯澤幸一", "野口圓", "横倉きん"].map(unionMember),
      },
      {
        body: "筑北環境衛生組合議会（し尿処理）",
        posts: ["石田安夫", "蛯澤幸一", "鈴木貞夫", "小薗江一三"].map(unionMember),
      },
      {
        body: "笠間・水戸環境組合議会（ごみ処理）",
        posts: ["西山猛", "石松俊雄", "上野登", "町田征久"].map(unionMember),
      },
      {
        body: "茨城地方広域環境事務組合議会（し尿処理）",
        posts: ["鈴木裕士", "萩原瑞子", "大関久義", "石﨑勝三"].map(unionMember),
      },
      { body: "笠間市監査委員", posts: [member("中澤猛")] },
      {
        body: "（財）笠間市開発公社",
        posts: [
          { role: "理事", name: "石田安夫" },
          { role: "理事", name: "蛯澤幸一" },
          { role: "監事", name: "畑岡洋二" },
          { role: "評議員", name: "鈴木貞夫" },
          { role: "評議員", name: "萩原瑞子" },
        ],
      },
      { body: "水道運営審議会", posts: ["飯田正憲", "蛯澤幸一"].map(member) },
      {
        body: "国民健康保険運営協議会",
        posts: ["小磯節子", "鹿志村清一", "鈴木裕士", "横倉きん"].map(member),
      },
      { body: "防災会議", posts: [member("柴沼広")] },
      { body: "環境審議会", posts: ["小磯節子", "萩原瑞子"].map(member) },
      { body: "次世代育成支援対策地域協議会", posts: [member("石松俊雄")] },
      { body: "高齢者福祉計画・介護保険事業計画策定委員会", posts: [member("鈴木貞夫")] },
      { body: "市立小中学校学区審議会", posts: ["柴沼広", "中澤猛"].map(member) },
      { body: "農政推進協議会", posts: [member("町田征久")] },
      { body: "農産品ブランド化推進協議会", posts: [member("鹿志村清一")] },
      { body: "下水道審議会", posts: ["野口圓", "鈴木裕士", "鈴木貞夫"].map(member) },
      { body: "行政改革推進委員会", posts: [member("西山猛")] },
      { body: "男女共同参画審議会", posts: [member("萩原瑞子")] },
      {
        body: "都市計画審議会",
        posts: ["飯田正憲", "蛯澤幸一", "鈴木貞夫", "市村博之"].map(member),
      },
      { body: "地域公共交通会議", posts: [member("柴沼広")] },
      { body: "民生委員推薦会", posts: ["柴沼広", "石松俊雄"].map(member) },
      {
        body: "笠間市社会福祉協議会",
        posts: [
          { role: "理事", name: "石松俊雄" },
          { role: "評議員", name: "萩原瑞子" },
        ],
      },
      { body: "スポーツ振興審議会", posts: [member("石田安夫")] },
      { body: "資料館運営委員会", posts: [member("石田安夫")] },
      { body: "農業振興地域整備促進協議会", posts: [member("橋本良一")] },
      { body: "水田農業推進協議会", posts: [{ role: "会員", name: "海老澤勝" }] },
    ],
  },
  specialCommittee({
    selectedOn: "2011-03-03",
    sessionKey: "h23-1-teirei",
    committee: "予算特別委員会",
    occasion: "平成23年度の当初予算の審査のため（第1回定例会）",
    names: ["蛯澤幸一", "畑岡洋二", "小磯節子", "萩原瑞子", "鹿志村清一", "橋本良一", "西山猛", "大関久義"],
    chair: "大関久義",
    chairReportedOn: "2011-03-18",
  }),
  specialCommittee({
    selectedOn: "2011-09-05",
    sessionKey: "h23-3-teirei",
    committee: "決算特別委員会",
    occasion: "平成22年度の決算の審査のため（第3回定例会）",
    names: ["飯田正憲", "蛯澤幸一", "野口圓", "藤枝浩", "鈴木裕士", "石松俊雄", "萩原瑞子", "市村博之"],
    chair: "石松俊雄",
    chairReportedOn: "2011-09-16",
  }),
  specialCommittee({
    selectedOn: "2012-03-02",
    sessionKey: "h24-1-teirei",
    committee: "予算特別委員会",
    occasion: "平成24年度の当初予算の審査のため（第1回定例会）",
    names: ["畑岡洋二", "橋本良一", "小磯節子", "石田安夫", "蛯澤幸一", "野口圓", "鈴木裕士", "大関久義"],
    chair: "野口圓",
    chairReportedOn: "2012-03-16",
  }),
  specialCommittee({
    selectedOn: "2012-09-06",
    sessionKey: "h24-3-teirei",
    committee: "決算特別委員会",
    occasion: "平成23年度の決算の審査のため（第3回定例会）",
    names: ["畑岡洋二", "橋本良一", "鹿志村清一", "蛯澤幸一", "鈴木裕士", "鈴木貞夫", "萩原瑞子", "市村博之"],
    chair: "萩原瑞子",
    chairReportedOn: "2012-09-21",
  }),
  {
    selectedOn: "2012-12-18",
    sessionKey: "h24-4-teirei",
    occasion: "議長・副議長の交代（第4回定例会の最終日）",
    source: {
      kind: "議会だより",
      issue: 28,
      pages: [5, 6],
      url: "https://www.city.kasama.lg.jp/page/page003025.html",
    },
    committees: [
      {
        committee: "総務委員会",
        kind: "常任委員会",
        chair: "海老澤勝",
        viceChair: "飯田正憲",
        members: ["野口圓", "藤枝浩", "町田征久", "柴沼広"],
      },
      {
        committee: "文教厚生委員会",
        kind: "常任委員会",
        chair: "萩原瑞子",
        viceChair: "横倉きん",
        members: ["石田安夫", "石松俊雄", "市村博之", "小薗江一三"],
      },
      {
        committee: "産業経済委員会",
        kind: "常任委員会",
        chair: "小磯節子",
        viceChair: "橋本良一",
        members: ["畑岡洋二", "蛯澤幸一", "鈴木裕士", "鈴木貞夫"],
      },
      {
        committee: "土木建設委員会",
        kind: "常任委員会",
        chair: "西山猛",
        viceChair: "上野登",
        members: ["鹿志村清一", "大関久義", "中澤猛", "石﨑勝三"],
      },
      {
        committee: "議会運営委員会",
        kind: "議会運営委員会",
        chair: "蛯澤幸一",
        viceChair: "横倉きん",
        members: ["橋本良一", "野口圓", "西山猛", "石松俊雄", "大関久義", "柴沼広"],
      },
      {
        committee: "議会だより編集委員会",
        kind: "議会だより編集委員会",
        chair: "鹿志村清一",
        viceChair: "畑岡洋二",
        members: ["橋本良一", "鈴木貞夫", "西山猛", "町田征久"],
      },
    ],
    outsideCouncilPosts: [
      { body: "笠間市監査委員", posts: [member("柴沼広")] },
      { body: "茨城県後期高齢者医療広域連合議会", posts: [unionMember("町田征久")] },
      { body: "農業委員会", posts: [member("町田征久")] },
      {
        body: "笠間地方広域事務組合議会（斎場）",
        posts: ["畑岡洋二", "橋本良一", "飯田正憲", "鹿志村清一", "蛯澤幸一", "横倉きん"].map(unionMember),
      },
      {
        body: "筑北環境衛生組合議会（し尿処理）",
        posts: ["畑岡洋二", "石田安夫", "蛯澤幸一", "鈴木貞夫"].map(unionMember),
      },
      {
        body: "笠間・水戸環境組合議会（ごみ処理）",
        posts: ["野口圓", "石松俊雄", "海老澤勝", "上野登"].map(unionMember),
      },
      {
        body: "茨城地方広域環境事務組合議会（し尿処理）",
        posts: ["西山猛", "大関久義", "柴沼広", "石﨑勝三"].map(unionMember),
      },
      {
        body: "笠間市社会福祉協議会",
        posts: [
          { role: "理事", name: "萩原瑞子" },
          { role: "評議員", name: "横倉きん" },
        ],
      },
      { body: "国民健康保険運営協議会", posts: ["鈴木裕士", "萩原瑞子"].map(member) },
      { body: "笠間市地域公共交通会議", posts: [member("小薗江一三")] },
      { body: "資料館運営委員会", posts: [member("市村博之")] },
      { body: "笠間市防災会議", posts: [member("小薗江一三")] },
      { body: "高齢者福祉計画・介護保険事業計画策定委員会", posts: [member("横倉きん")] },
      { body: "笠間市民生委員推薦会", posts: ["萩原瑞子", "小薗江一三"].map(member) },
      { body: "茨城中央地域農業振興協議会", posts: [member("小磯節子")] },
      { body: "農政推進協議会", posts: [member("畑岡洋二")] },
      { body: "農業再生協議会", posts: [{ role: "会員", name: "蛯澤幸一" }] },
      { body: "農産品ブランド化推進協議会", posts: [member("橋本良一")] },
      {
        body: "（財）笠間市開発公社",
        posts: [
          { role: "理事", name: "石田安夫" },
          { role: "理事", name: "蛯澤幸一" },
          { role: "監事", name: "萩原瑞子" },
          { role: "評議員", name: "畑岡洋二" },
          { role: "評議員", name: "鈴木貞夫" },
        ],
      },
      {
        body: "都市計画審議会",
        posts: ["鈴木貞夫", "町田征久", "大関久義", "市村博之"].map(member),
      },
      { body: "下水道審議会", posts: ["野口圓", "鈴木裕士", "鈴木貞夫"].map(member) },
      { body: "水道運営審議会", posts: ["飯田正憲", "鹿志村清一"].map(member) },
      { body: "環境審議会", posts: ["石松俊雄", "横倉きん"].map(member) },
      { body: "笠間市交通安全対策協議会", posts: ["小磯節子", "中澤猛"].map(member) },
      { body: "行政改革推進委員会", posts: [member("飯田正憲")] },
      { body: "男女共同参画審議会", posts: [member("横倉きん")] },
      { body: "農業振興地域整備促進協議会", posts: [member("鈴木裕士")] },
      { body: "都市計画道路再検討委員会", posts: [member("西山猛")] },
      { body: "スポーツ推進審議会", posts: [member("石田安夫")] },
    ],
  },
  specialCommittee({
    selectedOn: "2013-03-04",
    sessionKey: "h25-1-teirei",
    committee: "予算特別委員会",
    occasion: "平成25年度の当初予算の審査のため（第1回定例会）",
    names: ["畑岡洋二", "飯田正憲", "鹿志村清一", "鈴木裕士", "海老澤勝", "萩原瑞子", "横倉きん", "大関久義"],
    chair: "大関久義",
    chairReportedOn: "2013-03-18",
  }),
  {
    selectedOn: "2013-03-18",
    sessionKey: "h25-1-teirei",
    occasion: "議員提出議案第1号で議会改革活性化特別委員会を設置（第1回定例会の最終日）",
    source: {
      kind: "会議録",
      note: "2013-03-18 の本会議で議長が12人を指名",
    },
    committees: [
      {
        committee: "議会改革活性化特別委員会",
        kind: "特別委員会",
        chair: null,
        viceChair: null,
        members: [
          "小磯節子", "飯田正憲", "蛯澤幸一", "野口圓", "西山猛", "石松俊雄",
          "海老澤勝", "萩原瑞子", "横倉きん", "町田征久", "大関久義", "市村博之",
        ],
        note: "本会議で委員長として報告したのは、2013-09-20 は西山猛、2014-06-03 は野口圓。委員長が代わった経緯はまだ確かめていない",
      },
    ],
  },
  specialCommittee({
    selectedOn: "2013-09-05",
    sessionKey: "h25-3-teirei",
    committee: "決算特別委員会",
    occasion: "平成24年度の決算の審査のため（第3回定例会）",
    names: ["小磯節子", "野口圓", "鈴木貞夫", "西山猛", "海老澤勝", "萩原瑞子", "横倉きん", "大関久義"],
    chair: "海老澤勝",
    chairReportedOn: "2013-09-20",
  }),
  specialCommittee({
    selectedOn: "2014-02-27",
    sessionKey: "h26-1-teirei",
    committee: "予算特別委員会",
    occasion: "平成26年度の当初予算の審査のため（第1回定例会）",
    names: ["畑岡洋二", "鹿志村清一", "蛯澤幸一", "野口圓", "海老澤勝", "萩原瑞子", "横倉きん", "大関久義"],
    chair: "野口圓",
    chairReportedOn: "2014-03-14",
  }),
  {
    // 選任した日は資料に無い。補欠選挙（2014-04-13）の後、議会だより第33号（2014年5月ごろ発行）までに決まっている。
    // 臨時会は無く、会議録に選任の記録は無い
    selectedOn: "2014-04-13",
    sessionKey: "h26-2-teirei",
    occasion:
      "上野登（2013-11-30 辞職）・西山猛（2014-03-17 辞職）の後、補欠選挙で当選した大貫千尋・菅井信が委員会に入った",
    source: {
      kind: "議会だより",
      issue: 33,
      pages: [8, 20],
      url: "https://www.city.kasama.lg.jp/page/page005176.html",
    },
    committees: [
      {
        committee: "総務委員会",
        kind: "常任委員会",
        chair: "海老澤勝",
        viceChair: "飯田正憲",
        members: ["野口圓", "藤枝浩", "町田征久", "柴沼広"],
        note: "議会だより第33号に変更の記載が無いので、平成24年12月の名簿のまま",
      },
      {
        committee: "文教厚生委員会",
        kind: "常任委員会",
        chair: "萩原瑞子",
        viceChair: "横倉きん",
        members: ["石田安夫", "石松俊雄", "市村博之", "小薗江一三"],
        note: "議会だより第33号に変更の記載が無いので、平成24年12月の名簿のまま",
      },
      {
        committee: "産業経済委員会",
        kind: "常任委員会",
        chair: "小磯節子",
        viceChair: "橋本良一",
        members: ["畑岡洋二", "蛯澤幸一", "鈴木裕士", "鈴木貞夫"],
        note: "議会だより第33号に変更の記載が無いので、平成24年12月の名簿のまま",
      },
      {
        committee: "土木建設委員会",
        kind: "常任委員会",
        chair: "大関久義",
        viceChair: null,
        members: ["鹿志村清一", "中澤猛", "石﨑勝三", "菅井信", "大貫千尋"],
        note:
          "委員長だった西山猛と副委員長だった上野登が辞職し、大貫千尋・菅井信が入った（議会だより第33号8ページ「所属常任委員会」）。委員長は 2014-06-16・09-19 の本会議で土木建設委員長として報告した大関久義。副委員長は資料に無い",
      },
      {
        committee: "議会運営委員会",
        kind: "議会運営委員会",
        chair: "蛯澤幸一",
        viceChair: "横倉きん",
        members: ["橋本良一", "野口圓", "石松俊雄", "大関久義", "柴沼広"],
        note: "委員だった西山猛が辞職した。後任が入ったかは資料で確かめられていない。委員長は会議録の委員長報告（2014-06-03）で蛯澤幸一",
      },
      {
        committee: "議会だより編集委員会",
        kind: "議会だより編集委員会",
        chair: "鹿志村清一",
        viceChair: "畑岡洋二",
        members: ["菅井信", "橋本良一", "鈴木貞夫", "町田征久"],
        note: "辞職した西山猛に代わって菅井信が入った（議会だより第33号・第34号の編集後記の欄）",
      },
    ],
  },
  specialCommittee({
    selectedOn: "2014-09-04",
    sessionKey: "h26-3-teirei",
    committee: "決算特別委員会",
    occasion: "平成25年度の決算の審査のため（第3回定例会）",
    names: ["菅井信", "小磯節子", "野口圓", "鈴木裕士", "石松俊雄", "海老澤勝", "横倉きん", "大関久義"],
    chair: "鈴木裕士",
    chairReportedOn: "2014-09-19",
  }),

  // ── 平成26年12月14日の選挙からの任期（定数22人。特別委員会は9人） ──
  // 常任委員会などの顔ぶれ（議会だよりの名簿）はまだ入れていない
  specialCommittee({
    selectedOn: "2015-03-05",
    sessionKey: "h27-1-teirei",
    committee: "予算特別委員会",
    occasion: "平成27年度の当初予算の審査のため（第1回定例会）",
    names: ["村上寿之", "石井栄", "小松﨑均", "菅井信", "畑岡洋二", "野口圓", "横倉きん", "大貫千尋", "大関久義"],
    chair: "大関久義",
    chairReportedOn: "2015-03-20",
  }),
  specialCommittee({
    selectedOn: "2015-09-03",
    sessionKey: "h27-3-teirei",
    committee: "決算特別委員会",
    occasion: "平成26年度の決算の審査のため（第3回定例会）",
    names: ["村上寿之", "石井栄", "小松﨑均", "菅井信", "畑岡洋二", "橋本良一", "飯田正憲", "横倉きん", "大貫千尋"],
    chair: "飯田正憲",
    chairReportedOn: "2015-09-17",
  }),
  specialCommittee({
    selectedOn: "2016-03-03",
    sessionKey: "h28-1-teirei",
    committee: "予算特別委員会",
    occasion: "平成28年度の当初予算の審査のため（第1回定例会）",
    names: ["田村泰之", "橋本良一", "石田安夫", "飯田正憲", "西山猛", "石松俊雄", "萩原瑞子", "大関久義", "市村博之"],
    chair: "石田安夫",
    chairReportedOn: "2016-03-17",
  }),
  specialCommittee({
    selectedOn: "2016-09-05",
    sessionKey: "h28-3-teirei",
    committee: "決算特別委員会",
    occasion: "平成27年度の決算の審査のため（第3回定例会）",
    names: ["村上寿之", "菅井信", "橋本良一", "野口圓", "西山猛", "石松俊雄", "海老澤勝", "萩原瑞子", "横倉きん"],
    chair: "菅井信",
    chairReportedOn: "2016-09-16",
  }),
  specialCommittee({
    selectedOn: "2017-03-02",
    sessionKey: "h29-1-teirei",
    committee: "予算特別委員会",
    occasion: "平成29年度の当初予算の審査のため（第1回定例会）",
    names: ["田村泰之", "村上寿之", "石井栄", "小松﨑均", "畑岡洋二", "橋本良一", "石田安夫", "萩原瑞子", "市村博之"],
    chair: "萩原瑞子",
    chairReportedOn: "2017-03-16",
  }),
  specialCommittee({
    selectedOn: "2017-09-04",
    sessionKey: "h29-3-teirei",
    committee: "決算特別委員会",
    occasion: "平成28年度の決算の審査のため（第3回定例会）",
    names: ["田村泰之", "村上寿之", "畑岡洋二", "橋本良一", "石田安夫", "野口圓", "萩原瑞子", "横倉きん", "小薗江一三"],
    chair: "萩原瑞子",
    chairReportedOn: "2017-09-15",
  }),
  specialCommittee({
    selectedOn: "2018-02-28",
    sessionKey: "h30-1-teirei",
    committee: "予算特別委員会",
    occasion: "平成30年度の当初予算の審査のため（第1回定例会）",
    names: ["田村泰之", "小松﨑均", "菅井信", "畑岡洋二", "野口圓", "西山猛", "石松俊雄", "萩原瑞子", "大関久義"],
    chair: "西山猛",
    chairReportedOn: "2018-03-14",
  }),
  specialCommittee({
    selectedOn: "2018-09-06",
    sessionKey: "h30-3-teirei",
    committee: "決算特別委員会",
    occasion: "平成29年度の決算の審査のため（第3回定例会）",
    names: ["田村泰之", "村上寿之", "石井栄", "小松﨑均", "畑岡洋二", "石田安夫", "野口圓", "西山猛", "萩原瑞子"],
    chair: "野口圓",
    chairReportedOn: "2018-09-21",
  }),
];
