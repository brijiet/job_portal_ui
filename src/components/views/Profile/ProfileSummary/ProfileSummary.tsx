import { useState, useEffect } from 'react';
import Modal from '../../../commonComponents/Modal';
import ProfileSummaryForm from './ProfileSummaryForm';
import { useAppSelector, useAppDispatch } from '../../../../';
import { clearUpdateProfileDashboardSlice } from '../../../../store/reducers/jobSeekerProfile/profileDashboardUpdate';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { FiEdit2 } from "react-icons/fi";

const ProfileSummary = () => {
    const dispatch = useAppDispatch();
    const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
    const { success } = useAppSelector((state) => state.updateProfileDashboard);
    const [isOpen, setIsOpen] = useState(false);
    const testSummary = "Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.";

    useEffect(() => {
        if (success) {
            setIsOpen(false);
            dispatch(clearUpdateProfileDashboardSlice());
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
                <div className="flex items-center font-bold">
                    <h1>Profile summary</h1>
                </div>
                {
                    !profileDashboard?.profileSummary
                        ?
                        <h1 className="text-blue-600 font-medium cursor-pointer"
                            onClick={openModal}>
                            Add
                        </h1>
                        :
                        <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer">
                            <FiEdit2 onClick={openModal} />
                        </span>
                }
            </div>
            <span className="text-sm text-gray-500">
                {
                    !profileDashboard?.profileSummary
                    && testSummary
                }
                {profileDashboard?.profileSummary}
            </span>
            <Modal
                title={"Profile summary"}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalBody={
                    <ProfileSummaryForm
                        testSummary={testSummary}
                        id={profileDashboard?.id}
                        defaultProfileSummary={profileDashboard?.profileSummary}
                        closeDialog={closeDialog} />
                }
            />
        </div>
    )
}

export default ProfileSummary;