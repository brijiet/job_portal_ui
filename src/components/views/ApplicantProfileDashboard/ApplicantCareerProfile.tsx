const ApplicantCareerProfile = ({ profileDashboard }: any) => {

  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between font-bold">
          <h1>Career profile</h1>          
        </div>
        {
          !profileDashboard?.careerProfile 
        }
      </div>
      <div className="grid grid-cols-2 gap-4">

        <div>
          <div className="text-gray-500 text-sm">Current industry</div>
          {profileDashboard?.careerProfile?.industry?.title &&
            <div className="text-sm font-bold text-gray-500">{profileDashboard?.careerProfile?.industry?.title}</div>
          }
          
        </div>


        <div>
          <div className="text-gray-500 text-sm">Department</div>
          {profileDashboard?.careerProfile?.department?.title &&
            <div className="text-sm font-bold text-gray-500">{profileDashboard?.careerProfile?.department?.title}</div>
          }
         
        </div>


        <div>
          <div className="text-gray-500 text-sm">Role category</div>
          {profileDashboard?.careerProfile?.roleCategory?.title &&
            <div className="font-bold text-gray-500">{profileDashboard?.careerProfile?.roleCategory?.title}</div>
          }
          
        </div>


        <div>
          <div className="text-gray-500 text-sm">Job role</div>
          {profileDashboard?.careerProfile?.jobRole?.title &&
            <div className="font-bold text-gray-500">{profileDashboard?.careerProfile?.jobRole?.title}</div>
          }
         
        </div>

        <div>
          <div className="text-gray-500 text-sm">Desired job type</div>
          <div className="text-sm">
            {profileDashboard?.careerProfile?.careerProfileJobType.map((item:any, key:any) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.jobType?.title},</div>)}
            
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Desired employment type</div>
          <div className="text-sm">
            {profileDashboard?.careerProfile?.careerProfileEmployeeType.map((item:any, key:any) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.employeeType?.title},</div>)}
            
          </div>
        </div>
        <div><div className="text-gray-500 text-sm">Preferred shift</div>
          <div className="text-sm">
            {profileDashboard?.careerProfile?.careerProfilePreferredShift.map((item:any, key:any) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.preferredShift?.title},</div>)}
           
          </div>
        </div>
        <div >
          <div className="text-gray-500 text-sm">Preferred work location</div>
          <div className="text-sm">
            {profileDashboard?.careerProfile?.careerProfilePreferredLocations.map((item:any, key:any) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.location?.title},</div>)}
            
          </div>
        </div>
        {profileDashboard?.careerProfile?.expectedSalary &&
          <div>
            <div className="text-gray-500 text-sm">Expected salary</div>
            <div className="text-sm font-bold text-gray-500">{profileDashboard?.careerProfile?.currency?.title}{profileDashboard?.careerProfile?.expectedSalary}</div>
            
          </div>
        }
      </div>
    </div>



  )
}

export default ApplicantCareerProfile;