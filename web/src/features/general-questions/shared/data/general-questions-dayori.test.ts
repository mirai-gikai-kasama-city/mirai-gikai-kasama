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

describe("DAYORI_QUESTION_SUMMARIES", () => {
  it.each(
    Object.entries(DAYORI_QUESTION_SUMMARIES)
  )("%s: 一般質問の記録があり、「問」から始まり、空の文が無い", (id, summary) => {
    expect(ALL_IDS.has(id)).toBe(true);
    expect(summary.entries[0]?.kind).toBe("問");
    expect(summary.entries.some((e) => e.kind === "答")).toBe(true);
    for (const entry of summary.entries) expect(entry.text.trim()).not.toBe("");
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
