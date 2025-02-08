import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../..';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { IFormApplyJobsWithoutQuestionnaire, IFormSaveJobs } from '../../../interface/jobSeeker/applyJobs';
import { clearGetProfileDashboardSlice, profileDashboardGet } from '../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { SaveJobsSchema, applyJobsSchema } from '../../../schema/applyJobs';
import { applyJobs } from '../../../store/reducers/applyJobs/applyJobs';
import { useFieldArray, useForm } from 'react-hook-form';
import { deleteSaveJob } from '../../../store/reducers/applyJobs/saveJob';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { getJobDetail } from '../../../store/reducers/jobs/GetJobDetails';
import { getCheckJobApplicant, scrollToTop } from '../../utils/utils';
import NoRecords from '../../commonComponents/NoRecords';
import ApplyJobs from '../Jobs/ApplyJobs/ApplyJobs';


const SavedJobTrail = ({ setDeleteSave, inbox, jobId, setJobId, jobCard, loading, toggleJobApply, setToggleJobApply, creationDate }: any) => {

  const [checkEmpty, isCheckEmpty] = useState(true);
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const [toggleResumeUpload, setToggleResumeUpload] = useState(false);
  const [toggleQuestionnaire, setToggleQuestionnaire] = useState(false);
  const { success: successProfile, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const [toggleReview, setToggleReview] = useState(false);
  const [applicantCount, setApplicantCount] = useState(0);
  const [buttonClick, setButtonClick] = useState('');
  const userId = Cookies.get("userId");
  const dispatch = useAppDispatch();
  const { success, jobDetail } = useAppSelector((state) => state.getJobDetail);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormApplyJobsWithoutQuestionnaire | IFormSaveJobs>({
    resolver: yupResolver(applyJobsSchema || SaveJobsSchema) as any,
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "questionnaire",
  });
  const onSubmit = (
    data: IFormApplyJobsWithoutQuestionnaire | IFormSaveJobs
  ) => {
    const selectedQuestionnaireAnswer: any = [];
    const selectedMultipleChoiceQuestionnaireAnswer: any = [];

    data?.questionnaire &&
      data?.questionnaire?.filter(
        (item: any) =>
          item?.questionType !== "MultipleChoice" &&
          selectedQuestionnaireAnswer?.push({
            questionnaire: item?.question,
            answer: item?.numberChoice
              ? item?.numberChoice
              : item?.descriptive
                ? item?.descriptive
                : item?.singleChoice
                  ? item?.singleChoice
                  : undefined,
          })
      );
    data?.questionnaire &&
      data?.questionnaire?.filter((item: any) =>
        item?.questionType === "MultipleChoice" &&
          Array.isArray(item?.multipleChoice)
          ? item?.multipleChoice?.map((item1: any) =>
            selectedMultipleChoiceQuestionnaireAnswer?.push({
              multipleChoiceQuestionnaire: item1,
              answer: item1,
            })
          )
          : selectedMultipleChoiceQuestionnaireAnswer?.push({
            multipleChoiceQuestionnaire: item?.multipleChoice,
            answer: item?.multipleChoice,
          })
      );
    if (buttonClick === "Apply") {
      if (profileDashboard?.resumeFile) {
        dispatch(
          applyJobs({
            jobSeekerProfile: userId && parseInt(userId),
            jobs: jobId && parseInt(jobId),
            questionnaireAnswer: selectedQuestionnaireAnswer,
            multipleChoiceQuestionnaireAnswer:
              selectedMultipleChoiceQuestionnaireAnswer,
          })
        ).then((data: any) => {
          if (data?.payload?.count > 0) {
            toast.info("job already applied !!");
          } else {
            isCheckEmpty(true)
            toast.success("job Applied successfully !!");
          }
        });
      } else {
        toast.info("Please upload the resume !!");
      }
    }
  };

  useEffect(() => {
    if (jobId)
      dispatch(getJobDetail(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    const parsedDate = parseISO(jobDetail?.createdAt);
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }

    jobDetail?.questionnaire?.map((item) => {
      if (item.question === "") {
        isCheckEmpty(false);
      } else {
        isCheckEmpty(true);
      }
    });
  }, [jobDetail, jobId]);


  useEffect(() => {
    if (jobId) {
      getCheckJobApplicant(Number(userId), Number(jobId)).then((count: any) => {
        setApplicantCount(count);
      })
    }
  }, [jobId, checkEmpty])

  const handleDiscard = () => {
    scrollToTop();
    if (toggleJobApply && !toggleResumeUpload && !toggleQuestionnaire) {
      setToggleJobApply(false);
    }
    if (toggleResumeUpload && !toggleQuestionnaire) {
      setToggleResumeUpload(false);
    }
    if (toggleQuestionnaire) {
      setToggleQuestionnaire(false);
    }
  };

  const handleNext = () => {
    scrollToTop();
    if (toggleJobApply) {
      setToggleResumeUpload(true);
    }
    if (toggleResumeUpload) {
      setToggleQuestionnaire(true);
    }
  };

  useEffect(() => {
    dispatch(profileDashboardGet());

  }, [success, dispatch]);

  useEffect(() => {
    if (successProfile) {
      dispatch(clearGetProfileDashboardSlice);
    }
  }, [successProfile]);

  const locationCount = jobDetail?.company?.location?.length;
  console.log(profileDashboard);

  return (
    <>
      {Object.keys(jobDetail).length > 0 ?
        <>
          {!toggleJobApply ? (<>
            <div className="border border-[#E0E7FF] rounded-xl p-5 bg-white">
              <div className="self-stretch h-44 flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch justify-start items-center gap-3 inline-flex">
                  <img className="w-12 h-12 rounded-[60px]" src={jobDetail?.company?.companyImage ? `${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${jobDetail?.company?.companyImage}`.replace(/"/g, '') as any : `${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`} alt="company logo" />
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                    <div className="self-stretch text-slate-900 text-2xl font-bold  leading-7 tracking-tight">{jobDetail?.title}</div>
                    <div className="self-stretch justify-start items-start gap-1 inline-flex">
                      <div className="grow shrink basis-0 text-slate-500 text-base font-medium leading-snug tracking-tight">{jobDetail?.company?.title}</div>
                      <span className="text-slate-400 text-sm font-normal  leading-none tracking-tight">
                        {lastUpdatedTimestamp !== null && formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-px border border-indigo-100"></div>
                <div className="self-stretch h-16 flex-col justify-start items-start gap-5 flex">
                  <div className="self-stretch justify-start items-start gap-5 inline-flex">
                    <div className="justify-start items-center gap-2 flex">
                      <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ExperienceIcon.svg`} alt="experience" />
                      <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                        {jobDetail?.totalExpYearStart?.title[0]} -
                      </span>
                      <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                        {jobDetail?.totalExpYearEnd?.title[0]} Years
                      </span>
                    </div>
                    {!jobDetail?.hideSalaryDetails && <div className="justify-start items-center gap-2 flex">
                      <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}MoneyIcon.svg`} alt="moneyIcon" />
                      <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                        {jobDetail?.payScaleLowerRange?.title} -
                      </span>
                      {jobDetail?.payScaleUpperRange &&
                        <span className=" text-slate-500 text-base font-medium leading-snug tracking-tight"> {jobDetail?.payScaleUpperRange?.title}  {jobDetail?.numberSystem?.title} {jobDetail?.recurrence?.title}
                        </span>}
                    </div>}
                    <div className="justify-start items-center gap-2 flex">
                      <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="location" />
                      {jobDetail?.jobsLocation?.map((loc: any) =>
                        <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                          {loc?.location?.title},
                        </span>)}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-5 inline-flex">
                    {jobDetail?.workMode?.title && <div className=" px-3 py-2 bg-orange-50 rounded justify-center items-center gap-2.5 flex">
                      <div className="text-orange-600 text-sm font-normal leading-none tracking-tight">{jobDetail?.workMode?.title}</div>
                    </div>}
                    {jobDetail?.employmentType?.title && <div className=" px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
                      <div className="text-green-600 text-sm font-normal leading-none tracking-tight">{jobDetail?.employmentType?.title}</div>
                    </div>}
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="justify-start items-center gap-5 inline-flex mt-4">
                  {applicantCount === 0 && <>
                    {!checkEmpty ?
                      <button type='submit' className="w-48  px-6 py-1.5 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                        <span className="text-white text-xl font-medium  leading-normal tracking-tight" onClick={() => {
                          setButtonClick("Apply");
                        }}>Apply</span>
                      </button>
                      :
                      <button className="w-48  px-6 py-1.5 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex" onClick={() => { setToggleJobApply(true); setButtonClick('Apply'); }}>
                        <span className="text-white text-xl font-medium  leading-normal tracking-tight">Apply</span>
                      </button>
                    }
                  </>}
                  {applicantCount > 0 && inbox === 'Saved' && <button className="w-48  px-6 py-1.5 bg-green-600 rounded-lg shadow justify-center items-center gap-3 flex" >
                    <span className="text-white text-xl font-medium  leading-normal tracking-tight">Applied</span>
                  </button>}
                  {inbox === 'Saved' && <button className="w-28 pl-6 pr-3 py-1.5 bg-red-300 rounded-lg justify-center items-center  gap-3 flex">
                    <button className="text-indigo-900 text-xl font-medium  leading-normal tracking-tight " onClick={() => setButtonClick('Delete')}>Delete</button>
                    <span>
                      <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Delete.svg`} alt="bookMark" />
                    </span>
                  </button>}
                </div>
              </form>
            </div>
            <div className="border border-[#E0E7FF] rounded-xl p-5 mt-4 bg-white " >
              <div className="  flex-col justify-start items-start gap-5 flex-wrap">
                <div className=" text-slate-900 text-base font-bold leading-snug tracking-tight">Job Description
                </div>
                <div className=" w-full  text-slate-500 text-base font-medium  leading-snug tracking-tight flex flex-wrap mb-2">
                  <p className="w-full break-words"> {jobDetail?.jobDescription}</p>
                </div>
              </div>
              <div className="self-stretch h-px border border-indigo-100 my-5"></div>
              <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">
                  Key Responsibilities</div>
                <span className="w-full break-words text-slate-500 text-base font-medium leading-snug tracking-tight">
                  {jobDetail?.keyResponsibility}
                </span>
              </div>
              <div className="self-stretch h-px border border-indigo-100 my-5"></div>
              <div className="self-stretch  flex-col justify-start items-start gap-5 flex ">
                <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">Skills</div>
                <div className=" justify-start items-start gap-3 flex-row flex flex-wrap">
                  {jobDetail?.jobsKeySkills?.map((keySkill) =>
                    <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                      <span className="text-black text-base font-normal  leading-snug tracking-tight">{keySkill?.keySkills?.title}</span>
                    </div>)}
                </div>
              </div>
            </div>
            <div className="border border-[#E0E7FF] rounded-xl p-5 mt-4 bg-white">
              <span className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">About the company
              </span>
              <div className="self-stretch justify-start items-center gap-3 flex mt-2">
                <img className="w-14 h-14 rounded-lg" src={jobDetail?.company?.companyImage ? `${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${jobDetail?.company?.companyImage}`.replace(/"/g, '') as any : `${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`} alt="company logo" />
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="self-stretch text-slate-900 text-2xl font-bold leading-7 tracking-tight overflow-hidden whitespace-nowrap text-ellipsis w-96">{jobDetail?.company?.title}</div>
                  <div className="w-40 justify-start items-center gap-2 inline-flex">
                    <div className="justify-start items-center gap-1 flex">
                      <AiFillStar color="yellow" />
                      {jobDetail?.company?.rating ? <div className="text-black text-sm font-normal leading-none tracking-tight">{jobDetail?.company?.rating}</div> : <div >N.A</div>}
                    </div>
                    {jobDetail?.company?.reviews && <Fragment>
                      <div className=" border-l border-indigo-100 h-4"></div>
                      <div className="text-slate-500 text-sm font-normal leading-none tracking-tight">{jobDetail?.company?.reviews}
                      </div>
                    </Fragment>}
                  </div>
                </div>
              </div>
              <div className="justify-start items-start gap-5 inline-flex mt-2">
                <div className="justify-start items-center gap-2 flex">
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="location" />
                  {jobDetail?.company?.location?.length > 0 ? jobDetail?.company?.location?.map((loc, index) =>
                    (index < locationCount) ? <span className="ml-1 text-slate-500 text-base font-medium">{loc?.title}, </span>
                      : <span className="ml-1 text-base font-medium text-slate-500">{loc?.title}. </span>
                  ) : <span className="ml-1 text-slate-500 text-base font-medium">N.A</span>}
                </div>
                <div className=" border-l border-indigo-100 h-4"></div>
                {jobDetail?.company?.employeeCount && <div className="justify-start items-center gap-2 flex">
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}peopleIcon.svg`} alt="people" />
                  <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{jobDetail?.company?.employeeCount}
                  </div>
                </div>
                }
              </div>
              <div className="px-2 py-1.5  w-44 bg-indigo-50 rounded-lg justify-center items-center text-center mt-2">
                <button className="text-indigo-900 text-base font-medium  leading-snug tracking-tight ">More open positions</button>
              </div>
            </div></>) :
            <ApplyJobs
              toggleJobApply={toggleJobApply}
              jobDetail={jobDetail}
              toggleResumeUpload={toggleResumeUpload}
              toggleQuestionnaire={toggleQuestionnaire}
              handleDiscard={handleDiscard}
              handleNext={handleNext}
              setToggleResumeUpload={setToggleResumeUpload}
              setToggleQuestionnaire={setToggleQuestionnaire}
            />
          }
          < ToastContainer />
        </>
        : !loading && <NoRecords />}
    </>
  )
}

export default SavedJobTrail