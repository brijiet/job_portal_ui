import { useEffect, useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import { useAppDispatch, useAppSelector } from "../../../.."
import { getUserData } from "../../../../store/reducers/user/getUserDetails";
import { clearGetUserDataSlice } from "../../../../store/reducers/user/getUserDetails";
import Modal from "../../../commonComponents/Modal";
import ProfileBasicDetailsForm from "./ProfileBasicDetailsForm";
import { parseISO } from "date-fns";
import { clearUpdateProfileBasicDetailsSlice } from "../../../../store/reducers/jobSeekerProfile/profileBasicDetailsUpdate";
import { profileDashboardGet } from "../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet";
import { clearUploadState } from "../../../../store/reducers/jobSeekerProfile/uploadResume";
import VerifyOtpForm from "./VerifyOtpForm";
import EmailVerifyForm from './EmailVerifyForm';
import Toaster from "../../../commonComponents/Toaster";
import { toast } from "react-toastify"
import { clearVerifyMobileOtpSlice } from "../../../../store/reducers/user/verifyMobileOtp"

const ProfileBasicDetails = () => {
  const dispatch = useAppDispatch();
  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success, userData } = useAppSelector((state) => state.getUser);
  const { success: successBasicDetails } = useAppSelector((state) => state.updateProfileBasicDetails)
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVerifyOtpOpen, setIsVerifyOtpOpen] = useState<boolean>(false);
  const [isVerifyEmailOpen, setIsVerifyEmailOpen] = useState<boolean>(false);
  const{errorMessage} = useAppSelector((state)=>state.jobSeekerVerifyMobile)

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearGetUserDataSlice)
      dispatch(clearUploadState)
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (successBasicDetails) {
      setIsOpen(false);
      dispatch(clearUpdateProfileBasicDetailsSlice);
      dispatch(profileDashboardGet());
      dispatch(getUserData());
    }
  }, [dispatch, successBasicDetails]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  }

  const openOtpModel = () => {
    setIsVerifyOtpOpen(true);
  };
  const closeOtpDialog = () => {
    setIsVerifyOtpOpen(false);
  }

  const openEmailVerifyModel = () => {
    setIsVerifyEmailOpen(true);
  };

  const closeEmailVerifyDialog = () => {
    setIsVerifyEmailOpen(false);
  }

  const parsedDate = parseISO(profileDashboard?.profileLastUpdated)
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [profileDashboard])

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearVerifyMobileOtpSlice());
   }
  },[errorMessage])
  return (
    <>
      <div className="px-7 pb-7 pt-5">
        <div className="flex items-center">
          <h1 className="text-lg font-bold mb-1">{userData?.name}</h1>
          <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer" onClick={openModal}> <FiEdit2 /> </span>
        </div>
        {(profileDashboard?.jobSeekerType === 'Experienced') ? (profileDashboard?.currentCompany ? <div className="flex justify-start items-center text-[#475569] text-sm font-semibold">
          <h1 className="mr-2">{profileDashboard?.currentJobTitle?.title}</h1>
          <h1>@ {profileDashboard?.currentCompany?.title}</h1>
        </div> : <div className="mr-4 text-blue-600 font-md cursor-pointer font-semibold" onClick={openModal}>
          Add Company Details </div>) : <h1 className="mr-2">Fresher</h1>}
        <hr className="my-5 bg-[#E0E7FF]" />
        <div className="text-sm text-[#64748B]">
          <div className="flex justify-start items-center mb-3">
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Email.svg`} alt="EmailIcon" width="12rem" height="12rem" />
            <span className="ml-1 overflow-hidden inline-block whitespace-nowrap text-ellipsis mr-1">{userData?.email}</span>
            {userData.isEmailVerified ? <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}greenTickIcon.svg`} alt="VerifyIcon" width="14rem" height="14rem" /> :
              <button className=" ml-1 text-blue-600 text-sm, font-medium" onClick={openEmailVerifyModel}>Verify</button>
            }
          </div>
          <div className="flex flex-row">
           
          </div>
          <div className="flex justify-start items-center">
            {userData.mobileNumber ? <div className="flex justify-start items-center mr-2">
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Phone.svg`} alt="PhoneIcon" width="12rem" height="12rem" />
              <span className="ml-1 overflow-hidden inline-block whitespace-nowrap text-ellipsis mr-1">{userData.mobileNumber}</span>
              {userData.isMobileVerified ?
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}greenTickIcon.svg`} alt="PhoneIcon" width="14rem" height="14rem" /> :
                <button className=" ml-1 text-blue-600 text-sm, font-medium" onClick={openOtpModel}>Verify</button>}

            </div> : <div className="mr-4 text-blue-600 font-md cursor-pointer font-semibold" onClick={openModal}>
              Add PhoneNumber </div>
            }
            {profileDashboard?.currentLocation ? <div className="flex justify-start items-center ml-1">
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`}  alt="LocationIcon" width="12rem" height="12rem" />
              <span className="ml-1 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{profileDashboard?.currentLocation?.title && `${profileDashboard?.currentLocation?.title},`} {profileDashboard?.currentCountry}</span>
            </div> :
              <div className="mr-4 text-blue-600 font-md cursor-pointer font-semibold" onClick={openModal}> Add Location </div>
            }
          </div>
        </div>
      </div>
      {isOpen && <Modal
        title={"Basic details"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={
          <ProfileBasicDetailsForm
            closeDialog={closeDialog}
            profileDashboard={profileDashboard}
            userData={userData}
          />
        }
      />}
      {isVerifyOtpOpen &&
        <Modal
          isOpen={isVerifyOtpOpen}
        setIsOpen={setIsVerifyOtpOpen}
        width="max-w-xl"
          modalBody={
            <VerifyOtpForm
              closeOtpDialog={closeOtpDialog}
              mobileNumber={userData?.mobileNumber}
            />
          }
        />
      }

      {isVerifyEmailOpen && 
        <Modal
        isOpen={isVerifyEmailOpen}
        setIsOpen={setIsVerifyEmailOpen}
        width="max-w-xl"
        modalBody={
          <EmailVerifyForm
            closeEmailVerifyDialog={closeEmailVerifyDialog}
            email={userData?.email}
          />   
       }
        />}
      <Toaster/>
    </>
  )
}

export default ProfileBasicDetails