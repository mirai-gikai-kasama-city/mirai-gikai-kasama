"use client";

import { ChevronLeft, Search } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShowMoreList } from "@/components/ui/show-more-list";
import {
  replaceSearchParams,
  ThemeGrid,
  ThemeResultHeader,
} from "@/features/search/client/components/theme-grid";
import {
  countByTheme,
  findBillTheme,
} from "@/features/search/shared/data/bill-themes";
import { routes } from "@/lib/routes";
import { formatDateWithDots } from "@/lib/utils/date";
import { questionAnchorId } from "../../shared/utils/group-questions";
import {
  type QuestionSearchItem,
  searchQuestions,
  selectQuestionsByMemberKey,
  selectQuestionsByTheme,
} from "../../shared/utils/question-search";

/** 「議員で探す」に並べる現職議員 */
export interface QuestionSearchMember {
  /** 空白なしの氏名（議員ページのキー） */
  key: string;
  fullName: string;
  count: number;
}

interface QuestionSearchProps {
  items: readonly QuestionSearchItem[];
  members: readonly QuestionSearchMember[];
  /** 何も選んでいないときに下に出すページ本体（最新の定例会・これまでの一般質問） */
  children: ReactNode;
}

/**
 * 一般質問の検索。「キーワードで探す」「テーマで探す」「議員で探す」の3つの入口を持つ。
 * どれかで絞り込んでいる間は、ページ本体（children）の代わりに結果を出す
 */
export function QuestionSearch({
  items,
  members,
  children,
}: QuestionSearchProps) {
  const [query, setQuery] = useState("");
  const [themeId, setThemeId] = useState<string | null>(null);
  const [memberKey, setMemberKey] = useState<string | null>(null);

  // 共有URL（?q= / ?theme= / ?member=）の状態は表示後に読む。
  // useSearchParams を使うと Suspense の外に出せず、ページ本体（children）が
  // サーバーで描画されなくなるため
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const key = params.get("member");
    if (q) {
      setQuery(q);
    } else if (findBillTheme(params.get("theme"))) {
      setThemeId(params.get("theme"));
    } else if (key && members.some((member) => member.key === key)) {
      setMemberKey(key);
    }
  }, [members]);
  const trimmedQuery = query.trim();
  const theme = findBillTheme(themeId);
  const member = members.find((item) => item.key === memberKey) ?? null;

  const themeCounts = useMemo(() => countByTheme(items), [items]);
  const results = useMemo(() => {
    if (trimmedQuery !== "") return searchQuestions(items, trimmedQuery);
    if (themeId) return selectQuestionsByTheme(items, themeId);
    if (memberKey) return selectQuestionsByMemberKey(items, memberKey);
    return [];
  }, [items, trimmedQuery, themeId, memberKey]);

  const changeQuery = (value: string) => {
    setQuery(value);
    setThemeId(null);
    setMemberKey(null);
    replaceSearchParams({ q: value.trim(), theme: null, member: null });
  };
  const chooseTheme = (id: string | null) => {
    setQuery("");
    setThemeId(id);
    setMemberKey(null);
    replaceSearchParams({ q: null, theme: id, member: null });
  };
  const chooseMember = (key: string | null) => {
    setQuery("");
    setThemeId(null);
    setMemberKey(key);
    replaceSearchParams({ q: null, theme: null, member: key });
  };

  const isFiltering = trimmedQuery !== "" || theme !== null || member !== null;

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
            value={query}
            onChange={(event) => changeQuery(event.target.value)}
            placeholder="例: 給食費、空き家、防災 …"
            aria-label="一般質問をキーワードで検索"
            className="h-12 rounded-lg border-mirai-border bg-white pl-11 text-sm"
          />
        </div>
        {!isFiltering && (
          <p className="text-xs text-mirai-text-secondary">
            のべ{items.length}
            人分の一般質問から、質問事項・議員名・会期名に含まれる言葉で検索できます。
          </p>
        )}
      </section>

      {trimmedQuery !== "" ? (
        <QuestionResults
          items={results}
          header={`${results.length}人分`}
          emptyMessage="別の言葉で検索するか、テーマや議員からお探しください。"
        />
      ) : theme ? (
        <section className="flex flex-col gap-3">
          <ThemeResultHeader
            theme={theme}
            count={results.length}
            unit="人分"
            onBack={() => chooseTheme(null)}
          />
          <QuestionResults
            items={results}
            emptyMessage="このテーマに入る一般質問はまだありません。"
          />
        </section>
      ) : member ? (
        <section className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => chooseMember(null)}
            className="inline-flex w-fit items-center gap-1 text-xs text-primary-accent underline-offset-[3px] hover:underline"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            議員の一覧にもどる
          </button>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-mirai-text">
              {member.fullName} 議員の一般質問
              <span className="ml-2 text-sm font-medium text-mirai-text-muted">
                {results.length}回
              </span>
            </h2>
            <Link
              href={routes.memberDetail(member.key) as Route}
              className="w-fit text-xs text-primary-accent underline underline-offset-[3px] hover:opacity-70"
            >
              議員のページ（党派・会派・賛否など）を見る
            </Link>
          </div>
          <QuestionResults
            items={results}
            emptyMessage="この議員の一般質問の記録はまだありません。"
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
                質問事項と通告書の要旨に含まれる言葉で、暮らしのテーマごとにまとめています（議案と同じテーマです）。1人分の質問が複数のテーマに入ることもあります。
              </p>
            </div>
            <ThemeGrid
              counts={themeCounts}
              onSelect={chooseTheme}
              unit="人分"
            />
          </section>

          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-mirai-text">
                議員で探す
              </h2>
              <p className="text-xs text-mirai-text-secondary">
                現職の議員を議席番号の順に並べています。前の任期の議員は、キーワードに名前を入れると探せます。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 rounded-lg bg-white p-5">
              {members.map((item) => (
                <Button
                  key={item.key}
                  variant="outline"
                  size="sm"
                  onClick={() => chooseMember(item.key)}
                  className="rounded-md border-mirai-border bg-white px-3 text-xs font-medium text-mirai-text-secondary shadow-none hover:bg-mirai-surface-tag"
                >
                  {item.fullName}
                  <span className="ml-1 text-mirai-text-muted">
                    {item.count}
                  </span>
                </Button>
              ))}
            </div>
          </section>
        </>
      )}

      {!isFiltering && children}
    </div>
  );
}

interface QuestionResultsProps {
  items: readonly QuestionSearchItem[];
  header?: string;
  emptyMessage: string;
}

/** 検索・テーマ・議員で絞り込んだ一般質問の一覧（新しい順に20件ずつ） */
function QuestionResults({
  items,
  header,
  emptyMessage,
}: QuestionResultsProps) {
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
  return (
    <div className="flex flex-col gap-3">
      {header && <p className="text-xs text-mirai-text-secondary">{header}</p>}
      <ShowMoreList initialCount={20} step={50} className="flex flex-col gap-3">
        {items.map((item) => (
          <QuestionResultCard key={item.id} item={item} />
        ))}
      </ShowMoreList>
    </div>
  );
}

/** 結果の1件。会期ページのその議員の質問へリンクする */
function QuestionResultCard({ item }: { item: QuestionSearchItem }) {
  return (
    <Link
      href={
        `${routes.questionSession(item.sessionKey)}#${questionAnchorId(item)}` as Route
      }
      className="flex flex-col gap-2 rounded-lg border border-mirai-border bg-white p-4 transition-colors hover:bg-muted/50"
    >
      <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[15px] font-bold text-mirai-text">
          {item.memberName} 議員
        </span>
        <span className="text-xs text-mirai-text-muted">
          {item.sessionName}
          {item.questionDate && `・${formatDateWithDots(item.questionDate)}`}
        </span>
      </span>
      <ol className="flex list-decimal flex-col gap-1 pl-5 text-sm leading-[1.7] text-mirai-text">
        {item.items.map((question, index) => (
          <li key={`${index}-${question}`}>{question}</li>
        ))}
      </ol>
    </Link>
  );
}
