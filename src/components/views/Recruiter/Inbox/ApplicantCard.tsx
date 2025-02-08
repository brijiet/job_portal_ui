import moment from 'moment';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../utils/utils';
import DownloadResume from "../../../commonComponents/DownloadResume";
import Modal from "../../../commonComponents/Modal";
import { useEffect, useState } from "react";
import ComposeMail from "../MailCenter/ComposeMail";

const ApplicantCard = ({ expand, setExpand, data, index, shortListReject }: any) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [composePreviewTitle, setComposePreviewTitle] = useState('Compose Mail');
  const [applicantMailId, setApplicantMailId] = useState<any>([]);
  const [applicantEmailId, setApplicantEmailId] = useState<any>([])

  const closeDialog = () => {
    setIsOpen(false);
  }
  const openModal = () => {
    setIsOpen(true);
  }
  useEffect(() => {
    setApplicantMailId([...applicantMailId, data?.jobSeekerProfile?.user?.id])
    setApplicantEmailId([...applicantEmailId, data?.jobSeekerProfile?.user?.email])
  }, [data?.jobSeekerProfile?.user?.id])


  return (
    <>
      <div className="h-auto w-full mt-7 bg-white rounded-xl shadow flex-col justify-start items-start flex">
        <div className="self-stretch h-auto p-7 flex-col justify-start items-start gap-7 flex">
          <div className="self-stretch justify-start items-center gap-3 inline-flex">
            {data?.jobSeekerProfile?.profilePicturePath ? <img className="w-[60px] h-[60px] rounded-[40px]" src={`${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${data?.jobSeekerProfile?.profilePicturePath}`} /> : <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} className="w-[60px] h-[60px] rounded-[40px]" />}
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="justify-start items-center gap-5 flex">
                  <div className="justify-start items-center gap-1 flex">
                    <div className="text-slate-900 text-2xl w-[150px] font-bold leading-[28.80px] tracking-tight cursor-pointer">
                      <Link to={`/recruiterInbox/applicantDetailsPage/${data?.jobSeekerProfile.id}`} > {data?.jobSeekerProfile?.user?.name}  </Link>
                    </div>
                    <div className="w-6 h-6 justify-center items-center flex cursor-pointer" onClick={() => setExpand([...expand, Number(index)])}><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ArrowRight.svg`} alt="ArrowRight" /></div>
                  </div>
                </div>
                <div className="text-slate-500 text-xs font-normal leading-[14.40px] tracking-tight">Applied {moment(data?.jobSeekerProfile?.profileLastUpdated, "YYYYMMDD").fromNow()}
                </div>
              </div>
              <div className="self-stretch justify-start items-center gap-5 inline-flex">
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{data?.jobSeekerProfile?.currentJobTitle?.title}
                </div>
                <div className="grow shrink basis-0 text-slate-500 text-base font-medium leading-snug tracking-tight">@
                  {capitalizeFirstLetter(data?.jobSeekerProfile?.currentCompany?.title)}</div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[0px] border border-indigo-100"></div>
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="justify-start items-center gap-5 flex">
              {data?.jobSeekerProfile?.currentLocation?.title && <div className="justify-start items-center gap-1 flex">
                <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}location.svg`} alt="location" />
                </div>
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                  {data?.jobSeekerProfile?.currentLocation?.title}
                </div>
              </div>}
              <div className="justify-start items-center gap-1 flex">
                <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}experience.svg`} alt="experience" /></div>
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{data?.jobSeekerProfile?.totalExpYear?.title} {data?.jobSeekerProfile?.totalExpMonth?.title}</div>
              </div>
              {data?.jobSeekerProfile?.noticePeriod?.title && <div className="justify-start items-center gap-1 flex">
                <div className="w-6 h-6 justify-center items-center gap-2.5 flex">
                  <div className="w-3.5 h-3.5 relative"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}noticePeriod.svg`} alt="noticePeriod" />
                  </div>
                </div>
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{data?.jobSeekerProfile?.noticePeriod?.title}</div>
              </div>}
              {data?.jobSeekerProfile?.careerProfile?.expectedSalary && <div className="justify-start items-center gap-1 flex">
                <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}package.svg`} alt="package" />
                </div>
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{data?.jobSeekerProfile?.careerProfile?.currency?.title}{data?.jobSeekerProfile?.careerProfile?.expectedSalary} PA</div>
              </div>}
            </div>
            <div className="w-6 h-6 justify-center items-center flex cursor-pointer">{!expand.includes(Number(index)) ? <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downIcon.svg`} onClick={() => setExpand([...expand, Number(index)])} alt="downIcon.svg" /> : <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}upArrowIcon.svg`} alt="upArrowIcon" onClick={() => setExpand(expand.filter((expandItem: number) => expandItem !== Number(index)))} />}</div>
          </div>
        </div>
        <div className="self-stretch px-7 py-3 bg-white shadow justify-between items-center inline-flex">
          <div className="justify-end items-center gap-5 flex">
            <div className="w-6 h-6 flex-col justify-center items-center inline-flex cursor-pointer"><DownloadResume data={data} /></div>
            <div className="w-6 h-6 justify-center items-center flex cursor-pointer"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Email.svg`} onClick={openModal} alt="Email.svg" /></div>
            <div className="w-6 h-6 justify-center items-center flex cursor-pointer"><Link to={`https://api.whatsapp.com/send?phone=${data?.jobSeekerProfile?.user?.mobileNumber}&text=Hi%20${data?.jobSeekerProfile?.user?.name}`} target='_blank'><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}whatsapp.svg`} alt="whatsapp" /></Link></div>
          </div>
          <div className="justify-end items-center gap-5 flex">
            <div className="w-[127px] pl-3 pr-2 py-2 bg-indigo-600 rounded-lg justify-center items-center gap-2 flex cursor-pointer" onClick={() => shortListReject('ShortListed', data?.jobSeekerProfile?.user?.id)}>
              <div className="text-white text-base font-medium leading-snug tracking-tight">ShortList</div>
              <div className="w-6 h-6 justify-center items-center flex cursor-pointer"><svg stroke="currentColor" className="text-white transform rotate-90" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg></div>
            </div>
            <div className="w-[74px] p-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => shortListReject('Reject', data?.jobSeekerProfile?.user?.id)}>
              <div className="text-indigo-900 text-base font-medium leading-snug tracking-tight">Reject</div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={composePreviewTitle}
        modalBody={
          <ComposeMail
            closeDialog={closeDialog}
            profileDashboard={{ jobSeekerProfile: data }}
            applicantMailId={applicantMailId}
            setComposePreviewTitle={setComposePreviewTitle}
            composePreviewTitle={composePreviewTitle}
            applicantEmailId={applicantEmailId}
            mulitUser={false}
          />
        }
      />
    </>
  )
}

export default ApplicantCard;