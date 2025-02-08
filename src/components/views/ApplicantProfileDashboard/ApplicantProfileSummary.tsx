const ApplicantProfileSummary = ({profileDashboard}:any) => {

    const testSummary = "Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.";
    return (
        <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]" >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center font-bold">
                    <h1>Profile summary</h1>
                </div>
                {
                    !profileDashboard?.profileSummary
                        
                }
            </div>
            <span className="text-sm text-gray-500">
                {
                    !profileDashboard?.profileSummary
                    && testSummary
                }
                {profileDashboard?.profileSummary}
            </span>
        </div>
    )
}

export default ApplicantProfileSummary ;
    ;