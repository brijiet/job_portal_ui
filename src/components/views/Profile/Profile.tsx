import { useEffect, useState } from 'react';
import Education from './Education/Education';
import ResumeHeadline from './ResumeHeadline/ResumeHeadline';
import KeySkills from './KeySkills/KeySkills';
import ProfileSummary from './ProfileSummary/ProfileSummary';
import ResumeUpload from './ResumeUpload/ResumeUpload';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import { useAppDispatch, useAppSelector } from '../../../';
import { profileDashboardGet, clearGetProfileDashboardSlice } from '../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import CareerProfile from './CareerProfile/CareerProfile';
import Modal from '../../commonComponents/Modal';
import ProfilePictureUploadForm from './ProfilePictureUpload/ProfilePictureUploadForm';
import ProfileBasicDetails from './ProfileBasicDetails/ProfileBasicDetails';
import Employment from './Employment/Employment';
import ProfileLeftPanel from './ProfileLeftPanel';
import { clearKeySkillsSlice } from '../../../store/reducers/jobSeekerProfile/keySkills';

const Profile = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profilePicPath, setProfilePicPath] = useState();
  const { success, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success: profilePictureUploadSuccess } = useAppSelector((state) => state.jobSeekerUploadProfilePicture);
  const { success: profilePictureDeleteSuccess } = useAppSelector((state) => state.jobSeekerDeleteProfilePicture)
  const { success: keySkillsUpdateSuccess } = useAppSelector((state) => state.keySkills);

  useEffect(() => {
    dispatch(profileDashboardGet());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearGetProfileDashboardSlice());
    }
    if (keySkillsUpdateSuccess) {
      dispatch(clearKeySkillsSlice());
      dispatch(profileDashboardGet());

    }
  }, [dispatch, success, keySkillsUpdateSuccess]);

  useEffect(() => {
    if (profilePictureUploadSuccess) {
      setIsOpen(false);
    }
  }, [profilePictureUploadSuccess]);

  useEffect(() => {
    if (profilePictureDeleteSuccess) {
      setIsOpen(false);
    }
  }, [profilePictureDeleteSuccess]);

  useEffect(() => {
    let profilePictureCompletePath;
    if (profileDashboard?.profilePicturePath) {
      profilePictureCompletePath = `${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${profileDashboard?.profilePicturePath}`;
      setProfilePicPath(profilePictureCompletePath as any)
    } else {
      setProfilePicPath(`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg` as any)
    }
  }, [profileDashboard])

  const openModal = () => {
    setIsOpen(true);
  }

  const closeDialog = () => {
    setIsOpen(false);
  }

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-[#F8FAFC] font-sans px-32 py-10">
        <div className="grid grid-cols-10 gap-4">
          <div className="col-start-1 col-end-4">
            <ProfileLeftPanel profileDashboard={profileDashboard} />
          </div>
          <div className="col-start-4 col-end-11">
            {/* card */}
            <div className="grid grid-cols-5 gap-4">
              <div className="col-start-1 col-end-4 border border-[#E0E7FF] rounded-lg bg-[#FFF]">
                <div className="w-full h-40 relative">
                  <div className="w-full h-2/3 bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] rounded-t-lg">
                  </div>
                  <div className="w-full h-1/3 bg-[#FFF]">
                  </div>
                  <div className="absolute bg-[#FFF] top-2/3 left-10 -translate-y-1/2 h-32 w-32 rounded-full p-1 cursor-pointer" onClick={openModal}>
                    <img src={profilePicPath} alt="logo" className="rounded-full object-fill  w-full h-full" />
                  </div>
                </div>
                <ProfileBasicDetails />
              </div>
              <div id="resumeUpload" className="scroll-mt-24 scroll-smooth col-start-4 col-end-6">
                <ResumeUpload />
              </div>
            </div>
            <div id="resumeHeadline" className="scroll-mt-24 scroll-smooth">
              <ResumeHeadline />
            </div>
            <div id="careerProfile" className="scroll-mt-24 scroll-smooth">
              <CareerProfile profileDashboard={profileDashboard} />
            </div>
            <div id="keySkills" className="scroll-mt-24 scroll-smooth">
              <KeySkills profileDashboard={profileDashboard} />
            </div>
            <div id="education" className="scroll-mt-24 scroll-smooth">
              <Education />
            </div>
            <div id="profileSummary" className="scroll-mt-24 scroll-smooth">
              <ProfileSummary />
            </div>
            <div id="personalDetails" className="scroll-mt-24 scroll-smooth">
              <PersonalDetails />
            </div>
            <div id="employment" className="scroll-mt-24 scroll-smooth">
              <Employment />
            </div>
          </div>
        </div>



      </div >
      {/* modal for profile picture */}
      {
        isOpen &&
        <div className="col-start-2 col-end-6">
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalBody={
              <ProfilePictureUploadForm
                closeDialog={closeDialog}
              />
            }
          />
        </div>
      }
    </>
  )
}

export default Profile;