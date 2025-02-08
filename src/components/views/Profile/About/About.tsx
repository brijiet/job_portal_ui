import React from 'react'
import { useState, useEffect } from 'react';
import Modal from '../../../commonComponents/Modal';
import AboutForm from './AboutForm';
import { useAppSelector, useAppDispatch } from '../../../../';
import { clearUpdateProfileDashboardSlice } from '../../../../store/reducers/jobSeekerProfile/profileDashboardUpdate';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { FiEdit2 } from "react-icons/fi";

const About = () => {
    const dispatch = useAppDispatch();
    const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
    const { success } = useAppSelector((state) => state.updateProfileDashboard);
    const [isOpen, setIsOpen] = useState(false);
    const testAbout = "Write about yourself to make sure recruiters get to know about your skills and work experience.";

    useEffect(() => {
        if (success) {
            setIsOpen(false);
            dispatch(clearUpdateProfileDashboardSlice());
            dispatch(profileDashboardGet());
        }
    }, [success, dispatch]);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeDialog = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h1 className="text-[#64748B] leading-none">About</h1>
                {
                    profileDashboard?.about ?
                        <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer">
                            <FiEdit2 onClick={openModal} />
                        </span>
                        :
                        <h1 className="text-blue-600 font-semibold cursor-pointer leading-none" onClick={openModal}>
                            Add
                        </h1>
                }
            </div>
            <p className="text-sm font-semibold">
                {
                    !profileDashboard?.about ? testAbout : profileDashboard?.about
                }
            </p>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={"About"}
                modalBody={
                    <AboutForm
                        testAbout={testAbout}
                        id={profileDashboard?.id}
                        defaultAbout={profileDashboard?.about}
                        closeDialog={closeDialog} />
                }
            />
        </div >
    )
}

export default About;