import { describe, expect, test } from "vitest";
import {
  type CommitteeRoster,
  KASAMA_COMMITTEE_ROSTERS,
} from "./kasama-committee-rosters";

/** 平成22年12月の選挙で選ばれた24人 */
const H22_ELECTED = [
  "畑岡洋二", "橋本良一", "小磯節子", "飯田正憲", "石田安夫", "鹿志村清一",
  "蛯澤幸一", "野口圓", "藤枝浩", "鈴木裕士", "鈴木貞夫", "西山猛",
  "石松俊雄", "海老澤勝", "萩原瑞子", "中澤猛", "上野登", "横倉きん",
  "町田征久", "大関久義", "市村博之", "柴沼広", "石﨑勝三", "小薗江一三",
];

/**
 * 任期の途中で議員になった人。西山猛が平成26年3月17日に辞職した（平成26年6月3日の会議録「諸般の報告」）。
 * 上野登は平成25年11月30日限りで辞職した（平成25年12月3日の会議録「諸般の報告」）。
 * 平成26年4月13日の補欠選挙で2人が当選した（平成26年6月3日の会議録「議席の指定」）
 */
const H22_TERM_BY_ELECTION = ["大貫千尋", "菅井信"];

/** この任期に議員だった人全員 */
const H22_TERM_MEMBERS = [...H22_ELECTED, ...H22_TERM_BY_ELECTION];

/** その日に議員だった人（辞職は上野登 2013-11-30、西山猛 2014-03-17。補欠選挙は 2014-04-13） */
const membersOn = (date: string) => [
  ...H22_ELECTED.filter(
    (name) =>
      !(name === "上野登" && date > "2013-11-30") && !(name === "西山猛" && date > "2014-03-17")
  ),
  ...(date >= "2014-04-13" ? H22_TERM_BY_ELECTION : []),
];

/** 平成22年12月の選挙から、次の平成26年12月14日の選挙までの任期の名簿 */
const H22_TERM = KASAMA_COMMITTEE_ROSTERS.filter(
  (s) => s.selectedOn >= "2010-12-12" && s.selectedOn < "2014-12-14"
);

const everyone = (c: CommitteeRoster) =>
  [c.chair, c.viceChair, ...c.members].filter((n): n is string => n !== null);

/** 平成26年12月14日の選挙からの任期の22人（議案データの H28_4_TEIREI_MEMBERS と同じ） */
const H26_TERM_MEMBERS = [
  "田村泰之", "村上寿之", "石井栄", "小松﨑均", "菅井信", "畑岡洋二", "橋本良一", "石田安夫",
  "蛯澤幸一", "野口圓", "飯田正憲", "西山猛", "石松俊雄", "海老澤勝", "萩原瑞子", "横倉きん",
  "大貫千尋", "大関久義", "市村博之", "小薗江一三", "石﨑勝三", "藤枝浩",
];

describe("KASAMA_COMMITTEE_ROSTERS（平成26年12月からの任期）", () => {
  const term = KASAMA_COMMITTEE_ROSTERS.filter(
    (s) => s.selectedOn >= "2014-12-14" && s.selectedOn < "2018-12-09"
  );

  test("予算・決算特別委員会が毎年1回ずつ、4年分ある", () => {
    const special = term.flatMap((s) => s.committees).filter((c) => c.kind === "特別委員会");
    expect(special.filter((c) => c.committee === "予算特別委員会")).toHaveLength(4);
    expect(special.filter((c) => c.committee === "決算特別委員会")).toHaveLength(4);
  });

  test("選挙の後の常任委員会は3つで、議長（藤枝浩）を除く21人がちょうど1回ずつ出てくる", () => {
    const first = term.find((s) => s.selectedOn === "2014-12-25");
    const names = (first?.committees ?? [])
      .filter((c) => c.kind === "常任委員会")
      .flatMap(everyone);
    expect([...names].sort()).toEqual(H26_TERM_MEMBERS.filter((n) => n !== "藤枝浩").sort());
  });

  test("どの委員会・議会の外の役職でも、名前はその任期の議員", () => {
    for (const snapshot of term) {
      for (const committee of snapshot.committees) {
        for (const name of everyone(committee)) expect(H26_TERM_MEMBERS).toContain(name);
      }
      for (const post of snapshot.outsideCouncilPosts ?? []) {
        for (const { name } of post.posts) expect(H26_TERM_MEMBERS).toContain(name);
      }
    }
  });

  test("特別委員会は9人で、名前はその任期の議員", () => {
    for (const snapshot of term) {
      for (const committee of snapshot.committees.filter((c) => c.kind === "特別委員会")) {
        const names = everyone(committee);
        expect(names).toHaveLength(9);
        expect(new Set(names).size).toBe(9);
        for (const name of names) expect(H26_TERM_MEMBERS).toContain(name);
      }
    }
  });
});

describe("KASAMA_COMMITTEE_ROSTERS（平成22年12月からの任期）", () => {
  test("この任期の名簿がある", () => {
    expect(H22_TERM.length).toBeGreaterThan(0);
  });

  test("選任した日の順に並んでいる", () => {
    const dates = KASAMA_COMMITTEE_ROSTERS.map((s) => s.selectedOn);
    expect(dates).toEqual([...dates].sort());
  });

  test.each(
    H22_TERM.filter((s) => s.committees.some((c) => c.kind === "常任委員会")).map(
      (s) => [s.selectedOn, s] as const
    )
  )("%s: 常任委員会4つで、議員全員がちょうど1回ずつ出てくる", (_, snapshot) => {
    const names = snapshot.committees
      .filter((c) => c.kind === "常任委員会")
      .flatMap(everyone);
    expect([...names].sort()).toEqual([...membersOn(snapshot.selectedOn)].sort());
  });

  test("どの委員会・議会の外の役職でも、名前はその任期の議員で、委員会の中で重なりが無い", () => {
    for (const snapshot of H22_TERM) {
      for (const committee of snapshot.committees) {
        const names = everyone(committee);
        expect(new Set(names).size).toBe(names.length);
        for (const name of names) expect(H22_TERM_MEMBERS).toContain(name);
      }
      for (const post of snapshot.outsideCouncilPosts ?? []) {
        for (const { name } of post.posts) expect(H22_TERM_MEMBERS).toContain(name);
      }
    }
  });

  test("予算・決算特別委員会は8人", () => {
    for (const snapshot of H22_TERM) {
      for (const c of snapshot.committees) {
        if (/^(予算|決算)特別委員会$/.test(c.committee)) {
          expect(everyone(c)).toHaveLength(8);
        }
      }
    }
  });
});
