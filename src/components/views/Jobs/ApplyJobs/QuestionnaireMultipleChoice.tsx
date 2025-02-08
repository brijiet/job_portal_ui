import React, { useState } from 'react';

const QuestionnaireMultipleChoice = ({ index, questionSet, register, checkboxRequired, isCheckboxRequired, totalQuestion }: any) => {
  const handleCheckBox = (e: any) => {
    console.log(e.currentTarget.checked);

    isCheckboxRequired(!e.currentTarget.checked);
  }

  return (
    <>
      <hr className="w-full my-10" />
      <div className="flex flex-col">
        <p><span className="mr-2">{index + 1}/{totalQuestion}</span><span className="font-bold">{questionSet?.question}</span></p>
        <div className="mt-3 flex flex-col gap-2">
          {questionSet?.multipleSelection?.map((option: any, key: any) => (
            <>
              {questionSet?.requiredCheck &&
                <div>
                  <input
                    defaultValue={option.id}
                    type="checkbox"
                    required={checkboxRequired}
                    maxLength={questionSet?.characterLimit}
                    onClick={handleCheckBox}
                    {...register(`questionnaire.${index}.multipleChoice`, {
                    })}
                  />
                  <label className="ml-2"> {option.option}</label>
                </div>
              }
              {!questionSet?.requiredCheck &&
                <div>
                  <input
                    defaultValue={option.id}
                    type="checkbox"
                    maxLength={questionSet?.characterLimit}
                    {...register(`questionnaire.${index}.multipleChoice`)}
                  />
                  <label className="ml-2"> {option.option}</label>
                </div>
              }
            </>
          ))}


        </div>
      </div>
    </>
  )
}

export default QuestionnaireMultipleChoice