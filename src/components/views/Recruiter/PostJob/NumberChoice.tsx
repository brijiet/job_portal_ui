import React from 'react'

const NumberChoice = ({ index, register, handlesChange, watch, handleDoneStatusChange, doneStatus }: any) => {

  return (
    <>
      <div className="self-stretch justify-start items-center gap-5 mt-5 inline-flex">
        <div className="grow shrink basis-0 h-10 justify-start items-center gap-5 flex">
          <div className="w-60 h-10 p-3 bg-white justify-start items-center gap-2 flex">
            <div className="w-[61px] self-stretch justify-start items-center gap-3 flex">
              <div className="text-slate-600 text-base font-normal leading-snug tracking-tight">Range</div>
            </div>

            <div className="grow shrink basis-0 h-[22px] justify-center items-center gap-2 flex">
              <div className="grow shrink basis-0 text-center text-slate-400 text-base font-normal leading-snug tracking-tight">
                <input
                  defaultValue={watch(`questionnaire.${index}.rangeMax`)}
                  className="w-full border text-sm border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5"
                  placeholder={"Max"}
                  {...register(`questionnaire.${index}.rangeMax`)}
                  onChange={e => handlesChange(index, e, e.target.value, "rangeMax")}
                />
              </div>
            </div>
          </div>
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
        </div>
        <div className="w-[65px] p-3 bg-indigo-600 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={e => handleDoneStatusChange(index, !doneStatus[index] || false)}>
          <div className="text-white text-base font-medium leading-snug tracking-tight">Done</div>
        </div>
      </div>
    </>
  )
}

export default NumberChoice