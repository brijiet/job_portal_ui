const SingleChoiceField = ({ index, watch, register, addFormSingleFields }: any) => {
  
  return (
    <>
      <div className="w-full h-12 border-b border-slate-200 justify-start items-center inline-flex">
        <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
          <div className="w-6 h-6 justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}smallCircle.svg`} alt='smallCircle' /></div>
          <div className="text-slate-400 font-normal leading-snug tracking-tight text-sm">
            <input
              className="w-full border text-sm border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5"
              placeholder={"Option"}
              {...register(`questionnaire.${index}.singleSelectionField`)}
              defaultValue={watch(`questionnaire.${index}.singleSelectionField`)}
            />
          </div>
        </div>
        <div className="justify-start items-center flex">
          <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
            <div className="text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={(e) => addFormSingleFields(e, index, watch(`questionnaire.${index}.singleSelectionField`))}>Add</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleChoiceField