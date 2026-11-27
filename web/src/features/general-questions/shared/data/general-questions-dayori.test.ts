import type { QuestionDayoriEntry } from "@mirai-gikai/shared/council/types";
import { describe, expect, it } from "vitest";
import { AI_QUESTION_SUMMARIES } from "./general-questions-ai-summaries";
import { GENERAL_QUESTIONS } from "./general-questions-data";
import { DAYORI_QUESTION_SUMMARIES } from "./general-questions-dayori";
import {
  DAYORI_QUESTION_ITEMS,
  withDayoriItems,
} from "./general-questions-dayori-items";
import { withItemFixes } from "./general-questions-item-fixes";
import { MINUTES_GENERAL_QUESTIONS } from "./general-questions-minutes";
import { PENDING_GENERAL_QUESTIONS } from "./general-questions-pending";

const ALL_RECORDS = [
  ...GENERAL_QUESTIONS,
  ...PENDING_GENERAL_QUESTIONS,
  ...MINUTES_GENERAL_QUESTIONS,
].map((r) => withDayoriItems(withItemFixes(r)));
const ALL_IDS = new Set(ALL_RECORDS.map((r) => r.id));

const KINDS: readonly QuestionDayoriEntry["kind"][] = [
  "問",
  "答",
  "要望",
  "意見",
];

/** 議会だよりの問と答の並びが「問」から始まり、「答」があり、種類が分かるもので、空の文が無いことを確かめる */
function expectValidDayoriEntries(entries: QuestionDayoriEntry[]) {
  expect(entries[0]?.kind).toBe("問");
  expect(entries.some((e) => e.kind === "答")).toBe(true);
  for (const entry of entries) {
    expect(KINDS).toContain(entry.kind);
    expect(entry.text.trim()).not.toBe("");
  }
}

describe("DAYORI_QUESTION_SUMMARIES", () => {
  it.each(
    Object.entries(DAYORI_QUESTION_SUMMARIES)
  )("%s: 一般質問の記録があり、「問」から始まり、空の文が無い", (id, summary) => {
    expect(ALL_IDS.has(id)).toBe(true);
    expectValidDayoriEntries(summary.entries);
  });

  it("議員の「意見」が最後に入った並びも通る", () => {
    expectValidDayoriEntries([
      { kind: "問", text: "通学路の安全対策をどう進めるのか。" },
      { kind: "答", text: "関係機関と合同で点検し、対策を進めている。" },
      { kind: "要望", text: "危ない箇所の対策を早く進めるよう要望する。" },
      {
        kind: "意見",
        text: "子どもの安全を第一に、引き続き取り組んでほしい。",
      },
    ]);
  });

  it.each(
    Object.entries(AI_QUESTION_SUMMARIES)
  )("%s: AIによる要約の題は、その一般質問の題のどれかで、「問」から始まる", (id, summary) => {
    const record = ALL_RECORDS.find((r) => r.id === id);
    expect(record).toBeDefined();
    for (const topic of summary.topics) {
      expect(record?.items).toContain(topic.item);
      expect(topic.entries[0]?.kind).toBe("問");
    }
  });

  it.each(
    Object.entries(DAYORI_QUESTION_ITEMS)
  )("%s: 議会だよりの見出しにそろえた題は、一般質問の記録があり、空・重なりが無い", (id, items) => {
    expect(ALL_IDS.has(id)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) expect(item.trim()).not.toBe("");
    expect(new Set(items).size).toBe(items.length);
  });

  it("会議録から起こした記録の id は重ならない", () => {
    const ids = MINUTES_GENERAL_QUESTIONS.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
