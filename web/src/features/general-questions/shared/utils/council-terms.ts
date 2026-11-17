import type { GeneralQuestionRecord } from "@mirai-gikai/shared/council/types";

/**
 * 笠間市議会議員の任期。一般選挙で12月24日から4年。
 * 定例会は12月23日より前に終わるので、会期の年だけで任期が決まる
 * （例: 令和4年第4回定例会は令和4年11月で、令和4年12月23日までの任期に入る）
 */
export interface CouncilTerm {
  /** 任期が終わる年（西暦）。この年の12月23日まで */
  endYear: number;
  /** 見出しに使う名前 */
  label: string;
  /** 一覧のカードなど、狭いところに使う短い名前 */
  shortLabel: string;
}

/** 新しい順 */
export const COUNCIL_TERMS: readonly CouncilTerm[] = [
  {
    endYear: 2026,
    label: "今の任期（令和4年12月〜）",
    shortLabel: "今の任期",
  },
  {
    endYear: 2022,
    label: "平成30年12月〜令和4年12月の任期",
    shortLabel: "平成30〜令和4年",
  },
  {
    endYear: 2018,
    label: "平成26年12月〜平成30年12月の任期",
    shortLabel: "平成26〜30年",
  },
  {
    endYear: 2014,
    label: "平成22年12月〜平成26年12月の任期",
    shortLabel: "平成22〜26年",
  },
];

/**
 * 会期のキー（"kasama-r8-3-teirei"、"h26-3" など）の元号の年を西暦にする。
 * 読めなければ null
 */
export function sessionKeyYear(sessionKey: string): number | null {
  const m = sessionKey.match(/^(?:kasama-)?([hr])(\d+)-/);
  if (!m) return null;
  const year = Number(m[2]);
  return m[1] === "r" ? 2018 + year : 1988 + year;
}

/** その年の1月1日〜12月23日が入る任期。表に無ければ null */
function termForYear(year: number): CouncilTerm | null {
  return (
    COUNCIL_TERMS.find(
      (term) => term.endYear >= year && year > term.endYear - 4
    ) ?? null
  );
}

/** 会期のキーが入る任期。表に無い年なら null */
export function termForSessionKey(sessionKey: string): CouncilTerm | null {
  const year = sessionKeyYear(sessionKey);
  return year === null ? null : termForYear(year);
}

/**
 * 日付（YYYY-MM-DD）が入る任期。12月24日以降は次の任期になる。表に無ければ null
 */
export function termForDate(date: string): CouncilTerm | null {
  const year = Number(date.slice(0, 4));
  if (!Number.isFinite(year)) return null;
  return termForYear(date.slice(5) >= "12-24" ? year + 1 : year);
}

export interface TermGroup<T> {
  term: CouncilTerm;
  records: T[];
}

/**
 * 記録を任期ごとに分ける（新しい任期が先頭）。記録の無い任期は返さない。
 * 任期の分からない記録は入らない。任期の中の並び順は入力のまま
 */
export function groupByTerm<T>(
  records: readonly T[],
  termOf: (record: T) => CouncilTerm | null
): TermGroup<T>[] {
  const byTerm = new Map<CouncilTerm, T[]>();
  for (const record of records) {
    const term = termOf(record);
    if (!term) continue;
    const list = byTerm.get(term);
    if (list) {
      list.push(record);
    } else {
      byTerm.set(term, [record]);
    }
  }
  return COUNCIL_TERMS.flatMap((term) => {
    const list = byTerm.get(term);
    return list ? [{ term, records: list }] : [];
  });
}

/** 一般質問の記録を任期ごとに分ける（会期のキーで決める） */
export function groupQuestionsByTerm(
  records: readonly GeneralQuestionRecord[]
): TermGroup<GeneralQuestionRecord>[] {
  return groupByTerm(records, (record) => termForSessionKey(record.sessionKey));
}
