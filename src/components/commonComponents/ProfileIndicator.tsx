import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../..';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../store/reducers/jobSeekerProfile/profileIndicator';

const ProfileIndicator = () => {
  const dispatch = useAppDispatch();
  const { success: profileIndicatorSuccess, profileIndicator } = useAppSelector((state) => state?.getProfileIndicator);
  useEffect(() => {
    if (profileIndicatorSuccess) {
      dispatch(clearGetProfileIndicator());
    }

  }, [dispatch, profileIndicatorSuccess]);

  useEffect(() => {
    dispatch(profileIndicatorGet());
  }, [dispatch])

  return (
    <div className="w-full bg-[#C7D2FE] rounded-md mb-5">
      <div className="bg-blue-700 text-center text-xs font-medium h-2.5 relative rounded-md" style={{ width: `${profileIndicator[0]?.calculatedProfileIndicator <= 9 ? 9 : profileIndicator[0]?.calculatedProfileIndicator}%` }}>
        <span className="bg-[#EEF2FF] rounded-md border border-[#C7D2FE] text-[#312E81] absolute right-0 top-1/2 px-1 py-0.5 -translate-y-1/2">{`${profileIndicator[0]?.calculatedProfileIndicator}%`}</span>
      </div>
    </div>
  )
}

export default ProfileIndicator