import React from 'react';
import Select from 'react-select';

const QuestionType = ({ register, setQuestion, watch, index }: any) => {
  const options = [
    { value: 'shortAnswer', label: 'Short Answer' },
    { value: 'multipleChoice', label: 'Multiple Choice' },
    { value: 'singleChoice', label: 'Single Choice' }
  ];
  return (
    <>
      <div className="mb-4">
        <div className="block text-sm font-medium leading-6 text-gray-900 ">Question type</div>
        <div className="mt-1">
          <Select
            // defaultValue={options[0]}
            {...register}
            isClearable={true} // enable isClearable to demonstrate extra error handling
            isSearchable={true}
            className="text-sm"
            options={options}
            onChange={(event: any) => setQuestion(event.value)}
            defaultValue={watch(`questionnaire.${index}.questionType`)}
            placeholder={"Select question Type"}

          />
        </div>
      </div>
    </>
  )
}

export default QuestionType