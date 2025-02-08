const ProfileBasicDetails = ({ profileDashboard }: any) => {
  return (
    <>
      <div className="px-7 pb-7 pt-5">
        <div className="flex items-center">
          <h1 className="text-lg font-bold mb-1">{profileDashboard?.user?.name}</h1>
        </div>
        {(profileDashboard?.jobSeekerType === 'Experienced') ? (profileDashboard?.currentCompany && <div className="flex justify-start items-center text-[#475569] text-sm font-semibold">
          <h1 className="mr-2">{profileDashboard?.currentJobTitle?.title}</h1>
          <h1>@ {profileDashboard?.currentCompany?.title}</h1>
        </div>) : <h1 className="mr-2">Fresher</h1>}
        <hr className="my-5 bg-[#E0E7FF]" />
        <div className="text-sm text-[#64748B]">
          <div className="flex justify-start items-center mb-3">
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Email.svg`} alt="EmailIcon" width="12rem" height="12rem" />
            <span className="ml-1 overflow-hidden inline-block whitespace-nowrap text-ellipsis mr-1">{profileDashboard?.user?.email}</span>
          </div>
          <div className="flex flex-row">
          </div>
          <div className="flex justify-start items-center">
            {profileDashboard?.user?.mobileNumber && <div className="flex justify-start items-center mr-2">
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Phone.svg`} alt="PhoneIcon" width="12rem" height="12rem" />
              <span className="ml-1 overflow-hidden inline-block whitespace-nowrap text-ellipsis mr-1">{profileDashboard?.user?.mobileNumber}</span>
            </div>}
            {profileDashboard?.currentLocation && <div className="flex justify-start items-center ml-1">
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="LocationIcon" width="12rem" height="12rem" />
              <span className="ml-1 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{profileDashboard?.currentLocation?.title && `${profileDashboard?.currentLocation?.title},`} {profileDashboard?.currentCountry}</span>
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileBasicDetails