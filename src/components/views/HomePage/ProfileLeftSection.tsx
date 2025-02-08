import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import ProfileIndicator from "../../commonComponents/ProfileIndicator";
import { useAppDispatch, useAppSelector } from '../../..';
import { getUserData, clearGetUserDataSlice } from "../../../store/reducers/user/getUserDetails";
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BiChevronRight } from 'react-icons/bi';
import PopoverHover from '../../commonComponents/PopoverHover';
import ProfilePerformanceText from './ProfilePerformanceText';
import { capitalizeFirstLetter } from '../../utils/utils';

const ProfileLeftSection = ({ profileDashboard }: any) => {
  const dispatch = useAppDispatch();
  const { success, userData } = useAppSelector((state) => state.getUser);

  const [profilePicPath, setProfilePicPath] = useState();

  const profileIndicatorDescription = 'Profile performance is an indicator how your profile is doing among recruiters. Search appearances are total no. of times your profile appeared in recruiter searches. Recruiter actions are updates when the recruiter takes any action on your application or profile.'

  useEffect(() => {
    let profilePictureCompletePath;
    if (profileDashboard?.profilePicturePath) {
      profilePictureCompletePath = `${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${profileDashboard?.profilePicturePath}`;
      setProfilePicPath(profilePictureCompletePath as any)
    } else {
      setProfilePicPath(`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg` as any)
    }
  }, [profileDashboard])

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearGetUserDataSlice)
    }
  }, [dispatch, success]);

  return (
    <>
      <div className="col-start-1 col-end-3">
        <div className="bg-[#FFF] rounded-lg shadow-sm w-full sticky top-[13%] ">
          <div className="w-full h-40 relative">
            <div className="w-full h-2/3 bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] rounded-t-lg">
            </div>
            <div className="w-full h-1/3 bg-[#FFF]">
            </div>
            <div className="absolute bg-[#FFF] top-2/3 left-20 -translate-y-1/2 h-32 w-32 rounded-full p-1">
              <img src={profilePicPath} alt="profile" className="rounded-full w-full h-full" />
            </div>
          </div>
          <div className="px-5 py-5">
            <h1 className="text-xl 2xl:text-2xl font-bold mb-1">{userData?.name}</h1>
            {(profileDashboard?.jobSeekerType === 'Experienced') &&
              <div className="text-base 2xl:text-lg">
                <h1 className="mb-1 overflow-hidden whitespace-nowrap text-ellipsis ">{profileDashboard?.currentJobTitle?.title}
                </h1>
                {profileDashboard?.currentCompany?.title && <h1 className="overflow-hidden whitespace-nowrap text-ellipsis">@ {capitalizeFirstLetter(profileDashboard?.currentCompany?.title)}
                </h1>}
              </div>
            }
            <div className="mt-5 text-sm 2xl:text-base text-[#64748B]">
              <div className="flex justify-start items-center mb-1">
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Email.svg`} alt="EmailIcon" width="12rem" height="12rem" />
                <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{userData?.email}</span>
              </div>
              {userData?.mobileNumber && <div className="flex justify-start items-center mb-1">
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Phone.svg`} alt="PhoneIcon" width="12rem" height="12rem" />
                <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{userData?.mobileNumber}</span>
              </div>}
              {profileDashboard?.currentLocation?.title && <div className="flex justify-start items-center">
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="LocationIcon" width="12rem" height="12rem" />
                <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{profileDashboard?.currentLocation?.title && `${profileDashboard?.currentLocation?.title},`} {profileDashboard?.currentCountry}</span>
              </div>}
            </div>
            <hr className="mt-5 mb-5" />
            <ProfileIndicator />
            <div className="flex justify-between items-center">
              <h1 className="text-gray-500 text-sm 2xl:text-base">Profile Completed</h1>
              <Link to="/profile" className="border-b border-black text-sm 2xl:text-base">Add Details</Link>
            </div>
            {profileDashboard?.about &&
              <>
                <hr className="mt-5 mb-5" />
                <p className="mb-5 text-sm 2xl:text-base">{profileDashboard?.about}</p>
              </>
            }
          </div>
          <div className="p-2">
            <div className=" rounded-lg shadow-sm w-full overflow-visible py-2 px-4 border border-blue-200 bg-[#EEF2FF] bg-gradient-to-r from-[#EEF2FF] to-[#929397] rounded-t-lg">
              <div className="flex flex-row  items-center gap-2">
                <h1 className="font-bold text-sm 2xl:text-base mt-0 mb-1">Profile performance</h1>
                <span className="h-full overflow-visible">
                  <PopoverHover
                    title={<AiOutlineInfoCircle />}
                    body={<ProfilePerformanceText />}
                  />
                </span>
              </div>
              <div className="flex flex-row gap-4 justify-between ">
                <div className="flex flex-col items-start text-start">
                  <span className="w-16 text-start">Search appearances</span>
                  <div className="flex flex-row items-center justify-center">
                    <button className="text-blue-600 font-semibold mt-1">345</button>
                    <button><BiChevronRight /></button>
                  </div>
                </div>
                <span className="border-l border-gray-400"></span>
                <div className="flex flex-col">
                  <span className="w-16">Recruiter actions</span>
                  <div className="flex flex-row items-center justify-center">
                    <button className="text-blue-600 font-semibold mt-1">25</button>
                    <button className="items-center"><BiChevronRight /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default ProfileLeftSection