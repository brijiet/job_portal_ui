import { FiEdit2 } from "react-icons/fi"
import Modal from "../../commonComponents/Modal"
import PreferredWorkLocation from "./PreferredWorkLocation"
import { useEffect, useState } from "react";
import ExpectedSalary from "./ExpectedSalary";
import { useAppDispatch, useAppSelector } from "../../..";
import { clearGetProfileDashboardSlice, profileDashboardGet } from "../../../store/reducers/jobSeekerProfile/ProfileDashboardGet";
import { separateComma } from "../../utils/currencyFormat";

const JobPreferences = () => {

  const dispatch = useAppDispatch();
  const { success, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);

  const [isPreferredLocationOpen, setIsPreferredLocationOpen] = useState(false);
  const [isExpectedSalaryOpen, setIsExpectedSalaryOpen] = useState(false);

  const openPreferredLocationModal = () => {
    setIsPreferredLocationOpen(true);

  };
  const openExpectedSalaryModal = () => {
    setIsExpectedSalaryOpen(true);
  };

  const closePreferredLocationDialog = () => {
    setIsPreferredLocationOpen(false);
  }
  const closeExpectedSalaryDialog = () => {
    setIsExpectedSalaryOpen(false);
  }

  useEffect(() => {
    dispatch(profileDashboardGet());
  }, [dispatch, isPreferredLocationOpen, isExpectedSalaryOpen]);

  useEffect(() => {
    if (success) {
      dispatch(clearGetProfileDashboardSlice());
    }

  }, [dispatch, success]);

  return (
    <>
      <div className="w-full pb-3 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg ">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Job Preferences</h1>
        <p className="mb-2">Job Portal would show the recommendation substructure on your job predilections mentioned in your job profile. Editing it would withal transmute your desired vocation profile.</p>
      </div>
      <div className="pb-2">
        <div className="flex items-center">
          <div className="mb-1"><span className="font-bold">Preferred work location</span><span className="font-normal"> (Maximum 10)</span> </div>
        </div>
        <div className="flex items-center">
          <h1 className="mb-1">{profileDashboard?.careerProfile?.careerProfilePreferredLocations.map((item: any, key: any) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.location?.title},</div>)}</h1>
          <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer" onClick={openPreferredLocationModal}> <FiEdit2 /> </span>
        </div>
      </div>
      <div className="pb-2 ">
        <div className="flex items-center">
          <div className="mb-1"><span className="font-bold">Expected Salary</span><span className="font-normal"> (Annual)</span> </div>
        </div>
        <div className="flex items-center">
          <h1 className="mb-1">{profileDashboard?.careerProfile?.currency?.title}{separateComma(profileDashboard?.careerProfile?.expectedSalary)}</h1>
          <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer" onClick={openExpectedSalaryModal}> <FiEdit2 /> </span>
        </div>
      </div>
      <Modal
        title={"Preferred work location"}
        isOpen={isPreferredLocationOpen}
        setIsOpen={setIsPreferredLocationOpen}
        modalBody={
          <PreferredWorkLocation
            id={profileDashboard?.id}
            closePreferredLocationDialog={closePreferredLocationDialog}
            setIsPreferredLocationOpen={setIsPreferredLocationOpen}
            profileDashboard={profileDashboard?.careerProfile} />
        }
      />

      <Modal
        title={"Expected Salary"}
        isOpen={isExpectedSalaryOpen}
        setIsOpen={setIsExpectedSalaryOpen}
        modalBody={
          <ExpectedSalary
            id={profileDashboard?.id}
            closeExpectedSalaryDialog={closeExpectedSalaryDialog}
            setIsExpectedSalaryOpen={setIsExpectedSalaryOpen}
            profileDashboard={profileDashboard?.careerProfile} />
        }
      />
    </>
  )
}

export default JobPreferences