import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import ProfileIndicator from '../../commonComponents/ProfileIndicator'
import Tick from '../../commonComponents/Tick'
import { useAppDispatch, useAppSelector } from '../../..';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../store/reducers/jobSeekerProfile/profileIndicator';
import { clearUploadState, resumeUpload } from '../../../store/reducers/jobSeekerProfile/uploadResume';
import Modal from '../../commonComponents/Modal';
import ResumeHeadlineForm from './ResumeHeadline/ResumeHeadlineForm';
import ProfilePictureUploadForm from './ProfilePictureUpload/ProfilePictureUploadForm';
import CareerProfileForm from './CareerProfile/CareerProfileForm';
import { careerProfileDetailsGet } from '../../../store/reducers/jobSeekerProfile/getCareerProfile';
import EducationForm from './Education/EducationForm';
import { educationDetailsGet } from '../../../store/reducers/jobSeekerProfile/getEducationDetails';
import { clearJobSeekerEducationAddSlice } from '../../../store/reducers/jobSeekerProfile/jobSeekerEducation';
import ProfileSummaryForm from './ProfileSummary/ProfileSummaryForm';
import PersonalDetailsForm from './PersonalDetails/PersonalDetailsForm';
import { clearPersonalDetailsSlice } from '../../../store/reducers/jobSeekerProfile/personalDetails';
import { clearGetProfileDashboardSlice, profileDashboardGet } from '../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { clearDeletePersonalDetailsLanguages } from '../../../store/reducers/jobSeekerProfile/deletePersonalDetailsLanguages';
import { clearUpdateResumeHeadlineSlice } from '../../../store/reducers/jobSeekerProfile/profileResumeHeadline';
import KeySkillsForm from './KeySkills/KeySkillsForm';
import { clearGetKeySkillsSlice, keySkillsGet } from '../../../store/reducers/dropdown/keySkills';
import { clearUpdateCareerProfileUpdateSlice } from '../../../store/reducers/jobSeekerProfile/careerProfileUpdate';
import { clearKeySkillsSlice } from '../../../store/reducers/jobSeekerProfile/keySkills';
import { parseISO } from 'date-fns';
import EmploymentForm from './Employment/EmploymentForm';
import { clearJobSeekerEmploymentAddSlice } from '../../../store/reducers/jobSeekerProfile/jobSeekerEmploymentAdd';


const ProfileLeftPanel = ({ profileDashboard }: any) => {
  const [isResumeHeadLineOpen, setIsResumeHeadLineOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isProfilePictureOpen, setIsProfilePictureOpen] = useState(false);
  const [isKeySkillsOpen, setIsKeySkillsOpen] = useState(false);
  const [isPersonalDetailsOpen, setIsPersonalDetailsOpen] = useState(false);
  const [isProfileSummeryOpen, setIsProfileSummeryOpen] = useState(false);
  const [isCareerProfileOpen, setIsCareerProfileOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isEmploymentOpen, setIsEmploymentOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [keySkillFetch, setKeySkillFetch] = useState([{ id: null, profileKeySkills: { id: '', title: '' } }]);
  const [selectedEducation, setSelectedEducation] = useState();
  const [databaseSkillSet, setDatabaseSkillSet] = useState([{ id: null, profileKeySkills: { id: '', title: '' } }]);
  const [selectedEmployment, setSelectedEmployment] = useState();
  const [isAddDelete, setIsAddDeleted] = useState({ state: '', message: '', color: '' });

  const testSummary = "Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.";
  const resumeHeadlineSummery = "It is the first thing recruiters notice in your profile. Write concisely what makes you unique and right person for the job you are looking for.";

  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { success: profileIndicatorSuccess, profileIndicator } = useAppSelector((state) => state?.getProfileIndicator);
  const { success: educationSuccess, educationDetails } = useAppSelector((state) => state.educationDetails);
  const { success: educationUpdateSuccess } = useAppSelector((state) => state.education);
  const { success: employmentSuccess, employmentData } = useAppSelector((state) => state.employment);
  const { success: profileSummerySuccess } = useAppSelector((state) => state.updateProfileDashboard);
  const { success: personalDetails } = useAppSelector((state) => state.personalDetails);
  const { success: languagesDeletedSuccess } = useAppSelector((state) => state.deletePersonalDetailsLanguages);
  const { success: resumeHeadlineSuccess } = useAppSelector((state) => state.updateResumeHeadline);
  const { success: keySkillsSuccess, keySkills } = useAppSelector((state) => state.getKeySkills);
  const { success: keySkillsUpdateSuccess } = useAppSelector((state) => state.keySkills);
  const { success: careerProfileSuccess, careerProfileDetails } = useAppSelector((state) => state.getCareerProfile);
  const { success: careerProfileUpdateSuccess } = useAppSelector((state) => state.updateProfileDashboard);
  const { success: successCareerProfileUpdate } = useAppSelector((state) => state.updateCareerProfile);
  useEffect(() => {

    if (successCareerProfileUpdate) {
      setIsCareerProfileOpen(false);
      dispatch(clearUpdateCareerProfileUpdateSlice());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());

    }
    if (educationUpdateSuccess) {
      setIsEducationOpen(false);
      dispatch(clearJobSeekerEducationAddSlice());

    }

    if (profileSummerySuccess) {
      setIsProfileSummeryOpen(false);
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }

    if (personalDetails) {
      setIsPersonalDetailsOpen(false);
      dispatch(clearPersonalDetailsSlice());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());

    }
    if (languagesDeletedSuccess) {
      setIsPersonalDetailsOpen(false);
      dispatch(clearDeletePersonalDetailsLanguages());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }

    if (resumeHeadlineSuccess) {
      setIsResumeHeadLineOpen(false);
      dispatch(clearUpdateResumeHeadlineSlice());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());

    }
    if (keySkillsUpdateSuccess) {
      setIsKeySkillsOpen(false);
      dispatch(clearGetKeySkillsSlice())
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }

    if (employmentSuccess) {
      setIsEmploymentOpen(false);
      dispatch(clearJobSeekerEmploymentAddSlice())
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }

  }, [dispatch, profileIndicatorSuccess, careerProfileSuccess, educationUpdateSuccess, profileSummerySuccess, personalDetails, languagesDeletedSuccess, resumeHeadlineSuccess, careerProfileUpdateSuccess, successCareerProfileUpdate, keySkillsUpdateSuccess, employmentSuccess]);

  useEffect(() => {
    dispatch(careerProfileDetailsGet());
    dispatch(profileDashboardGet());
    dispatch(careerProfileDetailsGet());
    dispatch(keySkillsGet());

    dispatch(educationDetailsGet())
  }, [dispatch])

  useEffect(() => {
    if (profileDashboard?.keySkills) {
      setKeySkillFetch(profileDashboard?.keySkills);
      setDatabaseSkillSet(profileDashboard?.keySkills);
    }

  }, [profileDashboard])

  const openResumeModal = () => setIsResumeOpen(true);
  const closeResumeDialog = () => setIsResumeOpen(false);

  const openProfilePictureModal = () => setIsProfilePictureOpen(true);
  const closeProfilePictureDialog = () => setIsProfilePictureOpen(false);

  const openResumeHeadLineModal = () => setIsResumeHeadLineOpen(true);
  const closeResumeHeadLineDialog = () => setIsResumeHeadLineOpen(false);

  const openCareerProfileModal = () => setIsCareerProfileOpen(true);
  const closeCareerProfileDialog = () => setIsCareerProfileOpen(false);

  const openProfileSummeryModal = () => setIsProfileSummeryOpen(true);
  const closeProfileSummeryDialog = () => setIsProfileSummeryOpen(false);

  const openKeySkillsModal = () => setIsKeySkillsOpen(true);
  const closeKeySkillsDialog = () => setIsKeySkillsOpen(false);

  const openPersonalDetailsModal = () => setIsPersonalDetailsOpen(true);
  const closePersonalDetailsDialog = () => setIsPersonalDetailsOpen(false);

  const openEducationModal = (openType: any) => {
    setSelectedEducation({} as any)
    openType === "Add" && setIsEducationOpen(true)
  };

  const openEmploymentModal = (openType: any) => {
    setSelectedEmployment({} as any)
    openType === "Add" && setIsEmploymentOpen(true)
  };
  const closeEducationDialog = () => setIsEducationOpen(false);
  const closeEmploymentDialog = () => setIsEmploymentOpen(false);

  //Upload file section

  const { success, errorMessage, error, formData } = useAppSelector((state) => state.jobSeekerResumeUpload);
  const [resumeFile, setResumeFile] = useState<string>('');
  const [resumeCompletePath, setResumeCompletePath] = useState<string>('');
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const { success: successProfile } = useAppSelector((state) => state.getProfileDashboard);
  const { success: successDelete, errorMessage: errorMessageDelete, error: errorDelete, formData: formDataDelete } =
    useAppSelector((state) => state.jobSeekerDeleteResume);

  useEffect(() => {
    if (success) {
      dispatch(profileDashboardGet());
      dispatch(clearUploadState);
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
    if (error) {
      dispatch(clearUploadState)
    }
  }, [success, error, errorMessage, dispatch, formData]);

  useEffect(() => {
    if (successProfile) {
      dispatch(clearGetProfileDashboardSlice);
    }
  }, [successProfile]);

  useEffect(() => {
    setResumeFile(profileDashboard?.resumeFile)
    setResumeCompletePath(`${process.env.REACT_APP_RESUME_FILE_LOCATION}/${profileDashboard?.resumePath}`)
  }, [profileDashboard]);

  const resumeFileSplit = resumeFile?.split('.');
  let resumeFilePrefix;
  let resumeFileSuffix;
  if (resumeFile) {
    resumeFilePrefix = resumeFileSplit[0];
    resumeFileSuffix = resumeFileSplit[1];
  }

  const parsedDate = parseISO(profileDashboard?.resumeLastUpdated);
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [profileDashboard])

  const handleFileChange = async (event: ChangeEvent) => {
    event.preventDefault();
    const selectedFile = fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0];
    if (selectedFile) {
      const formData = new FormData();

      formData.append('file', selectedFile);

      try {
        dispatch(resumeUpload(formData))

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        };

      } catch (error) {
        console.log('error', error);
      }
    }
  }

  return (
    <>
      <div className="border border-[#E0E7FF] rounded-lg bg-white px-10 py-10 sticky top-[13%]">
        <ProfileIndicator />
        <div className="flex justify-between items-center">
          <h1 className="text-gray-500 text-sm">Profile Completed</h1>
          {/* <Link to="/profile" className="border-b border-black text-sm">Add Details</Link> */}
        </div>

        <hr className="my-10" />
        <ul className="max-w-md list-inside">
          <li className="flex items-center  mb-8">
            <Tick tickNumber="1" tickStatus={profileIndicator[0]?.resume?.status} />
            <a href="#resumeUpload" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Resume</span></a>
            <form className='cursor-pointer'>
              <label className="cursor-pointer text-base flex justify-center items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {!profileIndicator[0]?.resume?.status ? <u className="text-[#475569]" >Upload</u> : <u className="text-[#475569]" >Update</u>
                }</label>
            </form>
          </li>
          <li className="flex items-center  mb-8">
            <Tick tickNumber="2" tickStatus={profileIndicator[0]?.resumeHeadLine?.status} />
            <a href="#resumeHeadline" className="text-sm w-full flex justify-between">
              <span className="font-semibold">Resume headline</span></a>
            <a href="#resumeHeadline" className="text-sm justify-between">
              {!profileIndicator[0]?.resumeHeadLine?.status ?
                <u className="text-[#475569]" onClick={openResumeHeadLineModal}>Add</u>
                :
                <u className="text-[#475569]" onClick={openResumeHeadLineModal}>Edit</u>
              }
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <Tick tickNumber="3" tickStatus={profileIndicator[0]?.careerProfile?.status} />
            <a href="#careerProfile" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Career profile</span></a>
            <a href="#careerProfile" className="text-sm justify-between">
              {!profileIndicator[0]?.careerProfile?.status ?
                <u className="text-[#475569]" onClick={openCareerProfileModal}>Add</u>
                :
                <u className="text-[#475569]" onClick={openCareerProfileModal}>Edit</u>
              }
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <Tick tickNumber="4" tickStatus={profileIndicator[0]?.keySkill?.status} />
            <a href="#keySkills" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Key skills</span>
              {!profileIndicator[0]?.keySkill?.status ?
                <u className="text-[#475569]" onClick={openKeySkillsModal}>Add</u>
                :
                <u className="text-[#475569]" onClick={openKeySkillsModal}>Edit</u>
              }
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <Tick tickNumber="5" tickStatus={profileIndicator[0]?.education?.status} />
            <a href="#education" className="text-sm w-full flex justify-between">
              <span className="font-semibold">Education</span></a>
            <a href="#education" className="text-sm justify-between">
              {!profileIndicator[0]?.education?.status ?
                <u className="text-[#475569]" onClick={() => openEducationModal("Add")}>Add</u>
                :
                <u className="text-[#475569]" onClick={() => openEducationModal("Edit")}>Edit</u>
              }
            </a>
          </li>
          {/* <li className="flex items-center  mb-8">
            <Tick tickNumber="6" tickStatus={profileIndicator[0]?.itSkills?.status} />
            <a href="#education" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">IT skills</span></a>
            <a href="#education" className="text-sm justify-between">
              {!profileIndicator[0]?.itSkills?.status ?
                <u className="text-[#475569]">Add</u>
                :
                <u className="text-[#475569]">Edit</u>
              }
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <Tick tickNumber="7" tickStatus={profileIndicator[0]?.projects?.status} />
            <a href="#education" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Projects</span></a>
            <a href="#education" className="text-sm justify-between">
              {!profileIndicator[0]?.projects?.status ?
                <u className="text-[#475569]">Add</u>
                :
                <u className="text-[#475569]">Edit</u>
              }
            </a>
          </li> */}
          <li className="flex items-center  mb-8">
            <Tick tickNumber="6" tickStatus={profileIndicator[0]?.profileSummery?.status} />
            <a href="#profileSummary" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Profile summary</span></a>
            <a href="#profileSummary" className="text-sm justify-between">
              {!profileIndicator[0]?.profileSummery?.status ?
                <u className="text-[#475569]" onClick={openProfileSummeryModal}>Add</u>
                :
                <u className="text-[#475569]" onClick={openProfileSummeryModal}>Edit</u>
              }
            </a>
          </li>
          <li className="flex items-center mb-8">
            <Tick tickNumber="7" tickStatus={profileIndicator[0]?.personalDetails?.status} />
            <a href="#personalDetails" className="text-sm w-full flex justify-between">
              <span className="font-semibold">Personal details</span></a>
            <a href="#personalDetails" className="text-sm justify-between">
              {!profileIndicator[0]?.personalDetails?.status ?
                <u className="text-[#475569]" onClick={openPersonalDetailsModal}>Add</u>
                :
                <u className="text-[#475569]" onClick={openPersonalDetailsModal}>Edit</u>
              }
            </a>
          </li>
          <li className="flex items-center mb-8">
            <Tick tickNumber="8" tickStatus={profileIndicator[0]?.employment?.status} />
            <a href="#employment" className="text-sm w-full flex justify-between">
              <span className="font-semibold">Employment</span></a>
            <a href="#employment" className="text-sm justify-between">
              {!profileIndicator[0]?.employment?.status ?
                <u className="text-[#475569]" onClick={() => openEmploymentModal("Add")}>Add</u>
                :
                <u className="text-[#475569]" onClick={() => openEmploymentModal("Edit")}>Edit</u>
              }
            </a>
          </li>
        </ul>
      </div>
      <Modal
        isOpen={isResumeHeadLineOpen}
        setIsOpen={setIsResumeHeadLineOpen}
        modalBody={
          <ResumeHeadlineForm
            resumeHeadlineSummery={resumeHeadlineSummery}

            id={profileDashboard?.id}
            defaultResumeHeadline={profileDashboard?.resumeHeadline}
            closeDialog={closeResumeHeadLineDialog} />
        }
      />
      <Modal
        isOpen={isProfilePictureOpen}
        setIsOpen={setIsProfilePictureOpen}
        modalBody={
          <ProfilePictureUploadForm
            closeDialog={closeProfilePictureDialog}
          />
        }
      />
      <Modal
        isOpen={isCareerProfileOpen}
        setIsOpen={setIsCareerProfileOpen}
        modalBody={<CareerProfileForm id={profileDashboard?.id} profileDashboard={profileDashboard?.careerProfile} closeDialog={closeCareerProfileDialog} />}
      />

      <Modal
        title={"Add Education"}
        isOpen={isEducationOpen}
        setIsOpen={setIsEducationOpen}
        modalTitle={"Add Education"}
        modalBody={
          <EducationForm
            closeDialog={closeEducationDialog}
            educationDetails={profileDashboard?.educations}
            selectedEducation={selectedEducation}
            isEdit={isEdit}
          />
        }
      />
      <Modal
        isOpen={isProfileSummeryOpen}
        setIsOpen={setIsProfileSummeryOpen}
        modalBody={
          <ProfileSummaryForm
            testSummary={testSummary}
            id={profileDashboard?.id}
            defaultProfileSummary={profileDashboard?.profileSummary}
            closeDialog={closeProfileSummeryDialog} />
        }
      />
      <Modal
        isOpen={isPersonalDetailsOpen}
        setIsOpen={setIsPersonalDetailsOpen}
        modalBody={
          <PersonalDetailsForm
            id={profileDashboard?.id}
            defaultPersonalDetails={profileDashboard?.personalDetails}
            closeDialog={closePersonalDetailsDialog}
          />
        }
      />

      <Modal
        isOpen={isKeySkillsOpen}
        setIsOpen={setIsKeySkillsOpen}
        modalBody={<KeySkillsForm
          keySkill={keySkills}
          profileDashboard={profileDashboard}
          setDatabaseSkillSet={setDatabaseSkillSet}
          keySkillFetch={keySkillFetch}
          setIsAddDeleted={setIsAddDeleted}
          isAddDelete={isAddDelete}
          setKeySkillFetch={setKeySkillFetch}
          closeDialog={closeKeySkillsDialog}
        />}
      />
      <Modal
        title={"Add Employment"}
        isOpen={isEmploymentOpen}
        setIsOpen={setIsEmploymentOpen}
        modalTitle={"Add Employment"}
        modalBody={
          <EmploymentForm
            closeDialog={closeEmploymentDialog}
            //educationDetails={educationDetails}
            selectedEmployment={selectedEmployment}
            isEdit={isEdit}
          />
        }
      />

    </>
  )

}



export default ProfileLeftPanel