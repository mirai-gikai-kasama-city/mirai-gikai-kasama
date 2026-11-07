import { routes, SESSION_ARCHIVE_LABEL } from "@/lib/routes";

type FooterLink = {
  label: string;
  href: string;
};

export const primaryLinks: FooterLink[] = [
  {
    label: "TOP",
    href: routes.home(),
  },
  {
    label: "議案を検索",
    href: routes.search(),
  },
  {
    label: SESSION_ARCHIVE_LABEL,
    href: routes.sessionArchive(),
  },
  {
    label: "過去の会期",
    href: routes.archive(),
  },
  {
    label: "一般質問",
    href: routes.questions(),
  },
  {
    label: "情報のもと（出典）",
    href: routes.sources(),
  },
  {
    label: "かさま議会ノートとは",
    href: `${routes.home()}#about`,
  },
];

export const policyLinks: FooterLink[] = [
  {
    label: "利用規約",
    href: routes.terms(),
  },
  {
    label: "プライバシーポリシー",
    href: routes.privacy(),
  },
];
