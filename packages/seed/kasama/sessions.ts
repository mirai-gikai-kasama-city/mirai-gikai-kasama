import { R8_1_RINJI_BILLS, R8_1_RINJI_SESSION } from "./r8-1-rinji";
import {
  R8_1_MEMBERS,
  R8_1_TEIREI_BILLS,
  R8_1_TEIREI_SESSION,
} from "./r8-1-teirei";
import { R4_1_RINJI_BILLS, R4_1_RINJI_SESSION } from "./r4-1-rinji";
import { R5_1_RINJI_BILLS, R5_1_RINJI_SESSION } from "./r5-1-rinji";
import { R5_1_TEIREI_BILLS, R5_1_TEIREI_SESSION } from "./r5-1-teirei";
import { R5_2_RINJI_BILLS, R5_2_RINJI_SESSION } from "./r5-2-rinji";
import { R5_2_TEIREI_BILLS, R5_2_TEIREI_SESSION } from "./r5-2-teirei";
import { R5_3_TEIREI_BILLS, R5_3_TEIREI_SESSION } from "./r5-3-teirei";
import { R5_4_TEIREI_BILLS, R5_4_TEIREI_SESSION } from "./r5-4-teirei";
import { R6_1_TEIREI_BILLS, R6_1_TEIREI_SESSION } from "./r6-1-teirei";
import { R6_2_TEIREI_BILLS, R6_2_TEIREI_SESSION } from "./r6-2-teirei";
import { R6_3_TEIREI_BILLS, R6_3_TEIREI_SESSION } from "./r6-3-teirei";
import {
  R6_4_TEIREI_BILLS,
  R6_4_TEIREI_SESSION,
  R6_MEMBERS,
} from "./r6-4-teirei";
import { R7_1_RINJI_BILLS, R7_1_RINJI_SESSION } from "./r7-1-rinji";
import { R7_1_TEIREI_BILLS, R7_1_TEIREI_SESSION } from "./r7-1-teirei";
import { R7_2_TEIREI_BILLS, R7_2_TEIREI_SESSION } from "./r7-2-teirei";
import { R7_3_TEIREI_BILLS, R7_3_TEIREI_SESSION } from "./r7-3-teirei";
import {
  R7_4_TEIREI_BILLS,
  R7_4_TEIREI_SESSION,
  R7_MEMBERS,
} from "./r7-4-teirei";
import { R8_2_BILLS, R8_2_MEMBERS, R8_2_SESSION } from "./r8-2-teirei";
import type { KasamaSession } from "./types";

/** 議会だより各号の掲載ページと、審議結果・賛否一覧の PDF */
const dayori = (no: number, page: string, pdf: string, withVotes = true) => ({
  sourceUrl: `https://www.city.kasama.lg.jp/page/${page}.html`,
  sourceTitle: `かさま市議会だより 第${no}号（${withVotes ? "審議結果・賛否一覧" : "審議結果"}）`,
  voteSourceUrl: `https://www.city.kasama.lg.jp/data/doc/${pdf}_doc_56_0.pdf`,
});

/** 第81号（第1回臨時会・第1回定例会）の掲載ページと、審議結果・賛否一覧の PDF */
const DAYORI_81_URL = "https://www.city.kasama.lg.jp/page/page017250.html";
const DAYORI_81_RESULTS_PDF =
  "https://www.city.kasama.lg.jp/data/doc/1778723875_doc_56_0.pdf";

function toSession(
  {
    key,
    name,
    startDate,
    endDate,
  }: { key: string } & Pick<KasamaSession, "name" | "startDate" | "endDate">,
  rest: Omit<KasamaSession, "slug" | "name" | "startDate" | "endDate">
): KasamaSession {
  return { slug: `kasama-${key}`, name, startDate, endDate, ...rest };
}

/** サイトに載せる笠間市議会の会期。会期を増やすときはここに足す */
export const KASAMA_SESSIONS: readonly KasamaSession[] = [
  // 令和4年第1回臨時会〜令和5年第2回定例会は、議会だより第68〜70号の PDF の文字が図形で
  // 読み取れないため、議員別の賛否を持たない（web の vote-disclosure でも unknown 扱い）
  toSession(R4_1_RINJI_SESSION, {
    ...dayori(68, "page014169", "1677226651", false),
    members: [],
    bills: R4_1_RINJI_BILLS,
  }),
  toSession(R5_1_RINJI_SESSION, {
    ...dayori(68, "page014169", "1677226675", false),
    members: [],
    bills: R5_1_RINJI_BILLS,
  }),
  toSession(R5_1_TEIREI_SESSION, {
    ...dayori(69, "page014396", "1684715423", false),
    members: [],
    bills: R5_1_TEIREI_BILLS,
  }),
  toSession(R5_2_RINJI_SESSION, {
    ...dayori(70, "page014629", "1692234925", false),
    members: [],
    bills: R5_2_RINJI_BILLS,
  }),
  toSession(R5_2_TEIREI_SESSION, {
    ...dayori(70, "page014629", "1692234910", false),
    members: [],
    bills: R5_2_TEIREI_BILLS,
  }),
  // 令和5年第3回〜令和6年第4回は、賛否一覧の列順が同じ（議長 大関久義が最後の列）
  toSession(R5_3_TEIREI_SESSION, {
    ...dayori(71, "page014888", "1700099291"),
    members: R6_MEMBERS,
    bills: R5_3_TEIREI_BILLS,
  }),
  toSession(R5_4_TEIREI_SESSION, {
    ...dayori(72, "page015096", "1707970743"),
    members: R6_MEMBERS,
    bills: R5_4_TEIREI_BILLS,
  }),
  toSession(R6_1_TEIREI_SESSION, {
    ...dayori(73, "page015331", "1715060052"),
    members: R6_MEMBERS,
    bills: R6_1_TEIREI_BILLS,
  }),
  toSession(R6_2_TEIREI_SESSION, {
    ...dayori(74, "page015591", "1723017190"),
    members: R6_MEMBERS,
    bills: R6_2_TEIREI_BILLS,
  }),
  toSession(R6_3_TEIREI_SESSION, {
    ...dayori(75, "page015826", "1731657674"),
    members: R6_MEMBERS,
    bills: R6_3_TEIREI_BILLS,
  }),
  toSession(R6_4_TEIREI_SESSION, {
    ...dayori(76, "page016013", "1738828095"),
    members: R6_MEMBERS,
    bills: R6_4_TEIREI_BILLS,
  }),
  toSession(R7_1_RINJI_SESSION, {
    ...dayori(77, "page016336", "1746672973", false),
    // 賛否が分かれた議案が無いので、賛否一覧の列順を持たない
    members: [],
    bills: R7_1_RINJI_BILLS,
  }),
  toSession(R7_1_TEIREI_SESSION, {
    ...dayori(77, "page016336", "1746672973"),
    members: R7_MEMBERS,
    bills: R7_1_TEIREI_BILLS,
  }),
  toSession(R7_2_TEIREI_SESSION, {
    ...dayori(78, "page016584", "1754350795"),
    members: R7_MEMBERS,
    bills: R7_2_TEIREI_BILLS,
  }),
  toSession(R7_3_TEIREI_SESSION, {
    ...dayori(79, "page016832", "1763108950"),
    members: R7_MEMBERS,
    bills: R7_3_TEIREI_BILLS,
  }),
  toSession(R7_4_TEIREI_SESSION, {
    ...dayori(80, "page017044", "1771200698"),
    members: R7_MEMBERS,
    bills: R7_4_TEIREI_BILLS,
  }),
  toSession(R8_1_RINJI_SESSION, {
    sourceUrl: DAYORI_81_URL,
    sourceTitle: "かさま市議会だより 第81号（審議結果）",
    voteSourceUrl: DAYORI_81_RESULTS_PDF,
    // 賛否が分かれた議案が無いので、賛否一覧の列順を持たない
    members: [],
    bills: R8_1_RINJI_BILLS,
  }),
  toSession(R8_1_TEIREI_SESSION, {
    sourceUrl: DAYORI_81_URL,
    sourceTitle: "かさま市議会だより 第81号（審議結果・賛否一覧）",
    voteSourceUrl: DAYORI_81_RESULTS_PDF,
    members: R8_1_MEMBERS,
    bills: R8_1_TEIREI_BILLS,
  }),
  toSession(R8_2_SESSION, {
    sourceUrl: "https://www.city.kasama.lg.jp/page/page017485.html",
    sourceTitle: "かさま市議会だより 第82号（審議結果・賛否一覧）",
    voteSourceUrl:
      "https://www.city.kasama.lg.jp/data/doc/1785817747_doc_56_0.pdf",
    members: R8_2_MEMBERS,
    bills: R8_2_BILLS,
  }),
];
