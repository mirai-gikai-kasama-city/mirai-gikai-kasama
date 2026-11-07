import { describe, expect, it } from "vitest";
import { KASAMA_SESSIONS } from "./sessions";

/** 議案ごとの賛否データのうち、議会だよりの賛否一覧があるもの。全会期を同じ基準で確かめる */
const votedBills = KASAMA_SESSIONS.flatMap((session) =>
  session.bills.flatMap((bill) => {
    const marks = bill.vote?.marks;
    return bill.vote && marks
      ? [
          {
            session,
            bill,
            label: `${session.name} ${bill.billNumberLabel}`,
            vote: { ...bill.vote, marks },
          },
        ]
      : [];
  })
);

describe("全会期の賛否データ", () => {
  it.each(votedBills)("$label の賛否一覧は全議員分ある", ({ session, vote }) => {
    expect(vote.marks).toHaveLength(session.members.length);
  });

  it("賛否一覧の無い採決は、会議録の票数で賛否が分かれている", () => {
    const unlisted = KASAMA_SESSIONS.flatMap((session) =>
      session.bills.flatMap((bill) =>
        bill.vote && !bill.vote.marks ? [bill.vote.minutes] : []
      )
    );
    // 令和3年第1回定例会の議案第32号。録画配信で確かめたら marks を入れ、この件数も減らす
    expect(unlisted).toHaveLength(1);
    for (const minutes of unlisted) {
      expect(minutes.for).toBeGreaterThan(0);
      expect(minutes.against).toBeGreaterThan(0);
    }
  });

  // 起立による採決は会議録に人数が無いので、照らし合わせられない
  const matchedBills = votedBills.flatMap(({ label, vote }) =>
    vote.minutes && !vote.mismatchNote
      ? [{ label, marks: vote.marks, minutes: vote.minutes }]
      : []
  );
  const mismatchedBills = votedBills.filter(({ vote }) => vote.mismatchNote);

  it.each(matchedBills)("$label の賛否一覧は会議録の採決人数と一致する", ({
    marks,
    minutes,
  }) => {
    const count = (mark: string) =>
      marks.filter((item) => item === mark).length;
    expect(count("○")).toBe(minutes.for);
    expect(count("●")).toBe(minutes.against);
    expect(count("○") + count("●")).toBe(minutes.total);
  });

  it.each(mismatchedBills)("$label の人数の食い違いは本文に書いてある", ({
    bill,
    vote,
  }) => {
    // 食い違いを残す場合は、読む人に分かるよう本文に書いてあること
    expect(bill.body).toContain(vote.mismatchNote);
  });

  it.each(votedBills)("$label で議長は採決に加わらない", ({ vote }) => {
    // 議長は任期の途中で替わる（大関久義→畑岡洋二）が、賛否一覧ではどの会期も最後の列にいる。
    // 「－」が最後の列にちょうど1つあることで、列のずれも見つける
    expect(vote.marks.filter((item) => item === "－")).toHaveLength(1);
    expect(vote.marks.at(-1)).toBe("－");
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
