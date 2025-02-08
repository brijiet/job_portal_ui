import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { removeYearText } from '../utils/utils';


const JobListItem = ({ jobItem, onClickJobItem, saveJobCount, setJobId, setSaveButton }: any) => {
  const name = Cookies.get('name')

  return (
    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5">
      <div className="flex items-start justify-between mb-3">
        <img
          className="w-14 h-14 xl:w-14 xl:h-14 2xl:w-20 2xl:h-20 rounded-lg"
          src={jobItem?.company?.companyImage ? `${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${jobItem?.company?.companyImage}`.replace(/"/g, '') as any : `${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`} alt="company logo" />
        <div>
          {!name ? (<Link to='/login'><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}bookMark.svg`} alt="BookMark" className="2xl:w-6 2xl:h-6" /></Link>) :
            (
              <button
                className='p-2'
                onClick={() => { setJobId(Number(jobItem?.id)); setSaveButton("save"); }}
              >
                {saveJobCount[jobItem?.id] ? (
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}bookIconColored.svg`} alt="BookMark Dark" className="2xl:w-6 2xl:h-6" />

                ) : (
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}bookMark.svg`} alt="BookMark" className="2xl:w-6 2xl:h-6" />
                )}
              </button>
            )
          }
          <button className="p-2">
            {/* <img src={ThreeDots} alt="ThreeDots" /> */}
          </button>
        </div>
      </div>
      <div className="cursor-pointer" key={jobItem.id}
        onClick={() => onClickJobItem(jobItem.id)}
      >
        <h1 className="text-base xl:text-base 2xl:text-xl font-bold">{jobItem?.title}</h1>
      </div>
      {jobItem?.company?.title ? <h2 className="text-[#94A3B8] text-sm xl:text-sm 2xl:text-base  text-ellipsis w-56 overflow-hidden whitespace-nowrap">{jobItem?.company?.title}</h2> : <h2 className="text-[#94A3B8] text-sm  text-ellipsis w-56 overflow-hidden whitespace-nowrap">Not Disclosed.</h2>}
      <hr className="my-5" />
      <div className="mb-3 text-[#475569] text-xs xl:text-xs 2xl:text-sm flex justify-start items-center">
        <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ExperienceIcon.svg`} alt="ExperienceIcon" width="15rem" height="15rem" />
        {jobItem?.totalExpYearStart?.title ? <div>
          <span className="ml-2">{removeYearText(jobItem?.totalExpYearStart?.title)} -</span>
          <span className="ml-1">{jobItem?.totalExpYearEnd?.title}</span>
        </div> : <span className="ml-2">{jobItem?.totalExpYearEnd?.title}</span>}
      </div>
      {
        !(jobItem?.hideSalaryDetails)
          ? <div className="mb-3 text-[#475569] text-xs xl:text-xs 2xl:text-sm flex justify-start items-center">
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}MoneyIcon.svg`} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2">
              {
                jobItem?.payScaleLowerRange?.title
                  ? <Fragment>
                    <span> {jobItem?.currency?.title}{jobItem?.payScaleLowerRange?.title} -</span>
                    <span className="ml-1 mr-1">{jobItem?.payScaleUpperRange?.title}</span>
                  </Fragment>
                  : <span className="ml-1 mr-1"> {jobItem?.payScaleUpperRange?.title} </span>
              }
              {jobItem?.numberSystem
                ?.title} <span>{jobItem?.recurrence?.title}</span></span>
          </div>
          : <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}MoneyIcon.svg`} alt="MoneyIcon" width="15rem" height="15rem" />
            <span className="ml-2 text-[#475569] text-xs flex justify-start items-center">Not Disclosed</span>
          </div>
      }
      <div className="mb-5 text-[#475569] text-xs xl:text-xs 2xl:text-sm flex justify-start items-center">
        <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="LocationIcon" width="15rem" height="15rem" />
        <div className="overflow-hidden whitespace-nowrap text-ellipsis">
          {Object.keys(jobItem?.jobsLocation).length ? jobItem?.jobsLocation?.map((jobLocation: any, index: number) =>
            <span className="ml-2 " key={index}>{(index ? ', ' : '') + jobLocation?.location?.title}</span>) : <span className="ml-2">Not Disclosed</span>
          }
        </div>
      </div>
      <div className="flex">
        {jobItem?.workMode && <span className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2 text-xs xl:text-xs 2xl:text-sm">{jobItem?.workMode?.title}</span>}
        {jobItem?.employmentType && <span className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg text-xs xl:text-xs 2xl:text-sm">{jobItem?.employmentType?.title}</span>}
      </div>
    </div>
  )
}

export default JobListItem