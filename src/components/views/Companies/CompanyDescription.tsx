import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../..';
import { parseISO } from 'date-fns';
import { useParams } from 'react-router-dom';
import { getCompanyDetails } from '../../../store/reducers/companies/getCompanyDetails';
import { addLabel, getCheckJobToSave } from '../../utils/utils';
import TopCompaniesHiring from '../HomePage/TopCompaniesHiring';
import OpenJobs from './OpenJobs';
import Cookies from 'js-cookie';

const CompanyDescription = () => {
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const { id } = useParams();
  const userId = Cookies.get("userId");

  const dispatch = useAppDispatch();
  const { success, companyDetail } = useAppSelector((state) => state.getCompanyDetails)

  const [saveJobCount, setSaveJobCount] = useState(false);
  const [buttonClick, setButtonClick] = useState("");
  useEffect(() => {
    dispatch(getCompanyDetails(id as any));
  }, [dispatch, id]);

  useEffect(() => {
    getCheckJobToSave(Number(userId), Number(id)).then((count: any) => {
      if (count > 0) setSaveJobCount(true);
    });
  }, [ userId]);
  
  const parsedDate = parseISO(companyDetail?.createdAt)
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [companyDetail]);

  return (
    <Fragment>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 py-6 px-32 bg-[#F8FAFC] ">
        <div className="col-start-1 col-end-8 py-5">
          <div className="border border-[#E0E7FF] rounded-xl p-5 bg-white">
            <div className="self-stretch h-full flex-col justify-start items-start gap-5 flex">
              <div className="self-stretch justify-start items-center gap-3 inline-flex">
                <img className="w-14 h-14 rounded-lg" 
                src={companyDetail?.companyImage ? `${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${companyDetail?.companyImage}`.replace(/"/g, '') as any:`${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`} alt="company logo" />
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="self-stretch text-slate-900 text-2xl font-bold  leading-7 tracking-tight">{companyDetail?.title}</div>
                  <div className="self-stretch justify-start items-start gap-1 inline-flex">
                    <div className="">
                      {
                        companyDetail?.rating && <div className="flex justify-start items-center">
                          <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}starIcon.svg`} alt="StarIcon" width="15rem" height="15rem" />
                          <span className="ml-1">{companyDetail?.rating}</span>
                          <span className=" border-l h-5 border-gray-300 mx-4"></span>
                          <span className="text-[#94A3B8] text-sm">{addLabel(companyDetail?.reviews)} Reviews</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <hr className="indigo-100 w-full"/>
              <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch justify-start items-start gap-5 inline-flex">
                  {companyDetail?.employeeCount && <div className="justify-start items-center gap-2 flex">
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}employeeCount.svg`} alt="employeeCount" />
                    <span className="text-slate-500 text-base leading-snug tracking-tight">
                      {addLabel(companyDetail?.employeeCount)} employees
                    </span>
                  </div>}
                  {
                    companyDetail?.employeeCount && Object.keys(companyDetail?.location).length
                      ? <span className=" border-l h-5 border-gray-300 mx-3"></span> : <></>
                  }
                 { companyDetail?.location && Object.keys(companyDetail?.location).length ? <div className="justify-start items-center gap-2 flex">
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="location" />
                    {companyDetail?.location?.map((loc: any) =>
                      <div className="text-slate-500 text-base leading-snug tracking-tight">
                        {loc?.title},
                      </div>)}
                  </div> : <></>}

                </div>
                <div>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Hardware</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Networking</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Foreign MNC</span>
                    </div>
                  </button>
                </div>
                <hr className="indigo-100 w-full"/>
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">
                  About the company</div>
                <span className="self-stretch text-slate-500 text-sm leading-snug tracking-tight">
                  {companyDetail?.companyDescription}
                </span>
              </div>
              <hr className="indigo-100 w-full"/>
              <div className="self-stretch  flex-col justify-start items-start flex ">
                <div className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">Benefits</div>
                <div>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Hardware</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Networking</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Foreign MNC</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Hardware</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Networking</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Foreign MNC</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Hardware</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Networking</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Foreign MNC</span>
                    </div>
                  </button>
                </div>
              </div>
              {/* <hr className="indigo-100 w-full"/> */}
              <hr className="indigo-100 w-full"/>
              <div className="self-stretch  flex-col justify-start items-start gap-5 flex ">
              <div className="grid grid-cols-2 gap-y-4 w-full">
                  <div>
                    <span className=" block text-gray-400">Type</span>
                    <span className="text-sm">Private</span>
                  </div>
                  <div>
                  <span className=" block text-gray-400">Founded</span>
                    <span className="text-sm">1865</span>
                  </div>
                  <div>
                  <span className=" block text-gray-400">Headquarters</span>
                    <span className="text-sm">India</span>
                  </div>
                  <div>
                  <span className=" block text-gray-400">Website</span>
                    <span className="text-sm">www.ratnaglobaltech.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </div>
        <div className="col-start-8 col-end-13 py-5">
          
        <OpenJobs 
          setSaveJobCount={setSaveJobCount}
          companyDetail={companyDetail}/>
        </div>
      </div>
      <div className="h-[65%] bg-[#F1F5F9] px-32 flex flex-col justify-center">
                <TopCompaniesHiring viewLabel="All companies" title="Similar Companies"/>
            </div>
    </Fragment>
  )
}

export default CompanyDescription;