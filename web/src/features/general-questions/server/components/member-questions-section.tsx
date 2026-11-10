import { Disclosure } from "@/components/ui/disclosure";
import { groupQuestionsByTerm } from "../../shared/utils/council-terms";
import {
  countQuestionItems,
  groupQuestionsBySession,
  selectQuestionsByMember,
} from "../../shared/utils/group-questions";
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

/**
 * 議員個人ページに載せる「一般質問で取り上げたこと」。
 * 任期 → 定例会の2段の折りたたみにする（新しい順。いちばん新しい任期だけ開いておく）
 */
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
      {termGroups.map(({ term, records: termRecords }, termIndex) => (
        <Disclosure
          key={term.endYear}
          variant="outer"
          defaultOpen={termIndex === 0}
          summary={
            <h3 className="text-sm font-bold text-mirai-text">
              {term.label}
              <span className="ml-2 font-medium text-mirai-text-muted">
                {termRecords.length}回
              </span>
            </h3>
          }
        >
          {groupQuestionsBySession(termRecords).map((session) => (
            <Disclosure
              key={session.sessionKey}
              variant="inner"
              summary={
                <h4 className="text-sm font-bold text-mirai-text">
                  {session.sessionName}
                  <span className="ml-2 text-xs font-medium text-mirai-text-muted">
                    質問事項{countQuestionItems(session.records)}件
                  </span>
                </h4>
              }
            >
              {session.records.map((record) => (
                <QuestionCard
                  key={record.id}
                  record={record}
                  context={context}
                  headingLevel="h4"
                  compact
                  headingBySession
                  hideHeading
                />
              ))}
            </Disclosure>
          ))}
        </Disclosure>
      ))}
    </section>
  );
}
