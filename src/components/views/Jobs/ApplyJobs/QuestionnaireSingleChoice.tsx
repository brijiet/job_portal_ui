import React from 'react';

function QuestionnaireSingleChoice({ index, questionSet, register, totalQuestion }: any) {

  return (
    <>
      <hr className="w-full my-10" />
      <div className="flex flex-col">
        <p><span className="mr-2">{index + 1}/{totalQuestion}</span><span className="font-bold mr-2">{questionSet?.question}</span></p>
        <div className="mt-3 flex flex-col gap-2">
          {questionSet?.singleSelection?.map((option: any, key: any) => (
            <>
              {questionSet?.requiredCheck &&
                <div>
                  <input
                    value={option.id}
                    type="radio"
                    maxLength={questionSet?.characterLimit}
                    required={key === 1 && true}
                    {...register(`questionnaire.${index}.singleChoice`)}
                  />
                  <label className="ml-2">{option.option}</label>
                </div>
              }
              {!questionSet?.requiredCheck &&
                <div>
                  <input
                    value={option.id}
                    type="radio"
                    maxLength={questionSet?.characterLimit}
                    {...register(`questionnaire.${index}.singleChoice`)}
                  />
                  <label className="ml-2">{option.option}</label>
                </div>
              }
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default QuestionnaireSingleChoice