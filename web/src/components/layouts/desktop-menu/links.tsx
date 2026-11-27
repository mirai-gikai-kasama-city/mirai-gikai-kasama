import type { Route } from "next";
import Link from "next/link";
import { routes, SESSION_ARCHIVE_LABEL } from "@/lib/routes";
import { OPERATOR_NAME } from "@/lib/seo/operator-json-ld";

type FooterLinkItem = {
  label: string;
  href: string;
};

const links: FooterLinkItem[] = [
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
    label: "利用規約",
    href: routes.terms(),
  },
  {
    label: "プライバシーポリシー",
    href: routes.privacy(),
  },
];

/**
 * デスクトップメニュー: フッターリンク（サイドバー内）
 */
export function DesktopMenuLinks() {
  return (
    <div className="flex flex-col gap-1.5">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href as Route}
          className="whitespace-nowrap font-medium text-xs transition-opacity hover:opacity-70"
          style={{
            lineHeight: "1.48em",
          }}
        >
          {link.label}
        </Link>
      ))}
      <p
        className="font-medium text-xs"
        style={{
          lineHeight: "1.48em",
        }}
      >
        {`© 2026 ${OPERATOR_NAME}`}
      </p>
    </div>
  );
}
