import { describe, expect, it } from "vitest";
import {
  buildBillContent,
  buildCsvRows,
  buildMemberVotes,
  categorizeBill,
} from "./csv-rows";
import { R8_2_BILLS } from "./r8-2-teirei";
import { KASAMA_SESSIONS } from "./sessions";

function findSession(slug: string) {
  const found = KASAMA_SESSIONS.find((item) => item.slug === slug);
  if (!found) throw new Error(`${slug}がありません`);
  return found;
}

const session = findSession("kasama-r8-2-teirei");
const allBills = KASAMA_SESSIONS.flatMap((item) => item.bills);

describe("categorizeBill", () => {
  it.each([
    ["令和８年度笠間市一般会計補正予算（第１号）", "予算"],
    [
      "専決処分の承認を求めることについて（令和７年度笠間市一般会計補正予算（第７号））",
      "予算",
    ],
    ["笠間市副市長の選任に同意を求めることについて", "人事"],
    ["笠間市教育委員会委員の任命に同意を求めることについて", "人事"],
    ["人権擁護委員候補者の推薦に意見を求めることについて", "人事"],
    ["笠間市選挙管理委員会委員及び同補充員の選挙について", "人事"],
    ["審査請求に関する諮問について", "その他"],
    ["笠間市国民健康保険税条例の一部を改正する条例について", "条例"],
    ["動産購入契約の締結について（高規格救急自動車購入）", "契約・工事"],
    ["市道路線の認定について", "その他"],
  ])("%s は %s", (title, expected) => {
    expect(categorizeBill(title)).toBe(expected);
  });
});

describe("buildMemberVotes", () => {
  const bill37 = R8_2_BILLS.find((b) => b.billNumberLabel === "議案第37号");

  it("賛否を議員名と対応させる", () => {
    if (!bill37) throw new Error("議案第37号がありません");
    const votes = buildMemberVotes(session, bill37);
    const noVotes = votes?.entries
      .filter((e) => e.vote === "no")
      .map((e) => e.name);
    expect(noVotes).toEqual([
      "酒井正輝",
      "石井栄",
      "西山猛",
      "大貫千尋",
      "大関久義",
    ]);
    expect(votes?.entries.find((e) => e.name === "林田美代子")?.vote).toBe(
      "absent"
    );
    expect(votes?.entries.find((e) => e.name === "畑岡洋二")?.vote).toBe(
      "not_voting"
    );
  });

  it("全議員を同じ枠に入れ、評価につながる区分を作らない", () => {
    if (!bill37) throw new Error("議案第37号がありません");
    const factions = new Set(
      buildMemberVotes(session, bill37)?.entries.map((e) => e.faction)
    );
    expect([...factions]).toEqual(["議員"]);
  });

  it("賛否が分かれていない議案は null", () => {
    const bill = R8_2_BILLS.find((b) => b.billNumberLabel === "議案第35号");
    if (!bill) throw new Error("議案第35号がありません");
    expect(buildMemberVotes(session, bill)).toBeNull();
  });

  it("賛否の数が議員数と違えばエラーにする", () => {
    if (!bill37?.vote) throw new Error("議案第37号がありません");
    const broken = {
      ...bill37,
      vote: { ...bill37.vote, marks: bill37.vote.marks.slice(1) },
    };
    expect(() => buildMemberVotes(session, broken)).toThrow();
  });
});

describe("buildCsvRows", () => {
  const rows = buildCsvRows(KASAMA_SESSIONS);

  it("議案ごとに本文とタグの行を作る", () => {
    expect(rows.billRows).toHaveLength(allBills.length);
    expect(rows.contentRows).toHaveLength(allBills.length);
    expect(rows.billTagRows).toHaveLength(allBills.length);
  });

  it("IDが重複しない（会期が違えば同じ番号でも別の議案になる）", () => {
    const ids = rows.billRows.map((row) => row.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("提出者は議案に合わせて書き分ける", () => {
    const contentOf = (slug: string, label: string) => {
      const owner = findSession(slug);
      const bill = owner.bills.find((b) => b.billNumberLabel === label);
      if (!bill) throw new Error(`${label}がありません`);
      return buildBillContent(owner, bill);
    };
    expect(contentOf("kasama-r8-2-teirei", "議案第35号")).toContain(
      "**提出者**: 市長提出"
    );
    expect(contentOf("kasama-r8-1-teirei", "決議案第1号")).toContain(
      "**提出者**: 議員提出"
    );
    expect(contentOf("kasama-r8-2-teirei", "選挙第2号")).not.toContain(
      "**提出者**"
    );
  });

  it("IDは実行のたびに同じになる", () => {
    expect(buildCsvRows(KASAMA_SESSIONS).billRows[0].id).toBe(
      rows.billRows[0].id
    );
  });

  it("会期の slug は田川市のデータと混ざらない形にする", () => {
    for (const row of rows.sessionRows) {
      expect(String(row.slug).startsWith("kasama-")).toBe(true);
    }
  });

  it("田川市の表記が混ざらない", () => {
    const text = JSON.stringify(rows);
    expect(text).not.toMatch(/田川|tagawa|福岡/);
  });
});
