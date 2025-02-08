
const ApplicantEducation = ({profileDashboard}: any)=> {

  return (
    <div className="w-full rounded-2xl bg-white border border-[#E0E7FF] p-4 mt-4" >
      <div className="flex items-center justify-between mb-4 font-bold">
        <h1>Education</h1>
      </div>
      <div>
        {
          Object.keys(profileDashboard).length && Object.keys(profileDashboard?.educations)?.length
            ? profileDashboard?.educations?.map((item:any, index:any) => (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="leading-none font-semibold">{item?.education}</h1>
                    <span className="block text-sm mb-3">{item?.institute}</span>
                    <span className="block text-[#64748B] text-sm">
                      {(item?.education === "10th" || item?.education === "12th") ? parseInt(item?.passingYear) - 2 : parseInt(item?.passingYear) - 4} - {item?.passingYear}
                    </span>
                  </div>
                </div>
                {Object.keys(profileDashboard?.educations)?.length !== index + 1 && <hr className="my-5" />}
              </>
            ))
            : <span className="text-sm text-gray-500">Applicant not mention education details.</span>
        }
      </div>
    </div>
  )
}

export default ApplicantEducation;