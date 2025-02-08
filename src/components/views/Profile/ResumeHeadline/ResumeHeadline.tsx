import { useState, useEffect } from 'react';
import Modal from '../../../commonComponents/Modal';
import ResumeHeadlineForm from './ResumeHeadlineForm';
import { useAppSelector, useAppDispatch } from '../../../../';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';
import { FiEdit2 } from "react-icons/fi";
import { clearUpdateResumeHeadlineSlice } from '../../../../store/reducers/jobSeekerProfile/profileResumeHeadline';

const ResumeHeadline = () => {
  const dispatch = useAppDispatch();
  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success } = useAppSelector((state) => state.updateResumeHeadline);
  const [isOpen, setIsOpen] = useState(false);
  const resumeHeadlineSummery = "It is the first thing recruiters notice in your profile. Write concisely what makes you unique and right person for the job you are looking for.";

  useEffect(() => {
    if (success) {
      setIsOpen(false);
      dispatch(clearUpdateResumeHeadlineSlice());
      dispatch(profileDashboardGet());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
  }, [success, dispatch]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]" >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between font-bold">
          <h1>Resume headline</h1>
        </div>
        {
          !profileDashboard?.resumeHeadline
            ?
            <h1 className="text-blue-600 font-medium cursor-pointer"
              onClick={openModal}>
              Add
            </h1> :
            <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer">
              <FiEdit2 onClick={openModal} />
            </span>
        }
      </div>
      <span className="text-sm text-gray-500">
        {
          !profileDashboard?.resumeHeadline
          && resumeHeadlineSummery
        }
        {profileDashboard?.resumeHeadline}
      </span>
      <Modal
       title={"Resume headline"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={
          <ResumeHeadlineForm
            resumeHeadlineSummery={resumeHeadlineSummery}
            id={profileDashboard?.id}
            defaultResumeHeadline={profileDashboard?.resumeHeadline}
            closeDialog={closeDialog} />
        }
      />
    </div>
  )
}

export default ResumeHeadline;