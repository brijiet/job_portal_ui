const ApplicantResumeHeadline = ({profileDashboard}:any) => {
  const resumeHeadlineSummery = "It is the first thing recruiters notice in your profile. Write concisely what makes you unique and right person for the job you are looking for.";
  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]" >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between font-bold">
          <h1>Resume headline</h1>
        </div>
        {
          !profileDashboard?.resumeHeadline
        }
      </div>
      <span className="text-sm text-gray-500">
        {
          !profileDashboard?.resumeHeadline
          && resumeHeadlineSummery
        }
        {profileDashboard?.resumeHeadline}
      </span>
     
    </div>
  )
}

export default ApplicantResumeHeadline;