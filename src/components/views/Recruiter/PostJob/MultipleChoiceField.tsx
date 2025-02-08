const MultipleChoiceField = ({ index, watch, register, addFormMultipleFields }: any) => {
  return (
    <>
      <div className="w-full h-12 border-b border-slate-200 justify-start items-center inline-flex">
        <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
          <div className="w-6 h-6 relative"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}checkbox.svg`} alt='checkbox' /></div>
          <div className="text-black text-base font-normal leading-snug tracking-tight">
            <input
              className="w-full border text-sm border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5"
              placeholder={"Option"}
              {...register(`questionnaire.${index}.multipleSelectionField`)}
              defaultValue={watch(`questionnaire.${index}.multipleSelectionField`)}
            />
          </div>
        </div>
        <div className="justify-start items-center flex">
          <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
            <div className="text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => addFormMultipleFields(index, watch(`questionnaire.${index}.multipleSelectionField`))}>Add</div>
          </div>
        </div>
      </div >
    </>
  )
}

export default MultipleChoiceField