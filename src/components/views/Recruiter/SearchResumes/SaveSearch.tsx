import React, { useEffect, useState } from 'react'
import NoRecords from '../../../commonComponents/NoRecords'

const SaveSearch = ({ saveResume, showAllSaveSearch, viewAllSaveSearch, handleSingleSaveSearch }: any) => {

  return (
    <div className="w-full h-auto flex-col justify-start items-start gap-7 inline-flex">
      <div className="w-full justify-between items-center inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
          <div className="self-stretch text-black text-2xl font-bold leading-[28.80px] tracking-tight">Saved Searches</div>
        </div>
      </div>
      {saveResume.length > 0 ? <>
        <div className="w-full h-auto  grid grid-cols-2  justify-start items-end">
          <div className=" justify-start items-center ">
            {saveResume?.length > 2 && showAllSaveSearch && <div className="float-left text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => viewAllSaveSearch(false)}>{`Show less`}</div>}
            {saveResume?.length > 2 && !showAllSaveSearch && <div className="float-left text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => viewAllSaveSearch(true)}>{`View all`}</div>}
            {saveResume?.length <= 2 && <div className="float-left text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer"></div>}
          </div>
          <div className=" content-end ">
            <div className="float-right text-sm font-medium leading-[16.80px] tracking-tight">{saveResume?.length} Search</div>
          </div>
        </div>
        {!showAllSaveSearch && <div className="w-full flex-col justify-start items-start gap-5 flex">
          {saveResume && saveResume?.slice(-2)?.reverse()?.map((item: any) =>
            <div className="w-full h-auto p-5 bg-white rounded-xl flex-col justify-start items-start flex cursor-pointer" key={item.id} onClick={() => handleSingleSaveSearch(item?.id)}>
              <div className="self-stretch h-auto flex-col justify-start items-end gap-3 flex">
                <div className="self-stretch h-auto flex-col justify-start items-start gap-1 flex">
                  <div className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">Keywords</div>
                  <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">{item?.resumeSearchKeywords?.map((itemKeywords: any, index: any) => <span key={index}>{(index ? ', ' : '') + itemKeywords?.resumeKeySkills?.title} </span>)}</div>
                </div>
                <div className="self-stretch h-12 flex-col justify-start items-start gap-1 flex">
                  <div className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">Experience</div>
                  <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">({item?.minExperience} - {item?.maxExperience})Years</div>
                </div>
                <div className="self-stretch h-12 flex-col justify-start items-start gap-1 flex">
                  <div className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">Salary</div>
                  <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">({item?.minSalary} - {item?.maxSalary})Lacs</div>
                </div>
              </div>
            </div>)}
        </div>}
        {showAllSaveSearch && <div className="h-96 overflow-y-auto w-full">
          <div className="w-full flex-col justify-start items-start gap-5 flex">
            {saveResume && saveResume?.reverse()?.map((item: any) =>
              <div className="w-full h-auto p-5 bg-white rounded-xl flex-col justify-start items-start flex cursor-pointer" key={item.id} onClick={() => handleSingleSaveSearch(item?.id)}>
                <div className="self-stretch h-auto flex-col justify-start items-end gap-3 flex">
                  <div className="self-stretch h-auto flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">Keywords</div>
                    <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">{item?.resumeSearchKeywords?.map((itemKeywords: any, index: any) => <span key={index}>{(index ? ', ' : '') + itemKeywords?.resumeKeySkills?.title} </span>)}</div>
                  </div>
                  <div className="self-stretch h-12 flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">Experience</div>
                    <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">({item?.minExperience} - {item?.maxExperience})Years</div>
                  </div>
                  <div className="self-stretch h-12 flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">Salary</div>
                    <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">({item?.minSalary} - {item?.maxSalary})Lacs</div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>}
      </> : <NoRecords />}
    </div>
  )
}

export default SaveSearch