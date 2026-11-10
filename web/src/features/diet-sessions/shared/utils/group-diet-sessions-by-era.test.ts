import { describe, expect, it } from "vitest";
import type { DietSession } from "../types";
import {
  formatEraGroupHeading,
  groupDietSessionsByEraYear,
} from "./group-diet-sessions-by-era";

function makeSession(overrides: Partial<DietSession>): DietSession {
  return {
    id: overrides.id ?? "test-id",
    name: overrides.name ?? "令和8年（第4回）6月定例会",
    slug: overrides.slug ?? "test-slug",
    shugiin_url: overrides.shugiin_url ?? null,
    start_date: overrides.start_date ?? "2026-06-12",
    end_date: overrides.end_date ?? "2026-07-01",
    is_active: overrides.is_active ?? false,
    created_at: overrides.created_at ?? "2026-06-12T00:00:00.000Z",
    updated_at: overrides.updated_at ?? "2026-06-12T00:00:00.000Z",
  };
}

describe("groupDietSessionsByEraYear", () => {
  it("開始日の西暦の年でグルーピングし、ラベルに元号の年を入れる", () => {
    const sessions = [
      makeSession({
        id: "1",
        name: "令和8年（第4回）6月定例会",
        start_date: "2026-06-12",
      }),
      makeSession({
        id: "2",
        name: "令和8年（第3回）5月臨時会",
        start_date: "2026-05-20",
      }),
      makeSession({
        id: "3",
        name: "令和7年（第7回）12月定例会",
        start_date: "2025-12-01",
      }),
    ];

    const groups = groupDietSessionsByEraYear(sessions);

    expect(groups).toEqual([
      { year: 2026, label: "令和8年", sessions: [sessions[0], sessions[1]] },
      { year: 2025, label: "令和7年", sessions: [sessions[2]] },
    ]);
  });

  it("グループ内の並び順（入力順）を維持する", () => {
    const sessions = [
      makeSession({
        id: "1",
        name: "令和7年（第7回）12月定例会",
        start_date: "2025-12-01",
      }),
      makeSession({
        id: "2",
        name: "令和7年（第6回）9月定例会",
        start_date: "2025-09-01",
      }),
      makeSession({
        id: "3",
        name: "令和7年（第5回）7月臨時会",
        start_date: "2025-07-01",
      }),
    ];

    const groups = groupDietSessionsByEraYear(sessions);

    expect(groups).toHaveLength(1);
    expect(groups[0].sessions.map((s) => s.id)).toEqual(["1", "2", "3"]);
  });

  it("同じ年の会期が離れて出現しても同一グループにまとめる", () => {
    const sessions = [
      makeSession({
        id: "1",
        name: "令和6年第4回定例会",
        start_date: "2024-12-01",
      }),
      makeSession({
        id: "2",
        name: "令和7年第1回定例会",
        start_date: "2025-03-01",
      }),
      makeSession({
        id: "3",
        name: "令和6年第3回定例会",
        start_date: "2024-09-01",
      }),
    ];

    const groups = groupDietSessionsByEraYear(sessions);

    expect(groups.map((g) => g.label)).toEqual(["令和6年", "令和7年"]);
    expect(groups[0].sessions.map((s) => s.id)).toEqual(["1", "3"]);
    expect(groups[1].sessions.map((s) => s.id)).toEqual(["2"]);
  });

  it("改元の年（平成31年と令和元年）は1つのグループにまとめ、古い順に並べる", () => {
    const sessions = [
      makeSession({
        id: "1",
        name: "令和元年第4回定例会",
        start_date: "2019-12-02",
      }),
      makeSession({
        id: "2",
        name: "令和元年第2回定例会",
        start_date: "2019-05-31",
      }),
      makeSession({
        id: "3",
        name: "平成31年第1回定例会",
        start_date: "2019-02-27",
      }),
    ];

    const groups = groupDietSessionsByEraYear(sessions);

    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe("平成31年・令和元年");
    expect(groups[0].sessions.map((s) => s.id)).toEqual(["1", "2", "3"]);
  });

  it("平成の会期名からも元号の年を読み取る", () => {
    const sessions = [
      makeSession({
        id: "1",
        name: "平成30年第1回臨時会",
        start_date: "2018-12-27",
      }),
    ];

    expect(groupDietSessionsByEraYear(sessions)[0].label).toBe("平成30年");
  });

  it("元号の年を読み取れない会期名だけの年は、ラベルを空にする", () => {
    const sessions = [makeSession({ id: "1", name: "臨時会（特別開催）" })];

    expect(groupDietSessionsByEraYear(sessions)).toEqual([
      { year: 2026, label: "", sessions: [sessions[0]] },
    ]);
  });

  it("空配列を渡すと空配列を返す", () => {
    expect(groupDietSessionsByEraYear([])).toEqual([]);
  });
});

describe("formatEraGroupHeading", () => {
  it("西暦の年と元号の年を組み合わせた見出しを返す", () => {
    const [group] = groupDietSessionsByEraYear([
      makeSession({ id: "1", start_date: "2026-06-12" }),
    ]);

    expect(formatEraGroupHeading(group)).toBe("2026年（令和8年）");
  });

  it("改元の年は両方の元号を並べる", () => {
    const [group] = groupDietSessionsByEraYear([
      makeSession({
        id: "1",
        name: "令和元年第2回定例会",
        start_date: "2019-05-31",
      }),
      makeSession({
        id: "2",
        name: "平成31年第1回定例会",
        start_date: "2019-02-27",
      }),
    ]);

    expect(formatEraGroupHeading(group)).toBe("2019年（平成31年・令和元年）");
  });

  it("元号を読み取れない年は西暦だけにする", () => {
    const [group] = groupDietSessionsByEraYear([
      makeSession({
        id: "1",
        name: "臨時会（特別開催）",
        start_date: "2026-06-12",
      }),
    ]);

    expect(formatEraGroupHeading(group)).toBe("2026年");
  });
});
