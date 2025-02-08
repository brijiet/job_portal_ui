import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IFormInputsPostAJob } from '../../../../interface/employer';
import JobLeftPanel from './JobLeftPanel';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { formDataReset, postJobUpdate, postResponseDraft } from '../../../../store/reducers/jobs/postJobs';
import { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import { PostJobSchema } from '../../../../schema/postJob';
import Toaster from '../../../commonComponents/Toaster';
import Cookies from 'js-cookie';
import wrap from 'word-wrap';
import { getEmployerCompanyList } from '../../../../store/reducers/companies/employerCompanyList';
import { getFirstLetterOfEmail } from '../../../utils/filterArray';
import { getFirstLetterOfName } from '../../../utils/filterArray';

const Preview = () => {

  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postBack, setPostBack] = useState({ postURL: '', backURL: '', DiscardURL: '' })
  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const [jobTitle, setJobTitle] = useState('');
  const [buttonClick, setButtonClick] = useState('');
  const [userType, setUserType] = useState(Cookies.get('userType'));
  const [userId, setUserId] = useState(Cookies.get('userId'));
  const [sectionURL, setSectionURL] = useState({ jobDetailsURL: "", requirementsURL: "", companyURL: "", recruiterURL: "", responseURL: "", questionnaireURL: "", previewURL: "" });
  const { companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);

  const {
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsPostAJob>({
    resolver: yupResolver(PostJobSchema as any),
  });

  const selectedJobsKeySkills: any = [];
  const selectedJobsLocation: any = [];
  const selectedJobLocality: any = [];
  const selectedCandidateIndustry: any = [];
  const selectedJobQuestionnaire: any = [];

  jobDetailData?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }));
  jobDetailData?.jobsLocation?.filter((item: any) => item && selectedJobsLocation.push({ value: item?.location?.value, label: item?.location?.title }));
  jobDetailData?.jobLocality?.filter((item: any) => item && selectedJobLocality.push({ value: item?.locality?.id, label: item?.locality?.title }));
  const selectedJobEducation: any = [];
  jobDetailData?.jobEducation?.filter((item: any) => item && selectedJobEducation.push({ value: item?.education?.id, label: item?.education?.title }));
  jobDetailData?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ value: item?.candidateIndustry?.id, label: item?.candidateIndustry?.title }));
  jobDetailData?.questionnaire?.filter((item: any) => item && selectedJobQuestionnaire.push({
    question: item?.question,
    questionType: item?.questionType?.value,
    characterLimit: item?.characterLimit,
    requiredCheck: item?.requiredCheck,
    rangeMax: item?.rangeMax,
    singleSelection: item?.singleSelection?.filter((itemSingle: any) => itemSingle?.option && { option: itemSingle?.option }),
    multipleSelection: item?.multipleSelection?.filter((itemMultiple: any) => itemMultiple?.option && { option: itemMultiple?.option })
  }));

  useEffect(() => {
    if (jobDetailData) {
      jobDetailData?.title && setValue('title', jobDetailData?.title);
      jobDetailData?.jobsType && setValue('jobsType', jobDetailData?.jobsType);
      jobDetailData?.jobsKeySkills && setValue('keySkills', selectedJobsKeySkills);
      jobDetailData?.department && setValue('department', jobDetailData?.department);
      jobDetailData?.roleCategory && setValue('roleCategory', jobDetailData?.roleCategory);
      jobDetailData?.videoProfile && setValue('videoProfile', jobDetailData?.videoProfile);
      jobDetailData?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetailData?.includeWalkInDetails);
      jobDetailData?.notifyMeAbout && setValue('notifyMeAbout', jobDetailData?.notifyMeAbout);
      jobDetailData?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetailData?.notificationEmailAddress1);
      jobDetailData?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetailData?.notificationEmailAddress2);
      jobDetailData?.jobsRole && setValue('jobsRole', jobDetailData?.jobsRole);
      jobDetailData?.workMode && setValue('workMode', jobDetailData?.workMode);
      jobDetailData?.jobsLocation && setValue('jobLocation', selectedJobsLocation);
      jobDetailData?.candidateRelocate && setValue('candidateRelocate', jobDetailData?.candidateRelocate);
      jobDetailData?.hideSalaryDetails && setValue('hideSalaryDetails', jobDetailData?.hideSalaryDetails);
      jobDetailData?.jobLocality && setValue('jobLocality', selectedJobLocality);
      jobDetailData?.totalExpYearStart && setValue('fromWorkExperience', jobDetailData?.totalExpYearStart);
      jobDetailData?.totalExpYearEnd && setValue('toWorkExperience', jobDetailData?.totalExpYearEnd);
      jobDetailData?.employmentType && setValue('employmentType', jobDetailData?.employmentType);
      jobDetailData?.currency && setValue('currency', jobDetailData?.currency);
      jobDetailData?.payScaleLowerRange && setValue('fromSalaryRange', jobDetailData?.payScaleLowerRange);
      jobDetailData?.payScaleUpperRange && setValue('toSalaryRange', jobDetailData?.payScaleUpperRange);
      jobDetailData?.numberSystem && setValue('numberSystem', jobDetailData?.numberSystem);
      jobDetailData?.recurrence && setValue('recurrence', jobDetailData?.recurrence);
      jobDetailData?.jobExpiry && setValue('jobExpiry', jobDetailData?.jobExpiry);
      jobDetailData?.jobStatus && setValue('jobStatus', jobDetailData?.jobStatus);
      jobDetailData?.companyType && setValue('companyType', jobDetailData?.companyType);
      jobDetailData?.jobEducation && setValue('highestQualification', selectedJobEducation);
      jobDetailData?.premiumBTech && setValue('premiumBTech', jobDetailData?.premiumBTech);
      jobDetailData?.premiumMBAAll && setValue('premiumMBAAll', jobDetailData?.premiumMBAAll);
      jobDetailData?.jobCandidateIndustry && setValue('candidateIndustry', selectedCandidateIndustry);
      jobDetailData?.diversityHiring && setValue('diversityHiring', jobDetailData?.diversityHiring);
      jobDetailData?.jobDescription && setValue('jobDescription', jobDetailData?.jobDescription);
      jobDetailData?.jobsOpening && setValue('jobsOpening', jobDetailData?.jobsOpening);
      jobDetailData?.videoProfile && setValue('videoProfile', jobDetailData?.videoProfile);
      jobDetailData?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetailData?.includeWalkInDetails);
      jobDetailData?.notifyMeAbout && setValue('notifyMeAbout', jobDetailData?.notifyMeAbout);
      jobDetailData?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetailData?.notificationEmailAddress1);
      jobDetailData?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetailData?.notificationEmailAddress2);
      jobDetailData?.company && setValue('company', jobDetailData?.company);
      jobDetailData?.companyWebsite && setValue('companyWebsite', jobDetailData?.companyWebsite);
      jobDetailData?.aboutCompany && setValue('aboutCompany', jobDetailData?.aboutCompany);
      jobDetailData?.keyResponsibility && setValue('keyResponsibility', jobDetailData?.keyResponsibility);
      jobDetailData?.companyAddress && setValue('companyAddress', jobDetailData?.companyAddress);
      jobDetailData?.hideCompanyRating && setValue('hideCompanyRating', jobDetailData?.hideCompanyRating);
      jobDetailData?.questionnaire && setValue('questionnaire', selectedJobQuestionnaire);
    }
    if (Object.keys(jobDetail).length !== 0) {
      jobDetail?.hideSalaryDetails && setValue('hideSalaryDetails', jobDetail?.hideSalaryDetails);
      jobDetail?.videoProfile && setValue('videoProfile', jobDetail?.videoProfile);
      jobDetail?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetail?.includeWalkInDetails);
      jobDetail?.notifyMeAbout && setValue('notifyMeAbout', jobDetail?.notifyMeAbout);
      jobDetail?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetail?.notificationEmailAddress1);
      jobDetail?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetail?.notificationEmailAddress2);
    } else {
      jobDetailData?.hideSalaryDetails && setValue('hideSalaryDetails', jobDetailData?.hideSalaryDetails);
      jobDetailData?.videoProfile && setValue('videoProfile', jobDetailData?.videoProfile);
      jobDetailData?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetailData?.includeWalkInDetails);
      jobDetailData?.notifyMeAbout && setValue('notifyMeAbout', jobDetailData?.notifyMeAbout);
      jobDetailData?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetailData?.notificationEmailAddress1);
      jobDetailData?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetailData?.notificationEmailAddress2);
    }
  }, [setValue, jobDetailData]);

  const onSubmit = (data: IFormInputsPostAJob) => {

    if (buttonClick === 'Continue' && userType && userId) {
      const keySkills = jobDetailData?.jobsKeySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.keySkills?.value } }));
      const jobLocation = jobDetailData?.jobsLocation?.map((location: any) => ({ location: { id: location?.value } }));
      const jobEducation = jobDetailData?.jobEducation?.map((education: any) => ({ education: education?.value }));
      const jobLocality = jobDetailData?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
      const jobCandidateIndustry = jobDetailData?.jobCandidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.candidateIndustry?.value } }));
      const updatePostId = jobDetailData.id ? Number(jobDetailData.id) : null;

      dispatch(postJobUpdate({
        id: updatePostId,
        title: jobDetailData?.title,
        payScaleLowerRange: jobDetailData?.payScaleLowerRange?.value,
        jobsOpening: Number(jobDetailData?.jobsOpening),
        userType: userType,
        payScaleUpperRange: jobDetailData?.payScaleUpperRange?.value,
        jobDescription: jobDetailData?.jobDescription,
        company: jobDetailData?.company?.value,
        totalExpYearStart: jobDetailData?.totalExpYearStart?.value,
        totalExpYearEnd: jobDetailData?.totalExpYearEnd?.value,
        numberSystem: jobDetailData?.numberSystem?.value,
        recurrence: jobDetailData?.recurrence?.value,
        jobsLocation: jobLocation,
        jobsRole: jobDetailData?.jobsRole?.value,
        department: jobDetailData?.department?.value,
        jobsType: jobDetailData?.jobsType?.value,
        roleCategory: jobDetailData?.roleCategory?.value,
        jobEducation: jobEducation,
        user: userId,
        isDraft: false,
        jobsKeySkills: keySkills,
        employmentType: jobDetailData?.employmentType?.value,
        jobStatus: jobDetailData?.jobStatus?.value,
        jobExpiry: jobDetailData?.jobExpiry?.value,
        workMode: jobDetailData?.workMode?.value,
        candidateRelocate: data?.candidateRelocate,
        jobLocality: jobLocality,
        currency: jobDetailData?.currency?.value,
        companyType: jobDetailData?.companyType?.value,
        premiumBTech: jobDetailData?.premiumBTech,
        keyResponsibility: jobDetailData?.keyResponsibility,
        hideCompanyRating: jobDetailData?.hideCompanyRating,
        premiumMBAAll: jobDetailData?.premiumMBAAll,
        jobCandidateIndustry: jobCandidateIndustry,
        diversityHiring: jobDetailData?.diversityHiring,
        companyWebsite: jobDetailData?.companyWebsite,
        aboutCompany: jobDetailData?.aboutCompany,
        companyAddress: jobDetailData?.companyAddress,
        hideSalaryDetails: jobDetailData?.hideSalaryDetails,
        videoProfile: jobDetailData?.videoProfile,
        includeWalkInDetails: jobDetailData?.includeWalkInDetails,
        notifyMeAbout: jobDetailData?.notifyMeAbout,
        notificationEmailAddress1: jobDetailData?.notificationEmailAddress1,
        notificationEmailAddress2: jobDetailData?.notificationEmailAddress2,
        questionnaire: selectedJobQuestionnaire,
      })).then(() => {
        dispatch(formDataReset());
        navigate("/recruiterJobList");
      });
    }

    if ((buttonClick === 'Draft' || buttonClick === 'Save') && userType && userId) {

      let isDraft = Boolean(false);
      let successMessage = "Job saved successfully !!";
      if (buttonClick === 'Draft') {
        isDraft = Boolean(true);
        successMessage = "Job drafted successfully !!";
      }
      const keySkills = jobDetailData?.jobsKeySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.keySkills?.value } }));
      const jobLocation = jobDetailData?.jobsLocation?.map((location: any) => ({ location: { id: location?.value } }));
      const jobEducation = jobDetailData?.jobEducation?.map((education: any) => ({ education: education?.value }));
      const jobLocality = jobDetailData?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
      const jobCandidateIndustry = jobDetailData?.jobCandidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.candidateIndustry?.value } }));
      const updatePostId = postId ? Number(postId) : null;
      dispatch(postResponseDraft({
        totalExpYearStart: jobDetailData?.totalExpYearStart?.value,
        totalExpYearEnd: jobDetailData?.totalExpYearEnd?.value,
        jobsKeySkills: keySkills,
        jobStatus: jobDetailData?.jobStatus?.value,
        jobExpiry: jobDetailData?.jobExpiry?.value,
        isDraft: buttonClick === 'Save' ? false : true,
        jobLocality: jobLocality,
        jobEducation: jobEducation,
        companyType: jobDetailData?.companyType?.value,
        premiumBTech: jobDetailData?.premiumBTech,
        premiumMBAAll: jobDetailData?.premiumMBAAll,
        jobCandidateIndustry: jobCandidateIndustry,
        diversityHiring: jobDetailData?.diversityHiring,
        id: updatePostId,
        title: jobDetailData?.title,
        payScaleLowerRange: jobDetailData?.payScaleLowerRange?.value,
        jobsOpening: Number(jobDetailData?.jobsOpening),
        userType: userType,
        payScaleUpperRange: jobDetailData?.payScaleUpperRange?.value,
        jobDescription: jobDetailData?.jobDescription,
        numberSystem: jobDetailData?.numberSystem?.value,
        recurrence: jobDetailData?.recurrence?.value,
        jobsLocation: jobLocation,
        jobsType: jobDetailData?.jobsType?.value,
        jobsRole: jobDetailData?.jobsRole?.value,
        department: jobDetailData?.department?.value,
        roleCategory: jobDetailData?.roleCategory?.value,
        user: userId,
        employmentType: jobDetailData?.employmentType?.value,
        workMode: jobDetailData?.workMode?.value,
        candidateRelocate: jobDetailData?.candidateRelocate,
        currency: jobDetailData?.currency?.value,
        keyResponsibility: jobDetailData?.keyResponsibility,
        company: jobDetailData.company?.value,
        hideCompanyRating: jobDetailData?.hideCompanyRating,
        companyWebsite: jobDetailData?.companyWebsite,
        aboutCompany: jobDetailData?.aboutCompany,
        companyAddress: jobDetailData?.companyAddress,
        hideSalaryDetails: jobDetailData?.hideSalaryDetails,
        videoProfile: jobDetailData?.videoProfile,
        includeWalkInDetails: jobDetailData?.includeWalkInDetails,
        notifyMeAbout: jobDetailData?.notifyMeAbout,
        notificationEmailAddress1: jobDetailData?.notificationEmailAddress1,
        notificationEmailAddress2: jobDetailData?.notificationEmailAddress2,
        questionnaire: selectedJobQuestionnaire,
      })).then(() => {
        toast.success(successMessage)
      });
    }
  }

  useEffect(() => {
    if (Number(postId)) {
      setPostBack({ postURL: `/postJob/preview/${postId}`, backURL: `/postJob/recruiter/${postId}`, DiscardURL: `/postJob/jobDetails` });
      setJobTitle(jobDetail?.title);
      setSectionURL({ jobDetailsURL: `/postJob/jobDetails/${postId}`, requirementsURL: `/postJob/requirements/${postId}`, companyURL: `/postJob/company/${postId}`, recruiterURL: `/postJob/recruiter/${postId}`, responseURL: `/postJob/response/${postId}`, questionnaireURL: `/postJob/questionnaire/${postId}`, previewURL: `/postJob/preview/${postId}` })
    } else {
      setJobTitle(jobDetailData?.title);
      setPostBack({ postURL: '/postJob/preview', backURL: '/postJob/recruiter', DiscardURL: `/postJob/jobDetails` })
    }
  }, []);

  useEffect(() => {
    if (postId) {
      dispatch(getJobDetail(postId));
    }
    dispatch(getEmployerCompanyList({ data: { user: { id: userId } } }));
  }, [dispatch]);

  useEffect(() => {
    if (jobDetailSuccess)
      dispatch(clearGetJobDetailSlice());

  }, [dispatch, jobDetailSuccess]);

  useEffect(() => {
    setUserType(Cookies.get('userType'));
    setUserId(Cookies.get('userId'));
  }, [Cookies])

  const returnBack = (returnURL: string) => {
    navigate(returnURL);
  }
  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-[#F8FAFC] font-sans px-32 py-10">
        <div className="grid grid-cols-9 gap-4">
          <div className="col-start-1 col-end-4">
            <JobLeftPanel jobTitle={jobTitle} status={jobDetail?.jobStatus} />
          </div>
          <div className="col-start-4 col-end-11">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full h-auto flex-col justify-start  gap-10 inline-flex">
                <div className="h-auto flex-col justify-start  gap-7 flex">
                  <div className="self-stretch  p-7 bg-white rounded-xl border border-indigo-100 flex-col justify-start  gap-7 flex">
                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                      <div className="grow shrink basis-0 text-black text-2xl font-bold leading-[28.80px] tracking-tight">{jobDetailData?.title}</div>
                      <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
                        {!Number.isNaN(Number(postId)) && <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => returnBack(sectionURL.jobDetailsURL)}>Edit</div>}

                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-[52px] flex-col justify-start  gap-7 flex">
                      <div className="self-stretch justify-start  gap-7 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Department</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.department?.label}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Role</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.jobsRole?.label}</div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[52px] flex-col justify-start  gap-7 flex">
                      <div className="self-stretch justify-start  gap-7 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Job Type</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.jobsType?.label}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Role Category</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.roleCategory?.label}</div>
                        </div>
                      </div>
                    </div>

                    <div className="self-stretch h-[52px] flex-col justify-start  gap-7 flex">
                      <div className="self-stretch justify-start  gap-7 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Job Expiry</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.jobExpiry?.label}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Job Status</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.jobStatus?.label}</div>
                        </div>
                      </div>
                    </div>


                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch justify-start items-center gap-5 inline-flex">
                      <div className="justify-start items-center gap-3 flex">
                        <div className="w-full px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
                          <div className="text-green-600 text-sm font-normal leading-[16.80px] tracking-tight">{jobDetailData?.employmentType?.label}</div>
                        </div>
                        <div className="w-full px-3 py-2 bg-orange-50 rounded justify-center items-center gap-2.5 flex">
                          <div className="text-orange-600 text-sm font-normal leading-[16.80px] tracking-tight">{jobDetailData?.workMode?.label}</div>
                        </div>
                      </div>
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"></div>
                        <div className="text-slate-700 text-base font-normal leading-snug tracking-tight">
                          {jobDetailData?.jobsLocation?.map((item: any) => <div>{item?.label}, India</div>)}
                        </div>
                      </div>
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"></div>
                        <div className="text-slate-700 text-base font-normal leading-snug tracking-tight">{jobDetailData?.currency?.label}({jobDetailData?.payScaleLowerRange?.label}-{jobDetailData?.payScaleUpperRange?.label}) {jobDetailData?.numberSystem?.label} {jobDetailData?.recurrence?.label}</div>
                      </div>
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 flex-col justify-center items-center inline-flex"></div>
                        <div className="text-slate-700 text-base font-normal leading-snug tracking-tight">{jobDetailData?.jobsOpening} vacancies</div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Job Include candidates willing to relocate to Job locations(s) - <span className='text-black'>{jobDetailData?.candidateRelocate && 'Yes'}
                        {!jobDetailData?.candidateRelocate && 'No'}</span></div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Job Description</div>
                      <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight" dangerouslySetInnerHTML={{ __html: jobDetailData?.jobDescription?.replace(/\n/g, "<br />") }}></div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Key Responsibility</div>
                      <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight" dangerouslySetInnerHTML={{ __html: jobDetailData?.keyResponsibility?.replace(/\n/g, "<br />") }}></div>
                    </div>
                  </div>

                  <div className="self-stretch h-auto p-7 bg-white rounded-xl border border-indigo-100 flex-col justify-start  gap-7 flex">
                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                      <div className="grow shrink basis-0 text-black text-2xl font-bold leading-[28.80px] tracking-tight">Requirements</div>
                      <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
                        {!Number.isNaN(Number(postId)) && <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => returnBack(sectionURL.recruiterURL)}>Edit</div>}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="grow shrink text-slate-500 text-base font-normal leading-snug tracking-tight">Skills</div>
                      <div className="self-stretch justify-start  gap-3 inline-flex">
                        {jobDetailData?.jobsKeySkills?.map((item: any) => <div className="w-[20%] px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                          <div className="text-black text-base font-normal leading-snug tracking-tight">{item?.keySkills?.label}</div>
                        </div>)}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-[70px] flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Education</div>
                      <div className="self-stretch justify-start  gap-3 inline-flex">
                        {jobDetailData?.jobEducation?.map((item: any) =>
                          <div className="w-[20%] px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                            <div className="text-black text-base font-normal leading-snug tracking-tight">{item?.label}</div>
                          </div>)}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-7 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Candidate must have all the above specializations in undergraduate, postgraduate and doctorate
                      </div>
                      <div className="self-stretch justify-start  gap-7 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight"> Premium BTech (All)</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                            {jobDetailData?.premiumBTech && 'Yes'}
                            {!jobDetailData?.premiumBTech && 'No'}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight"> Premium MBA (All)</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                            {jobDetailData?.premiumMBAAll && 'Yes'}
                            {!jobDetailData?.premiumMBAAll && 'No'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-7 flex">
                      <div className="self-stretch justify-start  gap-7 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Diversity Hiring(Hire women candidates for this role)</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                            {jobDetailData?.diversityHiring && 'Yes'}
                            {!jobDetailData?.diversityHiring && 'No'}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Experience</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.totalExpYearStart?.label} - {jobDetailData?.totalExpYearEnd?.label}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Company Type</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.companyType?.label}</div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="grow shrink text-slate-500 text-base font-normal leading-snug tracking-tight">Candidate Industry</div>
                      <div className="self-stretch justify-start  gap-3 inline-flex">
                        {jobDetailData?.jobCandidateIndustry?.map((item: any) => <div className="w-[25%] px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                          <div className="text-black text-base font-normal leading-snug tracking-tight">{item?.candidateIndustry?.label}</div>
                        </div>)}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="grow shrink text-slate-500 text-base font-normal leading-snug tracking-tight">Locality</div>
                      <div className="self-stretch justify-start  gap-3 inline-flex">
                        {jobDetailData?.jobLocality?.map((item: any) => <div className="w-[20%] px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                          <div className="text-black text-base font-normal leading-snug tracking-tight">{item?.label}</div>
                        </div>)}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-auto p-7 bg-white rounded-xl border border-indigo-100 flex-col justify-start  gap-7 flex">
                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                      <img className="w-[60px] h-[60px] rounded-lg" src={companyDetails[0]?.companyImage ? `${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${companyDetails[0]?.companyImage}`.replace(/"/g, '') : `${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`} />
                      <div className="grow shrink basis-0 flex-col justify-start  gap-1 inline-flex">
                        <div className="self-stretch text-slate-900 text-2xl font-bold leading-[28.80px] tracking-tight">{jobDetailData?.company?.label}</div>
                        <div className="w-[168px] justify-start items-center gap-2 inline-flex">
                          <div className="justify-start items-center gap-1 flex">
                            <div className="w-6 h-6 justify-center items-center flex"></div>
                            <div className="text-black text-sm font-normal leading-[16.80px] tracking-tight">{companyDetails[0]?.rating}</div>
                          </div>
                          <div className="grow shrink basis-0 self-stretch origin-top-left"></div>
                          <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">{companyDetails[0]?.reviews} Reviews</div>
                        </div>
                      </div>
                      <div className="border-b border-slate-600 justify-start items-center gap-2.5 inline-flex">
                        {!Number.isNaN(Number(postId)) && <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => returnBack(sectionURL.companyURL)}>Edit</div>}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="justify-start  gap-5 inline-flex">
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"></div>
                        <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{companyDetails[0]?.employeeCount} employees</div>
                      </div>
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"></div>
                        <div className="text-indigo-600 text-base font-medium leading-snug tracking-tight">{jobDetailData?.companyWebsite}</div>
                      </div>
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"></div>
                        <div className="text-slate-600 text-base font-medium leading-snug tracking-tight">Hide company rating
                          - {jobDetailData?.hideCompanyRating && 'Yes'}
                          {!jobDetailData?.hideCompanyRating && 'No'}</div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Company Details</div>
                      <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{wrap(jobDetailData?.aboutCompany, { width: 110, cut: true })}</div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Company Address</div>
                      <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{wrap(jobDetailData?.companyAddress, { width: 110, cut: true })}</div>
                    </div>
                  </div>
                  <div className="self-stretch h-auto p-7 bg-white rounded-xl border border-indigo-100 flex-col justify-start  gap-7 flex">
                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                      <img className="w-[60px] h-[60px] rounded-[56px]" src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} />
                      <div className="grow shrink basis-0 flex-col justify-start  gap-1 inline-flex">
                        <div className="self-stretch text-slate-900 text-2xl font-bold leading-[28.80px] tracking-tight">{companyDetails?.[0]?.user?.[0]?.name}</div>
                        <div className="self-stretch justify-start items-center gap-5 inline-flex">
                          <div className="text-black text-base font-normal leading-snug tracking-tight">HR Recruiter</div>
                          <div className="justify-start items-center gap-1 flex">
                            <div className="w-6 h-6 justify-center items-center flex"></div>
                            <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{companyDetails?.[0]?.user?.[0]?.email}</div>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-slate-600 justify-start items-center gap-2.5 inline-flex">
                        {!Number.isNaN(Number(postId)) && <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => returnBack(sectionURL.responseURL)}>Edit</div>}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Responders</div>
                      <div className="self-stretch h-auto flex-col justify-start  gap-5 flex">
                        <div className="self-stretch justify-start  gap-5 inline-flex">
                          <div className="grow shrink basis-0 h-10 justify-start items-center gap-5 flex">
                            <div className="grow shrink basis-0 h-10 justify-start items-center gap-2 flex">
                              <div className="w-10 h-10 bg-green-600 rounded-[60px] justify-center items-center flex">
                                <div className="text-white text-xl font-medium leading-normal tracking-tight">{getFirstLetterOfEmail(jobDetailData?.notificationEmailAddress1)}</div>
                                <div className="text-white text-xl font-medium leading-normal tracking-tight">{getFirstLetterOfName(jobDetailData?.notificationEmailAddress1)}</div>
                              </div>
                              <div className="grow shrink basis-0 flex-col justify-center  inline-flex">
                                <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">{jobDetailData?.notificationEmailAddress1}</div>
                              </div>
                            </div>
                          </div>
                          <div className="grow shrink basis-0 h-10 justify-start items-center gap-5 flex">
                            <div className="grow shrink basis-0 h-10 justify-start items-center gap-2 flex">
                              <div className="w-10 h-10 bg-slate-900 rounded-[60px] justify-center items-center flex">
                                <div className="text-white text-xl font-medium leading-normal tracking-tight">{getFirstLetterOfEmail(jobDetailData?.notificationEmailAddress1)}</div>
                                <div className="text-white text-xl font-medium leading-normal tracking-tight">{getFirstLetterOfName(jobDetailData?.notificationEmailAddress1)}</div>
                              </div>
                              <div className="grow shrink basis-0 flex-col justify-center  inline-flex">
                                <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">{jobDetailData?.notificationEmailAddress2}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="justify-start  gap-5 inline-flex">
                      <div className="w-full self-stretch h-auto flex-col justify-start  gap-2 flex">
                        <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Hide salary details from candidates</div>
                        <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                          {jobDetailData?.hideSalaryDetails && 'Yes'}
                          {!jobDetailData?.hideSalaryDetails && 'No'}
                        </div>
                      </div>
                      <div className="w-full self-stretch h-auto flex-col justify-start  gap-2 flex">
                        <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Request candidate for video profile</div>
                        <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                          {jobDetailData?.videoProfile && 'Yes'}
                          {!jobDetailData?.videoProfile && 'No'}
                        </div>
                      </div>
                    </div>
                    <div className="w-full justify-start  gap-5 inline-flex">

                      <div className="w-full self-stretch h-auto flex-col justify-start  gap-2 flex">
                        <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Include walk-in details</div>
                        <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                          {jobDetailData?.includeWalkInDetails && 'Yes'}
                          {!jobDetailData?.includeWalkInDetails && 'No'}
                        </div>
                      </div>
                      <div className="w-full self-stretch h-auto flex-col justify-start  gap-2 flex">
                        <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Notify me about</div>
                        <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                          {jobDetailData?.notifyMeAbout && 'Yes'}
                          {!jobDetailData?.notifyMeAbout && 'No'}
                        </div>
                      </div>
                    </div>
                  </div>
                  {<div className="w-full h-auto p-7 bg-white rounded-xl border border-indigo-100 flex-col justify-start items-start gap-7 inline-flex">
                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                      <div className="grow shrink basis-0 text-black text-2xl font-bold leading-[28.80px] tracking-tight">Questionnaire</div>
                      <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
                        {!Number.isNaN(Number(postId)) && <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => returnBack(sectionURL.questionnaireURL)}>Edit</div>}
                      </div>
                    </div>
                    {jobDetailData?.questionnaire?.map(((itemQuestionnaire: any, indexQuestionnaire: any) => <div key={indexQuestionnaire}>
                      {itemQuestionnaire.questionType?.value === 'Descriptive' &&
                        <><div className="self-stretch h-[84px] flex-col justify-start items-start gap-2 flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Question {indexQuestionnaire + 1}</div>
                          <div className="self-stretch h-[54px] flex-col justify-center items-start gap-2 flex">
                            <div className="self-stretch justify-start items-center gap-2 inline-flex">
                              <div className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight">{itemQuestionnaire?.question}</div>
                            </div>
                            <div className="w-full self-stretch justify-start items-center gap-2 inline-flex">
                              <div className="text-black text-base font-normal leading-snug tracking-tight">Character limit : {itemQuestionnaire?.characterLimit}</div>
                              <div className="text-black text-base font-normal ">Required check :  {itemQuestionnaire?.requiredCheck ? 'Yes' : 'No'}</div>
                            </div>
                          </div>
                        </div></>}
                      {itemQuestionnaire.questionType?.value === 'NumberChoice' &&
                        <><div className="self-stretch h-[84px] flex-col justify-start items-start gap-2 flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Question {indexQuestionnaire + 1}</div>
                          <div className="self-stretch h-[54px] flex-col justify-center items-start gap-2 flex">
                            <div className="self-stretch justify-start items-center gap-2 inline-flex">
                              <div className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight">{itemQuestionnaire?.question}</div>
                            </div>
                            <div className="flex justify-start items-center gap-2 ">
                              <div className=" text-black text-base font-normal leading-snug tracking-tight">Range max: {itemQuestionnaire?.rangeMax}</div>
                              <div className=" text-black text-base font-normal leading-snug tracking-tight">Required check :  {itemQuestionnaire?.requiredCheck ? 'Yes' : 'No'}</div>
                            </div>
                          </div>
                        </div></>
                      }

                      {itemQuestionnaire.questionType?.value === 'SingleChoice' &&
                        <>   <div className="self-stretch h-[84px] flex-col justify-start items-start gap-2 flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Question {indexQuestionnaire + 1}</div>
                          <div className="self-stretch h-[54px] flex-col justify-center items-start gap-2 flex">
                            <div className="self-stretch justify-start items-center gap-2 inline-flex">
                              <div className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight">{itemQuestionnaire?.question}</div>
                            </div>
                            <div className="self-stretch justify-start items-center gap-2 inline-flex">
                              {itemQuestionnaire?.singleSelection?.map(((itemSingleSelection: any, indexSingleSelection: any) => itemSingleSelection?.option && <>
                                <div className="w-6 h-6 justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}smallCircle.svg`} alt='smallCircle' /></div>
                                <div key={`${indexQuestionnaire}${indexSingleSelection}`} className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight">{itemSingleSelection?.option}</div></>
                              ))}
                            </div>
                          </div>
                        </div></>
                      }

                      {itemQuestionnaire.questionType?.value === 'MultipleChoice' &&
                        <> <div className="self-stretch h-auto flex-col justify-start items-start gap-2 flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Question {indexQuestionnaire + 1}</div>
                          <div className="self-stretch h-auto flex-col justify-center items-start gap-2 flex">
                            <div className="self-stretch justify-start items-center gap-2 inline-flex">

                              <div className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight">{itemQuestionnaire?.question}</div>
                            </div>
                            <div className="self-stretch justify-start items-center gap-2 inline-flex">
                              <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                                {itemQuestionnaire?.multipleSelection?.map(((itemMultipleSelection: any, indexMultipleSelection: any) =>
                                  itemMultipleSelection?.option && <>
                                    <div className="w-6 h-6 relative"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}checkbox.svg`} alt='checkbox' /></div>
                                    <div key={`${indexQuestionnaire}${indexMultipleSelection}`} className="grow shrink basis-0 text-black text-base font-normal leading-snug tracking-tight">{itemMultipleSelection?.option}</div>
                                  </>
                                ))}

                              </div>
                            </div>

                          </div>
                        </div></>
                      }
                    </div>
                    ))}
                  </div>}


                </div>
                <div className="w-full justify-start  gap-5 inline-flex">

                  {isNaN(Number(postId)) && <button name='Discard' className="text-indigo-900 font-medium leading-normal tracking-tight grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.DiscardURL)}>Discard</button>}

                  {isNaN(Number(postId)) &&
                    <button name='SaveAsDraft' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex " onClick={() => setButtonClick('Draft')}>Save as Draft</button>
                  }
                  {!isNaN(Number(postId)) &&
                    <button type="submit" name='Continue' className="text-white font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex"
                      onClick={() => setButtonClick('Save')}>Save Job</button>
                  }
                  {isNaN(Number(postId)) && <button type="submit" name='Continue' className="text-white font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex"
                    onClick={() => setButtonClick('Continue')}>Post a Job</button>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default Preview