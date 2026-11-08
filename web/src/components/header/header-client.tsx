"use client";

import type { LucideIcon } from "lucide-react";
import {
  ChevronDown,
  Landmark,
  MessageSquareText,
  Search,
  UsersRound,
} from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InterviewHeaderActions } from "@/features/interview-session/client/components/interview-header-actions";
import { isInterviewPage } from "@/lib/page-layout-utils";
import { routes, SESSION_ARCHIVE_LABEL } from "@/lib/routes";
import { SITE_NAME } from "@/lib/seo/share-metadata";
import { cn } from "@/lib/utils";
import { HamburgerMenu } from "./hamburger-menu";
import { useHideOnScroll } from "./use-hide-on-scroll";

type NavLinkItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** true のとき、会期の一覧を縦に出す（PCはカーソルを合わせる、スマホは押す） */
  withSessionMenu?: boolean;
};

export type HeaderSessionLink = { id: string; name: string };

// lg以上（デスクトップ）: ロゴ右側に主要ページへのテキストリンクを並べる
const DESKTOP_NAV_LINKS: NavLinkItem[] = [
  { label: "議案を検索", href: routes.search(), icon: Search },
  {
    label: SESSION_ARCHIVE_LABEL,
    href: routes.sessionArchive(),
    icon: Landmark,
    withSessionMenu: true,
  },
  { label: "一般質問", href: routes.questions(), icon: MessageSquareText },
  { label: "議員一覧", href: routes.memberArchive(), icon: UsersRound },
];

// lg未満（モバイル）: ヘッダー2段目の横スクロールクイックナビ
const MOBILE_QUICK_LINKS: NavLinkItem[] = [
  {
    label: SESSION_ARCHIVE_LABEL,
    href: routes.sessionArchive(),
    icon: Landmark,
    withSessionMenu: true,
  },
  { label: "一般質問", href: routes.questions(), icon: MessageSquareText },
  { label: "議員一覧", href: routes.memberArchive(), icon: UsersRound },
  { label: "議案を検索", href: routes.search(), icon: Search },
];

const DESKTOP_LINK_CLASS =
  "flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-medium text-mirai-text transition-colors hover:bg-muted/50 xl:px-3 xl:text-sm";

const MOBILE_LINK_CLASS =
  "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-mirai-border bg-white px-3 py-1.5 text-sm font-medium text-mirai-text transition-all hover:bg-mirai-surface-key active:scale-95";

const MENU_ITEM_BASE_CLASS =
  "block whitespace-nowrap rounded-md px-3 py-2 transition-colors hover:bg-muted/50 focus:bg-muted/50 focus-visible:bg-muted/50";
const SESSION_ITEM_CLASS = cn(MENU_ITEM_BASE_CLASS, "text-sm text-mirai-text");
const SESSION_ALL_CLASS = cn(
  MENU_ITEM_BASE_CLASS,
  "text-xs font-medium text-mirai-text-muted"
);
const SESSION_ALL_TEXT = "一覧で見る";

/**
 * PC版: カーソルを合わせる（キーボードならフォーカスする）と会期を縦に並べて出す。
 * 見出し自体も一覧ページへのリンクのまま残す。CSS だけで開閉するので JS の状態を持たない。
 * 一覧は見えていなくても DOM にあるので、ページを開くたびに全会期を先読みしないよう prefetch を切る
 */
function DesktopSessionMenu({
  item: { label, href, icon: Icon },
  sessions,
}: {
  item: NavLinkItem;
  sessions: HeaderSessionLink[];
}) {
  return (
    <div className="group relative">
      <Link href={href as Route} className={DESKTOP_LINK_CLASS}>
        <Icon className="hidden h-4 w-4 shrink-0 text-primary-accent xl:block" />
        {label}
        <ChevronDown
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 text-mirai-text-muted transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
        />
      </Link>
      {/* pt で見出しとの隙間を埋め、カーソルを下へ動かしても閉じないようにする */}
      <div className="invisible absolute top-full left-0 z-50 pt-1 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="max-h-[70vh] min-w-56 overflow-y-auto rounded-md border border-mirai-border bg-white p-1 shadow-md">
          {sessions.map((session) => (
            <li key={session.id}>
              <Link
                href={routes.sessionSummary(session.id) as Route}
                prefetch={false}
                className={SESSION_ITEM_CLASS}
              >
                {session.name}
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-mirai-border pt-1">
            <Link href={href as Route} className={SESSION_ALL_CLASS}>
              {SESSION_ALL_TEXT}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

/**
 * スマホ版: カーソルを合わせる操作が無いので、押すと会期の一覧が下に開く。
 * 一覧ページへは、開いた一覧の最後の「一覧で見る」から移る
 */
function MobileSessionMenu({
  item: { label, href, icon: Icon },
  sessions,
}: {
  item: NavLinkItem;
  sessions: HeaderSessionLink[];
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={cn("group", MOBILE_LINK_CLASS)}>
        <Icon className="h-4 w-4 shrink-0 text-primary-accent" />
        {label}
        <ChevronDown
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 text-mirai-text-muted transition-transform group-data-[state=open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="max-h-[70vh] min-w-56 border-mirai-border bg-white"
      >
        {sessions.map((session) => (
          <DropdownMenuItem key={session.id} asChild>
            <Link
              href={routes.sessionSummary(session.id) as Route}
              className={SESSION_ITEM_CLASS}
            >
              {session.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-mirai-border" />
        <DropdownMenuItem asChild>
          <Link href={href as Route} className={SESSION_ALL_CLASS}>
            {SESSION_ALL_TEXT}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 難易度切り替え（説明をもっと詳しく）は、田川市版では hard 難易度の
// 議案本文を用意していないため一時的に非表示にしている。
// hard 版コンテンツを用意した際に DifficultySelector を復活させること。
export function HeaderClient({ sessions }: { sessions: HeaderSessionLink[] }) {
  const pathname = usePathname();
  const showInterviewActions = isInterviewPage(pathname);
  // モバイルではヘッダーが画面の約15%を占めるため、下スクロール中は隠して
  // 本文を広く見せる（上スクロールで即座に再表示）。lg以上では常に表示
  const isHidden = useHideOnScroll();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-mirai-border-muted transition-transform duration-300 lg:translate-y-0 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Logo / Site Title */}
          <Link
            href={routes.home()}
            className="flex min-w-0 flex-1 items-center space-x-2 lg:flex-none"
            aria-label="ホーム"
          >
            <Image
              src="/img/logo.svg"
              alt={SITE_NAME}
              width={42}
              height={36}
              className="shrink-0"
            />
            <Image
              src="/img/service-logo.svg"
              alt={SITE_NAME}
              width={115}
              height={21}
              className="h-auto w-[96px] shrink-0 sm:w-[115px]"
            />
          </Link>

          <div className="flex shrink-0 items-center gap-1">
            {/* デスクトップ用テキストナビ（lg以上のみ表示） */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="主要ナビゲーション"
            >
              {/* lg（1024px）では7項目が収まらないため、アイコンは xl 以上でだけ出し、余白も詰める */}
              {DESKTOP_NAV_LINKS.map((item) => {
                const { label, href, icon: Icon } = item;
                if (item.withSessionMenu && sessions.length > 0) {
                  return (
                    <DesktopSessionMenu
                      key={label}
                      item={item}
                      sessions={sessions}
                    />
                  );
                }
                return (
                  <Link
                    key={label}
                    href={href as Route}
                    className={DESKTOP_LINK_CLASS}
                  >
                    <Icon className="hidden h-4 w-4 shrink-0 text-primary-accent xl:block" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* モバイル用検索アイコン（lg未満のみ表示） */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-10 w-10 lg:hidden"
            >
              <Link href={routes.search()} aria-label="議案を検索">
                <Search className="h-5 w-5" />
              </Link>
            </Button>

            {showInterviewActions && <InterviewHeaderActions />}
            <HamburgerMenu />
          </div>
        </div>

        {/* モバイル用クイックナビ（lg未満のみ表示、横スクロール） */}
        <div className="relative lg:hidden">
          <nav
            className="flex items-center gap-1.5 overflow-x-auto pt-0.5 pb-2.5 pr-6 scrollbar-hide"
            aria-label="クイックナビゲーション"
          >
            {MOBILE_QUICK_LINKS.map((item) => {
              const { label, href, icon: Icon } = item;
              if (item.withSessionMenu && sessions.length > 0) {
                return (
                  <MobileSessionMenu
                    key={label}
                    item={item}
                    sessions={sessions}
                  />
                );
              }
              return (
                <Link
                  key={label}
                  href={href as Route}
                  className={MOBILE_LINK_CLASS}
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary-accent" />
                  {label}
                </Link>
              );
            })}
          </nav>
          {/* 右端のフェード: ナビが横スクロールできることを視覚的に示す */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent"
          />
        </div>
      </div>
    </header>
  );
}
