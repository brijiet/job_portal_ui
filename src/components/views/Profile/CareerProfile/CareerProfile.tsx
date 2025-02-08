import React, { useEffect, useState } from 'react'
import { FiEdit2 } from "react-icons/fi";
import Modal from '../../../commonComponents/Modal';
import CareerProfileForm from './CareerProfileForm';
import { useAppDispatch, useAppSelector } from '../../../..';
import { clearUpdateCareerProfileUpdateSlice } from '../../../../store/reducers/jobSeekerProfile/careerProfileUpdate';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { clearGetCareerProfileDetails, careerProfileDetailsGet } from '../../../../store/reducers/jobSeekerProfile/getCareerProfile';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';
import { separateComma } from '../../../utils/currencyFormat';

const CareerProfile = ({ profileDashboard }: any) => {
  const dispatch = useAppDispatch();
  const { success } = useAppSelector((state) => state.updateProfileDashboard);
  const { success: successCareerProfileUpdate } = useAppSelector((state) => state.updateCareerProfile);
  const { success: careerProfileSuccess, careerProfileDetails } = useAppSelector((state) => state.getCareerProfile);
  const [isOpen, setIsOpen] = useState(false);
  const formSummary = "This information will help the recruiters  know about your current job profile and also your desired job criteria. This will also help us personalize your job recommendations.";
  useEffect(() => {
    if (success) {
      setIsOpen(false);
      dispatch(clearUpdateCareerProfileUpdateSlice());
      dispatch(profileDashboardGet());
    }
    if (successCareerProfileUpdate) {
      setIsOpen(false);
      dispatch(clearUpdateCareerProfileUpdateSlice());
      dispatch(careerProfileDetailsGet());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
      dispatch(profileDashboardGet());

    }
    if (careerProfileSuccess) {
      dispatch(clearGetCareerProfileDetails());
    }
  }, [success, dispatch, successCareerProfileUpdate, careerProfileSuccess]);

  useEffect(() => {
    dispatch(careerProfileDetailsGet());
  }, [dispatch])

  const openModal = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between font-bold">
          <h1>Career profile</h1>
        </div>
        {
          !profileDashboard?.careerProfile ?
            <h1 className="text-blue-600 font-medium cursor-pointer"
              onClick={openModal}>
              Add
            </h1> : <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer">
              <FiEdit2 onClick={openModal} />
            </span>
        }
      </div>
      <div className="grid grid-cols-2 gap-4">

        <div>
          <div className="text-gray-500 text-sm">Current industry</div>
          {profileDashboard?.careerProfile?.industry?.title &&
            <div className="text-sm font-bold text-gray-500">{profileDashboard?.careerProfile?.industry?.title}</div>
          }
          {!profileDashboard?.careerProfile?.industry?.title &&
            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add expected salary</button>
          }
        </div>


        <div>
          <div className="text-gray-500 text-sm">Department</div>
          {profileDashboard?.careerProfile?.department?.title &&
            <div className="text-sm font-bold text-gray-500">{profileDashboard?.careerProfile?.department?.title}</div>
          }
          {!profileDashboard?.careerProfile?.department?.title &&
            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add department</button>
          }
        </div>


        <div>
          <div className="text-gray-500 text-sm">Role category</div>
          {profileDashboard?.careerProfile?.roleCategory?.title &&
            <div className="font-bold text-gray-500">{profileDashboard?.careerProfile?.roleCategory?.title}</div>
          }
          {!profileDashboard?.careerProfile?.roleCategory?.title &&
            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add role category</button>

          }
        </div>


        <div>
          <div className="text-gray-500 text-sm">Job role</div>
          {profileDashboard?.careerProfile?.jobRole?.title &&
            <div className="font-bold text-gray-500">{profileDashboard?.careerProfile?.jobRole?.title}</div>
          }
          {!profileDashboard?.careerProfile?.jobRole?.title &&
            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add job role</button>

          }
        </div>

        <div>
          <div className="text-gray-500 text-sm">Desired job type</div>
          <div className="text-sm">
            {profileDashboard?.careerProfile?.careerProfileJobType.map((item: any, key: any) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.jobType?.title},</div>)}
            {!profileDashboard?.careerProfile?.careerProfileJobType &&
              <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add desired job type</button>
            }
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Desired employment type</div>
          <div className="text-sm">
            {profileDashboard?.careerProfile?.careerProfileEmployeeType.map((item: any, key: any) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.employeeType?.title},</div>)}
            {!profileDashboard?.careerProfile?.careerProfileEmployeeType &&
              <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add employment type</button>
            }
          </div>
        </div>
        <div><div className="text-gray-500 text-sm">Preferred shift</div>
          <div className="text-sm">
            {profileDashboard?.careerProfile?.careerProfilePreferredShift.map((item: any, key: any) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.preferredShift?.title},</div>)}
            {!profileDashboard?.careerProfile?.careerProfilePreferredShift &&
              <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add preferred shift</button>
            }
          </div>
        </div>
        <div >
          <div className="text-gray-500 text-sm">Preferred work location</div>
          <div className="text-sm">
            {profileDashboard?.careerProfile?.careerProfilePreferredLocations.map((item: any, key: any) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.location?.title},</div>)}
            {!profileDashboard?.careerProfile?.careerProfilePreferredLocations &&
              <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add Preferred work location</button>
            }
          </div>
        </div>
        {profileDashboard?.careerProfile?.expectedSalary &&
          <div>
            <div className="text-gray-500 text-sm">Expected salary</div>
            <div className="text-sm font-bold text-gray-500">{profileDashboard?.careerProfile?.currency?.title}{separateComma(profileDashboard?.careerProfile?.expectedSalary)}</div>
            {!profileDashboard?.careerProfile?.expectedSalary &&
              <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add expected salary</button>
            }
          </div>
        }
      </div>
      <Modal
        title={"Career profile"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={<CareerProfileForm id={profileDashboard?.id} profileDashboard={profileDashboard?.careerProfile} closeDialog={closeDialog} />}
      />
    </div>



  )
}

export default CareerProfile