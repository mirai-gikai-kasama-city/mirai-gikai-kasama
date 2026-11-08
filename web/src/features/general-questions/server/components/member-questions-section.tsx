import { ShowMoreList } from "@/components/ui/show-more-list";
import { groupQuestionsByTerm } from "../../shared/utils/council-terms";
import { selectQuestionsByMember } from "../../shared/utils/group-questions";
import {
  getAllGeneralQuestions,
  getQuestionLinkContext,
} from "../loaders/get-general-questions";
import { QuestionCard } from "./question-card";

interface MemberQuestionsSectionProps {
  /** 議員の姓 */
  familyName: string;
  /** 公式名簿のフルネーム（同姓の別人の質問を混ぜないため。名簿に無ければ null） */
  fullName: string | null;
}

/** 議員個人ページに載せる「一般質問で取り上げたこと」。任期ごとに分け、新しい順に並べる */
export async function MemberQuestionsSection({
  familyName,
  fullName,
}: MemberQuestionsSectionProps) {
  const records = selectQuestionsByMember(getAllGeneralQuestions(), {
    familyName,
    fullName,
  });
  if (records.length === 0) return null;
  const context = await getQuestionLinkContext();
  const termGroups = groupQuestionsByTerm(records);

  return (
    <section className="mb-8 flex flex-col gap-3">
      <h2 className="text-lg font-bold text-mirai-text">
        一般質問で取り上げたこと
      </h2>
      {termGroups.map(({ term, records: termRecords }) => (
        <div key={term.endYear} className="flex flex-col gap-3">
          <h3 className="text-sm font-bold text-mirai-text-secondary">
            {term.label}
            <span className="ml-2 font-medium text-mirai-text-muted">
              {termRecords.length}回
            </span>
          </h3>
          <ShowMoreList initialCount={5} className="flex flex-col gap-3">
            {termRecords.map((record) => (
              <QuestionCard
                key={record.id}
                record={record}
                context={context}
                headingLevel="h4"
                compact
                headingBySession
              />
            ))}
          </ShowMoreList>
        </div>
      ))}
    </section>
  );
}
