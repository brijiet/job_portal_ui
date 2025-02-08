import moment from 'moment';
import Cookies from 'js-cookie';
import { useEffect, useId, useState } from 'react';
import Modal from '../../commonComponents/Modal';
import Reply from './Reply';
import DownloadMessagingAttachment from '../../commonComponents/DownloadMessagingAttachment';
import { appliedDateForJob, updateIsReadStatus } from '../../utils/utils';
import NoRecords from '../../commonComponents/NoRecords';

const MessagingTrail = ({ detailedCommunication, userType, setSendMessage, changeUserId, inbox, setIsRead }: any) => {

  const userId = Cookies.get("userId");
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [applyJobDate, setApplyJobDate] = useState({});
  const [jobId, setJobId] = useState();
  const [communicationsId, setCommunicationsId] = useState();

  useEffect(() => {
    (async () => {
      if (jobId) {
        const applyList = await appliedDateForJob(Number(userId), Number(jobId))
        setApplyJobDate(applyList[0])
      }
      if (communicationsId && userId) {
        const isRead = await updateIsReadStatus(communicationsId, userId)
        setIsRead(communicationsId)
      }
    })();
    setJobId(detailedCommunication?.jobsCommunication?.jobs?.id)
    setCommunicationsId(detailedCommunication?.id)
  }, [userId, detailedCommunication, jobId]);

  return (
    <>
      {detailedCommunication ? <div className="w-full h-auto flex-col justify-start items-start gap-5 inline-flex">
        <div className="self-stretch p-5 bg-white rounded-xl border border-indigo-100 justify-start items-center gap-3 inline-flex">
          <div className="grow shrink basis-0 h-[59px] justify-start items-center gap-3 flex">
            {userType === 'jobSeeker' ?
              <img className="w-12 h-12 rounded-[60px]" src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} /> :
              detailedCommunication?.jobSeekerUser?.profilePicturePath ? <img className="w-12 h-12 rounded-[60px]" src={`${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${detailedCommunication?.jobSeekerUser?.profilePicturePath}`} /> : <img className="w-12 h-12 rounded-[60px]" src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} />
            }
            <div className="flex-col justify-start items-start gap-1 inline-flex">
              <div className="justify-start items-center gap-3 inline-flex">
                <div className="text-black text-2xl font-bold leading-[28.80px] tracking-tight">{userType === 'jobSeeker' ? detailedCommunication?.recruiterUser?.name : detailedCommunication?.jobsCommunication?.user?.name}</div>
              </div>
              <div className="justify-start items-start gap-3 inline-flex">
                <div className="text-slate-500 text-base font-normal leading-snug tracking-tight">{userType === 'jobSeeker' ? 'HR Recruiter' : detailedCommunication?.jobsCommunication?.user?.email}</div>
                <div className="text-slate-500 text-base font-normal leading-snug tracking-tight">@ {userType === 'jobSeeker' ? detailedCommunication?.recruiterUser?.companies?.title : detailedCommunication?.jobsCommunication
                  ?.aboutCompany}
                </div>
              </div>
              <div className="justify-start items-start gap-3 inline-flex">
                <div className="text-slate-500 text-base font-bold leading-snug">{detailedCommunication?.jobsCommunication?.title}</div>
                <div className="text-slate-500 text-base font-normal leading-snug">Applied on @ {moment(applyJobDate).format('DD MMMM  YYYY')}</div>
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-3 flex">
            <div className="w-6 h-6 justify-center items-center flex">
            </div>
            <div className=" justify-center items-center flex">
              <button type='button' className="w-38 px-6 py-1.5 bg-green-600 rounded-lg shadow justify-center items-center gap-3" onClick={() => setIsReplyOpen(true)}><span className="text-white text-xl font-medium  leading-normal tracking-tight">Reply</span></button>
            </div>
          </div>
        </div>
        <div className="w-full grow shrink basis-0 flex-col justify-end items-start gap-[22px] flex">
          {detailedCommunication?.messages?.filter((item: any) => item.messageType === inbox)?.map((itemMessage: any) => <>
            {itemMessage.senderId !== userId ?
              <div className="w-full self-stretch justify-start items-start inline-flex">
                <div className="w-full grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="w-full px-3 py-2 bg-white rounded-lg border border-indigo-100 flex-col justify-center items-start gap-2 flex">
                    <div className="self-stretch text-slate-900 text-sm font-normal leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: itemMessage?.messageBody }}></div>
                    <DownloadMessagingAttachment
                      itemMessage={itemMessage} />
                  </div>
                  <div className="self-stretch h-6 justify-start items-center gap-2 inline-flex">
                    <div className="text-slate-500 text-xs font-normal leading-[14.40px] tracking-tight">{moment(itemMessage?.createdDate)?.format('LT')}</div>
                  </div>
                </div>
              </div > :
              <div className="self-stretch justify-end items-start inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-end gap-1 inline-flex">
                  <div className="self-stretch h-auto px-3 py-2 bg-indigo-100 rounded-lg flex-col justify-center items-start gap-2 flex">
                    <div className="self-stretch text-black text-sm font-normal leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: itemMessage?.messageBody.replace(/<img .*?>/g, "").replace(/<button .*?>/g, "") }}></div>
                    <DownloadMessagingAttachment
                      itemMessage={itemMessage} />
                  </div>
                  <div className="h-6 justify-end items-center gap-2 inline-flex">
                    <div className="text-slate-500 text-xs font-normal leading-[14.40px] tracking-tight">{moment(itemMessage?.createdDate)?.format('LT')}</div>
                  </div>
                </div>
              </div>

            }
          </>)}
        </div>
      </div> : <NoRecords />}
      <Modal
        isOpen={isReplyOpen}
        setIsOpen={setIsReplyOpen}
        title={'Reply'}
        modalBody={
          <Reply
            setSendMessage={setSendMessage}
            detailedCommunication={detailedCommunication}
            userType={userType}
            inbox={inbox}
            setIsReplyOpen={setIsReplyOpen}
          />
        }
      />
    </>
  )
}

export default MessagingTrail
