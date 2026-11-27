import type { GeneralQuestionRecord } from "@mirai-gikai/shared/council/types";
import { describe, expect, it } from "vitest";
import {
  buildQuestionSearchItems,
  searchQuestions,
  selectQuestionsByMemberKey,
  selectQuestionsByTheme,
} from "./question-search";

function record(
  overrides: Partial<GeneralQuestionRecord> & { id: string }
): GeneralQuestionRecord {
  return {
    sessionKey: "kasama-r8-3-teirei",
    sessionName: "令和8年第3回定例会",
    questionDate: "2026-09-09",
    dayIndex: 1,
    order: 1,
    memberName: "田村 幸子",
    familyName: "田村",
    faction: null,
    isRepresentative: false,
    format: null,
    items: ["観光について"],
    outline: null,
    videoUrl: null,
    sourceUrl: "https://example.com",
    pdfUrl: null,
    ...overrides,
  };
}

const items = buildQuestionSearchItems([
  record({ id: "old", questionDate: "2020-06-10", items: ["学校給食について"] }),
  record({
    id: "new",
    memberName: "石井 栄",
    familyName: "石井",
    items: ["防災行政無線について"],
    // 質問事項に無い言葉も、通告書の要旨からテーマを判定する
    outline: [
      {
        title: "防災行政無線について",
        points: [{ text: "空き家の倒壊への備え", subPoints: [] }],
      },
    ],
  }),
]);

describe("buildQuestionSearchItems", () => {
  it("質問日の新しい順に並べ、要旨も使ってテーマを判定する", () => {
    expect(items.map((item) => item.id)).toEqual(["new", "old"]);
    expect(items[0].themes).toEqual(["city", "safety"]);
    expect(items[0].memberKey).toBe("石井栄");
  });
});

describe("searchQuestions / selectQuestionsByTheme / selectQuestionsByMemberKey", () => {
  it("キーワードは質問事項・議員名・会期名から探す（空白区切りはAND検索）", () => {
    expect(searchQuestions(items, "給食").map((item) => item.id)).toEqual([
      "old",
    ]);
    expect(searchQuestions(items, "石井 ボウサイ")).toHaveLength(0);
    expect(searchQuestions(items, "石井 防災").map((item) => item.id)).toEqual([
      "new",
    ]);
    expect(searchQuestions(items, "  ")).toEqual([]);
  });

  it("テーマと議員で絞り込む", () => {
    expect(selectQuestionsByTheme(items, "kids").map((i) => i.id)).toEqual([
      "old",
    ]);
    expect(
      selectQuestionsByMemberKey(items, "田村幸子").map((i) => i.id)
    ).toEqual(["old"]);
  });
});
