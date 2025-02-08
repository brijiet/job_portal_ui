import React from 'react';

const ProfileBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] rounded-lg mb-12 grid grid-cols-5 gap-8 px-10 py-20">
      <div className="col-start-1 col-end-4 flex flex-col justify-center">
        <h1 className="text-3xl 2xl:text-4xl font-bold text-[#312E81] flex flex-col items-start justify-start mb-10">
          <span>Discover your <span className="text-[#818CF8]">dream job</span> & empower your career</span>
        </h1>
        <button className="bg-[#4F46E5] rounded-md py-3 text-white w-44 flex items-center justify-center xl:text-base 2xl:text-lg"><span className="mr-3">Explore</span><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}searchIcon.svg`} alt="SearchIcon" /></button>
      </div>
      <div className="relative col-start-4 col-end-6 flex justify-start items-center">
        <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Ellipse 29.svg`} alt="Ellipse29" />
        <span className="absolute left-32 border border-gray-300 bg-[#F8FAFC] rounded-3xl px-5 py-3 z-10 flex justify-center items-center"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}notificationIcon.svg`} alt="NotificationIcon" /><span className="ml-2">Job alert</span></span>
        <span className="absolute top-32 left-20 border border-gray-300 bg-[#F8FAFC] rounded-3xl px-5 py-3 z-10 flex justify-center items-center"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}rightwithcircle.svg`} alt="RightWithCircle" /><span className="ml-2">94% Skills Matched</span></span>
      </div>
    </div>
  )
}

export default ProfileBanner