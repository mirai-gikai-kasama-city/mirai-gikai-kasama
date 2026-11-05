import type { KasamaSession } from "./csv-rows";
import { R8_2_BILLS, R8_2_MEMBERS, R8_2_SESSION } from "./r8-2-teirei";

/** サイトに載せる笠間市議会の会期。会期を増やすときはここに足す */
export const KASAMA_SESSIONS: readonly KasamaSession[] = [
  {
    slug: `kasama-${R8_2_SESSION.key}`,
    name: R8_2_SESSION.name,
    startDate: R8_2_SESSION.startDate,
    endDate: R8_2_SESSION.endDate,
    sourceUrl: "https://www.city.kasama.lg.jp/page/page017485.html",
    sourceTitle: "かさま市議会だより 第82号（審議結果・賛否一覧）",
    voteSourceUrl:
      "https://www.city.kasama.lg.jp/data/doc/1785817747_doc_56_0.pdf",
    members: R8_2_MEMBERS,
    bills: R8_2_BILLS,
  },
];
