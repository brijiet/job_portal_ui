import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import JobLeftPanel from './JobLeftPanel'
import { IFormInputsRequirement, IFormInputsRequirementDraft, IFormInputsRequirementSave } from '../../../../interface/employer';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import { getHighestQualificationList, getIndustryList, getKeySkillsList, getLocalityList, getTotalYearsExpList, getCompanyTypeList } from '../../../utils/utils';
import { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { formData, postRequirementDraft, postRequirementSave } from '../../../../store/reducers/jobs/postJobs';
import { RequirementDraftSchema, RequirementSaveSchema, RequirementSchema } from '../../../../schema/postJob';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Toaster from '../../../commonComponents/Toaster';
import Cookies from 'js-cookie';
import { getEmployerCompanyList } from '../../../../store/reducers/companies/employerCompanyList';

const Requirements = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [keySkills, setKeySkills] = useState<any>([]);
  const [locality, setLocality] = useState<any>([]);
  const [totalExpYear, setTotalExpYear] = useState<any>([]);
  const [industry, setIndustry] = useState<any>([]);
  const [companyType, setCompanyType] = useState<any>([]);
  const [highestQualification, setHighestQualification] = useState<any>([]);
  const [postBack, setPostBack] = useState({ postURL: '', backURL: '' });
  const [jobTitle, setJobTitle] = useState('');
  const [buttonClick, setButtonClick] = useState('');
  const [locationList, setLocationList] = useState('');
  const [userType, setUserType] = useState(Cookies.get('userType'));
  const [userId, setUserId] = useState(Cookies.get('userId'));
  const { companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);

  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);

  useEffect(() => {
    dispatch(getEmployerCompanyList({ data: { user: { id: userId } } }));
  }, [])

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsRequirement | IFormInputsRequirementDraft | IFormInputsRequirementSave>({
    resolver: yupResolver(RequirementSchema || RequirementDraftSchema || RequirementSaveSchema),
  });

  const selectedJobsKeySkills: any = [];
  const selectedJobLocality: any = [];
  const selectedCandidateIndustry: any = [];
  const selectedJobEducation: any = [];

  if (Object.keys(jobDetail).length !== 0) {
    jobDetail?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }));
    jobDetail?.jobEducation?.filter((item: any) => item && selectedJobEducation.push({ value: item?.education?.id, label: item?.education?.title }));
    jobDetail?.jobLocality?.filter((item: any) => item && selectedJobLocality.push({ value: item?.locality?.id, label: item?.locality?.title }));
    jobDetail?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ value: item?.candidateIndustry?.id, label: item?.candidateIndustry?.title }));
  } else {
    jobDetailData?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push(item?.keySkills));
    jobDetailData?.jobEducation?.filter((item: any) => item && selectedJobEducation.push(item));
    jobDetailData?.jobLocality && jobDetailData?.jobLocality?.filter((item: any) => item && selectedJobLocality.push(item));
    jobDetailData?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ label: item?.candidateIndustry?.label, value: item?.candidateIndustry?.value }));
  }

  useEffect(() => {
    if (Object.keys(jobDetail).length !== 0) {
      jobDetail?.jobsKeySkills && setValue('keySkills', selectedJobsKeySkills);
      jobDetail?.jobEducation && setValue('education', selectedJobEducation);
      jobDetail?.jobLocality && setValue('jobLocality', selectedJobLocality);
      jobDetail?.totalExpYearStart && setValue('fromWorkExperience', { label: jobDetail?.totalExpYearStart?.title, value: jobDetail?.totalExpYearStart?.id?.toString() });
      jobDetail?.totalExpYearEnd && setValue('toWorkExperience', { label: jobDetail?.totalExpYearEnd?.title, value: jobDetail?.totalExpYearEnd?.id?.toString() });
      jobDetail?.companyType && setValue('companyType', { label: jobDetail?.companyType?.title, value: jobDetail?.companyType?.id?.toString() });
      jobDetail?.premiumBTech && setValue('premiumBTech', jobDetail?.premiumBTech);
      jobDetail?.premiumMBAAll && setValue('premiumMBAAll', jobDetail?.premiumMBAAll);
      jobDetail?.jobCandidateIndustry && setValue('candidateIndustry', selectedCandidateIndustry);
      jobDetail?.diversityHiring && setValue('diversityHiring', jobDetail?.diversityHiring);
    } else {
      jobDetailData?.jobsKeySkills && setValue('keySkills', selectedJobsKeySkills);
      jobDetailData?.jobEducation && setValue('education', selectedJobEducation);
      jobDetailData?.jobLocality && setValue('jobLocality', selectedJobLocality);
      jobDetailData?.totalExpYearStart && setValue('fromWorkExperience', jobDetailData?.totalExpYearStart);
      jobDetailData?.totalExpYearEnd && setValue('toWorkExperience', jobDetailData?.totalExpYearEnd);
      jobDetailData?.companyType && setValue('companyType', jobDetailData?.companyType);
      jobDetailData?.premiumBTech && setValue('premiumBTech', jobDetailData?.premiumBTech);
      jobDetailData?.premiumMBAAll && setValue('premiumMBAAll', jobDetailData?.premiumMBAAll);
      jobDetailData?.jobCandidateIndustry && setValue('candidateIndustry', selectedCandidateIndustry);
      jobDetailData?.diversityHiring && setValue('diversityHiring', jobDetailData?.diversityHiring);
    }
  }, [setValue, jobDetail, jobDetailData]);
  const onSubmit = (data: IFormInputsRequirement | IFormInputsRequirementDraft | IFormInputsRequirementSave) => {


    if (buttonClick === 'Continue') {
      const keySkills = data?.keySkills?.map((skills: any) => ({ preferred: true, keySkills: skills }));
      const jobEducation = data?.education?.map((education: any) => education);
      const jobLocality = data?.jobLocality?.map((local: any) => local);
      const jobLocation = jobDetailData?.jobLocation?.map((location: any) => location);
      const jobCandidateIndustry = data?.candidateIndustry?.map((industry: any) => ({ candidateIndustry: industry }));
      dispatch(formData({
        totalExpYearStart: data?.fromWorkExperience,
        totalExpYearEnd: data?.toWorkExperience,
        jobsKeySkills: keySkills,
        status: true,
        jobLocality: jobLocality,
        jobEducation: jobEducation,
        companyType: data?.companyType,
        premiumBTech: data?.premiumBTech,
        premiumMBAAll: data?.premiumMBAAll,
        jobCandidateIndustry: jobCandidateIndustry,
        diversityHiring: data?.diversityHiring,
      }));
      navigate(postBack.postURL);
    }
    if (buttonClick === 'Draft' && userType && userId) {
      let draft = true;

      const jobEducation = data?.education?.map((education: any) => ({ education: education?.value }));
      const jobLocality = data?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
      const jobLocation = jobDetailData?.jobLocation?.map((location: any) => ({ location: { id: location?.value } }));
      const jobCandidateIndustry = data?.candidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.value } }));
      const keySkills = data?.keySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.value } }));
      const updatePostId = postId ? Number(postId) : null;
      dispatch(postRequirementDraft({
        totalExpYearStart: data?.fromWorkExperience?.value,
        totalExpYearEnd: data?.toWorkExperience?.value,
        jobsKeySkills: keySkills,
        jobStatus: jobDetailData?.jobStatus?.value,
        jobExpiry: jobDetailData?.jobExpiry?.value,
        jobLocality: jobLocality,
        jobEducation: jobEducation,
        companyType: data?.companyType?.value,
        premiumBTech: data?.premiumBTech,
        premiumMBAAll: data?.premiumMBAAll,
        jobCandidateIndustry: jobCandidateIndustry,
        diversityHiring: data?.diversityHiring,
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
        hideSalaryDetails: false,
        hideCompanyRating: false,
        isDraft: draft,
        videoProfile: false,
        includeWalkInDetails: false,
        notifyMeAbout: false,
        notificationEmailAddress1: '',
        notificationEmailAddress2: '',
        company: companyDetails?.[0]?.id,
        companyWebsite: '',
        aboutCompany: '',
        companyAddress: '',
      })).then(() => {
        toast.success("Job drafted successfully !!")
      });
    }

    if (buttonClick === 'Save' && userType && userId) {
      let draft = false;

      const jobEducation = data?.education?.map((education: any) => ({ education: education?.value }));
      const jobLocality = data?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
      const jobLocation = jobDetailData?.jobLocation?.map((location: any) => ({ location: { id: location?.value } }));
      const jobCandidateIndustry = data?.candidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.value } }));
      const keySkills = data?.keySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.value } }));
      const updatePostId = postId ? Number(postId) : null;
      dispatch(postRequirementSave({
        totalExpYearStart: data?.fromWorkExperience?.value,
        totalExpYearEnd: data?.toWorkExperience?.value,
        jobsKeySkills: keySkills,
        jobStatus: jobDetailData?.jobStatus?.value,
        jobExpiry: jobDetailData?.jobExpiry?.value,
        jobLocality: jobLocality,
        jobEducation: jobEducation,
        companyType: companyDetails?.[0]?.id,
        premiumBTech: data?.premiumBTech,
        premiumMBAAll: data?.premiumMBAAll,
        jobCandidateIndustry: jobCandidateIndustry,
        diversityHiring: data?.diversityHiring,
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
        isDraft: draft,
      })).then(() => {
        toast.success("Job saved successfully !!")
      });
    }
  }

  useEffect(() => {
    if (Number(postId)) {
      dispatch(getJobDetail(postId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (jobDetailSuccess)
      dispatch(clearGetJobDetailSlice());
  }, [dispatch, jobDetailSuccess]);

  useEffect(() => {
    (async () => {
      if (locationList !== '') {
        const localityList = await getLocalityList(locationList)
        if (Object.keys(localityList)?.length) {
          setLocality(localityList as any)
        }
      }
    })();

  }, [locationList])
  useEffect(() => {
    (async () => {
      const keySkillsList = await getKeySkillsList()
      if (Object.keys(keySkillsList)?.length) {
        setKeySkills(keySkillsList as any)
      }
      const totalExpYearList = await getTotalYearsExpList()
      if (Object.keys(totalExpYearList)?.length) {
        setTotalExpYear(totalExpYearList as any)
      }

      const industryList = await getIndustryList()
      if (Object.keys(industryList)?.length) {
        setIndustry(industryList as any)
      }

      const companyTypeList = await getCompanyTypeList()
      if (Object.keys(companyTypeList)?.length) {
        setCompanyType(companyTypeList as any)
      }

      const highestQualificationList = await getHighestQualificationList()
      if (Object.keys(highestQualificationList)?.length) {
        setHighestQualification(highestQualificationList as any)
      }

    })();

    if (Number(postId)) {
      setPostBack({ postURL: `/postJob/company/${postId}`, backURL: `/postJob/jobDetails/${postId}` })
      setJobTitle(jobDetail?.title);
    } else {
      setPostBack({ postURL: '/postJob/company', backURL: '/postJob/jobDetails' })
      setJobTitle(jobDetailData?.title);
    }

  }, []);
  useEffect(() => {
    setUserType(Cookies.get('userType'));
    setUserId(Cookies.get('userId'));
  }, [Cookies])

  useEffect(() => {
    setLocationList(jobDetailData?.jobsLocation?.map((location: any) => location?.label).toString())
  }, [jobDetailData])

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
            <div id="jobDetails" className="scroll-mt-24 scroll-smooth">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full h-auto flex-col justify-start  gap-10 inline-flex">
                  <div className="text-black text-xl font-medium leading-normal tracking-tight">Requirements</div>
                  <div className="flex-col justify-start  gap-7 flex">
                    <div className="h-auto flex-col justify-start  gap-2 flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Skills</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          isMulti={true}
                          fieldName={"keySkills"}
                          dropdownData={keySkills?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                          placeholder={"Select key Skills (at least 2 skills)"}
                          defaultValue={watch("keySkills")}
                        />
                        {errors?.keySkills && <p className="font-normal text-xs text-red-500 absolute">{errors?.keySkills?.message}</p>}
                      </div>
                    </div>
                    <div className="w-full flex-col justify-start  gap-2 flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Education</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          isMulti={true}
                          fieldName={"education"}
                          dropdownData={highestQualification?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                          placeholder={"Select education (at least 2 qualification)"}
                          defaultValue={watch("education")}
                        />
                        {errors?.education && <p className="font-normal text-xs text-red-500 absolute">{errors?.education?.message}</p>}
                      </div>
                    </div>
                    <div className="w-full flex-col justify-start  gap-2 flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Candidate must have all the above specializations in undergraduate, postgraduate and doctorate</div>
                      <div className="grid grid-cols-8 gap-4 mt-1">
                        <div className="col-span-2">
                          <div className="text-slate-700 text-sm">
                            <input
                              type='checkbox'
                              checked={watch("premiumBTech")}
                              {...register("premiumBTech")}
                              className='mx-3 w-4 h-4'
                            /> Premium BTech (All)
                            {errors?.premiumBTech && <p className="font-normal text-xs text-red-500 absolute">{errors?.premiumBTech?.message}</p>}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-slate-700 text-sm">
                            <input
                              type='checkbox'
                              checked={watch("premiumMBAAll")}
                              {...register("premiumMBAAll")}
                              className='mx-3 w-4 h-4'
                            />  Premium MBA (All)
                            {errors?.premiumMBAAll && <p className="font-normal text-xs text-red-500 absolute">{errors?.premiumMBAAll?.message}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full justify-start  gap-5 inline-flex">
                      <div className="w-full flex-col justify-start  gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Min Work Experience </div>
                        <div className='w-full'>
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            fieldName={"fromWorkExperience"}
                            dropdownData={totalExpYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                            default={watch("fromWorkExperience")}
                            placeholder={"Select work experience"}
                          />
                          {errors?.fromWorkExperience && <div className="font-normal text-xs text-red-500 ">{errors?.fromWorkExperience?.label?.message}</div>}
                        </div>
                      </div>
                      <div className="w-full flex-col justify-start  gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Max Work Experience </div>
                        <div className='w-full'>
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            fieldName={"toWorkExperience"}
                            dropdownData={totalExpYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                            default={watch("toWorkExperience")}
                            placeholder={"Select work experience"}
                          />
                          {errors?.toWorkExperience && <div className="font-normal text-xs text-red-500 ">{errors?.toWorkExperience?.label?.message}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="w-full justify-start  gap-5 inline-flex">
                      <div className="w-full flex-col justify-start  gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Candidate Industry</div>
                        <div className='w-full'>
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            isMulti={true}
                            fieldName={"candidateIndustry"}
                            dropdownData={industry?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                            placeholder={"Select candidate industry (at least 2 industry)"}
                            defaultValue={watch("candidateIndustry")}
                          />
                          {errors?.candidateIndustry && <p className="font-normal text-xs text-red-500 absolute">{errors?.candidateIndustry?.message}</p>}
                        </div>
                      </div>
                      <div className="w-full text-slate-700 text-sm font-normal flex-col justify-start  gap-2 inline-flex">
                        <div className=" leading-[16.80px] tracking-tight">Diversity Hiring </div>
                        <input
                          type='checkbox'
                          checked={watch("diversityHiring")}
                          {...register("diversityHiring")}
                          className='mx-3 w-4 h-4'
                        /> Hire women candidates for this role
                        {errors?.diversityHiring && <p className="font-normal text-xs text-red-500 absolute">{errors?.diversityHiring?.message}</p>}
                      </div>
                    </div>
                    <div className="w-full justify-start  gap-5 inline-flex">
                      <div className="w-full flex-col justify-start  gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Locality </div>
                        <div className='w-full'>
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            isMulti={true}
                            fieldName={"jobLocality"}
                            dropdownData={locality?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                            placeholder={"Select localities (at least 3 locality)"}
                            defaultValue={watch("jobLocality")}
                          />
                          {errors?.jobLocality && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobLocality?.message}</p>}
                        </div>
                      </div>
                      <div className="w-full flex-col justify-start  gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Company Type </div>
                        <div className='w-full'>
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            fieldName={"companyType"}
                            dropdownData={companyType?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                            placeholder={"Select company type"}
                            defaultValue={watch("companyType")}
                          />
                          {errors?.companyType && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyType?.label?.message}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-start  gap-5 inline-flex">
                    {/* <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.backURL)}>
                      <div className="text-indigo-900 font-medium leading-normal tracking-tight">Back</div>
                    </div> */}
                    <button name='Back' className="text-indigo-900 font-medium leading-normal tracking-tight grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.backURL)}>Back</button>

                    {/* {!isNaN(Number(postId)) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                      <input className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" type="submit" name='SaveAsDraft' value={'Save'} onClick={() => setButtonClick('Save')} />
                    </div>}
                    {isNaN(Number(postId)) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                      <input className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" type="submit" name='SaveAsDraft' value={'Save as Draft'} onClick={() => setButtonClick('Draft')} />
                    </div>}
                    <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                      <input className="text-white font-medium leading-normal tracking-tight cursor-pointer" type="submit" value={'Continue'} onClick={() => setButtonClick('Continue')} />
                    </div> */}
                    {!isNaN(Number(postId)) &&
                      <button name='Save' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex" onClick={() => setButtonClick('Save')}>Save</button>
                    }

                    {isNaN(Number(postId)) &&
                      <button name='SaveAsDraft' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex " onClick={() => setButtonClick('Draft')}>Save as Draft</button>
                    }

                    <button type="submit" name='Continue' className="text-white font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex" onClick={() => setButtonClick('Continue')}>Continue</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
      <Toaster />
    </>
  )
}

export default Requirements