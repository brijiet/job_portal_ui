import { FiEdit2 } from "react-icons/fi"
import { useAppDispatch, useAppSelector } from '../../..';
import { getUserData, clearGetUserDataSlice } from "../../../store/reducers/user/getUserDetails";
import { useEffect, useState } from "react";
import Modal from "../../commonComponents/Modal";
import EmailVerifyForm from "../Profile/ProfileBasicDetails/EmailVerifyForm";
import Toaster from "../../commonComponents/Toaster";
import VerifyOtpForm from "../Profile/ProfileBasicDetails/VerifyOtpForm";
import ChangeEmailAddress from "./ChangeEmailAddress";
import ChangeMobileNumber from "./ChangeMobileNumber";
import ChangePassword from "./ChangePassword";

const MyAccount = () => {

  const dispatch = useAppDispatch();
  const { success, userData } = useAppSelector((state) => state.getUser);
  const [isVerifyEmailOpen, setIsVerifyEmailOpen] = useState<boolean>(false);
  const [isVerifyOtpOpen, setIsVerifyOtpOpen] = useState<boolean>(false);
  const [isEmailAddressOpen, setIsEmailAddressOpen] = useState<boolean>(false);
  const [isMobileNumberOpen, setIsMobileNumberOpen] = useState<boolean>(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);
  const [updateEmailAddress, setUpdateEmailAddress] = useState<any>();
  const [updateMobileNumber, setUpdateMobileNumber] = useState<any>();

  useEffect(() => {
    if (success) {
      dispatch(clearGetUserDataSlice)
    }
  }, [dispatch, success]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch, updateEmailAddress, updateMobileNumber]);

  const openEmailVerifyModel = () => {
    setIsVerifyEmailOpen(true);
  };

  const closeEmailVerifyDialog = () => {
    setIsVerifyEmailOpen(false);
  }

  const openOtpModel = () => {
    setIsVerifyOtpOpen(true);
  };
  const closeOtpDialog = () => {
    setIsVerifyOtpOpen(false);
  }

  const openEmailAddressModel = () => {
    setIsEmailAddressOpen(true);
  };
  const closeEmailAddressDialog = () => {
    setIsEmailAddressOpen(false);
  }

  const openMobileNumberModel = () => {
    setIsMobileNumberOpen(true);
  };
  const closeMobileNumberDialog = () => {
    setIsMobileNumberOpen(false);
  }

  const openChangePasswordModel = () => {
    setIsChangePasswordOpen(true);
  };
  const closeChangePasswordDialog = () => {
    setIsChangePasswordOpen(false);
  }

  return (
    <>
      <div className="w-full  pb-3 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg ">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
        <p className="mb-2">Transmute your electronic mail, mobile number or password.</p>
      </div>
      <div className="pb-5">
        <div className="flex items-center">
          <div className="mb-1"><span className="font-bold">Email Address</span></div>
        </div>
        <div className="flex items-center">
          <div className="mb-1">{userData?.email}</div>
          <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer" onClick={openEmailAddressModel}> <FiEdit2 /> </span>
          {userData.isEmailVerified ? <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}greenTickIcon.svg`} alt="VerifyIcon" width="14rem" height="14rem" /> :
            <button className=" ml-1 text-blue-600 text-sm, font-medium" onClick={openEmailVerifyModel}>Verify</button>
          }
        </div>
      </div>
      <div className="pb-5 ">
        <div className="flex items-center">
          <div className="mb-1"><span className="font-bold">Mobile number</span></div>
        </div>
        <div className="flex items-center">
          <div className="flex justify-start items-center mr-2">
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Phone.svg`} alt="PhoneIcon" width="12rem" height="12rem" />
            <span className="ml-1 overflow-hidden inline-block whitespace-nowrap text-ellipsis mr-1">{userData.mobileNumber}</span>
            <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer" onClick={openMobileNumberModel}> <FiEdit2 /> </span>
            {userData.isMobileVerified ?
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}greenTickIcon.svg`} alt="PhoneIcon" width="14rem" height="14rem" /> :
              <button className=" ml-1 text-blue-600 text-sm, font-medium" onClick={openOtpModel}>Verify</button>}
          </div>
        </div>
      </div>
      <div className="pb-2 ">
        <div className="flex items-center">
          <div className="mb-1"><span className="font-bold">Password</span></div>
        </div>
        <div className="flex items-center">
          <div className="mb-1  ml-1 text-blue-600 text-sm, font-medium cursor-pointer" onClick={openChangePasswordModel}>Change Password</div>
        </div>
      </div>
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
      {isEmailAddressOpen &&
        <Modal
          isOpen={isEmailAddressOpen}
          setIsOpen={setIsEmailAddressOpen}
          width="max-w-xl"
          modalBody={
            <ChangeEmailAddress
              closeEmailAddressDialog={closeEmailAddressDialog}
              setIsEmailAddressOpen={setIsEmailAddressOpen}
              setUpdateEmailAddress={setUpdateEmailAddress}
            />
          }
        />}
      {isMobileNumberOpen &&
        <Modal
          isOpen={isMobileNumberOpen}
          setIsOpen={setIsMobileNumberOpen}
          width="max-w-xl"
          modalBody={
            <ChangeMobileNumber
              closeMobileNumberDialog={closeMobileNumberDialog}
              setIsMobileNumberOpen={setIsMobileNumberOpen}
              setUpdateMobileNumber={setUpdateMobileNumber}
            />
          }
        />}
      {isChangePasswordOpen &&
        <Modal
          isOpen={isChangePasswordOpen}
          setIsOpen={setIsChangePasswordOpen}
          title={'Change Password'}
          width="max-w-xl"
          modalBody={
            <ChangePassword
              closeChangePasswordDialog={closeChangePasswordDialog}
              setIsChangePasswordOpen={setIsChangePasswordOpen}
            />
          }
        />}
      <Toaster />
    </>
  )
}

export default MyAccount