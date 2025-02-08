import { useAppDispatch, useAppSelector } from '../../../..';
import { useEffect, useState } from 'react'
import { searchResumeResultGet } from '../../../../store/reducers/recruiter/searchResume';
import SearchResumeResultLeftPanel from './SearchResumeResultLeftPanel'
import ResumeResultCard from './ResumeResultCard'
import ResumeResultCardDetail from './ResumeResultCardDetail'
import NoRecords from '../../../commonComponents/NoRecords'
import Modal from '../../../commonComponents/Modal';
import ComposeMail from '../MailCenter/ComposeMail';
import Toaster from '../../../commonComponents/Toaster';
import { toast } from 'react-toastify';
import DownloadResumeAsZip from '../../../commonComponents/DownloadResumeAsZip';
import { getSaveResumeList, listBlockedApplicant } from '../../../utils/utils';
import { useParams } from 'react-router-dom';
import { getEmployerCompanyList } from "../../../../store/reducers/companies/employerCompanyList";
import Cookies from 'js-cookie';

const SearchResumeResult = ({
  resumeSearchFormData,
  setResumeSearchFormData,
  viewAllSaveSearch,
  handleSingleSaveSearch,
  savedStatus,
  setSavedStatus }: any) => {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const userId = Cookies.get("userId");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [composePreviewTitle, setComposePreviewTitle] = useState('Compose Mail');
  const [expand, setExpand] = useState<any>([]);
  const [applicantEmailId, setApplicantEmailId] = useState<any>([])
  const { searchResumeResult } = useAppSelector((state) => state.getSearchResumeResultSlice);
  const { companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<any>([]);
  const [saveResume, setSaveResume] = useState<any>([]);
  const [blockCompanyList, setBlockCompanyList] = useState<any>([]);
  const [jobCard, setJobCard] = useState<any>([]);
  const [companyId, setCompanyId] = useState<any>([]);

  useEffect(() => {
    dispatch(searchResumeResultGet({ resumeSearchFormData }));
  }, [dispatch, resumeSearchFormData]);

  useEffect(() => {
    setJobCard(searchResumeResult)
  }, [searchResumeResult])

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(jobCard && jobCard?.map((li: any) => li.id));
    setApplicantEmailId(jobCard && jobCard?.map((li: any) => li.user.email))
    if (isCheckAll) {
      setIsCheck([]);
      setApplicantEmailId([]);
    }
  };

  const handleClick = (e: any) => {
    const { id, checked } = e.target;
    setApplicantEmailId([...applicantEmailId, jobCard?.filter((li: any) => li.user.id === Number(id))[0].user.email])
    setIsCheck([...isCheck, Number(id)]);
    if (!checked) {
      setIsCheck(isCheck.filter((item: any) => item !== Number(id)));
      setApplicantEmailId(applicantEmailId.filter((item: any) => item !== jobCard?.filter((li: any) => li.user.id === Number(id))[0].user.email))
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    if (isCheck?.length > 0) {
      setIsOpen(true);
    } else {
      toast.success("Please check at least one ")
    }
  }

  useEffect(() => {
    (async () => {
      const saveResumeList = await getSaveResumeList()
      if (Object.keys(saveResumeList)?.length) {
        setSaveResume(saveResumeList as any)
      }

    })();
  }, [savedStatus]);

  useEffect(() => {
    if (companyId) {
      (async () => {
        const saveBlockList = await listBlockedApplicant(Number(companyId))
        if (Object?.keys(saveBlockList)?.length) {
          let jobSeekerId = [] as any
          saveBlockList.map((item: any) => { jobSeekerId?.push(item?.jobSeeker?.id) })
          setBlockCompanyList(jobSeekerId);
        }
      })();
    }
  }, [companyId]);

  useEffect(() => {
    if (blockCompanyList) {
      setJobCard(jobCard.filter((item: any) => !blockCompanyList.find((twoElement: any) => {
        return Number(item.id) === Number(twoElement)
      })))
    }
    if (companyDetails) {
      setCompanyId(companyDetails?.id);
    }

  }, [blockCompanyList, companyDetails]);

  useEffect(() => {
    dispatch(getEmployerCompanyList({ data: { user: { id: userId } } }));
  }, []);

  return (
    <>
      <div className="h-[10%]  w-full"></div>
      <div className="grid grid-cols-12 gap-10 py-6 px-32 bg-[#F8FAFC] ">
        <div className="col-start-1 col-end-4  p-5">
          <SearchResumeResultLeftPanel
            resumeSearchFormData={resumeSearchFormData}
            setResumeSearchFormData={setResumeSearchFormData}
            setSavedStatus={setSavedStatus} />
        </div>
        <div className="col-start-4 col-end-13">
          <form>
            <div className="w-full h-auto flex-col justify-start items-start gap-10 inline-flex">
              <div className="w-full justify-start items-center gap-5 inline-flex">
                <div className="w-10 h-10 bg-rose-50 rounded-[60px] shadow justify-center items-center flex">
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}search-candidate-resume.svg`} alt='search-candidate-resume' />
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-black text-2xl font-bold leading-[28.80px] tracking-tight">Search Candidate Resumes</div>
                  </div>
                  <div className="self-stretch justify-start items-start gap-2 inline-flex">
                    <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">Use the filters to shortlist resumes</div>
                    <div className="w-[17px] self-stretch origin-top-left rotate-90 border border-indigo-100"></div>
                    <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">Showing {jobCard?.length} results</div>
                  </div>
                </div>
              </div>
              <div className="w-full flex-col justify-start items-center gap-7 flex">
                <div className="h-[90px] flex-col justify-start items-start gap-3 flex">
                  <div className="text-black text-base font-bold leading-snug tracking-tight">Saved Searches</div>
                  <div className="self-stretch justify-start items-center gap-5 grid grid-cols-3  mb-10">
                    {saveResume && saveResume?.slice(-2)?.reverse()?.map((item: any, index: any) =>
                      <div className="w-[285px] px-3 py-2 bg-indigo-50 rounded-[40px] justify-center items-center flex cursor-pointer" key={index} onClick={() => handleSingleSaveSearch(item.id)}>
                        <div className="text-black text-xs font-normal">{item?.resumeSearchKeywords?.map((itemKeywords: any, index: any) => <span key={index}>{(index ? ', ' : '') + itemKeywords?.resumeKeySkills?.title}</span>)} | {item?.minExperience}-{item?.maxExperience} yrs exp | {item?.minSalary}-{item?.maxSalary}Lacs</div>
                      </div>)}

                    <div className="border-b border-slate-600 justify-start items-center w-[50px]">
                      <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => viewAllSaveSearch(true)}>View all</div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-12 px-7 bg-white rounded-xl justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-1 flex">
                    <div className="w-6 h-6 relative">
                      <input
                        name="selectAll"
                        id="selectAll"
                        onChange={handleSelectAll}
                        checked={isCheckAll}
                        type="checkbox"
                      />
                    </div>
                    <div className="text-slate-600 text-base font-normal leading-snug tracking-tight">Select all</div>
                  </div>
                  <div className="justify-start items-center gap-5 flex">
                    <div className="w-[178px] rounded-lg justify-start items-center gap-2 flex">
                      <div className="w-6 h-6 flex-col justify-center items-center inline-flex cursor-pointer">
                        <DownloadResumeAsZip
                          searchResumeResult={jobCard}
                          isCheck={isCheck} />
                      </div>
                      <div className="text-indigo-900 text-base font-medium leading-snug tracking-tight">Download Resume</div>
                    </div>
                    <div className="w-[74px] rounded-lg justify-start items-center gap-2 flex cursor-pointer" onClick={openModal}>
                      <div className="w-6 h-6 justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Email.svg`} alt='Email' /></div>
                      <div className="text-indigo-900 text-base font-medium leading-snug tracking-tight">Email</div>
                    </div>
                  </div>
                </div>

                {jobCard?.length !== 0 ?
                  <>
                    {jobCard && jobCard?.map((data: any, index: number) =>
                      <div className="w-full flex-col justify-start items-center gap-7 flex" key={index}>
                        {!expand.includes(Number(index) + 1) &&
                          <ResumeResultCard
                            data={data}
                            index={index + 1}
                            setExpand={setExpand}
                            expand={expand}
                            handleClick={handleClick}
                            setIsCheck={setIsCheck}
                            isCheck={isCheck}
                            applicantEmailId={applicantEmailId}
                            setApplicantEmailId={setApplicantEmailId}
                          />}

                        {expand.includes(Number(index) + 1) &&
                          <ResumeResultCardDetail
                            data={data}
                            index={index + 1}
                            setExpand={setExpand}
                            expand={expand}
                            handleClick={handleClick}
                            setIsCheck={setIsCheck}
                            isCheck={isCheck}
                            applicantEmailId={applicantEmailId}
                            setApplicantEmailId={setApplicantEmailId}
                          />}
                      </div>
                    )}
                  </>
                  : <NoRecords />
                }
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        title={composePreviewTitle}
        setIsOpen={setIsOpen}
        modalBody={
          <ComposeMail
            closeDialog={closeDialog}
            profileDashboard={{ jobCard }}
            applicantMailId={isCheck}
            setComposePreviewTitle={setComposePreviewTitle}
            composePreviewTitle={composePreviewTitle}
            mulitUser={true}
            applicantEmailId={applicantEmailId}

          />
        }
      />
      <Toaster />
    </>
  )
}

export default SearchResumeResult;