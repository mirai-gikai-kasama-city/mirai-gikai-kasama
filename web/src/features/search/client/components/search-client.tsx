"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShowMoreList } from "@/components/ui/show-more-list";
import { BillStatusBadge } from "@/features/bills/client/components/bill-list/bill-status-badge";
import { getBillDateLabel } from "@/features/bills/shared/utils/bill-status";
import { routes } from "@/lib/routes";
import { formatDateWithDots } from "@/lib/utils/date";
import { BILL_THEMES, findBillTheme } from "../../shared/data/bill-themes";
import type { SearchItem } from "../../shared/types";
import { collectPopularTags } from "../../shared/utils/collect-popular-tags";
import {
  countBillsByTheme,
  searchBills,
  selectBillsByTheme,
} from "../../shared/utils/search-bills";

/** 初期状態で表示するタグ数 */
const POPULAR_TAG_LIMIT = 12;

/** URL（/search?q=...&theme=...）を、ページを読み直さずに今の状態へ合わせる */
function replaceSearchParams(params: { q?: string; theme?: string }) {
  const url = new URL(window.location.href);
  url.searchParams.delete("q");
  url.searchParams.delete("theme");
  if (params.q) url.searchParams.set("q", params.q);
  if (params.theme) url.searchParams.set("theme", params.theme);
  window.history.replaceState(null, "", url);
}

interface SearchClientProps {
  items: SearchItem[];
}

/**
 * 議案の検索。「キーワードで探す」「テーマで探す」「タグで探す」の3つの入口を持つ。
 * キーワードとテーマは同時には使わない（片方を選ぶともう片方は外す）
 */
export function SearchClient({ items }: SearchClientProps) {
  // 検索エンジンのSearchAction（/search?q=...）や共有URLからの初期状態に対応
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [themeId, setThemeId] = useState(() =>
    searchParams.get("q")
      ? null
      : (findBillTheme(searchParams.get("theme"))?.id ?? null)
  );
  const trimmedQuery = query.trim();
  const theme = findBillTheme(themeId);

  const results = useMemo(
    () => (trimmedQuery === "" ? [] : searchBills(items, query)),
    [items, query, trimmedQuery]
  );
  const themeResults = useMemo(
    () => (themeId ? selectBillsByTheme(items, themeId) : []),
    [items, themeId]
  );
  const themeCounts = useMemo(() => countBillsByTheme(items), [items]);
  const popularTags = useMemo(
    () => collectPopularTags(items, POPULAR_TAG_LIMIT),
    [items]
  );

  const changeQuery = (value: string) => {
    setQuery(value);
    setThemeId(null);
    replaceSearchParams({ q: value.trim() });
  };
  const chooseTheme = (id: string | null) => {
    setThemeId(id);
    setQuery("");
    replaceSearchParams({ theme: id ?? undefined });
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-mirai-text">
          キーワードで探す
        </h2>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-mirai-text-muted" />
          <Input
            type="search"
            autoFocus={!theme}
            value={query}
            onChange={(event) => changeQuery(event.target.value)}
            placeholder="例: 給食費、水道、防災 …"
            aria-label="議案をキーワードで検索"
            className="h-12 rounded-lg border-mirai-border bg-white pl-11 text-sm"
          />
        </div>
        {trimmedQuery === "" && !theme && (
          <p className="text-xs text-mirai-text-secondary">
            全{items.length}
            件の議案からキーワードで検索できます。議案名・概要・タグに含まれる言葉で絞り込めます。
          </p>
        )}
      </section>

      {trimmedQuery !== "" ? (
        <BillResults
          items={results}
          header={`${results.length}件`}
          emptyMessage="別の言葉で検索するか、テーマやタグからお探しください。"
        />
      ) : theme ? (
        <section className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => chooseTheme(null)}
            className="inline-flex w-fit items-center gap-1 text-xs text-primary-accent underline-offset-[3px] hover:underline"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            テーマの一覧にもどる
          </button>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-mirai-text">
              テーマ：{theme.label}
              <span className="ml-2 text-sm font-medium text-mirai-text-muted">
                {themeResults.length}件
              </span>
            </h2>
            <p className="text-xs text-mirai-text-secondary">
              {theme.description}
            </p>
          </div>
          <BillResults
            items={themeResults}
            emptyMessage="このテーマに入る議案はまだありません。"
            paged
          />
        </section>
      ) : (
        <>
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-mirai-text">
                テーマで探す
              </h2>
              <p className="text-xs leading-[1.7] text-mirai-text-secondary">
                議案名と概要に含まれる言葉で、暮らしのテーマごとにまとめています。1つの議案が複数のテーマに入ることや、どのテーマにも入らない議案もあります。
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BILL_THEMES.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => chooseTheme(item.id)}
                    className="flex h-full w-full items-center gap-3 rounded-lg border border-mirai-border bg-white p-4 text-left transition-colors hover:bg-muted/50"
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-[15px] font-bold text-mirai-text">
                        {item.label}
                        <span className="ml-2 text-xs font-medium text-mirai-text-muted">
                          {themeCounts.get(item.id) ?? 0}件
                        </span>
                      </span>
                      <span className="text-xs leading-[1.7] text-mirai-text-secondary">
                        {item.description}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-mirai-text-muted" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {popularTags.length > 0 && (
            <section className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold text-mirai-text">
                  タグで探す
                </h2>
                <p className="text-xs text-mirai-text-secondary">
                  予算・条例など、議案の種類で探せます。
                </p>
              </div>
              <div className="flex flex-wrap gap-2 rounded-lg bg-white p-5">
                {popularTags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    onClick={() => changeQuery(tag)}
                    className="rounded-md border-mirai-border bg-white px-4 text-xs font-medium text-mirai-text-secondary shadow-none hover:bg-mirai-surface-tag"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

interface BillResultsProps {
  items: SearchItem[];
  /** 一覧の上に出す件数など */
  header?: string;
  emptyMessage: string;
  /** 件数が多いときに「もっと見る」で段階表示する */
  paged?: boolean;
}

/** 検索・テーマの結果一覧 */
function BillResults({ items, header, emptyMessage, paged }: BillResultsProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-2 rounded-lg bg-white p-6 text-center">
        <p className="text-sm font-bold text-mirai-text">
          見つかりませんでした
        </p>
        <p className="text-xs leading-[1.8] text-mirai-text-secondary">
          {emptyMessage}
        </p>
      </div>
    );
  }

  const cards = items.map((item) => (
    <BillResultCard key={item.id} item={item} />
  ));
  return (
    <div className="flex flex-col gap-3">
      {header && <p className="text-xs text-mirai-text-secondary">{header}</p>}
      {paged ? (
        <ShowMoreList
          initialCount={20}
          step={50}
          className="flex flex-col gap-3"
        >
          {cards}
        </ShowMoreList>
      ) : (
        <div className="flex flex-col gap-3">{cards}</div>
      )}
    </div>
  );
}

function BillResultCard({ item }: { item: SearchItem }) {
  return (
    <Link href={routes.billDetail(item.id) as Route} aria-label={item.title}>
      <Card className="flex flex-col gap-2 border-mirai-border p-4 transition-colors hover:bg-muted/50">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-[1.6] text-mirai-text">
          {item.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <BillStatusBadge
            status={item.status}
            statusNote={item.statusNote}
            className="w-fit"
          />
          {item.submittedDate && (
            <time className="whitespace-nowrap text-xs text-mirai-text-muted">
              {formatDateWithDots(item.submittedDate)}{" "}
              {getBillDateLabel(item.status)}
            </time>
          )}
        </div>
        {item.summary && (
          <p className="line-clamp-2 text-xs leading-relaxed text-mirai-text-secondary">
            {item.summary}
          </p>
        )}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center justify-center rounded-md bg-mirai-surface-tag px-3 py-1 text-xs font-medium text-mirai-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card>
    </Link>
  );
}
