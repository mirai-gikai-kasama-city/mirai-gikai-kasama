/**
 * 笠間市議会 現職議員の名簿（氏名・ふりがな・党派・会派・役職・所属委員会）
 *
 * キーは賛否データ（bills.member_votes）の氏名と同じ、空白なしのフルネーム。
 * 名字だけだと田村幸子議員と田村泰之議員を見分けられないため、フルネームで持つ。
 * 載せるのは現職だけ（前の任期の議員や辞職した議員は載せない）。
 *
 * ## 出典（令和8年10月1日現在の公式名簿を 2026-11-08 に転記）
 * - 議会議員名簿: https://www.city.kasama.lg.jp/page/page000011.html
 *   （議席番号・氏名・ふりがな・議長・副議長・所属常任委員会）
 * - 笠間市議会議員顔写真付き名簿: https://www.city.kasama.lg.jp/page/page003284.html
 *   （党派・所属会派、議会運営委員会・広報委員会・予算決算運営委員会を含む所属委員会と役職）
 *
 * ## 注意
 * - 出典に無い項目は書かない（推測で埋めない）
 * - 党派・会派は顔写真付き名簿の「党派「所属会派」」の欄。政党名は party に、
 *   「会派「○○」」は faction に入れる（両方書かれている議員もいる）。
 *   どちらも空の議員は両方 null。空欄を「無所属」とは書かない（名簿にそう書かれていないため）
 * - 改選・辞職・委員の改選で変わるので、更新するときは ROSTER_AS_OF もあわせて直す
 */

/** 公式名簿の時点 */
export const ROSTER_AS_OF = "令和8年10月1日";

/** 名簿の時点で欠員の議席 */
export const VACANT_SEATS: readonly number[] = [2, 7];

/** 議員定数 */
export const COUNCIL_SEATS = 22;

/** 公式名簿のページ */
export const ROSTER_SOURCES = [
  {
    label: "議会議員名簿",
    url: "https://www.city.kasama.lg.jp/page/page000011.html",
  },
  {
    label: "笠間市議会議員顔写真付き名簿",
    url: "https://www.city.kasama.lg.jp/page/page003284.html",
  },
] as const;

export interface MemberProfile {
  /** 議席番号 */
  seat: number;
  /** フルネーム（姓 名、半角スペース区切り） */
  fullName: string;
  /** ふりがな（姓 名、半角スペース区切り） */
  reading: string;
  /** 所属会派（名簿の「会派「○○」」）。書かれていなければ null */
  faction: string | null;
  /** 党派（名簿の同じ欄に書かれた政党名）。書かれていなければ null */
  party: string | null;
  /** 議長・副議長 */
  role: string | null;
  /** 所属委員会（委員長・副委員長はかっこ書き）。名簿の並び順 */
  committees: readonly string[];
  /** 補足（出典で確認できる事実のみ） */
  note?: string;
}

/** 空白なしのフルネーム → 名簿の情報。議席番号の順 */
export const MEMBER_PROFILES: Readonly<Record<string, MemberProfile>> = {
  長沼恵: {
    seat: 1,
    fullName: "長沼 恵",
    reading: "ながぬま めぐみ",
    faction: "かさま未来",
    party: null,
    role: null,
    committees: ["総務企画委員会", "広報委員会", "予算決算委員会"],
    note: "任期は令和8年4月13日から",
  },
  酒井正輝: {
    seat: 3,
    fullName: "酒井 正輝",
    reading: "さかい まさき",
    faction: null,
    party: "参政党",
    role: null,
    committees: ["教育福祉委員会（副委員長）", "広報委員会", "予算決算委員会"],
  },
  河原井信之: {
    seat: 4,
    fullName: "河原井 信之",
    reading: "かわらい のぶゆき",
    faction: "政研会",
    party: null,
    role: null,
    committees: [
      "総務企画委員会（副委員長）",
      "議会運営委員会",
      "予算決算委員会",
    ],
  },
  鈴木宏治: {
    seat: 5,
    fullName: "鈴木 宏治",
    reading: "すずき こうじ",
    faction: "政研会",
    party: null,
    role: null,
    committees: [
      "教育福祉委員会（委員長）",
      "広報委員会（副委員長）",
      "予算決算委員会",
      "予算決算運営委員会",
    ],
  },
  川村和夫: {
    seat: 6,
    fullName: "川村 和夫",
    reading: "かわむら かずお",
    faction: null,
    party: "公明党",
    role: null,
    committees: [
      "総務企画委員会（委員長）",
      "議会運営委員会",
      "広報委員会",
      "予算決算委員会",
      "予算決算運営委員会",
    ],
  },
  安見貴志: {
    seat: 8,
    fullName: "安見 貴志",
    reading: "あみ たかし",
    faction: "かさま未来",
    party: null,
    role: null,
    committees: [
      "建設産業委員会（委員長）",
      "議会運営委員会（副委員長）",
      "予算決算委員会",
    ],
  },
  田村幸子: {
    seat: 9,
    fullName: "田村 幸子",
    reading: "たむら さちこ",
    faction: null,
    party: "公明党",
    role: "副議長",
    committees: [
      "総務企画委員会",
      "予算決算委員会（委員長）",
      "予算決算運営委員会（委員長）",
    ],
  },
  益子康子: {
    seat: 10,
    fullName: "益子 康子",
    reading: "ましこ やすこ",
    faction: "政研会",
    party: null,
    role: null,
    committees: [
      "教育福祉委員会",
      "議会運営委員会",
      "広報委員会",
      "予算決算委員会",
      "予算決算運営委員会",
    ],
  },
  林田美代子: {
    seat: 11,
    fullName: "林田 美代子",
    reading: "はやしだ みよこ",
    faction: null,
    party: "日本共産党",
    role: null,
    committees: ["教育福祉委員会", "広報委員会", "予算決算委員会"],
  },
  田村泰之: {
    seat: 12,
    fullName: "田村 泰之",
    reading: "たむら やすゆき",
    faction: "市政会",
    party: null,
    role: null,
    committees: [
      "教育福祉委員会",
      "議会運営委員会",
      "予算決算委員会",
      "予算決算運営委員会",
    ],
  },
  村上寿之: {
    seat: 13,
    fullName: "村上 寿之",
    reading: "むらかみ ひさし",
    faction: "市政会",
    party: null,
    role: null,
    committees: [
      "建設産業委員会（副委員長）",
      "議会運営委員会（委員長）",
      "予算決算委員会（副委員長）",
      "予算決算運営委員会（副委員長）",
    ],
  },
  石井栄: {
    seat: 14,
    fullName: "石井 栄",
    reading: "いしい さかえ",
    faction: null,
    party: "日本共産党",
    role: null,
    committees: ["建設産業委員会", "予算決算委員会"],
  },
  飯田正憲: {
    seat: 15,
    fullName: "飯田 正憲",
    reading: "いいだ まさのり",
    faction: "市政会",
    party: null,
    role: null,
    committees: ["建設産業委員会", "予算決算委員会"],
  },
  西山猛: {
    seat: 16,
    fullName: "西山 猛",
    reading: "にしやま たけし",
    faction: null,
    party: null,
    role: null,
    committees: ["総務企画委員会", "議会運営委員会", "予算決算委員会"],
  },
  石松俊雄: {
    seat: 17,
    fullName: "石松 俊雄",
    reading: "いしまつ としお",
    faction: "市政会",
    party: null,
    role: null,
    committees: ["教育福祉委員会", "予算決算委員会"],
  },
  大貫千尋: {
    seat: 18,
    fullName: "大貫 千尋",
    reading: "おおぬき ちひろ",
    faction: "自民クラブ",
    party: null,
    role: null,
    committees: ["教育福祉委員会", "議会運営委員会", "予算決算委員会"],
  },
  大関久義: {
    seat: 19,
    fullName: "大関 久義",
    reading: "おおぜき ひさよし",
    faction: "自民クラブ",
    party: "自由民主党",
    role: null,
    committees: [
      "総務企画委員会",
      "広報委員会",
      "予算決算委員会",
      "予算決算運営委員会",
    ],
  },
  小薗江一三: {
    seat: 20,
    fullName: "小薗江 一三",
    reading: "おそのえ かずみ",
    faction: "政研会",
    party: null,
    role: null,
    committees: ["建設産業委員会", "予算決算委員会"],
  },
  石﨑勝三: {
    seat: 21,
    fullName: "石﨑 勝三",
    reading: "いしざき しょうぞう",
    faction: "自民クラブ",
    party: null,
    role: null,
    committees: ["建設産業委員会", "予算決算委員会"],
  },
  畑岡洋二: {
    seat: 22,
    fullName: "畑岡 洋二",
    reading: "はたおか ようじ",
    faction: "政研会",
    party: null,
    role: "議長",
    committees: [],
  },
};

/** 空白を除いた氏名（議員ページのキー） */
export function toMemberKey(name: string): string {
  return name.replace(/\s+/g, "");
}

/** 議員ページのキー（空白なしのフルネーム）から名簿の情報を引く。現職でなければ null */
export function getMemberProfile(key: string): MemberProfile | null {
  return Object.hasOwn(MEMBER_PROFILES, key) ? MEMBER_PROFILES[key] : null;
}

/** 名字（フルネームの空白の前） */
export function familyNameOf(profile: MemberProfile): string {
  return profile.fullName.split(" ")[0];
}

/**
 * 名簿の「党派「所属会派」」の欄を名簿のとおりの書き方で返す
 * （例: 「自由民主党 会派「自民クラブ」」「公明党」「会派「政研会」」）。空なら null
 */
export function affiliationOf(profile: MemberProfile): string | null {
  const parts = [
    profile.party,
    profile.faction && `会派「${profile.faction}」`,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : null;
}
