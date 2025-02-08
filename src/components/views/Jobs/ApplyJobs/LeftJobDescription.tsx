import { formatDistanceToNow } from 'date-fns';

const LeftJobDescription = ({ jobDetail, lastUpdatedTimestamp }: any) => {
  return (
    <div className=" p-5 bg-white rounded-xl flex-col justify-start items-start inline-flex w-full border border-[#E0E7FF] mb-5">
      <div className="self-stretch justify-start items-center gap-3 inline-flex">
        <img className="w-14 h-14 rounded-lg" src={`${process.env.REACT_APP_IMAGE_BASE_URL}company_logo.png`} alt="companyLogo" />
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch text-slate-900 text-lg font-bold  leading-7 tracking-tight">{jobDetail?.title}</div>
          <div className="self-stretch justify-start items-start gap-1 inline-flex">
            <div className="grow shrink basis-0 text-[#64748B] text-sm font-medium leading-snug tracking-tight">{jobDetail?.company?.title}</div>
          </div>
        </div>
      </div>
      <hr className="my-6 bg-[#E0E7FF] w-full" />
      <div className="grid grid-cols-1 gap-4">
        <div className="justify-start items-center gap-2 flex">
          <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ExperienceIcon.svg`} alt="experience" />
          <span className="text-[#64748B] text-sm  font-medium leading-snug tracking-tight">
            {jobDetail?.totalExpYearStart?.title[0]} -
          </span>
          <span className="text-[#64748B] text-sm  font-medium leading-snug tracking-tight">
            {jobDetail?.totalExpYearEnd?.title[0]} Years
          </span>
        </div>
        {!jobDetail?.hideSalaryDetails && <div className="justify-start items-center gap-2 flex">
          <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}MoneyIcon.svg`} alt="moneyIcon" />
          <span className="text-[#64748B] text-sm font-medium leading-snug tracking-tight">
            {jobDetail?.payScaleLowerRange?.title} -
          </span>
          {jobDetail?.payScaleUpperRange &&
            <span className="text-[#64748B] text-sm font-medium leading-snug tracking-tight"> {jobDetail?.payScaleUpperRange?.title}  {jobDetail?.numberSystem?.title} {jobDetail?.recurrence?.title}
            </span>}
        </div>}
        <div className="justify-start items-center gap-2 flex">
          <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="location" />
          {jobDetail?.jobsLocation?.map((loc: any) =>
            <span className="text-[#64748B] text-sm font-medium leading-snug tracking-tight">
              {loc?.location?.title},
            </span>)}
        </div>
        <div className="justify-start items-center gap-5 inline-flex">
          {jobDetail?.workMode?.title && <div className=" px-3 py-2 bg-orange-50 rounded justify-center items-center gap-2.5 flex">
            <div className="text-orange-600 text-sm font-normal leading-none tracking-tight">{jobDetail?.workMode?.title}</div>
          </div>}
          {jobDetail?.employmentType?.title && <div className=" px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
            <div className="text-green-600 text-sm font-normal leading-none tracking-tight">{jobDetail?.employmentType?.title}</div>
          </div>}
          <span className="text-slate-400 text-sm font-normal  leading-none tracking-tight">
            {lastUpdatedTimestamp !== null && formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true })}
          </span>
        </div>
      </div>
      <hr className="my-6 bg-[#E0E7FF] w-full" />
      <div className="self-stretch  flex-col justify-start items-start gap-3 flex ">
        <div className="self-stretch text-slate-900 text-sm font-bold  leading-snug tracking-tight">Skills</div>
        <div className=" justify-start items-start gap-3 flex-row flex flex-wrap">
          {jobDetail?.jobsKeySkills?.map((keySkill: any) =>
            <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
              <span className="text-black text-sm font-normal  leading-snug tracking-tight">{keySkill?.keySkills?.title}</span>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default LeftJobDescription