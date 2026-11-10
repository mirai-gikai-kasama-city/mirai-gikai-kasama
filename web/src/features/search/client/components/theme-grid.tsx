"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { BILL_THEMES, type BillTheme } from "../../shared/data/bill-themes";

interface ThemeGridProps {
  /** テーマ id → 件数 */
  counts: ReadonlyMap<string, number>;
  onSelect: (themeId: string) => void;
  /** 件数の単位（「件」「人」など） */
  unit: string;
}

/** 「テーマで探す」のカード一覧。件数が0のテーマは出さない（選んでも行き止まりになるため） */
export function ThemeGrid({ counts, onSelect, unit }: ThemeGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {BILL_THEMES.filter((theme) => (counts.get(theme.id) ?? 0) > 0).map(
        (theme) => (
          <li key={theme.id}>
            <button
              type="button"
              onClick={() => onSelect(theme.id)}
              className="flex h-full w-full items-center gap-3 rounded-lg border border-mirai-border bg-white p-4 text-left transition-colors hover:bg-muted/50"
            >
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-[15px] font-bold text-mirai-text">
                  {theme.label}
                  <span className="ml-2 text-xs font-medium text-mirai-text-muted">
                    {counts.get(theme.id) ?? 0}
                    {unit}
                  </span>
                </span>
                <span className="text-xs leading-[1.7] text-mirai-text-secondary">
                  {theme.description}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-mirai-text-muted" />
            </button>
          </li>
        )
      )}
    </ul>
  );
}

interface ThemeResultHeaderProps {
  theme: BillTheme;
  count: number;
  unit: string;
  onBack: () => void;
}

/** テーマを選んだときの見出し（「テーマの一覧にもどる」付き） */
export function ThemeResultHeader({
  theme,
  count,
  unit,
  onBack,
}: ThemeResultHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-fit items-center gap-1 text-xs text-primary-accent underline-offset-[3px] hover:underline"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        テーマの一覧にもどる
      </button>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-mirai-text">
          テーマ：{theme.label}
          <span className="ml-2 text-sm font-medium text-mirai-text-muted">
            {count}
            {unit}
          </span>
        </h2>
        <p className="text-xs text-mirai-text-secondary">{theme.description}</p>
      </div>
    </div>
  );
}

/** URL（?q=...&theme=... など）を、ページを読み直さずに今の状態へ合わせる */
export function replaceSearchParams(
  params: Readonly<Record<string, string | null | undefined>>
) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  }
  window.history.replaceState(null, "", url);
}
