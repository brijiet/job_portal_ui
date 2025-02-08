import { useState } from 'react';
import { capitalizeFirstLetter } from '../../../utils/utils';
import moment from 'moment';
import Modal from '../../../commonComponents/Modal';
import ComposeMail from '../MailCenter/ComposeMail';
import DownloadResume from '../../../commonComponents/DownloadResume';
import { Link } from 'react-router-dom';
import Education from '../Inbox/Education';
import Employment from '../Inbox/Employment';
import KeySkills from '../Inbox/KeySkills';

const ResumeResultCardDetail = ({ expand, setExpand, data, index, handleClick, isCheck, applicantEmailId, setApplicantEmailId, setIsCheck }: any) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [composePreviewTitle, setComposePreviewTitle] = useState('Compose Mail');
  const [qualificationExpand, setQualificationExpand] = useState<any>([]);

  const closeDialog = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setApplicantEmailId([data?.user?.email])
    setIsCheck([data?.user?.id])
    setIsOpen(true);
  }

  return (
    <>
      <div className="self-stretch h-auto bg-white rounded-xl shadow flex-col justify-start items-start flex">
        <div className="self-stretch h-auto p-7 flex-col justify-start items-start gap-7 flex">
          <div className="self-stretch justify-start items-center gap-3 inline-flex">
            {data.profilePicturePath ? <img className="w-[60px] h-[60px] rounded-[40px]" src={`${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${data?.profilePicturePath}`} /> : <img className="w-[60px] h-[60px] rounded-[40px]" src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} />}
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="justify-start items-center gap-5 flex">
                  <div className="justify-start items-center gap-1 flex">
                    <div className="text-slate-900 text-2xl font-bold leading-[28.80px] tracking-tight ">{data?.user?.name}</div>
                    <div className="w-6 h-6 justify-center items-center flex cursor-pointer" onClick={() => setExpand(expand.filter((expandItem: number) => expandItem !== Number(index)))}><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downIcon.svg`} alt='downIcon' /></div>
                  </div>

                </div>
                <div className="text-slate-500 text-xs font-normal leading-[14.40px] tracking-tight">Applied {moment(data?.profileLastUpdated, "YYYYMMDD").fromNow()}</div>
              </div>
              <div className="self-stretch justify-start items-center gap-5 inline-flex">
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{data?.currentJobTitle?.title}</div>
                <div className="grow shrink basis-0 text-slate-500 text-base font-medium leading-snug tracking-tight">@ {capitalizeFirstLetter(data?.currentCompany?.title)}</div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[0px] border border-indigo-100"></div>
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="justify-start items-center gap-5 flex">
              <div className="justify-start items-center gap-1 flex">
                <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}location.svg`} alt='location' /></div>
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{data?.currentLocation?.title}</div>
                <div className="w-[102px] px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
                  <div className="text-green-600 text-xs font-normal leading-[14.40px] tracking-tight">Can Relocate</div>
                </div>
              </div>
              <div className="justify-start items-center gap-1 flex">
                <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}experience.svg`} alt='experience' /></div>
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{data?.totalExpYear?.title} {data?.totalExpMonth?.title}</div>
              </div>
              <div className="justify-start items-center gap-1 flex">
                <div className="w-6 h-6 justify-center items-center gap-2.5 flex">
                  <div className="w-3.5 h-3.5 relative"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}noticePeriod.svg`} alt='noticePeriod' />
                  </div>
                </div>
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{data?.noticePeriod?.title}</div>
              </div>
              <div className="justify-start items-center gap-1 flex">
                <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}package.svg`} alt='package' /></div>
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{data?.careerProfile?.currency?.title}{data?.careerProfile?.expectedSalary} PA</div>
              </div>
            </div>
            <div className="w-6 h-6 justify-center items-center flex cursor-pointer">{!expand.includes(Number(index)) ? <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downIcon.svg`} alt='downIcon' onClick={() => setExpand([...expand, Number(index)])} /> : <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}upArrowIcon.svg`} alt='upArrowIcon' onClick={() => setExpand(expand.filter((expandItem: number) => expandItem !== Number(index)))} />}</div>
          </div>
          <div className="self-stretch h-[0px] border border-indigo-100"></div>
          <div className="self-stretch h-auto flex-col justify-start items-start gap-5 flex">
            <div className="self-stretch justify-start items-start gap-3 inline-flex">
              <div className="grow shrink basis-0 text-black text-base font-bold leading-snug tracking-tight">Qualifications</div>
              <div className="w-6 h-6 justify-center items-center  cursor-pointer">{!qualificationExpand.includes(Number(index)) ? <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}upArrowIcon.svg`} alt='upArrowIcon' onClick={() => setQualificationExpand([...qualificationExpand, Number(index)])} /> : <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downIcon.svg`} alt='downIcon' onClick={() => setQualificationExpand(qualificationExpand.filter((expandItem: number) => expandItem !== Number(index)))} />}</div>
            </div>
            {!qualificationExpand.includes(Number(index)) && <>
              <Education profileDashboard={data} />
              <Employment
                profileDashboard={data}
              />
              <KeySkills
                profileDashboard={data}
              />
            </>}
          </div>
        </div>
        <div className="self-stretch px-7 py-3 bg-white shadow justify-between items-center inline-flex">
          <div className="justify-end items-center gap-5 flex">
            <div className="justify-start items-center gap-1 flex">
              <div className="w-6 h-6 relative">
                <input
                  type="checkbox"
                  key={data.id}
                  name={data.id}
                  id={data.id}
                  onChange={handleClick}
                  checked={isCheck.includes(data.id)}
                />
              </div>
              <div className="text-slate-600 text-base font-normal leading-snug tracking-tight">Select</div>
            </div>
            <div className="w-6 h-6 justify-center items-center flex cursor-pointer"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Email.svg`} alt='Email' onClick={openModal} /></div>
            <div className="w-6 h-6 justify-center items-center flex"><Link to={`https://api.whatsapp.com/send?phone=${data?.user?.mobileNumber}&text=Hi%20${data?.user?.name}`} target='_blank'><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}whatsapp.svg`} alt='whatsapp' /></Link></div>
            <div className="w-6 h-6 justify-center items-center flex cursor-pointer"><DownloadResume data={{ jobSeekerProfile: data }} /></div>
            <div className="w-6 h-6 flex-col justify-center items-center inline-flex"></div>
          </div>
          <div className="justify-end items-center gap-5 flex">
            <div className="w-[78px] p-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex">
              <div className="text-indigo-900 text-base font-medium leading-snug tracking-tight cursor-pointer"><Link to={`/recruiterInbox/applicantDetailsPage/${data.id}`}>Details</Link></div>
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
            applicantMailId={isCheck}
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

export default ResumeResultCardDetail