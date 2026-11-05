import { describe, expect, it } from "vitest";
import {
  buildQuestionRecords,
  type ParseState,
  parseDateHeading,
  parseQuestionPage,
  parseSessionHeading,
  stripItemNumber,
} from "./parse-questions";

// 公式ページの実際の形（2026-11-05 取得）
const row = (name: string, items: string[], video = true) => `<tr>
	<td class="tright">1</td>
	<td class="tnowrap"><strong>${name}</strong><br /><img src='image/sankaku_lime.gif' alt='' /><a href='g07_Shitsumon.asp?Kmode=1&amp;Sflg=1&amp;FYY=2026&amp;NAME=%90%CE'>会議録を表示</a><br />${video ? "<img src='image/sankaku_lime.gif' alt='' /><a href='g07_Video_View.asp?SrchID=1781'>録画配信を表示</a>" : ""}</td>
	<td class="tnowrap">一般質問</td>
	<td>${items.map((i) => `<div class='comment4'>${i}</div>`).join("\n")}<div class='comment4'>
</div></td>
</tr>`;

const PAGE = `<tr><td colspan="4" class="kaigi_midashi">　令和８年第　３回定例会</td></tr>
<tr><td colspan="4" class="kaigi_midashi2">　　令和8年9月11日</td></tr>
${row("石井　栄", ["1.中東情勢について", "2.市の環境政策"])}
${row("田村　幸子", ["1.ワクチンについて"], false)}
<tr><td colspan="4" class="kaigi_midashi2">　　令和8年9月14日</td></tr>
${row("酒井　正輝", ["1.脱炭素先行地域計画の意義について"])}`;

describe("parseSessionHeading", () => {
  it.each([
    ["　令和８年第　３回定例会", "kasama-r8-3-teirei", "令和8年第3回定例会"],
    ["令和７年第　１回臨時会", "kasama-r7-1-rinji", "令和7年第1回臨時会"],
    ["令和元年第　２回定例会", "kasama-r1-2-teirei", "令和1年第2回定例会"],
    ["平成３１年第　１回定例会", "kasama-h31-1-teirei", "平成31年第1回定例会"],
  ])("%s", (heading, key, name) => {
    expect(parseSessionHeading(heading)).toEqual({ key, name });
  });

  it("形が違えば null", () => {
    expect(parseSessionHeading("お知らせ")).toBeNull();
  });
});

describe("parseDateHeading", () => {
  it.each([
    ["　　令和8年9月11日", "2026-09-11"],
    ["平成26年9月3日", "2014-09-03"],
    ["令和元年6月10日", "2019-06-10"],
  ])("%s", (heading, expected) => {
    expect(parseDateHeading(heading)).toBe(expected);
  });
});

describe("stripItemNumber", () => {
  it("先頭の番号だけを外し、本文の数字は残す", () => {
    expect(stripItemNumber("1.中学校35人学級への移行について")).toBe(
      "中学校35人学級への移行について"
    );
    expect(stripItemNumber("１．道路について")).toBe("道路について");
  });
});

describe("parseQuestionPage", () => {
  const parse = () =>
    parseQuestionPage(PAGE, { session: null, date: null } as ParseState);

  it("質問者・日付・質問事項を読み取る", () => {
    const rows = parse();
    expect(rows.map((r) => r.memberName)).toEqual([
      "石井 栄",
      "田村 幸子",
      "酒井 正輝",
    ]);
    expect(rows[0]).toMatchObject({
      familyName: "石井",
      date: "2026-09-11",
      items: ["中東情勢について", "市の環境政策"],
    });
    expect(rows[2].date).toBe("2026-09-14");
  });

  it("リンクを絶対URLにし、録画が無い行は null にする", () => {
    const rows = parse();
    expect(rows[0].videoUrl).toBe(
      "http://kasama.gijiroku.com/g07_Video_View.asp?SrchID=1781"
    );
    expect(rows[0].minutesUrl).toBe(
      "http://kasama.gijiroku.com/g07_Shitsumon.asp?Kmode=1&Sflg=1&FYY=2026&NAME=%90%CE"
    );
    expect(rows[1].videoUrl).toBeNull();
  });

  it("見出しの無いページは、前のページの会期と日付を引き継ぐ", () => {
    const state: ParseState = { session: null, date: null };
    parseQuestionPage(PAGE, state);
    const next = parseQuestionPage(row("鈴木　宏治", ["1.防災"]), state);
    expect(next[0].session.key).toBe("kasama-r8-3-teirei");
    expect(next[0].date).toBe("2026-09-14");
  });

  it("会期の見出しより前に行があればエラーにする", () => {
    expect(() =>
      parseQuestionPage(row("鈴木　宏治", ["1.防災"]), {
        session: null,
        date: null,
      })
    ).toThrow();
  });
});

describe("buildQuestionRecords", () => {
  const rows = parseQuestionPage(PAGE, { session: null, date: null });
  const records = buildQuestionRecords(rows);

  it("順番は会期を通して振り直し、何日目かを付ける", () => {
    expect(records.map((r) => [r.order, r.dayIndex])).toEqual([
      [1, 1],
      [2, 1],
      [3, 2],
    ]);
  });

  it("通告をそのまま転記し、会派や要旨を作らない", () => {
    expect(records[0]).toMatchObject({
      id: "kasama-r8-3-teirei-1",
      faction: null,
      isRepresentative: false,
      outline: null,
    });
  });
});
