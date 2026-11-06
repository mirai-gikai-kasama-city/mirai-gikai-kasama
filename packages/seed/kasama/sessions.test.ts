import { describe, expect, it } from "vitest";
import { KASAMA_SESSIONS } from "./sessions";

/** 議案ごとの賛否データ。全会期を同じ基準で確かめる */
const votedBills = KASAMA_SESSIONS.flatMap((session) =>
  session.bills.flatMap((bill) =>
    bill.vote
      ? [
          {
            session,
            bill,
            label: `${session.name} ${bill.billNumberLabel}`,
            vote: bill.vote,
          },
        ]
      : []
  )
);

describe("全会期の賛否データ", () => {
  it.each(votedBills)("$label の賛否一覧は全議員分ある", ({ session, vote }) => {
    expect(vote.marks).toHaveLength(session.members.length);
  });

  const matchedBills = votedBills.filter(({ vote }) => !vote.mismatchNote);
  const mismatchedBills = votedBills.filter(({ vote }) => vote.mismatchNote);

  it.each(matchedBills)("$label の賛否一覧は会議録の採決人数と一致する", ({
    vote,
  }) => {
    const count = (mark: string) =>
      vote.marks.filter((item) => item === mark).length;
    expect(count("○")).toBe(vote.minutes.for);
    expect(count("●")).toBe(vote.minutes.against);
    expect(count("○") + count("●")).toBe(vote.minutes.total);
  });

  it.each(mismatchedBills)("$label の人数の食い違いは本文に書いてある", ({
    bill,
    vote,
  }) => {
    // 食い違いを残す場合は、読む人に分かるよう本文に書いてあること
    expect(bill.body).toContain(vote.mismatchNote);
  });

  it.each(votedBills)("$label で議長は採決に加わらない", ({ vote }) => {
    // 議長は任期の途中で替わるので、名前ではなく「－」がちょうど1つあることで確かめる
    expect(vote.marks.filter((item) => item === "－")).toHaveLength(1);
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
