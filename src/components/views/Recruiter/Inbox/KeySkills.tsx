import React, { useEffect, useState } from 'react';

const KeySkills = ({ profileDashboard }: any) => {

  const [databaseSkillSet, setDatabaseSkillSet] = useState([{ id: null, profileKeySkills: { id: '', title: '' } }]);
  const [keySkillFetch, setKeySkillFetch] = useState([{ id: null, profileKeySkills: { id: '', title: '' } }]);

  useEffect(() => {
    if (profileDashboard?.jobSeekerProfile?.keySkills) {
      setKeySkillFetch(profileDashboard?.jobSeekerProfile?.keySkills);
      setDatabaseSkillSet(profileDashboard?.jobSeekerProfile?.keySkills);
    }

  }, [profileDashboard])

  return (
    <div className="self-stretch h-[78px] flex-col justify-center items-start gap-1 flex">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <div className="text-slate-500 text-base font-normal leading-snug tracking-tight">Skills</div>
      </div>
      <div className="grid grid-cols-6 gap-2 content-start">
        {Object.keys(databaseSkillSet)?.length ? <>
          {databaseSkillSet && databaseSkillSet?.map((item, key) =>
            <div key={key} className="text-black text-base font-normal leading-snug tracking-tight">{item.profileKeySkills?.title}</div>
          )}
        </>
          : ''
        }
      </div>

    </div>
  )
}

export default KeySkills