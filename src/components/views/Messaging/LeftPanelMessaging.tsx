import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import type { ReactTabsFunctionComponent, TabProps } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Cookies from 'js-cookie';

const LeftPanelMessaging = (
  { saveCommunication,
    setChangeUserId,
    userType,
    setInbox,
    jobCard,
    inbox,
    setJobId,
    jobId,
    changeUserId,
    countSMSUnread,
    countEmailUnread,
    setToggleJobApply,
    creationDate,
    setCreationDate,
  }: any) => {

  const [sortingEmailInput, setSortingEmailInput] = useState('');
  const [sortingSMSInput, setSortingSMSInput] = useState('');
  const userId = Cookies.get("userId");
  const [sortingSavedInput, setSortingSavedInput] = useState('');
  const [saveSortingEmailCommunication, setSaveSortingEmailCommunication] = useState<any>([]);
  const [saveSortingSMSCommunication, setSaveSortingSMSCommunication] = useState<any>([]);
  const [saveSortingSavedCommunication, setSaveSortingSavedCommunication] = useState<any>([]);



  // Count number of unread message
  useEffect(() => {
    setSaveSortingEmailCommunication(saveCommunication);
    setSaveSortingSMSCommunication(saveCommunication);
    setSaveSortingSavedCommunication(jobCard)

  }, [saveCommunication, jobCard])

  useEffect(() => {
    setSaveSortingEmailCommunication(saveCommunication);
    setSaveSortingSMSCommunication(saveCommunication);
    setSaveSortingSavedCommunication(jobCard)

  }, [saveCommunication, jobCard])

  useEffect(() => {
    if (userType === 'jobSeeker') {
      sortingEmailInput && setSaveSortingEmailCommunication(saveCommunication?.filter((item: any) => item?.recruiterUser?.name?.toLowerCase()?.includes(sortingEmailInput)))
      sortingSMSInput && setSaveSortingSMSCommunication(saveCommunication?.filter((item: any) => item?.recruiterUser?.name?.toLowerCase()?.includes(sortingSMSInput)))
      sortingSavedInput ? setSaveSortingSavedCommunication(jobCard?.filter((item: any) => item?.jobs?.title?.toLowerCase()?.includes(sortingSavedInput))) : setSaveSortingSavedCommunication(jobCard);
    }
    else if (userType === 'employer') {
      setSaveSortingEmailCommunication(saveCommunication?.filter((item: any) => item?.jobsCommunication?.user?.name?.toLowerCase()?.includes(sortingEmailInput)))
      setSaveSortingSMSCommunication(saveCommunication?.filter((item: any) => item?.jobsCommunication?.user?.name?.toLowerCase()?.includes(sortingSMSInput)))
    } else {
      setSaveSortingEmailCommunication(saveCommunication);
      setSaveSortingSMSCommunication(saveCommunication);
      setSaveSortingSavedCommunication(jobCard);
    }

  }, [sortingEmailInput, sortingSMSInput, sortingSavedInput]);

  const htmlMakeBold = (message: any, count: number) => {
    if (count > 0) {
      if (message.length > 1) {
        if (message?.filter((itemFilter: any) => itemFilter.messageType === inbox)[0]?.messageBody?.length > 84) {

          return message?.filter((itemFilter: any) => itemFilter.messageType === inbox)[0]?.messageBody?.substring(0, 81).bold() + "..."
        } else {
          return message?.filter((itemFilter: any) => itemFilter.messageType === inbox)[0]?.messageBody.bold()
        }
      } else {
        return `---`
      }
    } else {
      if (message.length > 1) {
        if (message?.filter((itemFilter: any) => itemFilter.messageType === inbox)[0]?.messageBody?.length > 84) {

          return message?.filter((itemFilter: any) => itemFilter.messageType === inbox)[0]?.messageBody?.substring(0, 81) + "..."
        } else {
          return message?.filter((itemFilter: any) => itemFilter.messageType === inbox)[0]?.messageBody
        }
      } else {
        return `---`
      }
    }
  }

  const handleEmailSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setSortingEmailInput(event.target.value);


  }
  const handleSMSSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    setSortingSMSInput(event.target.value)

  }

  const handleSavedJobsSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setSortingSavedInput(event.target.value)
  }

  return (
    <>
      <div className="w-full h-auto px-3 pt-7 pb-3 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex">
        <div className="self-stretch justify-start items-center gap-3  inline-flex">
          <div className="grow shrink basis-0 h-[29px] justify-start items-center gap-3 flex">
            <div className="text-black text-2xl font-bold leading-[28.80px] tracking-tight">Inbox</div>
          </div>
          <div className="w-6 h-6 justify-center items-center flex">
          </div>
        </div>
        <Tabs className="w-full">
          <TabList>
            <Tab onClick={() => setInbox("Email")}> <div className="grow shrink basis-0 justify-center items-center gap-1.5 flex">
              <div className="text-slate-500 text-base font-bold leading-snug tracking-tight">Email</div>
              <div className="w-8 px-3 py-2 bg-slate-300 rounded-[40px] justify-center items-center flex">
                <div className="text-black text-xs font-normal leading-[14.40px] tracking-tight">{countEmailUnread}</div>
              </div>
            </div> </Tab>
            <Tab onClick={() => setInbox("SMS")}>
              <div className="grow shrink basis-0  justify-center items-center gap-1.5 flex">
                <div className="text-slate-500 text-base font-bold leading-snug tracking-tight">SMS</div>
                <div className="w-8 px-3 py-2 bg-slate-300 rounded-[40px] justify-center items-center flex">
                  <div className="text-black text-xs font-normal leading-[14.40px] tracking-tight">{countSMSUnread}</div>
                </div>
              </div>
            </Tab>
            {userType === 'jobSeeker' && <Tab onClick={() => setInbox("Saved")}>
              <div className="grow shrink basis-0  justify-center items-center gap-1.5 flex">
                <div className="text-slate-500 text-base font-bold leading-snug tracking-tight">Saved Job</div>
                <div className="w-8 px-3 py-2 bg-slate-300 rounded-[40px] justify-center items-center flex">
                  <div className="text-black text-xs font-normal leading-[14.40px] tracking-tight">{jobCard.length}</div>
                </div>
              </div>
            </Tab>}
          </TabList>
          <TabPanel label='email' value={'1'} tabIndex={0}>
            <div className="w-full px-3 pt-5 pb-3 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex ">
              <label htmlFor="default-search-Email" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={sortingEmailInput}
                  className="block w-full  h-10 ps-10 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  onChange={(event) => handleEmailSearch(event)}
                  defaultValue={sortingEmailInput}
                ></input>
                <button type="submit" className="text-white absolute end-2.5 top-4">
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}messagingVector.svg`} alt='messagingVector' />
                </button>
              </div>
              <div className="self-stretch h-auto flex-col justify-start items-start gap-2 flex pr-3 max-h-screen overflow-y-auto">
                {saveSortingEmailCommunication?.map((item: any) =>
                  <div key={item?.id} className={item?.id === changeUserId ? `self-stretch h-auto p-3 bg-[#3b82f624] rounded-lg shadow border border-indigo-100 justify-start items-center gap-3 inline-flex cursor-pointer hover:bg-[#3b82f624]` : `self-stretch h-auto p-3 bg-slate-50 rounded-lg shadow border border-indigo-100 justify-start items-center gap-3 inline-flex cursor-pointer hover:bg-[#3b82f624]`} onClick={() => setChangeUserId(item.id)}>
                    {userType === 'jobSeeker' ?
                      <img className="w-12 h-12 rounded-[60px]" src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} /> :
                      item?.jobSeekerUser?.profilePicturePath ? <img className="w-12 h-12 rounded-[60px]" src={`${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${item?.jobSeekerUser?.profilePicturePath}`} /> : <img className="w-12 h-12 rounded-[60px]" src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} />
                    }
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                      <div className="self-stretch justify-start items-center gap-3 inline-flex">
                        <div className="grow shrink basis-0 text-black text-base  leading-snug tracking-tight">
                          <span className="font-bold">{userType === 'jobSeeker' ? item?.recruiterUser?.name : item?.jobsCommunication?.user?.name}</span>
                          <p className="font-bold text-xs">{userType === 'jobSeeker' ? item?.jobsCommunication?.title : item?.jobsCommunication?.title}</p></div>
                        <div className="text-slate-500 text-xs font-normal leading-[14.40px] tracking-tight">{moment(item?.messages[0]?.createdDate)?.format('LT')}</div>
                      </div>
                      <div className="self-stretch h-auto justify-start items-center inline-flex">
                        <div className={`grow shrink basis-0 h-auto text-slate-500 text-xs font-normal leading-[14.40px] tracking-tight}`} dangerouslySetInnerHTML={{
                          __html: htmlMakeBold(item.messages, item?.messages?.filter((subItem: any) => subItem?.isRead == 1 && subItem?.messageType === 'Email' && subItem.receiverId === userId)?.length)

                        }}>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </TabPanel>
          <TabPanel label='sms' value={'2'} tabIndex={1} >
            <div className="w-full h-auto px-3 pt-5 pb-3 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex">
              <label htmlFor="default-search-SMS" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={sortingSMSInput}
                  className="block w-full  h-10 ps-10 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."

                  onChange={(event) => handleSMSSearch(event)}
                  defaultValue={sortingSMSInput}></input>
                <button type="submit" className="text-white absolute end-2.5 top-4">
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}messagingVector.svg`} alt='messagingVector' />
                </button>
              </div>
              <div className="self-stretch h-auto flex-col justify-start items-start gap-2 flex pr-3 max-h-screen overflow-y-auto">
                {saveSortingSMSCommunication?.map((item: any) =>
                  <div key={item?.id} className={item?.id === changeUserId ? `self-stretch h-auto p-3 bg-[#3b82f624] rounded-lg shadow border border-indigo-100 justify-start items-center gap-3 inline-flex cursor-pointer hover:bg-[#3b82f624]` : `self-stretch h-auto p-3 bg-slate-50 rounded-lg shadow border border-indigo-100 justify-start items-center gap-3 inline-flex cursor-pointer hover:bg-[#3b82f624]`} onClick={() => setChangeUserId(item?.id)}>
                    {userType === 'jobSeeker' ?
                      <img className="w-12 h-12 rounded-[60px]" src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} /> :
                      item?.jobSeekerUser?.profilePicturePath ? <img className="w-12 h-12 rounded-[60px]" src={`${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${item?.jobSeekerUser?.profilePicturePath}`} /> : <img className="w-12 h-12 rounded-[60px]" src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} />

                    }
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                      <div className="self-stretch justify-start items-center gap-3 inline-flex">
                        <div className="grow shrink basis-0 text-black text-base font-bold leading-snug tracking-tight">
                          <span className="font-bold">{userType === 'jobSeeker' ? item?.recruiterUser?.name : item?.jobsCommunication?.user?.name}</span>
                          <p className="font-bold text-xs">{userType === 'jobSeeker' ? item?.jobsCommunication?.title : item?.jobsCommunication?.title}</p></div>
                        <div className="text-slate-500 text-xs font-normal leading-[14.40px] tracking-tight">{moment(creationDate)?.format('LT')}</div>
                      </div>
                      <div className="self-stretch h-auto justify-start items-center inline-flex">
                        <div className={`grow shrink basis-0 h-auto text-slate-500 text-xs font-normal leading-[14.40px] tracking-tight ${item?.messages?.isRead === 1 ? "font-bold" : "font-normal"}`} dangerouslySetInnerHTML={{
                          __html: htmlMakeBold(item.messages, item?.messages?.filter((subItem: any) => subItem?.isRead == 1 && subItem?.messageType === 'SMS' && subItem.receiverId === userId)?.length)
                        }}>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </TabPanel>
          {userType === 'jobSeeker' && <TabPanel label='saved' value={'3'} tabIndex={2}>
            <div className="w-full h-auto px-3 pt-5 pb-3 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex">
              <label htmlFor="default-search-Save" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={sortingSavedInput}
                  className="block w-full  h-10 ps-10 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  defaultValue={sortingSavedInput}
                  onChange={(event) => handleSavedJobsSearch(event)}></input>
                <button type="submit" className="text-white absolute end-2.5 top-4">
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}messagingVector.svg`} alt='messagingVector' />
                </button>
              </div>
              <div className="self-stretch h-auto flex-col justify-start items-start gap-2 flex pr-3 max-h-screen overflow-y-auto">
                {saveSortingSavedCommunication.length > 0 && saveSortingSavedCommunication?.map((item: any) =>
                  <div className={Number(item?.jobs.id) === Number(jobId) ? `self-stretch h-auto p-3 bg-[#3b82f624] rounded-lg shadow border border-indigo-100 justify-start items-center gap-3 inline-flex cursor-pointer hover:bg-[#3b82f624]` : `self-stretch h-auto p-3 bg-slate-50 rounded-lg shadow border border-indigo-100 justify-start items-center gap-3 inline-flex cursor-pointer hover:bg-[#3b82f624]`} onClick={() => { setJobId(item?.jobs?.id); setToggleJobApply(false); setCreationDate(item?.createdAt) }} key={item.id}>
                    <img className="w-12 h-12 rounded-[60px]" src={item?.company?.companyImage ? `${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${item?.company?.companyImage}`.replace(/"/g, '') as any : `${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`} alt="company logo" />
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                      <div className="self-stretch justify-start items-center gap-3 inline-flex">
                        <div className="grow shrink basis-0 leading-snug tracking-tight">
                          <span className="text-black text-base font-bold">{item?.jobs?.title}</span>
                          <p className=" text-black text-xs">{item?.jobs?.company?.title}</p></div>
                        <div className="text-slate-500 text-xs font-normal leading-[14.40px] tracking-tight">{item?.createdAt && moment(item?.createdAt).fromNow()}</div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </TabPanel>}
        </Tabs>
      </div>
    </>
  )
}

export default LeftPanelMessaging