/**
 * 笠間市議会の委員会の顔ぶれ（歴代）。
 *
 * 委員の選任は会議録に「お手元の名簿のとおり」とだけあり、名前が無い。
 * 名前は、選任の後に出た議会だよりの名簿（常任委員会の紹介・各種委員会等の構成）を画像にして読んだもの。
 * 画像では一部の字が欠ける（「石﨑」の「﨑」など）ので、会議録の出席議員の名前と照らし合わせて補っている。
 *
 * あとで「歴代の委員会メンバー」のページを作るときに使う（運営者の依頼。2026-11-24）。
 * 選任のたびに1件（RosterSnapshot）を足す。議長の交代などで一部だけ変わったときも、その時点の全体を書く
 */

export interface CommitteeRoster {
  /** 委員会の名前（「総務委員会」など） */
  committee: string;
  /** 常任委員会・議会運営委員会など、議会の委員会の種類 */
  kind: "常任委員会" | "議会運営委員会" | "議会だより編集委員会" | "特別委員会";
  chair: string;
  viceChair: string;
  /** 委員長・副委員長を除く委員（名簿の並びのまま） */
  members: readonly string[];
}

export interface RosterSnapshot {
  /** 委員を選任した日（YYYY-MM-DD） */
  selectedOn: string;
  /** 選任した会期（seed の会期キー。kasama- は付けない） */
  sessionKey: string;
  /** どういうときの選任か */
  occasion: string;
  /** 名前を読んだ議会だより */
  source: { issue: number; pages: readonly number[]; url: string };
  committees: readonly CommitteeRoster[];
}

export const KASAMA_COMMITTEE_ROSTERS: readonly RosterSnapshot[] = [
  {
    selectedOn: "2011-01-05",
    sessionKey: "h23-1-rinji",
    occasion: "平成22年12月の市議会議員一般選挙の後、最初の議会（第1回臨時会）",
    source: {
      issue: 20,
      pages: [4, 5, 6],
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
  },
  {
    selectedOn: "2012-12-18",
    sessionKey: "h24-4-teirei",
    occasion: "議長・副議長の交代（第4回定例会の最終日）",
    source: {
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
  },
];
