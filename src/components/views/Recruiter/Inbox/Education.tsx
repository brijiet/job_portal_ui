
export default function Education({ profileDashboard }: any) {

  return (
    <div className="self-stretch h-auto flex-col justify-center items-start gap-1 flex">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <div className="text-slate-500 text-base font-normal leading-snug tracking-tight">Education</div>
      </div>
      {profileDashboard?.jobSeekerProfile?.educations
        ? profileDashboard?.jobSeekerProfile?.educations?.map((item: any, index: number) => (
          <>

            <div className="self-stretch justify-start items-center gap-5 inline-flex">
              <div className="text-black text-base font-normal leading-snug tracking-tight">{item?.education} ({(item?.education === "10th" || item?.education === "12th") ? parseInt(item?.passingYear) - 2 : parseInt(item?.passingYear) - 4} - {item?.passingYear})</div>
              <div className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight">@
                {item?.institute}</div>
            </div>
            {profileDashboard?.jobSeekerProfile?.education?.length !== index + 1 && <hr className="" />}
          </>
        ))
        : ''
      }

    </div>
  )
}