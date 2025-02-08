import Loader from '../../../commonComponents/Loader';
import NoRecords from '../../../commonComponents/NoRecords';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import type { ReactTabsFunctionComponent, TabProps } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useState } from 'react';
import moment from 'moment';

const SaveJobCard = ({ setInbox, jobId, setJobId, jobApplyCard, jobCard, loading }: any) => {

  const [applicantCount, setApplicantCount] = useState(0);
  const CustomTab: ReactTabsFunctionComponent<TabProps> = ({
    children,
    ...otherProps
  }) => (
    <Tab {...otherProps}>
      <h1 className="text-center">{children}</h1>
    </Tab>
  );
  CustomTab.tabsRole = 'Tab';

  return (
    <>
      <Tabs>
        <TabList>
          <CustomTab onClick={() => setInbox("Apply")}>Applied {jobApplyCard.length}</CustomTab>
          <CustomTab onClick={() => setInbox("Save")}>Saved {jobCard.length}</CustomTab>
        </TabList>
        <TabPanel> {jobApplyCard.length ? jobApplyCard?.map((item: any) => (
          <div className={Number(item?.jobs.id) === Number(jobId) ? `w-full  rounded-xl h-auto flex-col justify-start items-center gap-7 mb-10 inline-flex  hover:bg-[#3b82f624] cursor-pointer bg-[#3b82f624]` : `w-full h-auto  rounded-xl  bg-white flex-col justify-start items-center gap-7 mb-10 inline-flex  hover:bg-[#3b82f624] cursor-pointer`} onClick={() => setJobId(item?.jobs.id)} key={item.id}>
            <div className="self-stretch h-auto p-5 shadow flex-col justify-start items-start gap-5 flex">
              <div className="self-stretch justify-start items-center gap-3 inline-flex">
                <img className="w-[60px] h-[60px] rounded-lg" src={`${process.env.REACT_APP_IMAGE_BASE_URL}companyBrand.png`}/>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="self-stretch text-slate-900 text-2xl font-bold  leading-[28.80px] tracking-tight">{item?.jobs?.title}</div>
                  <div className="self-stretch text-slate-500 text-base font-medium  leading-snug tracking-tight">{item?.jobs?.company?.title}</div>
                </div>
              </div>
              <div className="self-stretch h-[0px] border border-indigo-100"></div>
              <div className="self-stretch h-7 flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch justify-end items-center gap-3 inline-flex">
                  <div className="w-[97px] px-3 py-2 bg-slate-100 rounded justify-end items-center gap-2.5 flex">
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}applied.svg`} alt='applied'/>
                    <div className="text-right text-black text-sm font-normal  leading-[16.80px] tracking-tight">Applied</div>
                  </div>
                  <div className="grow shrink basis-0 text-right text-slate-500 text-xs font-normal  leading-[14.40px] tracking-tight">
                    {moment(item?.jobs?.createdAt).fromNow()}</div>
                </div>
              </div>
            </div>
          </div>
        )) : !loading && <NoRecords />}
          {loading && <Loader />}</TabPanel>
        <TabPanel>
          {jobCard.length ? jobCard?.map((item: any) => (
            <div className={Number(item?.jobs.id) === Number(jobId) ? `w-full  rounded-xl h-auto flex-col justify-start items-center gap-7 mb-10 inline-flex  hover:bg-[#3b82f624] cursor-pointer bg-[#3b82f624]` : `w-full h-auto  rounded-xl  bg-white flex-col justify-start items-center gap-7 mb-10 inline-flex  hover:bg-[#3b82f624] cursor-pointer`} onClick={() => setJobId(item?.jobs.id)} key={item.id}>
              <div className="self-stretch h-auto p-5 shadow flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch justify-start items-center gap-3 inline-flex">
                  <img className="w-[60px] h-[60px] rounded-lg" src={`${process.env.REACT_APP_IMAGE_BASE_URL}companyBrand.png`} alt='companyBrand' />
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                    <div className="self-stretch text-slate-900 text-2xl font-bold  leading-[28.80px] tracking-tight">{item?.jobs?.title}</div>
                    <div className="self-stretch text-slate-500 text-base font-medium  leading-snug tracking-tight">{item?.jobs?.company?.title}</div>
                  </div>
                </div>
                <div className="self-stretch h-[0px] border border-indigo-100"></div>
                <div className="self-stretch h-7 flex-col justify-start items-start gap-5 flex">
                  <div className="self-stretch justify-end items-center gap-3 inline-flex">
                    <div className="grow shrink basis-0 text-right text-slate-500 text-xs font-normal  leading-[14.40px] tracking-tight">{item?.jobs?.createdAt && formatDistanceToNow(parseISO(item?.jobs?.createdAt).getDate(), { addSuffix: true })}</div>
                  </div>
                </div>
              </div>
            </div>
          )) : !loading && <NoRecords />}
          {loading && <Loader />}
        </TabPanel>
      </Tabs>
    </>
  )
}

export default SaveJobCard;