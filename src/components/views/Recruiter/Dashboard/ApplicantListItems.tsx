import { useNavigate } from 'react-router-dom';
const ApplicantListItems = ({ item }: any) => {
    const navigate = useNavigate();
    const onHandleClick = () => {
        navigate(`/recruiterInbox/applicantDetailsPage/${item?.id}`)
    }

    return (
        <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5 cursor-pointer" onClick={onHandleClick}>
            <div className="flex items-start justify-between mb-3">
                <img
                    className='w-14 h-14 rounded-lg'
                    src={item?.profile?.profilePicturePath ? `${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${item?.profile?.profilePicturePath}`.replace(/"/g, '') as any : `${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} alt="no-img" />
                <div>
                </div>
            </div>
            <h1 className="text-base font-bold">{item.name}</h1>
            {item?.profile?.employments.length !== 0 ? <h2 className="text-[#94A3B8] text-sm  text-ellipsis w-56 overflow-hidden whitespace-nowrap">{item?.profile?.employments[0]?.companyName ? item?.profile?.employments[0]?.companyName : ''}</h2> : <h2 className="text-[#94A3B8] text-sm  text-ellipsis w-56 overflow-hidden whitespace-nowrap">---</h2>}
            <hr className="my-5" />
            <div className="flex justify-between items-center mb-3">
                <div className="text-[#475569] text-xs flex justify-start items-center">
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="LocationIcon" width="15rem" height="15rem" />
                    {item?.profile?.currentLocation?.title ? <span className="ml-2">{item?.profile?.currentLocation?.title}</span> : <span className="ml-2">---</span>}
                </div>
                <button className="bg-[#F0FFF5] text-[#16A34A] text-xs px-2 py-1">Can Relocate</button>
            </div>

            <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ExperienceIcon.svg`} alt="ExperienceIcon" width="15rem" height="15rem" />
                {item?.profile?.employments.length !== 0 ? <span className="ml-2">{`${item?.profile?.employments[0]?.totalExpYears?.title ? item?.profile?.employments[0]?.totalExpYears?.title : ''} ${item?.profile?.employments[0]?.totalExpMonths?.title ? item?.profile?.employments[0]?.totalExpMonths?.title : ''}`}</span>
                    : <span className="ml-2">---</span>}
            </div>

            <div className="mb-5 text-[#475569] text-xs flex justify-start items-center">
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Education.svg`} alt="Education" width="15rem" height="15rem" />
                {item?.profile?.educations.length !== 0 ? <span className="ml-2">{item?.profile?.educations[0]?.education ? item?.profile?.educations[0]?.education : ''}</span> : <span className="ml-2">---</span>}
            </div>
            <div className="bg-[#EEF2FF] h-1 mb-2 rounded-lg relative">
                <span className="absolute top-0 h-1 bg-[#6366F1] rounded-lg w-full flex justify-end items-center" style={{ width: `${item?.indicator}%` }}></span>
            </div>
            <div className="text-[#475569] text-xs flex justify-between items-center">
                <span>Skills matched</span>
                <span className="text-[#4F46E5]">{Math.round(item?.indicator)}%</span>
            </div>
        </div>
    )
}

export default ApplicantListItems;