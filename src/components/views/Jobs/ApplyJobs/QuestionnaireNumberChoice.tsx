import React from 'react'

const QuestionnaireNumberChoice = ({ index, questionSet, register, watch, totalQuestion }: any) => {

  return (
    <>
      <hr className="w-full my-10" />
      <div className="flex flex-col">
        <label><span className="mr-2">{index + 1}/{totalQuestion}</span><span className="font-bold">{questionSet?.question}</span></label>
        <input
          defaultValue={watch(`questionnaire.${index}.numberChoice`)}
          className="outline-none rounded-lg p-3 border border-[#E2E8F0] mt-3"
          placeholder="Your answer here"
          type='number'
          maxLength={questionSet?.characterLimit}
          required={questionSet?.requiredCheck}
          {...register(`questionnaire.${index}.numberChoice`)}
        />
      </div>
    </>
  )
}

export default QuestionnaireNumberChoice