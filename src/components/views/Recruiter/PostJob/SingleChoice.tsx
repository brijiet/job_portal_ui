import SingleChoiceField from './SingleChoiceField';

function SingleChoice({ index, register, watch, handleDoneStatusChange, doneStatus, addFormSingleFields, formValues, removeSubFormFields, handlesChange }: any) {

  return (
    <>
      <div className=" self-stretch h-auto flex-col justify-start items-start gap-2 flex">
        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Response</div>
        <div className="w-full flex-col justify-start items-start gap-3 flex">

          {formValues[index]?.singleSelection?.map((element: any, innerIndex: any) => (
            element.option && <div className="w-full h-12 border-b border-slate-200 justify-start items-center inline-flex" key={innerIndex}>
              <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                <div className="w-6 h-6 justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}smallCircle.svg`} alt='smallCircle' /></div>
                <div className="text-black font-normal leading-snug tracking-tight text-sm">{element.option}</div>
              </div>
              <div className="justify-start items-center flex">
                <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex cursor-pointer" onClick={() => removeSubFormFields(index, innerIndex)}><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}close.svg`} alt='close' /></div>
              </div>
            </div>
          ))}
          <SingleChoiceField
            watch={watch}
            register={register}
            index={index}
            addFormSingleFields={addFormSingleFields}
          />
        </div>
      </div>
      <div className="self-stretch justify-start items-center gap-5 inline-flex mt-5">
        <div className="justify-start items-center gap-2 flex">
          <label className="relative inline-flex items-center cursor-pointer">

            <input
              type="checkbox"
              {...register(`questionnaire.${index}.requiredCheck`)}
              defaultValue={watch(`questionnaire.${index}.requiredCheck`)}
              onChange={e => handlesChange(index, e, e.target.checked, "requiredCheck")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-slate-600 text-base font-normal  leading-snug tracking-tight">Required</span>
          </label>
        </div>
        <div className="w-[65px] p-3 bg-indigo-600 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={e => handleDoneStatusChange(index, !doneStatus[index] || false)}>
          <div className="text-white text-base font-medium leading-snug tracking-tight">Done</div>
        </div>
      </div>
    </>
  )
}

export default SingleChoice