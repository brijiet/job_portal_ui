import { useState } from "react";

const Questionnaire = ({ profileDashboard, index }: any) => {

  const [questionnaireExpand, setQuestionnaireExpand] = useState<any>([]);

  return (
    <>
      <div className="self-stretch h-auto flex-col justify-start items-start gap-5 flex" >
        <div className="self-stretch justify-start items-start gap-3 inline-flex">
          <div className="grow shrink basis-0 text-black text-base font- leading-snug tracking-tight">Questionnaire
          </div>
          <div className="w-6 h-6 justify-center items-center flex cursor-pointer">{!questionnaireExpand.includes(Number(index)) ? <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}upArrowIcon.svg`} alt="upArrowIcon" onClick={() => setQuestionnaireExpand([...questionnaireExpand, Number(index)])} /> : <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downIcon.svg`} alt="downIcon" onClick={() => setQuestionnaireExpand(questionnaireExpand.filter((expandItem: number) => expandItem !== Number(index)))} />}</div>
        </div>
        {!questionnaireExpand.includes(Number(index)) && profileDashboard?.jobs?.questionnaire?.map(((itemQuestionnaire: any, indexQuestionnaire: any) => <div key={indexQuestionnaire}>
          <div key={indexQuestionnaire}>
            {itemQuestionnaire.questionType === 'Descriptive' &&
              <><div className="self-stretch h-auto flex-col justify-center items-start gap-1 flex">
                <div className="grow shrink basis-0 text-slate-500 text-base font-normal leading-snug tracking-tight">Question {indexQuestionnaire + 1} {itemQuestionnaire?.question}</div>
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  <div className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight">{itemQuestionnaire?.questionnaireAnswer?.answer}</div>
                </div>
              </div></>}
            {itemQuestionnaire.questionType === 'NumberChoice' &&
              <><div className="self-stretch h-auto flex-col justify-center items-start gap-1 flex">
                <div className="grow shrink basis-0 text-slate-500 text-base font-normal leading-snug tracking-tight">Question {indexQuestionnaire + 1} {itemQuestionnaire?.question}</div>
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  <div className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight">{itemQuestionnaire?.questionnaireAnswer?.answer}</div>

                </div>
              </div></>
            }

            {itemQuestionnaire.questionType === 'SingleChoice' &&
              <><div className="self-stretch h-auto flex-col justify-center items-start gap-1 flex">
                <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Question {indexQuestionnaire + 1} {itemQuestionnaire?.question}</div>
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  {itemQuestionnaire?.questionnaireAnswer?.questionnaire
                    ?.singleSelection?.filter((itemSingleSelection: any, indexSingleSelection: any) => itemSingleSelection?.id == itemQuestionnaire?.questionnaireAnswer?.answer)?.map((item: any, key: any) => <>
                      <div className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight" key={`${indexQuestionnaire}${key}`}>{item.option}</div>
                    </>
                    )}
                </div>
              </div></>
            }

            {itemQuestionnaire.questionType === 'MultipleChoice' &&
              <> <div className="self-stretch h-auto flex-col justify-center items-start gap-1 flex">
                <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Question {indexQuestionnaire + 1} {itemQuestionnaire?.question}</div>
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  <div className="grid grid-cols-5 gap-10 content-start">
                    {itemQuestionnaire?.multipleSelection ? itemQuestionnaire?.multipleSelection.filter((itemMultipleSelection: any, indexSingleSelection: any) => itemMultipleSelection?.multipleChoiceQuestionnaire !== null)?.map((item: any, key: any) => <>
                      <div className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight" key={`${indexQuestionnaire}${key}`}>{item.option}</div>
                    </>
                    ) : 'No answer'}
                  </div>

                </div>
              </div></>
            }
          </div>
        </div>
        ))}
      </div>
    </>
  )
}

export default Questionnaire