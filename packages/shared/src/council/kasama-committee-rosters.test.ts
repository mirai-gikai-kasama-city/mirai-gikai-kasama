import { describe, expect, test } from "vitest";
import { KASAMA_COMMITTEE_ROSTERS } from "./kasama-committee-rosters";

/** 平成22年12月の選挙で選ばれた24人（任期中に入れ替わりは無い） */
const H22_TERM_MEMBERS = [
  "畑岡洋二", "橋本良一", "小磯節子", "飯田正憲", "石田安夫", "鹿志村清一",
  "蛯澤幸一", "野口圓", "藤枝浩", "鈴木裕士", "鈴木貞夫", "西山猛",
  "石松俊雄", "海老澤勝", "萩原瑞子", "中澤猛", "上野登", "横倉きん",
  "町田征久", "大関久義", "市村博之", "柴沼広", "石﨑勝三", "小薗江一三",
];

const everyone = (c: { chair: string; viceChair: string; members: readonly string[] }) => [
  c.chair,
  c.viceChair,
  ...c.members,
];

/** 平成22年12月の選挙から、次の平成26年12月14日の選挙までの任期の名簿 */
const H22_TERM = KASAMA_COMMITTEE_ROSTERS.filter(
  (s) => s.selectedOn >= "2010-12-12" && s.selectedOn < "2014-12-14"
);

describe("KASAMA_COMMITTEE_ROSTERS（平成22年12月からの任期）", () => {
  test("この任期の名簿がある", () => {
    expect(H22_TERM.length).toBeGreaterThan(0);
  });

  test.each(H22_TERM.map((s) => [s.selectedOn, s] as const))(
    "%s: 常任委員会4つで、議員全員がちょうど1回ずつ出てくる",
    (_, snapshot) => {
      const names = snapshot.committees
        .filter((c) => c.kind === "常任委員会")
        .flatMap(everyone);
      expect(names).toHaveLength(H22_TERM_MEMBERS.length);
      expect([...names].sort()).toEqual([...H22_TERM_MEMBERS].sort());
    }
  );

  test("どの委員会でも、名前はその任期の議員で、重なりが無い", () => {
    for (const snapshot of H22_TERM) {
      for (const committee of snapshot.committees) {
        const names = everyone(committee);
        expect(new Set(names).size).toBe(names.length);
        for (const name of names) expect(H22_TERM_MEMBERS).toContain(name);
      }
    }
  });
});
