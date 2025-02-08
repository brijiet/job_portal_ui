import React from 'react'
import NoRecords from './NoRecords';

const CompanyListItem = ({ item }: any) => {

  return (
    <>
      {
        Object.keys(item)?.length ?
          <>
            <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 mb-5 cursor-pointer" onClick={() => window.open(`/allCompanies/companyDescription/${item?.id}`,'_blank')}>
              <div className="flex items-start justify-between mb-3">
                <img
                className='w-14 h-14 xl:w-14 xl:h-14 2xl:w-20 2xl:h-20 rounded-lg' 
                src={item?.companyImage ?`${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${item?.companyImage}`.replace(/"/g, '') as any:`${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`} alt="company logo" />
                <button className="px-3 py-2 bg-gray-200 rounded-md text-xs xl:text-xs 2xl:text-sm">
                  {item?.jobs ? item?.jobs?.length : 0 } Jobs
                </button>
              </div>
              <h1 className="text-base xl:text-base 2xl:text-lg font-bold mb-1 overflow-hidden whitespace-nowrap text-ellipsis">{item?.title}</h1>
              <div className="text-[#475569] text-xs xl:text-xs 2xl:text-sm flex justify-start items-center">
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="LocationIcon" width="15rem" height="15rem" />
                <div className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">
                  {Object.keys(item?.location).length ? item?.location?.map((loc: any) => <span>{loc?.title}, </span>) : <span>Not disclosed</span>}
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-start items-center text-xs xl:text-xs 2xl:text-sm">
                <div className="flex justify-start items-center">
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}starIcon.svg`} alt="StarIcon" width="15rem" height="15rem" />
                  <span className="ml-1 text-[#64748B]">{item?.rating && item?.rating}</span>
                </div>
                {item?.reviews && <span className="border border-gray-300 h-5 mx-2"></span>}
                <span className="text-[#64748B]">{item?.reviews && `${item?.reviews} Reviews`}</span>
              </div>
            </div>
          </>
          :
          <NoRecords />
      }
    </>

  )
}

export default CompanyListItem