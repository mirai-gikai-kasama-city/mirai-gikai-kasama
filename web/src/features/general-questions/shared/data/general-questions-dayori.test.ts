import { describe, expect, it } from "vitest";
import { DAYORI_QUESTION_SUMMARIES } from "./general-questions-dayori";
import { GENERAL_QUESTIONS } from "./general-questions-data";
import { MINUTES_GENERAL_QUESTIONS } from "./general-questions-minutes";
import { PENDING_GENERAL_QUESTIONS } from "./general-questions-pending";

const ALL_IDS = new Set(
  [...GENERAL_QUESTIONS, ...PENDING_GENERAL_QUESTIONS, ...MINUTES_GENERAL_QUESTIONS].map(
    (r) => r.id
  )
);

describe("DAYORI_QUESTION_SUMMARIES", () => {
  it.each(Object.entries(DAYORI_QUESTION_SUMMARIES))(
    "%s: 一般質問の記録があり、「問」から始まり、空の文が無い",
    (id, summary) => {
      expect(ALL_IDS.has(id)).toBe(true);
      expect(summary.entries[0]?.kind).toBe("問");
      expect(summary.entries.some((e) => e.kind === "答")).toBe(true);
      for (const entry of summary.entries) expect(entry.text.trim()).not.toBe("");
    }
  );

  it("会議録から起こした記録の id は重ならない", () => {
    const ids = MINUTES_GENERAL_QUESTIONS.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
