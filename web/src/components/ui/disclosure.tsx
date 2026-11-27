import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 2段までの入れ子にできる折りたたみ（<details>）。
 * 外側（outer）と内側（inner）で名前付き group を分け、矢印の向きをそれぞれの開閉だけで変える
 * （ただの group だと、外側を開いただけで内側の矢印まで回ってしまう）
 */
const VARIANTS = {
  outer: {
    details: "group/outer rounded-lg border border-mirai-border bg-white",
    summary: "px-4 py-3",
    chevron: "group-open/outer:rotate-90",
    body: "flex flex-col gap-2 px-3 pb-3",
  },
  inner: {
    details: "group/inner rounded-md bg-mirai-surface-muted",
    summary: "px-3 py-2.5",
    chevron: "group-open/inner:rotate-90",
    body: "flex flex-col gap-2 px-2 pb-2",
  },
} as const;

interface DisclosureProps {
  variant: keyof typeof VARIANTS;
  /** 見出し（summary の中身。h3 / h4 などの見出し要素を渡す） */
  summary: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function Disclosure({
  variant,
  summary,
  defaultOpen = false,
  children,
}: DisclosureProps) {
  const styles = VARIANTS[variant];
  return (
    <details open={defaultOpen} className={styles.details}>
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden",
          styles.summary
        )}
      >
        <ChevronRight
          aria-hidden
          className={cn(
            "size-4 shrink-0 text-mirai-text-muted transition-transform",
            styles.chevron
          )}
        />
        {summary}
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
