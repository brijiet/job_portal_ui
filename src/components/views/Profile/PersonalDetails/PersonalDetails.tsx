import { useState, useEffect } from 'react';
import Modal from '../../../commonComponents/Modal';
import PersonalDetailsForm from './PersonalDetailsForm';
import { useAppSelector, useAppDispatch } from '../../../../';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { clearPersonalDetailsSlice } from '../../../../store/reducers/jobSeekerProfile/personalDetails';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';
import { clearDeletePersonalDetailsLanguages } from '../../../../store/reducers/jobSeekerProfile/deletePersonalDetailsLanguages';
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

const PersonalDetails = () => {
    const dispatch = useAppDispatch();
    const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
    const { success } = useAppSelector((state) => state.personalDetails);
    const { success: languagesDeletedSuccess } = useAppSelector((state) => state.deletePersonalDetailsLanguages);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (success) {
            setIsOpen(false);
            dispatch(clearPersonalDetailsSlice());
            dispatch(profileDashboardGet());
            dispatch(clearGetProfileIndicator());
            dispatch(profileIndicatorGet());
        }
        if (languagesDeletedSuccess) {
            setIsOpen(false);
            dispatch(profileDashboardGet());
            dispatch(clearDeletePersonalDetailsLanguages());
            dispatch(clearGetProfileIndicator());
            dispatch(profileIndicatorGet());
        }
    }, [success, dispatch, languagesDeletedSuccess]);

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
                    <h1>Personal details</h1>
                </div>
                {
                    !profileDashboard?.personalDetails
                        ?
                        <h1 className="text-blue-600 font-medium cursor-pointer"
                            onClick={openModal}
                        >
                            Add
                        </h1>
                        :
                        <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer" onClick={openModal}>
                            <FiEdit2 />
                        </span>
                }
            </div>
            {
                profileDashboard?.personalDetails ?
                    <>
                        <div className="grid grid-cols-2">
                            <div>
                                <div className="mb-3">
                                    <h2 className="text-slate-500">Personal</h2>
                                    {
                                        !profileDashboard?.personalDetails?.gender || !profileDashboard?.personalDetails?.maritalStatus ?
                                            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add Personal</button>
                                            :
                                            <span className="font-semibold">{profileDashboard?.personalDetails?.gender}{profileDashboard?.personalDetails?.maritalStatus && `, ${profileDashboard?.personalDetails?.maritalStatus}`} ,<button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add more info</button></span>
                                    }
                                </div>
                                <div className="mb-3">
                                    <h2 className="text-slate-500">Date of birth</h2>
                                    {
                                        !profileDashboard?.personalDetails?.birthDate ?
                                            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add Date of birth</button>
                                            :
                                            <span className="font-semibold">{profileDashboard?.personalDetails?.birthDate}</span>
                                    }

                                </div>
                                <div className="mb-3">
                                    <h2 className="text-slate-500">Category</h2>
                                    {
                                        !profileDashboard?.personalDetails?.category ?
                                            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add Category</button>
                                            :
                                            <span className="font-semibold">{profileDashboard?.personalDetails?.category}</span>
                                    }
                                </div>
                                <div>
                                    <h2 className="text-slate-500">Differently abled</h2>
                                    {
                                        !profileDashboard?.personalDetails ?
                                            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add Differently abled</button>
                                            :
                                            <span className="font-semibold">{!profileDashboard?.personalDetails?.differentlyAbled ? "No" : "Yes"}</span>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="mb-3">
                                    <h2 className="text-slate-500">Career break</h2>
                                    {
                                        !profileDashboard?.personalDetails ?
                                            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add Career break</button>
                                            :
                                            <span className="font-semibold">{!profileDashboard?.personalDetails?.careerBreak ? "No" : "Yes"}</span>
                                    }
                                </div>
                                <div className="mb-3">
                                    <h2 className="text-slate-500">Address</h2>
                                    {
                                        !profileDashboard?.personalDetails?.permanentAddress || !profileDashboard?.personalDetails?.homeTown || !profileDashboard?.personalDetails?.pinCode ?
                                            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add Address</button>
                                            :
                                            <span className="font-semibold">{profileDashboard?.personalDetails?.permanentAddress}{profileDashboard?.personalDetails?.homeTown && `, ${profileDashboard?.personalDetails?.homeTown}`}{profileDashboard?.personalDetails?.pinCode && `, ${profileDashboard?.personalDetails?.pinCode}`}</span>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            profileDashboard?.personalDetails?.language?.length > 0 &&
                            <>
                                <hr className="mt-4 mb-4" />
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-semibold">Language</span>
                                    <button className="text-blue-700 font-semibold" onClick={openModal}>Add language</button>
                                </div>
                                <table className="w-full">
                                    <tr>
                                        <th className="text-left text-gray-500 font-normal">Languages</th>
                                        <th className="text-left text-gray-500 font-normal">Proficiency</th>
                                        <th className="text-left text-gray-500 font-normal">Read</th>
                                        <th className="text-left text-gray-500 font-normal">Write</th>
                                        <th className="text-left text-gray-500 font-normal">Speak</th>
                                    </tr>
                                    {profileDashboard?.personalDetails?.language?.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td className="text-left">{item?.language}</td>
                                            <td className="text-left">{item?.proficiency}</td>
                                            <td className="text-left">{item?.read ? <AiOutlineCheckCircle color="green" /> : <RxCrossCircled color="red" />}</td>
                                            <td className="text-left">{item?.write ? <AiOutlineCheckCircle color="green" /> : <RxCrossCircled color="red" />}</td>
                                            <td className="text-left">{item?.speak ? <AiOutlineCheckCircle color="green" /> : <RxCrossCircled color="red" />}</td>
                                        </tr>
                                    ))}
                                </table>
                            </>

                        }
                    </>
                    : <span className="text-sm text-gray-500">Mention your personal details.</span>
            }
            <Modal
                title={"Personal details"}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalBody={
                    <PersonalDetailsForm
                        id={profileDashboard?.id}
                        defaultPersonalDetails={profileDashboard?.personalDetails}
                        closeDialog={closeDialog}
                    />
                }
            />
        </div>
    )
}
export default PersonalDetails;