import { useEffect, useState } from "react";

const ApplicantKeySkills = ({ profileDashboard }: any) => {
  const [databaseSkillSet, setDatabaseSkillSet] = useState([{ id: null, profileKeySkills: { id: '', title: '' } }]);
    useEffect(() => {
        if (profileDashboard?.keySkills) {
          setDatabaseSkillSet(profileDashboard?.keySkills);
        }
    
      }, [profileDashboard])
  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]">
        <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between font-bold">
          <h1>Key skills</h1>
        </div>
        {
          databaseSkillSet?.length === 0 
        }
      </div>
      {Object.keys(databaseSkillSet)?.length ? <div className="flex flex-wrap">
        {databaseSkillSet && databaseSkillSet?.map((item, key) =>
          <span key={key} className="text-xs border border-gray-300 rounded-3xl py-1 px-2 text-center m-1.5">{item.profileKeySkills?.title}</span>
        )}
      </div>
        : <span className="text-sm text-gray-500">There is no skill details mention.</span>
      }

    </div>
  )
}

export default ApplicantKeySkills