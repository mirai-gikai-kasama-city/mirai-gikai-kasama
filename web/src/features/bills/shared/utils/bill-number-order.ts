/**
 * 議案名の先頭の番号（「議案第53号」「請願第27-4号」「委員会提出議案第1号」など）で並べるための比較。
 * 会期の中で、議決日（審議中は提出日）が同じ議案どうしを番号順に並べるのに使う
 */

/** 種類の並び（笠間市議会の審議結果の表に近い順）。ここに無い種類は後ろに回す */
const KIND_ORDER = [
  "選挙",
  "報告",
  "諮問",
  "議案",
  "認定",
  "請願",
  "陳情",
  "決議案",
  "発議",
  "委員会提出議案",
  "議員提出議案",
];

function toHalfWidthDigits(text: string): string {
  return text.replace(/[０-９]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0xfee0)
  );
}

/** 議案名から [種類の順位, 番号, 枝番号] を取り出す。番号が無ければ null */
export function billNumberSortKey(
  name: string
): [number, number, number] | null {
  const m = toHalfWidthDigits(name).match(/^(\S*?)第(\d+)(?:[-－‐](\d+))?号/);
  if (!m) return null;
  const kindIndex = KIND_ORDER.indexOf(m[1]);
  return [
    kindIndex === -1 ? KIND_ORDER.length : kindIndex,
    Number(m[2]),
    m[3] ? Number(m[3]) : 0,
  ];
}

/** 議案名の番号で比べる（番号の無い議案は後ろ、同じなら名前の順） */
export function compareBillNumbers(a: string, b: string): number {
  const keyA = billNumberSortKey(a);
  const keyB = billNumberSortKey(b);
  if (keyA && keyB) {
    for (let i = 0; i < keyA.length; i++) {
      if (keyA[i] !== keyB[i]) return keyA[i] - keyB[i];
    }
  } else if (keyA || keyB) {
    return keyA ? -1 : 1;
  }
  return a.localeCompare(b, "ja");
}

/**
 * 会期内の議案の表示順: 審議の進み具合（status_order）→ 日付の新しい順 → 番号順。
 * データベースの並び（status_order・submitted_date）で同じになる議案を番号順にそろえる
 */
export function compareSessionBills(
  a: {
    status_order: number | null;
    submitted_date: string | null;
    name: string;
  },
  b: {
    status_order: number | null;
    submitted_date: string | null;
    name: string;
  }
): number {
  return (
    (a.status_order ?? Number.MAX_SAFE_INTEGER) -
      (b.status_order ?? Number.MAX_SAFE_INTEGER) ||
    (b.submitted_date ?? "").localeCompare(a.submitted_date ?? "") ||
    compareBillNumbers(a.name, b.name)
  );
}
