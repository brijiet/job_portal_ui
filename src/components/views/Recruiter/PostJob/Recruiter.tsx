import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IFormInputsCompanySave, IFormInputsRecruiter } from '../../../../interface/employer';
import JobLeftPanel from './JobLeftPanel';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanySaveSchema, RecruiterSchema } from '../../../../schema/postJob';
import { yupResolver } from '@hookform/resolvers/yup';
import { postCompanyDraft, postCompanySave } from '../../../../store/reducers/jobs/postJobs';
import Toaster from '../../../commonComponents/Toaster';
import Cookies from 'js-cookie';
import { getEmployerCompanyList } from '../../../../store/reducers/companies/employerCompanyList';


const Recruiter = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const { companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);
  const [postBack, setPostBack] = useState({ postURL: '', backURL: '' });
  const [jobTitle, setJobTitle] = useState('');
  const [buttonClick, setButtonClick] = useState('');
  const [userType, setUserType] = useState(Cookies.get('userType'));
  const [userId, setUserId] = useState(Cookies.get('userId'));


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
  } = useForm<IFormInputsRecruiter | IFormInputsCompanySave>({
    resolver: yupResolver(RecruiterSchema || CompanySaveSchema),
  });

  const onSubmit = (data: IFormInputsRecruiter | IFormInputsCompanySave) => {

    const updatePostId = postId ? Number(postId) : null;

    if (buttonClick === 'Continue') {
      navigate(postBack?.postURL);
    }
    if (buttonClick === 'Draft' && userType && userId) {
      let draft = true;
      const jobEducation = jobDetailData?.education?.map((education: any) => ({ education: education?.value }));
      const jobLocality = jobDetailData?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
      const jobLocation = jobDetailData?.jobLocation?.map((location: any) => ({ location: { id: location?.value } }));
      const jobCandidateIndustry = jobDetailData?.candidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.value } }));
      const keySkills = jobDetailData?.keySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.value } }));
      const updatePostId = postId ? Number(postId) : null;
      dispatch(postCompanyDraft({
        totalExpYearStart: jobDetailData?.totalExpYearStart?.value,
        totalExpYearEnd: jobDetailData?.totalExpYearEnd?.value,
        jobsKeySkills: keySkills,
        jobStatus: jobDetailData?.jobStatus?.value,
        jobExpiry: jobDetailData?.jobExpiry?.value,
        isDraft: draft,
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
        company: companyDetails?.[0]?.id,
        hideCompanyRating: jobDetailData?.hideCompanyRating,
        companyWebsite: jobDetailData?.companyWebsite,
        aboutCompany: jobDetailData?.aboutCompany,
        companyAddress: jobDetailData?.companyAddress,

        hideSalaryDetails: false,
        videoProfile: false,
        includeWalkInDetails: false,
        notifyMeAbout: false,
        notificationEmailAddress1: '',
        notificationEmailAddress2: '',
      })).then(() => {
        toast.success("Job drafted successfully !!")
      });
    }
    if (buttonClick === 'Save' && userType && userId) {
      let draft = false;


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
        hideCompanyRating: jobDetailData?.hideCompanyRating,
        companyWebsite: jobDetailData?.companyWebsite,
        aboutCompany: jobDetailData?.aboutCompany,
        companyAddress: jobDetailData?.companyAddress,
      })).then(() => {
        toast.success("Job save successfully !!")
      });
    }
  }

  useEffect(() => {
    if (Number(postId)) {
      setPostBack({ postURL: `/postJob/response/${postId}`, backURL: `/postJob/company/${postId}` });
      setJobTitle(jobDetail?.title);
    } else {
      setPostBack({ postURL: '/postJob/response', backURL: '/postJob/company' });
      setJobTitle(jobDetailData?.title);
    }
  }, []);

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
            <div id="jobDetails" className="scroll-mt-24 scroll-smooth">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full h-auto flex-col justify-start  gap-10 inline-flex">
                  <div className="flex-col justify-start  gap-10 flex">
                    <div className="justify-start items-end gap-2 inline-flex">
                      <div className="text-black text-xl font-medium  leading-normal tracking-tight">Recruiter</div>
                      <div className="text-slate-500 text-base font-normal  leading-snug tracking-tight">(optional)</div>
                    </div>
                    <div className="justify-start items-center gap-2 inline-flex">
                      <div className="w-6 h-6 relative">
                        <input type="checkbox"
                          {...register("fillCompanyInformation")}
                          defaultChecked={true}
                          className=" w-4 h-4" />
                        {errors?.fillCompanyInformation && <p className="font-normal text-xs text-red-500 absolute">{errors?.fillCompanyInformation?.message}</p>}
                      </div>
                      <div className="text-black text-base font-normal  leading-snug tracking-tight">Fill saved information from my profile</div>
                    </div>
                    <div className="flex-col justify-start  gap-7 flex">
                      <div className="flex-col justify-start  gap-2 flex">

                        <div className="justify-start  inline-flex">
                          <div className="w-[120px] h-[120px] p-1 rounded-[120px] border border-indigo-300 flex-col justify-center items-center gap-2 inline-flex">
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} alt="profile" className="rounded-full w-full h-full" />
                          </div>
                        </div>
                      </div>
                      <div className="h-[73px] flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Full name</div>
                        <input defaultValue={''}
                          className='w-full border text-sm border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                          placeholder={"Please enter full name"}
                          value={companyDetails?.[0]?.user?.[0]?.name}
                          readOnly />
                      </div>
                      <div className="h-[73px] flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Designation</div>
                        <input defaultValue={''}
                          className='w-full border text-sm border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                          placeholder={"Please enter designation"}
                          value={'HR Recruiter'}
                          readOnly />
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-start  gap-5 inline-flex">
                    {/* <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack?.backURL)}>
                      <div className="w-6 h-6 justify-center items-center flex"></div>
                      <div className="text-indigo-900 font-medium  leading-normal tracking-tight">Back</div>
                    </div>
                    {!isNaN(Number(postId)) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                      <input className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" type="submit" name='SaveAsDraft' value={'Save'} onClick={() => setButtonClick('Save')} />
                    </div>}
                    {isNaN(Number(postId)) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                      <input className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" type="submit" name='SaveAsDraft' value={'Save as Draft'} onClick={() => setButtonClick('Draft')} />
                    </div>}
                    <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                      <input className="text-white font-medium leading-normal tracking-tight cursor-pointer" type="submit" value={'Continue'} onClick={() => setButtonClick('Continue')} />
                    </div> */}


                    <button name='Back' className="text-indigo-900 font-medium leading-normal tracking-tight grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.backURL)}>Back</button>

                    {!isNaN(Number(postId)) &&
                      <button name='Save' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex" onClick={() => setButtonClick('Save')}>Save</button>
                    }

                    {isNaN(Number(postId)) &&
                      <button name='SaveAsDraft' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex " onClick={() => setButtonClick('Draft')}>Save as Draft</button>
                    }

                    <button type="submit" name='Continue' className="text-white font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex"
                      onClick={() => setButtonClick('Continue')}>Continue</button>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default Recruiter