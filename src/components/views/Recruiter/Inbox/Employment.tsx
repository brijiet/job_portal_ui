import { useEffect, useState } from 'react';
import { filterArray } from '../../../utils/filterArray';
import { getJoiningDateMonthList, getJoiningDateYearList } from '../../../utils/utils';

export default function Employment({ profileDashboard }: any) {

  const [joiningDateYear, setJoiningDateYear] = useState<any>([]);
  const [joiningDateMonth, setJoiningDateMonth] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const joiningDateYearList = await getJoiningDateYearList()
      if (Object.keys(joiningDateYearList)?.length) {
        setJoiningDateYear(joiningDateYearList as any)
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const joiningDateMonthList = await getJoiningDateMonthList()
      if (Object.keys(joiningDateMonthList)?.length) {
        setJoiningDateMonth(joiningDateMonthList as any)
      }
    })();
  }, [])

  return (
    <div className="w-full  bg-white mt-4" >
      <div className="text-slate-500 text-base font-normal leading-snug tracking-tight">
        Employment
      </div>
      {
        profileDashboard?.jobSeekerProfile?.employments?.map((item: any, index: any) => (
          <>
            <div className=" pt-2">
              <div className="flex items-start justify-between">
                <div className="flex justify-start items-start">
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}companyBrand.png`} alt="companyBrand" />
                  <div className="ml-4">
                    <h1 className="font-bold m-0 p-0 leading-none mb-1">
                      {item?.employmentType === "Full Time" ? item?.designation : item?.role}
                    </h1>
                    <span className="text-sm text-gray-500">{item?.companyName}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 w-3/4 mt-5">
                <span className="text-sm text-gray-500">
                  {
                    item?.employmentType === "Full Time"
                      ? <span>{item?.joiningDateMonth?.title} {item?.joiningDateYear?.title}</span>
                      : <span>
                        {filterArray(joiningDateYear, item?.workedFromYear, undefined)?.[0]?.title} {filterArray(joiningDateMonth, item?.workedFromMonth, undefined)?.[0]?.title}
                      </span>
                  } to {
                    item?.isCurrentEmployment
                      ? "Present"
                      : <span>
                        {filterArray(joiningDateYear, item?.workedTillYear, undefined)?.[0]?.title} {filterArray(joiningDateMonth, item?.workedTillMonth, undefined)?.[0]?.title}
                      </span>
                  }
                </span>
                <div className="">
                  <span className={item?.employmentType === "Full Time" ? "text-sm bg-[#F0FFF5] px-3 rounded-lg text-[#16A34A]" : "text-sm bg-[#FFFAF2]  px-3 rounded-lg text-[#EA580C]"}>{item?.employmentType}</span>
                </div>
                <span className="text-sm text-gray-500">{item?.noticePeriod?.title}</span>
              </div>

              {item && item?.jobProfile?.split('.').slice(0, item?.jobProfile?.split('.').length - 1).map((item1: any, index: any) => <li><span className="text-sm text-gray-500">{item1}</span></li>)}
            </div>
            {Object?.keys(profileDashboard?.jobSeekerProfile?.employments)?.length !== index + 1 && <hr className="my-4" />}
            { }
          </>
        ))
      }

    </div>
  )
}