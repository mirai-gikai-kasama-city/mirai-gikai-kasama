import {
  formatQuestionDayLabel,
  type QuestionDayGroup,
} from "../../shared/utils/group-questions";
import type { QuestionLinkContext } from "../loaders/get-general-questions";
import { QuestionCard } from "./question-card";

interface QuestionDaySectionsProps {
  days: QuestionDayGroup[];
  context: QuestionLinkContext;
  /** 日付見出しの階層（カードの見出しはその1つ下になる） */
  headingLevel: "h2" | "h3";
}

/**
 * 会期内の一般質問を「1日目（9月9日）」ごとに区切って並べる
 */
export function QuestionDaySections({
  days,
  context,
  headingLevel,
}: QuestionDaySectionsProps) {
  const DayHeading = headingLevel;
  const cardHeadingLevel = headingLevel === "h2" ? "h3" : "h4";
  return (
    <div className="flex flex-col gap-8">
      {days.map((day) => (
        <section
          // 日付が分からない会期は、何日目かで見分ける
          key={day.date ?? `day-${day.dayIndex ?? "unknown"}`}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <DayHeading className="text-sm font-bold text-mirai-text-secondary">
              {formatQuestionDayLabel(day)}
              <span className="ml-2 font-medium text-mirai-text-muted">
                {day.records.length}人
              </span>
            </DayHeading>
          </div>
          <div className="flex flex-col gap-3">
            {day.records.map((record) => (
              <QuestionCard
                key={record.id}
                record={record}
                context={context}
                headingLevel={cardHeadingLevel}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
