import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../..";
import { applicantProfileDashboardGet,cleargetApplicantProfileDashboardSlice } from "../../../../store/reducers/jobSeekerProfile/applicantProfileDashboard";
import ApplicantProfileBasicDetails from "../../ApplicantProfileDashboard/ApplicantProfileBasicDetails";
import ApplicantResumePreview from "../../ApplicantProfileDashboard/ApplicantResumePreview";
import ApplicantResumeHeadline from "../../ApplicantProfileDashboard/ApplicantResumeHeadline";
import ApplicantCareerProfile from "../../ApplicantProfileDashboard/ApplicantCareerProfile";
import ApplicantKeySkills from "../../ApplicantProfileDashboard/ApplicantKeySkills";
import ApplicantProfileSummary from "../../ApplicantProfileDashboard/ApplicantProfileSummary";
import ApplicantPersonalDetails from "../../ApplicantProfileDashboard/ApplicantPersonalDetails";
import ApplicantEducation from "../../ApplicantProfileDashboard/ApplicantEducation";
import ApplicantEmployment from "../../ApplicantProfileDashboard/ApplicantEmployment";
import Toaster from "../../../commonComponents/Toaster";

const ApplicantDetailsPage = ()=>{
  var profilePictureCompletePath = `${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`;
  var resumeCompletePath;
    const { applicantId } = useParams();
    const dispatch = useAppDispatch();
    const [profilePicPath, setProfilePicPath] = useState();
    const [resumePath, setResumePath] = useState();
    const {success, profileDashboard} = useAppSelector((state)=>state.applicantProfileDashboardGet)
    useEffect(() => {
        const data={applicantId:applicantId}
      dispatch(applicantProfileDashboardGet(data));
    }, [dispatch]);
  
    useEffect(() => {
      if (success) {
      if (profileDashboard?.profilePicturePath) {
        profilePictureCompletePath = `${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${profileDashboard?.profilePicturePath}`;
        setProfilePicPath(profilePictureCompletePath as any)

      }
      else if(profileDashboard?.resumePath){
        resumeCompletePath = `${process.env.REACT_APP_RESUME_FILE_LOCATION}/${profileDashboard?.resumePath}`;
        setResumePath(resumeCompletePath as any)
      } 
      else {
        setProfilePicPath(`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg` as any)
      }
        dispatch(cleargetApplicantProfileDashboardSlice());
      }
    }, [success]);
return(
     <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-[#F8FAFC] font-sans px-32 py-10">
        <div className="grid grid-cols-10 gap-4">
          <div className="col-start-1 col-end-12">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-start-1 col-end-4 border border-[#E0E7FF] rounded-lg bg-[#FFF]">
                <div className="w-full h-40 relative">
                  <div className="w-full h-2/3 bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] rounded-t-lg">
                  </div>
                  <div className="w-full h-1/3 bg-[#FFF]">
                  </div>
                  <div className="absolute bg-[#FFF] top-2/3 left-10 -translate-y-1/2 h-32 w-32 rounded-full p-1 cursor-pointer" >
                    <img src={profilePicPath ? profilePicPath : profilePictureCompletePath} alt="logo" className="rounded-full object-fill  w-full h-full" />
                  </div>
                </div>
                <ApplicantProfileBasicDetails profileDashboard={profileDashboard}/>
              </div>
            </div>
            <div id="resumeHeadline" className="scroll-mt-24 scroll-smooth">
              <ApplicantResumeHeadline profileDashboard={profileDashboard} />
            </div>
            <div id="careerProfile" className="scroll-mt-24 scroll-smooth">
              <ApplicantCareerProfile profileDashboard={profileDashboard} />
            </div>
            <div id="keySkills" className="scroll-mt-24 scroll-smooth">
              <ApplicantKeySkills profileDashboard={profileDashboard} />
            </div>
            <div id="education" className="scroll-mt-24 scroll-smooth">
              <ApplicantEducation profileDashboard={profileDashboard} />
            </div>
            <div id="profileSummary" className="scroll-mt-24 scroll-smooth">
              <ApplicantProfileSummary profileDashboard={profileDashboard} />
            </div>
            <div id="personalDetails" className="scroll-mt-24 scroll-smooth">
              <ApplicantPersonalDetails profileDashboard={profileDashboard} />
            </div>
            <div id="employment" className="scroll-mt-24 scroll-smooth">
              <ApplicantEmployment profileDashboard={profileDashboard} />
            </div>
            <div id="resumePreview" className="scroll-mt-24 scroll-smooth">
                <ApplicantResumePreview  resumePath={resumePath} data={profileDashboard} />
            </div>
          </div>
        </div>  
      </div >
      <Toaster/>
    </>
)
}
export default ApplicantDetailsPage;