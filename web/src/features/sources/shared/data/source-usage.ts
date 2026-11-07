import { routes, SESSION_ARCHIVE_LABEL } from "@/lib/routes";

/** サイトのどこで何に使っているか */
export interface SourceUsage {
  /** 何の資料か */
  material: string;
  /** サイトのどの内容のもとになっているか */
  usedFor: string;
  /** その内容が載っているページ（無ければリンクなし） */
  page?: { label: string; href: string };
}

/** もとの資料を自分で確かめるための入口 */
export interface SourceOrigin {
  label: string;
  url: string;
}

export const SOURCE_USAGES: readonly SourceUsage[] = [
  {
    material: "かさま市議会だより",
    usedFor: "議案の番号・件名・審議結果・議決日、議員別の賛否",
    page: { label: SESSION_ARCHIVE_LABEL, href: routes.sessionArchive() },
  },
  {
    material: "本会議の会議録",
    usedFor: "議案の解説（提案理由・討論・採決の人数）",
  },
  {
    material: "委員会の記録",
    usedFor: "議案の解説（委員会での審査・質疑）",
  },
  {
    material: "一般質問通告",
    usedFor: "一般質問の質問者・質問事項、会議録と録画へのリンク",
    page: { label: "一般質問", href: routes.questions() },
  },
];

export const SOURCE_ORIGINS: readonly SourceOrigin[] = [
  {
    label: "笠間市議会（笠間市公式サイト）",
    url: "https://www.city.kasama.lg.jp/page/dir000033.html",
  },
  {
    label: "かさま市議会だより",
    url: "https://www.city.kasama.lg.jp/page/dir000035.html",
  },
  {
    label: "笠間市議会 会議録",
    url: "https://www.city.kasama.lg.jp/page/dir000042.html",
  },
  {
    label: "笠間市議会 一般質問通告",
    url: "http://kasama.gijiroku.com/g07_Shitsumon.asp",
  },
  {
    label: "笠間市議会 委員会記録",
    url: "https://www.city.kasama.lg.jp/page/dir014589.html",
  },
];
