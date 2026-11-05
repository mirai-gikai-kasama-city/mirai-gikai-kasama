import { describe, expect, it } from "vitest";
import { KASAMA_SESSIONS } from "./sessions";

/** 議案ごとの賛否データ。全会期を同じ基準で確かめる */
const votedBills = KASAMA_SESSIONS.flatMap((session) =>
  session.bills.flatMap((bill) =>
    bill.vote
      ? [{ session, label: `${session.name} ${bill.billNumberLabel}`, vote: bill.vote }]
      : []
  )
);

describe("全会期の賛否データ", () => {
  it.each(votedBills)("$label の賛否一覧は全議員分ある", ({ session, vote }) => {
    expect(vote.marks).toHaveLength(session.members.length);
  });

  it.each(votedBills)("$label の賛否一覧は会議録の採決人数と一致する", ({
    vote,
  }) => {
    const count = (mark: string) =>
      vote.marks.filter((item) => item === mark).length;
    expect(count("○")).toBe(vote.minutes.for);
    expect(count("●")).toBe(vote.minutes.against);
    expect(count("○") + count("●")).toBe(vote.minutes.total);
  });

  it.each(votedBills)("$label で議長は採決に加わらない", ({ session, vote }) => {
    expect(vote.marks[session.members.indexOf("畑岡洋二")]).toBe("－");
  });
});

describe.each(KASAMA_SESSIONS)("$name の議案", ({ bills }) => {
  it("全議案に一覧用の要約と本文がある", () => {
    for (const bill of bills) {
      expect(bill.summary.length).toBeGreaterThan(0);
      expect(bill.body.length).toBeGreaterThan(0);
    }
  });

  it("議案番号が重複していない", () => {
    const labels = bills.map((bill) => bill.billNumberLabel);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
