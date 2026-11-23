import type { QuestionDayoriSummary } from "@mirai-gikai/shared/council/types";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";

interface DayoriSummaryProps {
  summary: QuestionDayoriSummary;
}

/**
 * 議会だよりの一般質問のページ（「問」と「答」）。議会側がまとめた要約を、紙面の並びのまま出す。
 * 長いので畳んでおき、開くと読めるようにする
 */
export function DayoriSummary({ summary }: DayoriSummaryProps) {
  const answerCount = summary.entries.filter((e) => e.kind === "答").length;
  return (
    <details className="rounded-md bg-mirai-surface px-3 py-2 text-[13px] text-mirai-text-secondary">
      <summary className="cursor-pointer font-medium text-mirai-text">
        議会だよりの要約（問と答・答弁{answerCount}件）
      </summary>
      <p className="mt-2 text-xs leading-[1.7] text-mirai-text-muted">
        かさま市議会だより第{summary.issue}号（{summary.page}
        ページ）の一般質問のページを、そのまま写しています。議会がまとめた要約で、AIによる要約ではありません。
        <TextLink external href={summary.url} className="ml-1">
          議会だより第{summary.issue}号
        </TextLink>
      </p>
      <dl className="mt-2 flex flex-col gap-2">
        {summary.entries.map((entry, index) => (
          <div key={`${index}-${entry.kind}`} className="flex gap-2">
            <dt
              className={cn(
                "h-fit shrink-0 rounded px-1.5 text-xs font-bold leading-[1.7]",
                entry.kind === "問"
                  ? "bg-mirai-surface-key text-primary-accent"
                  : "border border-mirai-border bg-white text-mirai-text"
              )}
            >
              {entry.kind}
            </dt>
            <dd className="leading-[1.7] text-mirai-text">{entry.text}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
