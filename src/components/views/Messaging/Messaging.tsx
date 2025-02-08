import { useEffect, useState } from 'react';
import LeftPanelMessaging from './LeftPanelMessaging';
import MessagingTrail from './MessagingTrail';
import { getSaveCommunications, getSaveJobList } from '../../utils/utils';
import Cookies from 'js-cookie';
import SavedJobTrail from './SavedJobTrail';
import { useAppSelector } from '../../..';
import NoRecords from '../../commonComponents/NoRecords';

const Messaging = () => {

  const userId = Cookies.get("userId");
  const userType = Cookies.get("userType");
  const { loading } = useAppSelector((state) => state.getFilterJobs);
  const [saveCommunication, setSaveCommunication] = useState<any>([]);
  const [detailedCommunication, setDetailedCommunication] = useState<any>({});
  const [changeUserId, setChangeUserId] = useState<any>();
  const [sendMessage, setSendMessage] = useState<any>();
  const [toggleJobApply, setToggleJobApply] = useState(false);
  const [inbox, setInbox] = useState("Email");
  const [jobCard, setJobCard] = useState<any>([]);
  const [deleteSave, setDeleteSave] = useState(false);
  const [jobId, setJobId] = useState();
  const [creationDate, setCreationDate] = useState();
  const [countSMSUnread, setCountSMSUnread] = useState(0);
  const [countEmailUnread, setCountEmailUnread] = useState(0);
  const [isRead, setIsRead] = useState('');

  useEffect(() => {
    if (userId) {
      getSaveJobList(Number(userId)).then((data) => {
        setJobCard(data)
      })
    }
  }, [userId, deleteSave]);

  var ids: undefined;
  var creationsDate: undefined;
  useEffect(() => {

    if (inbox === 'Saved') {
      jobCard.map((item: any, index: number) => {
        if (index === 0) {
          ids = item?.jobs.id
          creationsDate = item?.createdAt
        }
      })
    }

    if (ids) {
      setJobId(ids)
      setCreationDate(creationsDate)
    }
  }, [ids, inbox, jobCard, deleteSave])

  useEffect(() => {
    (async () => {
      const saveResumeList = await getSaveCommunications({ userId, userType })
      if (Object?.keys(saveResumeList)?.length) {
        setSaveCommunication(saveResumeList)
      }

      if (changeUserId) {
        setDetailedCommunication(saveResumeList.filter((item: any) => item.id === changeUserId)[0])
      } else {
        setDetailedCommunication(saveResumeList[0])
      }

    })();
  }, [userId, userType, changeUserId, sendMessage]);

  // Count number of unread message
  useEffect(() => {
    const countSMS = saveCommunication?.map((item: any) => { return item?.messages?.filter((subItem: any) => subItem?.isRead == 1 && subItem?.messageType === 'SMS' && subItem.receiverId === userId)?.length }).reduce((partialSum: number, num: number) => partialSum + num, 0);

    const countEmail = saveCommunication?.map((item: any) => { return item?.messages?.filter((subItem: any) => subItem?.isRead == 1 && subItem?.messageType === 'Email' && subItem.receiverId === userId)?.length }).reduce((partialSum: number, num: number) => partialSum + num, 0);

    setCountSMSUnread(countSMS);
    setCountEmailUnread(countEmail)
  }, [saveCommunication, isRead])

  return (
    <>
    {(countSMSUnread !==0 || countEmailUnread !== 0 || jobCard.length !==0) ? 
    <> 
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
        <div className="col-start-1 col-end-5">
          <div className="sticky">
            <div className="justify-between items-center  pl-2 pb-2 pr-2">
              <LeftPanelMessaging
                saveCommunication={saveCommunication}
                setChangeUserId={setChangeUserId}
                userType={userType}
                setInbox={setInbox}
                jobCard={jobCard}
                inbox={inbox}
                setJobId={setJobId}
                jobId={jobId}
                changeUserId={changeUserId}
                countSMSUnread={countSMSUnread}
                countEmailUnread={countEmailUnread}
                setToggleJobApply={setToggleJobApply}
                creationDate={creationDate}
                setCreationDate={setCreationDate}

              />
            </div>
          </div>
        </div>
        <div className="col-start-5 col-end-13">
          {(inbox === 'Email' || inbox === 'SMS') && <MessagingTrail
            detailedCommunication={detailedCommunication}
            userType={userType}
            setSendMessage={setSendMessage}
            changeUserId={changeUserId}
            inbox={inbox}
            setJobId={setJobId}
            setIsRead={setIsRead}
          />}
          {inbox === 'Saved' &&
            <SavedJobTrail
              setDeleteSave={setDeleteSave}
              inbox={inbox}
              jobId={jobId}
              setJobId={setJobId}
              jobCard={jobCard}
              loading={loading}
              toggleJobApply={toggleJobApply}
              setToggleJobApply={setToggleJobApply}
              creationDate={creationDate}
            />}
        </div>
      </div >
    </> : 
    <>
     <div className="h-[10%] w-full"></div>
      <div className="grid px-32 bg-[#F8FAFC] py-6">
      <div className="w-full h-auto px-3 pt-7 pb-3 bg-white flex-col rounded-lg justify-start items-start gap-5 inline-flex">
        <div className="self-stretch justify-start items-center gap-3  inline-flex">
          <div className="grow shrink basis-0 h-[29px] justify-start items-center gap-3 flex">
            <div className="text-black text-2xl font-bold leading-[28.80px] tracking-tight">Inbox</div>
          </div>
        </div>
      </div>
      {!loading && <NoRecords />}
      </div >
    </>
     }
    </>
  )
}

export default Messaging;