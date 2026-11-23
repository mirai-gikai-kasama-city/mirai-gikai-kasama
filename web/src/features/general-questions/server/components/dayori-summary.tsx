import type {
  QuestionDayoriEntry,
  QuestionDayoriSummary,
  QuestionMinutesSummary,
} from "@mirai-gikai/shared/council/types";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";

/** 「問」「答」「要望」を紙面の並びのまま並べる */
function QaEntries({ entries }: { entries: QuestionDayoriEntry[] }) {
  return (
    <dl className="mt-2 flex flex-col gap-2">
      {entries.map((entry, index) => (
        <div key={`${index}-${entry.kind}`} className="flex gap-2">
          <dt
            className={cn(
              "h-fit shrink-0 rounded px-1.5 text-xs font-bold leading-[1.7]",
              entry.kind === "答"
                ? "border border-mirai-border bg-white text-mirai-text"
                : "bg-mirai-surface-key text-primary-accent"
            )}
          >
            {entry.kind}
          </dt>
          <dd className="leading-[1.7] text-mirai-text">{entry.text}</dd>
        </div>
      ))}
    </dl>
  );
}

const countAnswers = (entries: QuestionDayoriEntry[]) =>
  entries.filter((e) => e.kind === "答").length;

/**
 * 議会だよりの一般質問のページ（「問」と「答」）。議会側がまとめた要約を、紙面の並びのまま出す。
 * 長いので畳んでおき、開くと読めるようにする
 */
export function DayoriSummary({ summary }: { summary: QuestionDayoriSummary }) {
  return (
    <details className="rounded-md bg-mirai-surface px-3 py-2 text-[13px] text-mirai-text-secondary">
      <summary className="cursor-pointer font-medium text-mirai-text">
        議会だよりの要約（問と答・{countAnswers(summary.entries)}件）
      </summary>
      <p className="mt-2 text-xs leading-[1.7] text-mirai-text-muted">
        かさま市議会だより第{summary.issue}号（{summary.page}
        ページ）の一般質問のページを、そのまま写しています。議会がまとめた要約で、AIによる要約ではありません。
        <TextLink external href={summary.url} className="ml-1">
          議会だより第{summary.issue}号
        </TextLink>
      </p>
      <QaEntries entries={summary.entries} />
    </details>
  );
}

/**
 * 議会だよりに要約が載っていない題の、会議録をもとにしたAIによる要約。
 * 議会だよりの要約と取り違えないよう、見出しと説明でAIによる要約だと示す
 */
export function AiMinutesSummary({ summary }: { summary: QuestionMinutesSummary }) {
  const answerCount = summary.topics.reduce((sum, t) => sum + countAnswers(t.entries), 0);
  return (
    <details className="rounded-md border border-dashed border-mirai-border bg-white px-3 py-2 text-[13px] text-mirai-text-secondary">
      <summary className="cursor-pointer font-medium text-mirai-text">
        会議録からの要約【AIによる要約】（問と答・{answerCount}件）
      </summary>
      <p className="mt-2 text-xs leading-[1.7] text-mirai-text-muted">
        議会だよりに要約が載っていない題について、会議録をもとにAIでまとめたものです。正確な発言は会議録でご確認ください。
        <TextLink external href={summary.minutesUrl} className="ml-1">
          この日の会議録
        </TextLink>
      </p>
      {summary.topics.map((topic) => (
        <section key={topic.item} className="mt-3">
          <h5 className="font-medium text-mirai-text">{topic.item}</h5>
          <QaEntries entries={topic.entries} />
        </section>
      ))}
    </details>
  );
}
