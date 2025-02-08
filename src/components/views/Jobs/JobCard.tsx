import Cookies from 'js-cookie';
import Loader from '../../commonComponents/Loader';
import NoRecords from '../../commonComponents/NoRecords';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { removeYearText } from '../../utils/utils';

const JobCard = ({ onClickJobCard, jobCard, loading, saveJobCount, setJobId, setSaveButton, userId }: any) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleLoginToSave = () => {
        const params = btoa(`/allJobs`);
        navigate(`/login/${params}`);
    }
    return (
        <>
            {jobCard.length ? jobCard?.map((item: any) => (
                <div className="py-5 px-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mb-5 cursor-pointer" key={item.id} >
                    <div className="flex items-start justify-between">
                        <div className="flex justify-start items-start h-full" onClick={() => onClickJobCard(item.id)}>
                            <img
                                className="w-14 h-14 rounded-lg"
                                src={item?.company?.companyImage ? `${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${item?.company?.companyImage}`.replace(/"/g, '') as any : `${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`}
                                alt="no img"
                            />
                            <div className="ml-5">
                                <h1 className="text-lg font-bold cursor-pointer" >{item?.title}</h1>
                                <span className="text-[#94A3B8] text-sm">{item?.company?.title}</span>
                            </div>
                        </div>
                        <div>
                            {Cookies.get("token") ? <button className='p-2' onClick={() => { setJobId(Number(item?.id)); setSaveButton("save"); }}>
                                {saveJobCount[item?.id] ? (
                                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}bookIconColored.svg`} alt="BookMark Dark" />
                                ) : (
                                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}bookMark.svg`} alt="BookMark" />
                                )}
                            </button> :
                                <>
                                    <button
                                        className="w-48  px-6 py-1.5 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex"
                                        onClick={() => {
                                            handleLoginToSave();
                                        }}>
                                        <span className="text-white text-base font-medium  leading-normal tracking-tight">
                                            Login to Save
                                        </span>
                                    </button>
                                </>}
                        </div>
                    </div>
                    <hr className="my-5 bg-[#E0E7FF]" />
                    <div className="flex justify-start items-center mb-5" onClick={() => onClickJobCard(item.id)}>
                        {(item?.totalExpYearStart?.title && item?.totalExpYearEnd?.title) &&
                            < div className=" flex justify-start items-center text-[#64748B] text-sm">
                                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ExperienceIcon.svg`} alt="ExperienceIcon" width="15rem" height="15rem" />
                                <span className="ml-2 leading-none">{removeYearText(item?.totalExpYearStart?.title)} - {item?.totalExpYearEnd?.title}</span>
                            </div>
                        }
                        {item?.payScaleUpperRange?.title && item?.payScaleLowerRange?.title && item?.recurrence?.title && item?.numberSystem?.title && <div className=" flex justify-start items-center ml-5 text-[#64748B] text-sm">
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}MoneyIcon.svg`} alt="MoneyIcon" width="15rem" height="15rem" />
                            {!item?.hideSalaryDetails ? <span className="ml-2 leading-none">{item?.currency?.title}{item?.payScaleLowerRange?.title} - {item?.payScaleUpperRange?.title} {item?.numberSystem?.title} {item?.recurrence?.title}</span> : <span className="ml-2 leading-none"> Not Disclosed</span>}

                        </div>}
                        {item?.jobsLocation?.title && <div className=" flex justify-start items-center ml-5 text-[#64748B] text-sm">
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2 leading-none">{item?.jobsLocation?.title}</span>
                        </div>}
                    </div>
                    {item?.jobDescription &&
                        <div className="mb-5" onClick={() => onClickJobCard(item.id)}>
                            <ul className="list-disc text-[#94A3B8] text-sm pl-5">
                                <li>
                                    <span className="line-clamp-3 list-inside">{item?.jobDescription}</span>
                                </li>
                            </ul>
                        </div>
                    }
                    <div className="flex items-center justify-start" onClick={() => onClickJobCard(item.id)}>
                        <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-1.5 rounded-lg mr-5 text-sm">{item?.workMode?.title}</button>
                        <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-1.5 rounded-lg mr-5 text-sm">Full-time</button>
                        <span className="text-[#94A3B8] text-sm">Posted {formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true })}</span>
                    </div>
                </div >
            )) : !loading && <NoRecords />}
            {loading && <Loader />}
        </>
    )
}

export default JobCard;