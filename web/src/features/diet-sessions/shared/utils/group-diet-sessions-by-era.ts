import type { DietSession } from "../types";

export type DietSessionEraGroup = {
  /** 西暦の年（会期の開始日の年）。例: 2026 */
  year: number;
  /**
   * その年の会期名に出てくる元号の年を、古い順に「・」でつないだもの。
   * 例: "令和8年"、改元の年は "平成31年・令和元年"。元号が読み取れなければ空文字
   */
  label: string;
  sessions: DietSession[];
};

// "令和8年" のような数字表記に加え、元年（1年目）の "令和元年" 表記にも対応する。
// 前の任期の会期名には平成もある（"平成30年第1回臨時会" など）
const ERA_YEAR_PATTERN = /^((?:令和|平成)(?:\d+|元)年)/;

/** 会期名の先頭（例: "令和8年第4回定例会" → "令和8年"）から元号の年を取り出す */
function extractEraYearLabel(session: DietSession): string | null {
  return session.name.match(ERA_YEAR_PATTERN)?.[1] ?? null;
}

/** 会期の開始日（YYYY-MM-DD）の西暦の年。タイムゾーンの影響を受けないよう文字列から読む */
function startYear(session: DietSession): number {
  return Number(session.start_date.slice(0, 4));
}

/**
 * 会期一覧を西暦の年ごとにグルーピングする。
 * 改元の年（2019年の平成31年と令和元年）も1つのグループにまとまる。
 * 入力の並び順（例: start_date 降順）はグループ内・グループ間ともに維持される。
 */
export function groupDietSessionsByEraYear(
  sessions: DietSession[]
): DietSessionEraGroup[] {
  const groups: DietSessionEraGroup[] = [];
  const groupByYear = new Map<number, DietSessionEraGroup>();

  for (const session of sessions) {
    const year = startYear(session);
    const existing = groupByYear.get(year);
    if (existing) {
      existing.sessions.push(session);
      continue;
    }
    const group: DietSessionEraGroup = { year, label: "", sessions: [session] };
    groupByYear.set(year, group);
    groups.push(group);
  }

  for (const group of groups) {
    // 古い会期から順に元号の年を集める（入力が新しい順でも「平成31年・令和元年」になる）
    const chronological = [...group.sessions].sort((a, b) =>
      a.start_date.localeCompare(b.start_date)
    );
    const labels = new Set<string>();
    for (const session of chronological) {
      const label = extractEraYearLabel(session);
      if (label) labels.add(label);
    }
    group.label = [...labels].join("・");
  }

  return groups;
}

/**
 * 会期年グループの見出しを「2026年（令和8年）」の形式で組み立てる。
 * 元号が読み取れないグループは「2026年」だけにする。
 */
export function formatEraGroupHeading(group: DietSessionEraGroup): string {
  return group.label ? `${group.year}年（${group.label}）` : `${group.year}年`;
}
