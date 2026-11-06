import { R8_1_RINJI_BILLS, R8_1_RINJI_SESSION } from "./r8-1-rinji";
import {
  R8_1_MEMBERS,
  R8_1_TEIREI_BILLS,
  R8_1_TEIREI_SESSION,
} from "./r8-1-teirei";
import {
  H30_1_RINJI_BILLS,
  H30_1_RINJI_SESSION,
  H30_MEMBERS,
} from "./h30-1-rinji";
import { H31_1_TEIREI_BILLS, H31_1_TEIREI_SESSION } from "./h31-1-teirei";
import { R1_1_RINJI_BILLS, R1_1_RINJI_SESSION } from "./r1-1-rinji";
import { R1_2_TEIREI_BILLS, R1_2_TEIREI_SESSION } from "./r1-2-teirei";
import { R1_3_TEIREI_BILLS, R1_3_TEIREI_SESSION } from "./r1-3-teirei";
import { R1_4_TEIREI_BILLS, R1_4_TEIREI_SESSION } from "./r1-4-teirei";
import { R2_1_RINJI_BILLS, R2_1_RINJI_SESSION } from "./r2-1-rinji";
import { R2_1_TEIREI_BILLS, R2_1_TEIREI_SESSION } from "./r2-1-teirei";
import { R2_2_RINJI_BILLS, R2_2_RINJI_SESSION } from "./r2-2-rinji";
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

/**
 * 議会だより各号の掲載ページと、審議結果・賛否一覧の PDF。
 * members は賛否一覧の列順。空のときは賛否一覧を使わないので、出典名も「審議結果」だけにする
 */
const dayori = (
  issueNo: number,
  pageId: string,
  pdfDocId: string,
  members: readonly string[]
) => ({
  sourceUrl: `https://www.city.kasama.lg.jp/page/${pageId}.html`,
  sourceTitle: `かさま市議会だより 第${issueNo}号（${members.length > 0 ? "審議結果・賛否一覧" : "審議結果"}）`,
  voteSourceUrl: `https://www.city.kasama.lg.jp/data/doc/${pdfDocId}_doc_56_0.pdf`,
  members,
});

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
  // 平成30年12月〜令和4年11月の任期。賛否一覧の列順は議席番号の順（議長 飯田正憲が最後の列）
  toSession(H30_1_RINJI_SESSION, {
    ...dayori(52, "page009956", "1550103505", []),
    bills: H30_1_RINJI_BILLS,
  }),
  toSession(H31_1_TEIREI_SESSION, {
    ...dayori(53, "page010123", "1558394245", H30_MEMBERS),
    bills: H31_1_TEIREI_BILLS,
  }),
  toSession(R1_2_TEIREI_SESSION, {
    ...dayori(54, "page010339", "1566280119", H30_MEMBERS),
    bills: R1_2_TEIREI_BILLS,
  }),
  toSession(R1_3_TEIREI_SESSION, {
    ...dayori(55, "page010601", "1574296667", H30_MEMBERS),
    bills: R1_3_TEIREI_BILLS,
  }),
  toSession(R1_1_RINJI_SESSION, {
    ...dayori(56, "page010762", "1582000653", []),
    bills: R1_1_RINJI_BILLS,
  }),
  toSession(R1_4_TEIREI_SESSION, {
    ...dayori(56, "page010762", "1582000697", H30_MEMBERS),
    bills: R1_4_TEIREI_BILLS,
  }),
  toSession(R2_1_TEIREI_SESSION, {
    ...dayori(57, "page011288", "1589762406", H30_MEMBERS),
    bills: R2_1_TEIREI_BILLS,
  }),
  toSession(R2_1_RINJI_SESSION, {
    ...dayori(57, "page011288", "1589762290", H30_MEMBERS),
    bills: R2_1_RINJI_BILLS,
  }),
  toSession(R2_2_RINJI_SESSION, {
    ...dayori(58, "page011631", "1597190591", []),
    bills: R2_2_RINJI_BILLS,
  }),
  // 令和4年第1回臨時会〜令和5年第2回定例会は、議会だより第68〜70号の PDF の文字が図形で
  // 読み取れないため、議員別の賛否を持たない（web の vote-disclosure の
  // SESSIONS_WITHOUT_MEMBER_VOTES にも載せ、全会一致と表示しない）
  toSession(R4_1_RINJI_SESSION, {
    ...dayori(68, "page014169", "1677226651", []),
    bills: R4_1_RINJI_BILLS,
  }),
  toSession(R5_1_RINJI_SESSION, {
    ...dayori(68, "page014169", "1677226675", []),
    bills: R5_1_RINJI_BILLS,
  }),
  toSession(R5_1_TEIREI_SESSION, {
    ...dayori(69, "page014396", "1684715423", []),
    bills: R5_1_TEIREI_BILLS,
  }),
  toSession(R5_2_RINJI_SESSION, {
    ...dayori(70, "page014629", "1692234925", []),
    bills: R5_2_RINJI_BILLS,
  }),
  toSession(R5_2_TEIREI_SESSION, {
    ...dayori(70, "page014629", "1692234910", []),
    bills: R5_2_TEIREI_BILLS,
  }),
  // 令和5年第3回〜令和6年第4回は、賛否一覧の列順が同じ（議長 大関久義が最後の列）
  toSession(R5_3_TEIREI_SESSION, {
    ...dayori(71, "page014888", "1700099291", R6_MEMBERS),
    bills: R5_3_TEIREI_BILLS,
  }),
  toSession(R5_4_TEIREI_SESSION, {
    ...dayori(72, "page015096", "1707970743", R6_MEMBERS),
    bills: R5_4_TEIREI_BILLS,
  }),
  toSession(R6_1_TEIREI_SESSION, {
    ...dayori(73, "page015331", "1715060052", R6_MEMBERS),
    bills: R6_1_TEIREI_BILLS,
  }),
  toSession(R6_2_TEIREI_SESSION, {
    ...dayori(74, "page015591", "1723017190", R6_MEMBERS),
    bills: R6_2_TEIREI_BILLS,
  }),
  toSession(R6_3_TEIREI_SESSION, {
    ...dayori(75, "page015826", "1731657674", R6_MEMBERS),
    bills: R6_3_TEIREI_BILLS,
  }),
  toSession(R6_4_TEIREI_SESSION, {
    ...dayori(76, "page016013", "1738828095", R6_MEMBERS),
    bills: R6_4_TEIREI_BILLS,
  }),
  // 臨時会は賛否が分かれた議案が無いので、賛否一覧の列順を持たない
  toSession(R7_1_RINJI_SESSION, {
    ...dayori(77, "page016336", "1746672973", []),
    bills: R7_1_RINJI_BILLS,
  }),
  toSession(R7_1_TEIREI_SESSION, {
    ...dayori(77, "page016336", "1746672973", R7_MEMBERS),
    bills: R7_1_TEIREI_BILLS,
  }),
  toSession(R7_2_TEIREI_SESSION, {
    ...dayori(78, "page016584", "1754350795", R7_MEMBERS),
    bills: R7_2_TEIREI_BILLS,
  }),
  toSession(R7_3_TEIREI_SESSION, {
    ...dayori(79, "page016832", "1763108950", R7_MEMBERS),
    bills: R7_3_TEIREI_BILLS,
  }),
  toSession(R7_4_TEIREI_SESSION, {
    ...dayori(80, "page017044", "1771200698", R7_MEMBERS),
    bills: R7_4_TEIREI_BILLS,
  }),
  // 臨時会は賛否が分かれた議案が無いので、賛否一覧の列順を持たない
  toSession(R8_1_RINJI_SESSION, {
    ...dayori(81, "page017250", "1778723875", []),
    bills: R8_1_RINJI_BILLS,
  }),
  toSession(R8_1_TEIREI_SESSION, {
    ...dayori(81, "page017250", "1778723875", R8_1_MEMBERS),
    bills: R8_1_TEIREI_BILLS,
  }),
  toSession(R8_2_SESSION, {
    ...dayori(82, "page017485", "1785817747", R8_2_MEMBERS),
    bills: R8_2_BILLS,
  }),
];
