import { useEffect, useState } from 'react'
import Modal from '../../../commonComponents/Modal';
import EducationForm from './EducationForm';
import { useAppDispatch, useAppSelector } from '../../../..';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { clearJobSeekerEducationAddSlice } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEducation';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';
import { educationDetailsGet } from '../../../../store/reducers/jobSeekerProfile/getEducationDetails';
import { FiEdit2 } from 'react-icons/fi';

export default function Education() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const { success, educationData } = useAppSelector((state) => state.education);
  //const { educationDetails } = useAppSelector((state) => state.educationDetails);
  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      setIsOpen(false);
      dispatch(clearJobSeekerEducationAddSlice());
      // dispatch(educationDetailsGet());
      dispatch(profileDashboardGet());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
  }, [success, dispatch]);

  const openModal = () => {
    setIsOpen(true);
    setSelectedEducation({} as any)
    setIsEdit(false)
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full rounded-2xl bg-white border border-[#E0E7FF] p-4 mt-4" >
      <div className="flex items-center justify-between mb-4 font-bold">
        <h1>Education</h1>
        <h1 className="text-blue-600 font-medium cursor-pointer" onClick={openModal}>Add</h1>
      </div>
      <div>
        {
          Object.keys(profileDashboard).length
            ? profileDashboard?.educations?.map((item: any, index: any) => (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="leading-none font-semibold">{item?.education}</h1>
                    <span className="block text-sm mb-3">{item?.institute}</span>
                    <span className="block text-[#64748B] text-sm">
                      {(item?.education === "10th" || item?.education === "12th") ? parseInt(item?.passingYear) - 2 : parseInt(item?.passingYear) - 4} - {item?.passingYear}
                    </span>
                    {/* <span className="text-sm text-gray-500">
                      You have completed your <span className="text-sm text-gray-600 font-bold">{item?.education}</span> with specialization in <span className="text-sm text-gray-600 font-bold">{(item?.education === "10th" || item?.education === "12th") ? item?.board : item?.specialization}</span> from the institute <span className="text-sm text-gray-600 font-bold">{item?.institute}</span> and passed out in the year <span className="text-sm text-gray-600 font-bold">{item?.passingYear}
                      </span>
                    </span> */}
                  </div>
                  <span className="text-gray-400 hover:scale-125 cursor-pointer">
                    {/* <FiEdit2 /> */}
                    <FiEdit2 onClick={() => {
                      setIsOpen(true)
                      setIsEdit(true)
                      setSelectedEducation(item as any)
                    }} />
                  </span>
                </div>
                {Object.keys(profileDashboard?.educations)?.length !== index + 1 && <hr className="my-5" />}
              </>
            ))
            : <span className="text-sm text-gray-500">Mention your education details.</span>
        }
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"Add Education"}
          modalBody={
            <EducationForm
              closeDialog={closeDialog}
              educationDetails={profileDashboard?.educations}
              selectedEducation={selectedEducation}
              isEdit={isEdit}
            />
          }
        />
      </div>
    </div>
  )
}