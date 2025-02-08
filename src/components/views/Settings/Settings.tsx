import React, { useEffect, useState } from 'react'
import LeftPanel from './LeftPanel'
import CommunicationAndPrivacy from './CommunicationAndPrivacy';
import Account from './MyAccount';
import JobPreferences from './JobPreferences';
import BlockCompanies from './BlockCompanies';
import { useAppDispatch, useAppSelector } from '../../..';
import { clearGetProfileDashboardSlice, profileDashboardGet } from '../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';

const Settings = () => {

  const dispatch = useAppDispatch();
  const { success, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const [settingTab, setSettingTab] = useState('BlockCompanies');

  useEffect(() => {
    dispatch(profileDashboardGet());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearGetProfileDashboardSlice());
    }
  }, [dispatch, success]);

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
        <div className="col-start-1 col-end-5">
          <LeftPanel
            settingTab={settingTab}
            setSettingTab={setSettingTab}
            profileDashboard={profileDashboard} />
        </div>
        <div className="col-start-5 col-end-13">
          {settingTab === 'CommunicationAndPrivacy' && <CommunicationAndPrivacy />}
          {settingTab === 'Account' && <Account />}
          {profileDashboard?.careerProfile && settingTab === 'JobPreferences' && <JobPreferences />}
          {settingTab === 'BlockCompanies' && <BlockCompanies />}
        </div>
      </div >
    </>
  )
}

export default Settings