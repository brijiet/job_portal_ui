import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import JobLeftPanel from './JobLeftPanel'
import { IFormInputsCompany, IFormInputsCompanyDraft, IFormInputsCompanySave } from '../../../../interface/employer';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import { getCompanyList } from '../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyDraftSchema, CompanySaveSchema, CompanySchema } from '../../../../schema/postJob';
import { yupResolver } from '@hookform/resolvers/yup';
import { formData, postCompanyDraft, postCompanySave } from '../../../../store/reducers/jobs/postJobs';
import { getAllCompanies } from '../../../../store/reducers/companies/getAllCompanies';
import { clearEmployerCompanyListSlice, getEmployerCompanyList } from '../../../../store/reducers/companies/employerCompanyList';
import { toast } from 'react-toastify';
import Toaster from '../../../commonComponents/Toaster';
import Cookies from 'js-cookie';

const Company = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<any>([]);
  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const [postBack, setPostBack] = useState({ postURL: '', backURL: '' });
  const [selectedCompanyName, setSelectedCompanyName] = useState({ label: '', value: '' })
  const [jobTitle, setJobTitle] = useState('');
  const [buttonClick, setButtonClick] = useState('');
  const [userType, setUserType] = useState(Cookies.get('userType'));
  const [userId, setUserId] = useState(Cookies.get('userId'));
  const { success, allCompanies } = useAppSelector((state) => state.getAllCompanies);
  const { success: getEmployerSuccess, companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsCompany | IFormInputsCompanyDraft | IFormInputsCompanySave>({
    resolver: yupResolver(CompanySchema || CompanyDraftSchema || CompanySaveSchema)
  });

  useEffect(() => {

    if (Object.keys(jobDetail).length !== 0) {
      jobDetail?.company && setValue('companyName', { label: jobDetail?.company?.title, value: jobDetail?.company?.id?.toString() });
      jobDetail?.companyWebsite && setValue('companyWebsite', jobDetail?.companyWebsite);
      jobDetail?.aboutCompany && setValue('aboutCompany', jobDetail?.aboutCompany);
      jobDetail?.hideCompanyRating && setValue('hideCompanyRating', jobDetail?.hideCompanyRating);
      jobDetail?.companyAddress && setValue('companyAddress', jobDetail?.companyAddress);

    } else if (companyDetails.length !== 0) {
      companyDetails[0]?.title && setValue('companyName', { label: companyDetails[0]?.title, value: companyDetails[0]?.id });
      companyDetails[0]?.websiteUrl && setValue('companyWebsite', companyDetails[0]?.websiteUrl);
      companyDetails[0]?.companyDescription && setValue('aboutCompany', companyDetails[0]?.companyDescription);
      jobDetailData?.hideCompanyRating && setValue('hideCompanyRating', jobDetailData?.hideCompanyRating);
      companyDetails[0]?.companyAddress && setValue('companyAddress', companyDetails[0]?.companyAddress);

    } else {
      jobDetailData?.company && setValue('companyName', jobDetailData?.company);
      jobDetailData?.companyWebsite && setValue('companyWebsite', jobDetailData?.companyWebsite);
      jobDetailData?.aboutCompany && setValue('aboutCompany', jobDetailData?.aboutCompany);
      jobDetailData?.hideCompanyRating && setValue('hideCompanyRating', jobDetailData?.hideCompanyRating);
      jobDetailData?.companyAddress && setValue('companyAddress', jobDetailData?.companyAddress);
    }
  }, [setValue, jobDetail, jobDetailData]);

  const onSubmit = (data: IFormInputsCompany | IFormInputsCompanyDraft | IFormInputsCompanySave) => {

    const updatePostId = postId ? Number(postId) : null;

    if (buttonClick === 'Continue') {
      dispatch(formData({
        company: data.companyName,
        hideCompanyRating: data?.hideCompanyRating,
        companyWebsite: data?.companyWebsite,
        aboutCompany: data?.aboutCompany,
        companyAddress: data?.companyAddress,

      }));
      navigate(postBack?.postURL);
    }
    if (buttonClick === 'Draft' && userType && userId) {
      let draft = true;

      const jobEducation = jobDetailData?.education?.map((education: any) => ({ education: education?.value }));
      const jobLocality = jobDetailData?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
      const jobLocation = jobDetailData?.jobLocation?.map((location: any) => ({ location: { id: location?.value } }));
      const jobCandidateIndustry = jobDetailData?.candidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.value } }));
      const keySkills = jobDetailData?.keySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.value } }));

      dispatch(postCompanyDraft({
        totalExpYearStart: jobDetailData?.totalExpYearStart?.value,
        totalExpYearEnd: jobDetailData?.totalExpYearEnd?.value,
        jobsKeySkills: keySkills,
        jobStatus: jobDetailData?.jobStatus?.value,
        jobExpiry: jobDetailData?.jobExpiry?.value,
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
        hideSalaryDetails: false,
        isDraft: draft,
        videoProfile: false,
        includeWalkInDetails: false,
        notifyMeAbout: false,
        notificationEmailAddress1: '',
        notificationEmailAddress2: '',

        company: companyDetails?.[0]?.id,
        hideCompanyRating: data?.hideCompanyRating,
        companyWebsite: data?.companyWebsite,
        aboutCompany: data?.aboutCompany,
        companyAddress: data?.companyAddress,
      })).then(() => {
        toast.success("Job drafted successfully !!")
      });
    }

    if (buttonClick === 'Save' && userType && userId) {
      let draft = false;
      let jobStatus = true;


      const jobEducation = jobDetailData?.education?.map((education: any) => ({ education: education?.value }));
      const jobLocality = jobDetailData?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
      const jobLocation = jobDetailData?.jobLocation?.map((location: any) => ({ location: { id: location?.value } }));
      const jobCandidateIndustry = jobDetailData?.candidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.value } }));
      const keySkills = jobDetailData?.keySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.value } }));

      dispatch(postCompanySave({
        totalExpYearStart: jobDetailData?.totalExpYearStart?.value,
        totalExpYearEnd: jobDetailData?.totalExpYearEnd?.value,
        jobsKeySkills: keySkills,
        jobStatus: jobDetailData?.jobStatus?.value,
        jobExpiry: jobDetailData?.jobExpiry?.value,
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
        isDraft: draft,
        company: companyDetails?.[0]?.id,
        hideCompanyRating: data?.hideCompanyRating,
        companyWebsite: data?.companyWebsite,
        aboutCompany: data?.aboutCompany,
        companyAddress: data?.companyAddress,
      })).then(() => {
        toast.success("Job saved successfully !!")
      });
    }
  }

  useEffect(() => {
    if (Number(postId)) {
      dispatch(getJobDetail(postId));
    }
    if (userId) {
      const dataSend = {
        data: {
          user: {
            id: userId
          }
        }
      }
      dispatch(getEmployerCompanyList(dataSend));
    }
  }, [dispatch, userId, postId]);

  useEffect(() => {
    if (jobDetailSuccess)
      dispatch(clearGetJobDetailSlice());

    if (getEmployerSuccess) {
      dispatch(clearEmployerCompanyListSlice)
    }
  }, [dispatch, jobDetailSuccess, getEmployerSuccess]);

  useEffect(() => {
    (async () => {
      const companyList = await getCompanyList()
      if (Object.keys(companyList)?.length) {
        setCompany(companyList as any)
      }
    })();

    if (Number(postId)) {
      setPostBack({ postURL: `/postJob/recruiter/${postId}`, backURL: `/postJob/requirements/${postId}` });
      setJobTitle(jobDetail?.title);
    } else {
      setPostBack({ postURL: '/postJob/recruiter', backURL: '/postJob/requirements' })
      setJobTitle(jobDetailData?.title);
    }
  }, []);
  useEffect(() => {
    dispatch(getAllCompanies({} as any));
    if (companyDetails)
      setSelectedCompanyName({ label: companyDetails[0]?.title, value: companyDetails[0]?.id })
  }, [dispatch, companyDetails])

  useEffect(() => {
    setCompany(allCompanies as any)
  }, [success])

  useEffect(() => {
    setUserType(Cookies.get('userType'));
    setUserId(Cookies.get('userId'));
  }, [Cookies])

  const watchKeyAboutCompany = watch('aboutCompany')?.length;
  const watchCompanyAddress = watch('companyAddress')?.length;

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
                  <div className="flex-col justify-start  gap-10 flex">
                    <div className="text-black text-xl font-medium  leading-normal tracking-tight">Company</div>
                    <div className="justify-start items-center gap-2 inline-flex">
                      <div className="w-6 h-6 relative">
                        <input type="checkbox"
                          {...register("fillCompanyInformation")}
                          defaultChecked={true}
                          className=" w-4 h-4" />
                      </div>
                      <div className="text-black text-base font-normal  leading-snug tracking-tight">Fill saved company information</div>
                    </div>
                    <div className="flex-col justify-start  gap-7 flex">
                      {/* <div className="flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Company logo</div>
                        <div className="justify-start  inline-flex">
                          <div className="w-[120px] h-[120px] p-3 rounded-lg border border-indigo-300 flex-col justify-center items-center gap-2 inline-flex">
                            {<><div className="w-6 h-6 flex-col justify-center items-center flex"></div>
                              <div className="self-stretch justify-start  gap-5 inline-flex">
                                <div className="grow shrink basis-0 self-stretch justify-center items-center gap-1 flex">
                                  <div className="grow shrink basis-0 text-center text-slate-400 text-xs font-normal  leading-[14.40px] tracking-tight">Formats: .png and .jpg</div>
                                </div>
                              </div>
                            </>}
                          </div>
                        </div>
                      </div> */}
                      <div className="self-stretch justify-start  gap-5 inline-flex">
                        <div className="w-full grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Company name</div>
                          <div className='w-full'>
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"companyName"}
                              dropdownData={company?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                              placeholder={"Select company"}
                              defaultValue={selectedCompanyName}
                            />
                            {errors?.companyName && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyName?.message}</p>}
                          </div>
                        </div>
                        <div className="w-full grow shrink basis-0  flex-col justify-start  gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Website</div>
                          <div className='w-full'>
                            <input defaultValue={companyDetails[0]?.websiteUrl}
                              className='w-full border text-sm border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                              placeholder={"Please enter company website (eg http://www.google.com)"}
                              {...register("companyWebsite")} />
                            {errors?.companyWebsite && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyWebsite?.message}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-auto flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">About Company</div>
                        <div className='w-full'>
                          <textarea defaultValue={companyDetails[0]?.companyDescription}
                            maxLength={1000}
                            className='w-full h-[75px] border text-sm border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                            placeholder={"Please enter about company"}

                            {...register("aboutCompany")} ></textarea>

                          {errors?.aboutCompany && <p className="font-normal text-xs text-red-500 absolute">{errors?.aboutCompany?.message}</p>}
                        </div>
                        <div className="w-full text-xs font-light text-gray-600 text-right float-right">
                          {watchKeyAboutCompany ? 1000 - watchKeyAboutCompany : 1000} character(s) left
                        </div>
                      </div>
                      <div className="w-full h-auto flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Company Address</div>
                        <div className='w-full'>
                          <textarea defaultValue={companyDetails[0]?.companyAddress}
                            maxLength={1000}
                            className='w-full border text-sm h-[75px] border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                            placeholder={"Please enter company address"}

                            {...register("companyAddress")} ></textarea>
                          {errors?.companyAddress && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyAddress?.message}</p>}
                        </div>
                        <div className="w-full text-xs font-light text-gray-600 text-right float-right">
                          {watchCompanyAddress ? 1000 - watchCompanyAddress : 1000} character(s) left
                        </div>
                      </div>
                      <div className="flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Rating</div>
                        <div className="justify-start items-center gap-5 inline-flex">
                          <div className="w-[177px] p-3 bg-white rounded-lg justify-start items-center gap-2 flex">
                            <div className="justify-start items-center gap-1 flex">
                              <div className="w-6 h-6 justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}star.svg`} alt='star' /></div>
                              <div className="text-black text-sm font-normal  leading-[16.80px] tracking-tight">3.5</div>
                            </div>
                            <div className="w-0.5 self-stretch origin-top-left  border border-indigo-100"></div>
                            <div className="text-slate-500 text-sm font-normal  leading-[16.80px] tracking-tight">5k+ Reviews</div>
                          </div>
                          <div className="justify-start items-center gap-2 flex">
                            <div className="w-6 h-6 relative">
                              <input type="checkbox"
                                {...register("hideCompanyRating")}
                                defaultChecked={true}
                                className=" w-4 h-4" />
                              {errors?.hideCompanyRating && <p className="font-normal text-xs text-red-500 absolute">{errors?.hideCompanyRating?.message}</p>}
                            </div>
                            <div className="text-slate-400 text-sm font-normal  leading-[16.80px] tracking-tight">Hide company rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-start  gap-5 inline-flex">
                    <button name='Back' className="text-indigo-900 font-medium leading-normal tracking-tight grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.backURL)}>Back</button>

                    {!isNaN(Number(postId)) &&
                      <button name='Save' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex" onClick={() => setButtonClick('Save')}>Save</button>
                    }

                    {isNaN(Number(postId)) &&
                      <button name='SaveAsDraft' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex " onClick={() => setButtonClick('Draft')}>Save as Draft</button>
                    }

                    <button name='Continue' className="text-white font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex" onClick={() => setButtonClick('Continue')}>Continue</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div >
      </div >
      <Toaster />
    </>
  )
}

export default Company