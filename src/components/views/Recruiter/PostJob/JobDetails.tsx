import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IFormInputsJobDetail, IFormInputsJobDetailDraft, IFormInputsJobDetailSave, IFormInputsPostAJob } from '../../../../interface/employer';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import { formData, postJobDetailDraft, postJobDetailSave } from '../../../../store/reducers/jobs/postJobs';
import { getCurrencyList, getDepartmentList, getEmployeeTypeList, getJobExpiryList, getJobRoleList, getJobStatusList, getJobTypeList, getLocationList, getNumberSystemList, getRecurrenceList, getRoleCategoryList, getSalaryRangeList, getWorkModeList } from '../../../utils/utils';
import { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import { yupResolver } from '@hookform/resolvers/yup';
import { JobDetailDraftSchema, JobDetailSaveSchema, PostJobDetailSchema, PostJobSchema } from '../../../../schema/postJob';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../..';
import JobLeftPanel from './JobLeftPanel';
import { toast } from 'react-toastify';
import Toaster from '../../../commonComponents/Toaster';
import Cookies from 'js-cookie';
import { getEmployerCompanyList } from '../../../../store/reducers/companies/employerCompanyList';

const JobDetails = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [employeeType, setEmployeeType] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [roleCategory, setRoleCategory] = useState<any>([]);
  const [jobRole, setJobRole] = useState<any>([]);
  const [workMode, setWorkMode] = useState<any>([]);
  const [location, setLocation] = useState<any>([]);
  const [currency, setCurrency] = useState<any>([]);
  const [salaryRange, setSalaryRange] = useState<any>([]);
  const [numberSystem, setNumberSystem] = useState<any>([]);
  const [recurrence, setRecurrence] = useState<any>([]);
  const [jobType, setJobType] = useState<any>([]);
  const [jobExpiry, setJobExpiry] = useState<any>([]);
  const [jobStatus, setJobStatus] = useState<any>([]);
  const [postBack, setPostBack] = useState({ postURL: '' });
  const [jobTitle, setJobTitle] = useState('');
  const [buttonClick, setButtonClick] = useState('');
  const [userType, setUserType] = useState(Cookies.get('userType'));
  const [userId, setUserId] = useState(Cookies.get('userId'));
  const { companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);
  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm<IFormInputsJobDetail | IFormInputsJobDetailDraft | IFormInputsJobDetailSave>({
    resolver: yupResolver(PostJobDetailSchema || JobDetailDraftSchema || JobDetailSaveSchema),
  });
  const selectedJobsKeySkills: any = [];
  const selectedJobsLocation: any = [];
  const selectedJobLocality: any = [];
  const selectedCandidateIndustry: any = [];

  if (jobDetail !== undefined && jobDetail !== null && Object?.keys(jobDetail)?.length !== 0) {
    jobDetail?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }));
    jobDetail?.jobsLocation && jobDetail?.jobsLocation?.filter((item: any) => item && selectedJobsLocation.push({ value: item?.location?.id, label: item?.location?.title }));
    jobDetail?.jobLocality?.filter((item: any) => item && selectedJobLocality.push({ value: item?.locality?.id, label: item?.locality?.title }));
    jobDetail?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ value: item?.candidateIndustry?.id, label: item?.candidateIndustry?.title }));
  } else {
    jobDetailData?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }));
    jobDetailData?.jobsLocation && jobDetailData?.jobsLocation?.filter((item: any) => item && selectedJobsLocation.push({ label: item.label, value: item.value }));
    jobDetailData?.jobLocality?.filter((item: any) => item && selectedJobLocality.push({ value: item?.locality?.id, label: item?.locality?.title }));
    jobDetailData?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ value: item?.candidateIndustry?.id, label: item?.candidateIndustry?.title }));

  }

  useEffect(() => {
    if (jobDetail !== undefined && jobDetail !== null && Object.keys(jobDetail).length !== 0) {
      jobDetail?.title && setValue('title', jobDetail?.title);
      jobDetail?.department && setValue('department', { label: jobDetail?.department?.title, value: jobDetail?.department?.id?.toString() });
      jobDetail?.roleCategory && setValue('roleCategory', { label: jobDetail?.roleCategory?.title, value: jobDetail?.roleCategory?.id?.toString() });
      jobDetail?.jobsRole && setValue('jobsRole', { label: jobDetail?.jobsRole?.title, value: jobDetail?.jobsRole?.id?.toString() });
      jobDetail?.jobsType && setValue('jobsType', { label: jobDetail?.jobsType?.title, value: jobDetail?.jobsType?.id?.toString() });
      jobDetail?.employmentType && setValue('employmentType', { label: jobDetail?.employmentType?.title, value: jobDetail?.employmentType?.id?.toString() });
      jobDetail?.workMode && setValue('workMode', { label: jobDetail?.workMode?.title, value: jobDetail?.workMode?.id?.toString() });
      jobDetail?.jobsLocation && setValue('jobLocation', selectedJobsLocation);
      jobDetail?.candidateRelocate && setValue('candidateRelocate', jobDetail?.candidateRelocate);
      jobDetail?.currency && setValue('currency', { label: jobDetail?.currency?.title, value: jobDetail?.currency?.id?.toString() });
      jobDetail?.payScaleLowerRange && setValue('fromSalaryRange', { label: jobDetail?.payScaleLowerRange?.title, value: jobDetail?.payScaleLowerRange?.id });
      jobDetail?.payScaleUpperRange && setValue('toSalaryRange', { label: jobDetail?.payScaleUpperRange?.title, value: jobDetail?.payScaleUpperRange?.id?.toString() });
      jobDetail?.numberSystem && setValue('numberSystem', { label: jobDetail?.numberSystem?.title, value: jobDetail?.numberSystem?.id?.toString() });
      jobDetail?.recurrence && setValue('recurrence', { label: jobDetail?.recurrence?.title, value: jobDetail?.recurrence?.id?.toString() });
      jobDetail?.jobExpiry && setValue('jobExpiry', { label: jobDetail?.jobExpiry?.title, value: jobDetail?.jobExpiry?.id });
      jobDetail?.jobStatus && setValue('jobStatus', { label: jobDetail?.jobStatus?.title, value: jobDetail?.jobStatus?.id });
      jobDetail?.jobDescription && setValue('jobDescription', jobDetail?.jobDescription);
      jobDetail?.jobsOpening && setValue('jobsOpening', jobDetail?.jobsOpening);
      jobDetail?.keyResponsibility && setValue('keyResponsibility', jobDetail?.keyResponsibility);
    } else {
      jobDetailData?.title && setValue('title', jobDetailData?.title);
      jobDetailData?.department && setValue('department', jobDetailData?.department);
      jobDetailData?.roleCategory && setValue('roleCategory', jobDetailData?.roleCategory);
      jobDetailData?.jobsRole && setValue('jobsRole', jobDetailData?.jobsRole);
      jobDetailData?.jobsType && setValue('jobsType', jobDetailData?.jobsType);
      jobDetailData?.employmentType && setValue('employmentType', jobDetailData?.employmentType);
      jobDetailData?.workMode && setValue('workMode', jobDetailData?.workMode);
      jobDetailData?.jobsLocation && setValue('jobLocation', selectedJobsLocation);
      jobDetailData?.candidateRelocate && setValue('candidateRelocate', jobDetailData?.candidateRelocate);
      jobDetailData?.currency && setValue('currency', jobDetailData?.currency);
      jobDetailData?.payScaleLowerRange && setValue('fromSalaryRange', jobDetailData?.payScaleLowerRange);
      jobDetailData?.payScaleUpperRange && setValue('toSalaryRange', jobDetailData?.payScaleUpperRange);
      jobDetailData?.numberSystem && setValue('numberSystem', jobDetailData?.numberSystem);
      jobDetailData?.recurrence && setValue('recurrence', jobDetailData?.recurrence);
      jobDetailData?.jobExpiry && setValue('jobExpiry', jobDetailData?.jobExpiry);
      if (!(postId ? Number(postId) : null)) {
        setValue('jobStatus', { label: 'open', value: 1 });
      } else {
        jobDetailData?.jobStatus && setValue('jobStatus', jobDetailData?.jobStatus);
      }
      jobDetailData?.jobDescription && setValue('jobDescription', jobDetailData?.jobDescription);
      jobDetailData?.jobsOpening && setValue('jobsOpening', jobDetailData?.jobsOpening);
      jobDetailData?.keyResponsibility && setValue('keyResponsibility', jobDetailData?.keyResponsibility);
    }

  }, [setValue, jobDetail, jobDetailData]);

  useEffect(() => {
    dispatch(getEmployerCompanyList({ data: { user: { id: userId } } }));
  }, [])

  const onSubmit = (data: IFormInputsJobDetail | IFormInputsJobDetailDraft | IFormInputsJobDetailSave) => {


    const updatePostId = postId ? Number(postId) : null;

    if (buttonClick === 'Continue' && userType && userId) {
      const jobLocation = data?.jobLocation?.map((location: any) => location);
      dispatch(formData({
        id: updatePostId,
        title: data?.title,
        payScaleLowerRange: data?.fromSalaryRange,
        jobsOpening: Number(data?.jobsOpening),
        userType: userType,
        payScaleUpperRange: data?.toSalaryRange,
        jobDescription: data?.jobDescription,
        numberSystem: data?.numberSystem,
        recurrence: data?.recurrence,
        jobsLocation: jobLocation,
        jobsType: data?.jobsType,
        jobsRole: data?.jobsRole,
        department: data?.department,
        roleCategory: data?.roleCategory,
        user: userId,
        jobStatus: data?.jobStatus,
        jobExpiry: data?.jobExpiry,
        employmentType: data?.employmentType,
        workMode: data?.workMode,
        candidateRelocate: data?.candidateRelocate,
        currency: data?.currency,
        keyResponsibility: data?.keyResponsibility,
      }));
      navigate(postBack.postURL);
    }

    if (buttonClick === 'Draft' && userType && userId) {

      const jobLocation = data?.jobLocation?.map((location: any) => ({ location: { id: location?.value } }));
      let draft = true;

      dispatch(postJobDetailDraft({
        id: updatePostId,
        title: data?.title,
        payScaleLowerRange: data?.fromSalaryRange?.value,
        jobsOpening: Number(data?.jobsOpening),
        userType: userType,
        payScaleUpperRange: data?.toSalaryRange?.value,
        jobDescription: data?.jobDescription,
        numberSystem: data?.numberSystem?.value,
        recurrence: data?.recurrence?.value,
        jobsLocation: jobLocation,
        jobsType: data?.jobsType?.value,
        jobsRole: data?.jobsRole?.value,
        department: data?.department?.value,
        roleCategory: data?.roleCategory?.value,
        user: userId,
        jobStatus: data?.jobStatus?.value,
        jobExpiry: data?.jobExpiry?.value,
        isDraft: draft,
        employmentType: data?.employmentType?.value,
        workMode: data?.workMode?.value,
        candidateRelocate: data?.candidateRelocate,
        currency: data?.currency?.value,
        keyResponsibility: data?.keyResponsibility,
        jobsKeySkills: [],
        jobLocality: [],
        totalExpYearStart: null,
        totalExpYearEnd: null,
        hideSalaryDetails: false,
        companyType: companyDetails?.[0]?.id,
        jobEducation: [],
        premiumBTech: false,
        hideCompanyRating: false,
        premiumMBAAll: false,
        jobCandidateIndustry: [],
        diversityHiring: false,
        videoProfile: false,
        includeWalkInDetails: false,
        notifyMeAbout: false,
        notificationEmailAddress1: '',
        notificationEmailAddress2: '',
        company: companyDetails?.[0]?.id,
        companyWebsite: '',
        aboutCompany: '',
        companyAddress: ''
      })).then(() => {
        toast.success("Job drafted successfully !!")
      });
    }

    if (buttonClick === 'Save' && userType && userId) {
      const jobLocation = data?.jobLocation?.map((location: any) => ({ location: { id: location?.value } }));
      let draft = false;

      dispatch(postJobDetailSave({
        id: updatePostId,
        title: data?.title,
        payScaleLowerRange: data?.fromSalaryRange?.value,
        payScaleUpperRange: data?.toSalaryRange?.value,
        jobsOpening: Number(data?.jobsOpening),
        userType: userType,
        jobDescription: data?.jobDescription,
        numberSystem: data?.numberSystem?.value,
        recurrence: data?.recurrence?.value,
        jobsLocation: jobLocation,
        jobsType: data?.jobsType?.value,
        jobsRole: data?.jobsRole?.value,
        department: data?.department?.value,
        roleCategory: data?.roleCategory?.value,
        user: userId,
        jobStatus: data?.jobStatus?.value,
        jobExpiry: data?.jobExpiry?.value,
        isDraft: draft,
        employmentType: data?.employmentType?.value,
        workMode: data?.workMode?.value,
        candidateRelocate: data?.candidateRelocate,
        currency: data?.currency?.value,
        keyResponsibility: data?.keyResponsibility,

      })).then(() => {
        toast.success("Job save successfully !!")
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
      const employeeTypeList = await getEmployeeTypeList()
      if (Object.keys(employeeTypeList)?.length) {
        setEmployeeType(employeeTypeList as any)
      }

      const departmentList = await getDepartmentList()
      if (Object.keys(departmentList)?.length) {
        setDepartment(departmentList as any)
      }

      const roleCategoryList = await getRoleCategoryList()
      if (Object.keys(roleCategoryList)?.length) {
        setRoleCategory(roleCategoryList as any)
      }

      const jobRoleList = await getJobRoleList()
      if (Object.keys(jobRoleList)?.length) {
        setJobRole(jobRoleList as any)
      }

      const workModeList = await getWorkModeList()
      if (Object.keys(workModeList)?.length) {
        setWorkMode(workModeList as any)
      }

      const locationList = await getLocationList()
      if (Object.keys(locationList)?.length) {
        setLocation(locationList as any)
      }

      const currencyList = await getCurrencyList()
      if (Object.keys(currencyList)?.length) {
        setCurrency(currencyList as any)
      }

      const salaryRangeList = await getSalaryRangeList()
      if (Object.keys(salaryRangeList)?.length) {
        setSalaryRange(salaryRangeList as any)
      }

      const numberSystemList = await getNumberSystemList()
      if (Object.keys(numberSystemList)?.length) {
        setNumberSystem(numberSystemList as any)
      }

      const recurrenceList = await getRecurrenceList()
      if (Object.keys(recurrenceList)?.length) {
        setRecurrence(recurrenceList as any)
      }

      const jobTypeList = await getJobTypeList()
      if (Object.keys(jobTypeList)?.length) {
        setJobType(jobTypeList as any)
      }

      const jobExpiryList = await getJobExpiryList()
      if (Object.keys(jobExpiryList)?.length) {
        setJobExpiry(jobExpiryList as any)
      }

      const jobStatusList = await getJobStatusList()
      if (Object.keys(jobStatusList)?.length) {
        setJobStatus(jobStatusList as any)
      }

    })();

    if (Number(postId)) {
      setPostBack({ postURL: `/postJob/requirements/${postId}` });
      setJobTitle(jobDetail?.title);
    } else {
      setPostBack({ postURL: '/postJob/requirements' })
      setJobTitle(jobDetailData?.title);
    }

  }, [jobDetail]);

  useEffect(() => {
    setUserType(Cookies.get('userType'));
    setUserId(Cookies.get('userId'));
  }, [Cookies])

  const changeTitle = (value: any) => {
    setJobTitle(value);
  }
  const watchKeyResponsibility = watch('keyResponsibility')?.length;
  const watchJobDescription = watch('jobDescription')?.length;

  const filterRoleCategoryDropdownList = () => {
    const roleCategoryFilter = roleCategory?.filter(({ dapartment }: any) => (getValues()?.department?.label == dapartment));
    const roleCategoryMap = roleCategoryFilter?.map(({ id, title }: any) => ({ value: id, label: title }));
    return roleCategoryMap;
  }

  const filterJobRoleDropdownList = () => {
    const roleJobRoleFilter = jobRole?.filter(({ roleCategory }: any) => (getValues()?.roleCategory?.label == roleCategory));
    const jobRoleMap = roleJobRoleFilter?.map(({ id, title }: any) => ({ value: id, label: title }));
    return jobRoleMap;
  }

  const handleReset = () => {
    reset()
    setValue('department', { value: '', label: '' });
    setValue('roleCategory', { value: '', label: '' });
    setValue('jobsRole', { value: '', label: '' });
    setValue('jobsType', { value: '', label: '' });
    setValue('employmentType', { value: '', label: '' });
    setValue('workMode', { value: '', label: '' });
    setValue('jobLocation', []);
    setValue('candidateRelocate', false);
    setValue('currency', { value: '', label: '' });
    setValue('fromSalaryRange', { value: '', label: '' });
    setValue('toSalaryRange', { value: '', label: '' });
    setValue('numberSystem', { value: '', label: '' });
    setValue('recurrence', { value: '', label: '' });
    setValue('jobExpiry', { value: 0, label: '' });
  }

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-[#F8FAFC] font-sans px-32 py-10">
        <div className="grid grid-cols-9 gap-4">
          <div className="col-start-1 col-end-4">
            <JobLeftPanel jobTitle={jobTitle} status={jobDetail?.jobStatus} />
          </div>
          <div className="col-start-4 col-end-10">
            <div id="jobDetails" className="scroll-mt-24 scroll-smooth">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-8 grid-cols-2">
                  <div className="text-black text-xl font-medium leading-normal tracking-tight col-span-2">Job Details</div>
                  <div className="grid grid-cols-2 gap-6 col-span-2">
                    <div className="flex-col gap-2 inline-flex col-span-2">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Job Title</div>
                      <div className='w-full'>
                        <input defaultValue={''}
                          className="w-full h-[38px] border text-sm border-gray-300 hover:border-gray-400 focus:border-2 focus:border-blue-500 outline-none rounded px-2"
                          placeholder={"Job Title / Designation"}
                          {...register("title", {
                            onChange: (e) => { changeTitle(e.currentTarget.value) },
                          })} />
                        {errors?.title && <p className="font-normal text-xs text-red-500 absolute">{errors?.title?.message}</p>}
                      </div>
                    </div>
                    <div className="flex-col gap-2 inline-flex">
                      <div className="text-slate-700  text-sm font-normal leading-[16.80px] tracking-tight">Department</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          fieldName={"department"}
                          dropdownData={department?.map(({ id, title }: any) => ({ value: id, label: title }))}
                          default={watch("department")}
                          placeholder={"Select department"}
                        />
                        {errors?.department && <p className="font-normal text-xs text-red-500 absolute">{errors?.department?.label?.message}</p>}
                      </div>
                    </div>
                    {watch("department") &&
                      <div className="flex-col justify-start gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Role Category</div>
                        <div className='w-full'>
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            fieldName={"roleCategory"}
                            dropdownData={filterRoleCategoryDropdownList()}
                            default={watch("roleCategory")}
                            placeholder={"Select role category"}
                          />
                          {errors?.roleCategory && <p className="font-normal text-xs text-red-500 absolute">{errors?.roleCategory?.label?.message}</p>}
                        </div>
                      </div>
                    }
                    {watch("roleCategory") &&
                      <div className=" flex-col gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Role</div>
                        <div className='w-full'>
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            fieldName={"jobsRole"}
                            dropdownData={filterJobRoleDropdownList()}
                            default={watch("jobsRole")}
                            placeholder={"Select role"}
                          />
                          {errors?.jobsRole && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobsRole?.label?.message}</p>}

                        </div>
                      </div>
                    }
                    <div className="flex-col gap-2 inline-flex">
                      <div className="text-slate-700  text-sm font-normal leading-[16.80px] tracking-tight">Employment Type</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          fieldName={"employmentType"}
                          dropdownData={employeeType?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                          placeholder={"Select employment Type"}
                          defaultValue={watch("employmentType")}
                        />
                        {errors?.employmentType && <p className="font-normal text-xs text-red-500 absolute">{errors?.employmentType?.label?.message}</p>}
                      </div>
                    </div>
                    <div className=" flex-col gap-2 inline-flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Work Mode</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          fieldName={"workMode"}
                          dropdownData={workMode?.map(({ id, title }: any) => ({ value: id, label: title }))}
                          default={watch("workMode")}
                          placeholder={"Select Work Mode"}
                        />
                        {errors?.workMode && <p className="font-normal text-xs text-red-500 absolute">{errors?.workMode?.label?.message}</p>}

                      </div>
                    </div>
                    <div className=" flex-col  gap-2 inline-flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Job Location (max 3)</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          isMulti={true}
                          fieldName={"jobLocation"}
                          dropdownData={location?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                          placeholder={"Select job location"}
                          defaultValue={watch("jobLocation")}
                        />
                        {errors?.jobLocation && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobLocation?.message}</p>}
                      </div>
                    </div>
                    <div className=" flex-col gap-2 inline-flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Job Type</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          fieldName={"jobsType"}
                          dropdownData={jobType?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                          placeholder={"Select job type"}
                          defaultValue={watch("jobsType")}
                        />
                        {errors?.jobsType && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobsType?.label?.message}</p>}
                      </div>
                    </div>
                    <div className=" flex-col gap-2 inline-flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">No. of vacancies</div>
                      <div className='w-full'>
                        <input defaultValue={''}
                          className="w-full h-[38px] border text-sm border-gray-300 hover:border-gray-400 focus:border-2 focus:border-blue-500 outline-none rounded px-2"
                          placeholder={"Please enter jobs opening"}
                          {...register("jobsOpening")} />
                        {errors?.jobsOpening && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobsOpening?.message}</p>}
                      </div>
                    </div>
                    <div className="w-full text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight col-span-2 flex justify-start items-center">
                      <input
                        type='checkbox'
                        checked={watch("candidateRelocate")}
                        {...register("candidateRelocate")}
                        className='w-4 h-4 mr-2'
                      />
                      <label>Include candidates willing to relocate to Job locations(s)</label>
                      {errors?.candidateRelocate && <p className="font-normal text-xs text-red-500 absolute">{errors?.candidateRelocate?.message}</p>}
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="expectedSalary" className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Annual Salary Range (Enter the salary for this job)</label>
                      <div className="grid grid-cols-12 gap-2 mt-1">
                        <div className="col-span-2">
                          <AutocompleteBox
                            control={control}
                            fieldName={"currency"}
                            dropdownData={currency?.map(({ id, title }: any) => ({ value: id, label: title }))}
                            default={watch("currency")}
                            placeholder={"Currency"}
                          />
                          {errors?.currency && <p className="font-normal text-xs text-red-500 absolute">{errors?.currency?.label?.message}</p>}
                        </div>
                        <div className="col-span-2">
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            fieldName={"fromSalaryRange"}
                            dropdownData={salaryRange?.map(({ id, title }: any) => ({ value: id, label: title }))}
                            default={watch("fromSalaryRange")}
                            placeholder={"Min range"}
                          />
                          {errors?.fromSalaryRange && <div className="font-normal text-xs text-red-500 ">{errors?.fromSalaryRange?.label?.message}</div>}
                        </div>
                        <div className="col-span-2">
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            fieldName={"toSalaryRange"}
                            dropdownData={salaryRange?.map(({ id, title }: any) => ({ value: id, label: title }))}
                            default={watch("toSalaryRange")}
                            placeholder={"Max range"}
                          />
                          {errors?.toSalaryRange && <div className="font-normal text-xs text-red-500 ">{errors?.toSalaryRange?.label?.message}</div>}
                        </div>
                        <div className="col-span-3">
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            fieldName={"numberSystem"}
                            dropdownData={numberSystem?.map(({ id, title }: any) => ({ value: id, label: title }))}
                            default={watch("numberSystem")}
                            placeholder={"Number system"}
                          />
                          {errors?.numberSystem && <div className="font-normal text-xs text-red-500 ">{errors?.numberSystem?.label?.message}</div>}
                        </div>
                        <div className="col-span-3">
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            fieldName={"recurrence"}
                            dropdownData={recurrence?.map(({ id, title }: any) => ({ value: id, label: title }))}
                            default={watch("recurrence")}
                            placeholder={"Recurrence"}
                          />
                          {errors?.recurrence && <div className="font-normal text-xs text-red-500 ">{errors?.recurrence?.label?.message}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="flex-col gap-2 inline-flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Job Expiry</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          fieldName={"jobExpiry"}
                          dropdownData={jobExpiry?.map(({ id, title }: any) => ({ value: id, label: title }))}
                          default={watch("jobExpiry")}
                          placeholder={"Select job expiry"}
                        />
                        {errors?.jobExpiry && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobExpiry?.label?.message}</p>}
                      </div>
                    </div>
                    <div className=" flex-col gap-2 inline-flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Job Status</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          defaultValue={postId && { label: "Open", value: 1 }}
                          isClearable={true}
                          fieldName={"jobStatus"}
                          dropdownData={jobStatus?.map(({ id, title }: any) => ({ value: id, label: title }))}
                          default={watch("jobStatus")}
                          placeholder={"Select job status"}
                        />
                        {errors?.jobStatus && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobStatus?.label?.message}</p>}
                      </div>
                    </div>
                    <div className="w-full h-auto flex-col gap-2 flex col-span-2">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Job description</div>
                      <div className='w-full'>
                        <textarea defaultValue={''}
                          className='w-full border text-sm border-gray-200 h-[75px] focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                          placeholder={"Please enter job description"}
                          maxLength={1000}
                          {...register("jobDescription")}>
                        </textarea>
                        {errors?.jobDescription && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobDescription?.message}</p>}
                        <div className="w-full text-xs font-light text-gray-600 text-right float-right">
                          {watchJobDescription ? 1000 - watchJobDescription : 1000} character(s) left
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-auto flex-col gap-2 flex col-span-2">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Key Responsibility</div>
                      <div className='w-full'>
                        <textarea defaultValue={''}
                          maxLength={1000}
                          className='w-full border text-sm border-gray-200 h-[75px] focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                          placeholder={"Please enter job description"}
                          {...register("keyResponsibility")} >
                        </textarea>
                        {errors?.keyResponsibility && <p className="font-normal text-xs text-red-500 absolute">{errors?.keyResponsibility?.message}</p>}
                        <div className="w-full text-xs font-light text-gray-600 text-right">
                          {watchKeyResponsibility ? 1000 - watchKeyResponsibility : 1000} character(s) left
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full self-stretch justify-start  gap-5 inline-flex col-span-2">
                    <button type='button' name='Cancel' className="text-indigo-900 font-medium leading-normal tracking-tight grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => handleReset()}>Cancel</button>
                    {!isNaN(Number(postId)) &&
                      <button name='Save' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex" onClick={() => setButtonClick('Save')}>Save</button>
                    }
                    {isNaN(Number(postId)) &&
                      <button name='SaveAsDraft' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex " onClick={() => setButtonClick('Draft')}>Save as Draft</button>
                    }
                    <button type="submit" name='Continue' className="text-white font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex" onClick={() => setButtonClick('Continue')}>Continue</button>
                  </div>
                </div>
              </form >
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default JobDetails