import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import ShortAnswer from './ShortAnswer';
import MultipleChoice from './MultipleChoice';
import SingleChoice from './SingleChoice';
import NumberChoice from './NumberChoice';
import { IFormInputsQuestionnaire, IFormInputsQuestionnaireDraft, IFormInputsQuestionnaireSave } from '../../../../interface/employer';
import { QuestionnaireDraftSchema, QuestionnaireSaveSchema, QuestionnaireSchema } from '../../../../schema/postJob';
import { yupResolver } from '@hookform/resolvers/yup';
import { formData, postQuestionnaireDraft, postQuestionnaireSave } from '../../../../store/reducers/jobs/postJobs';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { getEmployerCompanyList } from '../../../../store/reducers/companies/employerCompanyList';
import Toaster from '../../../commonComponents/Toaster';


const questionTypeOptions = [
  { value: 'Descriptive', label: 'Descriptive' },
  { value: 'NumberChoice', label: 'NumberChoice' },
  { value: 'SingleChoice', label: 'SingleChoice' },
  { value: 'MultipleChoice', label: 'MultipleChoice' }
];

const QuestionnaireForm = () => {

  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const updatePostId = postId ? Number(postId) : null;
  const navigate = useNavigate();
  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);

  const [question, setQuestion] = useState<Array<string>>([]);
  const [doneStatus, setDoneStatus] = useState<Array<boolean>>([])
  const [formValues, setFormValues] = useState([
    { question: "", questionType: { label: "", value: "" }, characterLimit: "", requiredCheck: "", rangeMax: "", multipleSelection: [{ option: "" }], singleSelection: [{ option: "" }] }]);
  const [buttonClick, setButtonClick] = useState('');
  const [postBack, setPostBack] = useState({ postURL: '', backURL: '' });
  const [userType, setUserType] = useState(Cookies.get('userType'));
  const [userId, setUserId] = useState(Cookies.get('userId'));
  const [jobTitle, setJobTitle] = useState('');
  const { companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsQuestionnaire | IFormInputsQuestionnaireDraft | IFormInputsQuestionnaireSave>({
    resolver: yupResolver(QuestionnaireSchema || QuestionnaireDraftSchema || QuestionnaireSaveSchema) as any,
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "questionnaire",
  });

  useEffect(() => {
    dispatch(getEmployerCompanyList({ data: { user: { id: userId } } }));
  }, [])

  const selectedJobQuestionnaire: any = [];

  if (Object.keys(jobDetail)?.length !== 0) {
    if (!jobDetail?.questionnaire || (formValues?.length > jobDetail?.questionnaire?.length)) {

      formValues?.filter((item: any) => item && selectedJobQuestionnaire.push({
        question: item?.question,
        questionType: { label: item?.questionType?.label, value: item?.questionType?.value },
        characterLimit: item?.characterLimit,
        requiredCheck: item?.requiredCheck,
        rangeMax: item?.rangeMax,
        singleSelection: item?.singleSelection?.filter((itemSingle: any) => itemSingle?.option !== ''),
        multipleSelection: item?.multipleSelection?.filter((itemMultiple: any) => itemMultiple?.option !== '')
      }));
    } else {
      jobDetail?.questionnaire?.filter((item: any) => item && selectedJobQuestionnaire?.push({
        question: item?.question,
        questionType: { label: item?.questionType, value: item?.questionType },
        characterLimit: item?.characterLimit,
        requiredCheck: item?.requiredCheck,
        rangeMax: item?.rangeMax,
        singleSelection: item?.singleSelection?.filter((itemSingle: any) => itemSingle?.option !== ''),
        multipleSelection: item?.multipleSelection?.filter((itemMultiple: any) => itemMultiple?.option !== '')
      }));
    }
  } else {

    if (!jobDetailData?.questionnaire || (formValues?.length > jobDetailData?.questionnaire?.length)) {

      formValues?.filter((item: any) => item && selectedJobQuestionnaire.push({
        question: item?.question,
        questionType: { label: item?.questionType?.label, value: item?.questionType?.value },
        characterLimit: item?.characterLimit,
        requiredCheck: item?.requiredCheck,
        rangeMax: item?.rangeMax,
        singleSelection: item?.singleSelection?.filter((itemSingle: any) => itemSingle?.option !== ''),
        multipleSelection: item?.multipleSelection?.filter((itemMultiple: any) => itemMultiple?.option !== '')
      }));
    } else {
      jobDetailData?.questionnaire?.filter((item: any) => item && selectedJobQuestionnaire.push({
        question: item?.question,
        questionType: { label: item?.questionType?.label, value: item?.questionType?.value },
        characterLimit: item?.characterLimit,
        requiredCheck: item?.requiredCheck,
        rangeMax: item?.rangeMax,
        singleSelection: item?.singleSelection?.filter((itemSingle: any) => itemSingle?.option !== ''),
        multipleSelection: item?.multipleSelection?.filter((itemMultiple: any) => itemMultiple?.option !== '')
      }));
    }
  }

  useEffect(() => {
    if (jobDetail?.questionnaire && Object.keys(jobDetail?.questionnaire)?.length !== 0) {
      if (!jobDetail?.questionnaire || (formValues?.length > jobDetail?.questionnaire?.length)) {
        formValues && setValue('questionnaire', selectedJobQuestionnaire);
      } else {
        jobDetail?.questionnaire && setValue('questionnaire', selectedJobQuestionnaire);
      }
      setFormValues(selectedJobQuestionnaire);

      let newDoneUseStatus: any = [];
      let newQuestion: any = [];
      jobDetail.questionnaire.map((item, i) => {
        newDoneUseStatus[i] = true;
        newQuestion[i] = item?.questionType;
      })
      setDoneStatus(newDoneUseStatus);
      setQuestion(newQuestion);

    } else {

      if (!jobDetailData?.questionnaire || (formValues?.length > jobDetailData?.questionnaire?.length)) {
        formValues && setValue('questionnaire', selectedJobQuestionnaire);
      } else {
        jobDetailData?.questionnaire && setValue('questionnaire', selectedJobQuestionnaire);
      }
      setFormValues(selectedJobQuestionnaire);
    }

  }, [setValue, setFormValues, jobDetail, jobDetailData]);

  const onSubmit = (data: IFormInputsQuestionnaire | IFormInputsQuestionnaireDraft | IFormInputsQuestionnaireSave) => {
    if (buttonClick === 'Continue') {
      dispatch(formData({
        questionnaire: formValues
      }))
      navigate(postBack?.postURL);
    }
    if (buttonClick === 'Draft' && userType && userId) {
      let draft = true;
      const jobEducation = jobDetailData?.education?.map((education: any) => ({ education: education?.value }));
      const jobLocality = jobDetailData?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
      const jobLocation = jobDetailData?.jobLocation?.map((location: any) => ({ location: { id: location?.value } }));
      const jobCandidateIndustry = jobDetailData?.candidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.value } }));
      const keySkills = jobDetailData?.keySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.value } }));

      dispatch(postQuestionnaireDraft({
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
        hideSalaryDetails: jobDetailData?.hideSalaryDetails,
        isDraft: draft,
        videoProfile: jobDetailData?.videoProfile,
        includeWalkInDetails: jobDetailData?.includeWalkInDetails,
        notifyMeAbout: jobDetailData?.notifyMeAbout,
        notificationEmailAddress1: jobDetailData?.notificationEmailAddress1,
        notificationEmailAddress2: jobDetailData?.notificationEmailAddress2,
        company: companyDetails?.[0]?.id,
        hideCompanyRating: jobDetailData?.hideCompanyRating,
        companyWebsite: jobDetailData?.companyWebsite,
        aboutCompany: jobDetailData?.aboutCompany,
        companyAddress: jobDetailData?.companyAddress,
        questionnaire: selectedJobQuestionnaire?.map((item: any) => ({
          question: item?.question,
          questionType: item?.questionType?.value,
          characterLimit: item?.characterLimit,
          requiredCheck: item?.requiredCheck,
          rangeMax: item?.rangeMax,
          singleSelection: item?.singleSelection?.filter((itemSingle: any) => itemSingle?.option !== ''),
          multipleSelection: item?.multipleSelection?.filter((itemMultiple: any) => itemMultiple?.option !== '')
        }))
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

      dispatch(postQuestionnaireSave({
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
        hideSalaryDetails: jobDetailData?.hideSalaryDetails,
        videoProfile: jobDetailData?.videoProfile,
        includeWalkInDetails: jobDetailData?.includeWalkInDetails,
        notifyMeAbout: jobDetailData?.notifyMeAbout,
        notificationEmailAddress1: jobDetailData?.notificationEmailAddress1,
        notificationEmailAddress2: jobDetailData?.notificationEmailAddress2,
        questionnaire: selectedJobQuestionnaire?.map((item: any) => ({
          questionType: item?.questionType?.value,
          characterLimit: item?.characterLimit,
          requiredCheck: item?.requiredCheck,
          rangeMax: item?.rangeMax,
          singleSelection: item?.singleSelection?.filter((itemSingle: any) => itemSingle?.option !== ''),
          multipleSelection: item?.multipleSelection?.filter((itemMultiple: any) => itemMultiple?.option !== '')
        }))
      })).then(() => {
        toast.success("Job saved successfully !!")
      });
    }
  }

  const handleDoneStatusChange = (i: any, val: boolean) => {
    let newDoneStatus = [...doneStatus];
    newDoneStatus[i] = val;
    setDoneStatus(newDoneStatus);
  }

  const handleQuestionTypeChange = (i: any, e: any, val: any, label: any) => {
    let newQuestion = [...question];
    newQuestion[i] = val;
    setQuestion(newQuestion);
    let newDoneStatus = [...doneStatus];
    newDoneStatus[i] = true;
    setDoneStatus(newDoneStatus);
    let newFormValues = [...formValues];
    newFormValues[i].questionType.value = val;
    newFormValues[i].questionType.label = label;
    setFormValues(newFormValues);
  }

  let handlesChange = (i: any, e: any, val: any, fieldName: any = '') => {
    let newFormValues = [...formValues];

    if (fieldName === 'characterLimit') {
      newFormValues[i].characterLimit = val;
    }
    if (fieldName === 'requiredCheck') {
      newFormValues[i].requiredCheck = val;
    }
    if (fieldName === 'rangeMax') {
      newFormValues[i].rangeMax = val;
    }
    if (fieldName === 'question') {
      newFormValues[i].question = val;
    }
    if (fieldName === 'questionType') {
      newFormValues[i].questionType = val;
    }
    if (fieldName === 'requiredCheck') {
      newFormValues[i].requiredCheck = val;
    }
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { question: "", questionType: { label: "", value: "" }, characterLimit: "", requiredCheck: "", rangeMax: "", multipleSelection: [{ option: "" }], singleSelection: [{ option: "" }] }])
  }

  let addFormSingleFields = (e: any, i: any, val: any) => {
    let newSingle = [...formValues];

    newSingle[i].singleSelection[formValues[i]?.singleSelection?.length || 0] = { option: val };
    setValue('questionnaire', newSingle);
    setFormValues(newSingle);
  }

  let removeFormFields = (i: string) => {
    let newFormValues = [...formValues];
    newFormValues.splice(parseInt(i), 1);
    setFormValues(newFormValues)
  }

  let removeSubFormFields = (index: any, innerIndex: any) => {
    let newFormValues = [...formValues];
    newFormValues[index].singleSelection.splice(parseInt(innerIndex), 1);
    setFormValues(newFormValues);
    setValue("questionnaire", newFormValues)
  }

  let removeMultipleFormFields = (index: any, innerIndex: any) => {
    let newFormValues = [...formValues];
    newFormValues[index].multipleSelection.splice(parseInt(innerIndex), 1);
    setFormValues(newFormValues);
    setValue("questionnaire", newFormValues)
  }

  let addFormMultipleFields = (i: any, val: any) => {
    let newMultiple = [...formValues];
    newMultiple[i].multipleSelection[formValues[i]?.multipleSelection?.length || 0] = { option: val };
    setValue('questionnaire', newMultiple);
    setFormValues(newMultiple);
  }

  useEffect(() => {
    if (Number(postId)) {
      setPostBack({ postURL: `/postJob/preview/${postId}`, backURL: `/postJob/response/${postId}` });
      setJobTitle(jobDetail?.title);
    } else {
      setPostBack({ postURL: '/postJob/preview', backURL: '/postJob/response' })
      setJobTitle(jobDetailData?.title);
    }
  }, []);

  const returnBack = (returnURL: string) => {
    navigate(returnURL);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-auto flex-col justify-start items-start gap-10 inline-flex">
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="text-black text-2xl font-medium  leading-[28.80px] tracking-tight">Questionnaire</div>
            <div className="text-slate-500 text-base font-normal  leading-snug tracking-tight">(optional)</div>
          </div>
          <div className="w-full flex flex-col">

            {formValues.map((element: any, index: any) => (
              <div className="h-auto p-7 bg-white rounded-xl shadow border border-indigo-600 flex-col justify-start  items-end gap-7 mt-5 mb-5" key={index}>
                <div className="w-full self-stretch justify-end items-center inline-flex">
                  <div className="grow shrink basis-0 text-slate-900 text-base font-bold leading-snug tracking-tight">Question {index + 1}/10</div>
                  <div className="justify-end items-center gap-2 flex">
                    <div className="w-6 h-6 flex-col justify-center items-center inline-flex cursor-pointer"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}rawBin.svg`} alt='rawBin' onClick={() => removeFormFields(index)} /></div>
                    {question[index] &&
                      <div className="w-6 h-6 flex-col justify-center items-center inline-flex cursor-pointer" onClick={e => handleDoneStatusChange(index, !doneStatus[index] || false)}> <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Edit_icon.svg`} alt='Edit_icon' /></div>}
                    {question[index] &&
                      <div className="w-6 h-6 justify-center items-center flex cursor-pointer" onClick={e => handleDoneStatusChange(index, !doneStatus[index] || false)}>{doneStatus[index] ? <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}upIcon.svg`} alt='upIcon' /> : <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downIcon.svg`} alt='downIcon' />}</div>}
                  </div>
                </div>
                <div className="self-stretch h-[73px] flex-col justify-start items-start mt-5 gap-2 flex">
                  <div className="text-slate-700 text-sm  leading-[16.80px] tracking-tight">Question</div>
                  <div className="w-full grid grid-cols-2 items-start gap-5 ">
                    <div className=" flex-col justify-start items-start gap-2 ">
                      <div className='w-full'>
                        <input defaultValue={watch(`questionnaire.${index}.question`)}
                          className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 text-sm'
                          placeholder={"Please enter question"}
                          {...register(`questionnaire.${index}.question`)}
                          onChange={e => handlesChange(index, e, e.target.value, "question")} />

                      </div>
                    </div>
                    <div className=" flex-col justify-start  gap-2 ">
                      <div className='w-full'>
                        {updatePostId ? <Select
                          {...register(`questionnaire.${index}.questionType`)}
                          isClearable={true}
                          isSearchable={true}
                          className="text-sm"
                          options={questionTypeOptions}
                          onChange={(e: any) => handleQuestionTypeChange(index, e, e.value, e.label)}
                          value={watch(`questionnaire.${index}.questionType`)}
                          placeholder={"Select question Type"}
                        /> :
                          <Select
                            {...register(`questionnaire.${index}.questionType`)}
                            isClearable={true}
                            isSearchable={true}
                            className="text-sm"
                            options={questionTypeOptions}
                            onChange={(e: any) => handleQuestionTypeChange(index, e, e.value, e.label)}
                            defaultValue={watch(`questionnaire.${index}.questionType`)}
                            placeholder={"Select question Type"}
                          />
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {question[index] === "Descriptive" && doneStatus[index] &&
                  <ShortAnswer
                    index={index}
                    register={register}
                    handleDoneStatusChange={handleDoneStatusChange}
                    doneStatus={doneStatus}
                    handlesChange={handlesChange}
                    watch={watch}
                  />
                }
                {question[index] === "MultipleChoice" && doneStatus[index] &&
                  <MultipleChoice
                    index={index}
                    register={register}
                    handleDoneStatusChange={handleDoneStatusChange}
                    addFormMultipleFields={addFormMultipleFields}
                    removeMultipleFormFields={removeMultipleFormFields}
                    doneStatus={doneStatus}
                    formValues={formValues}
                    watch={watch}
                  />
                }
                {question[index] === "SingleChoice" && doneStatus[index] &&
                  <SingleChoice
                    index={index}
                    register={register}
                    handleDoneStatusChange={handleDoneStatusChange}
                    removeSubFormFields={removeSubFormFields}
                    doneStatus={doneStatus}
                    addFormSingleFields={addFormSingleFields}
                    handlesChange={handlesChange}
                    formValues={formValues}
                    watch={watch}
                  />
                }
                {question[index] === "NumberChoice" && doneStatus[index] &&
                  <NumberChoice
                    index={index}
                    register={register}
                    handleDoneStatusChange={handleDoneStatusChange}
                    doneStatus={doneStatus}
                    handlesChange={handlesChange}
                    watch={watch}
                  />
                }
              </div>
            ))}

            <div className="self-stretch h-auto flex-col justify-start items-start gap-5 flex">
              {formValues.length < 10 && <div className="w-full  border-dashed h-12 pl-6 pr-3 py-3 bg-white rounded-lg border border-indigo-300 justify-center items-center gap-3 inline-flex cursor-pointer" onClick={() => addFormFields()} >
                <div className="text-indigo-600 text-base font-medium  leading-snug tracking-tight">Add question</div>
                <div className="w-10 h-10 flex-col justify-center items-center inline-flex indigo-600 text-base font-medium"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}plus.svg`} alt='plus' /></div>
              </div>}
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900  bg-[#f8fafc]  dark:text-white dark:bg-gray-900">OR</span>
              </div>
              <div className="self-stretch h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-2 inline-flex">
                <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                  <div className="grow shrink basis-0 text-slate-400 text-base font-normal  leading-snug tracking-tight">Use a previously posted question</div>
                </div>
                <div className="w-6 h-6 justify-center items-center flex"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex-col justify-start mt-10  gap-10 inline-flex">
          <div className="self-stretch justify-start  gap-5 inline-flex">
            <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.backURL)}>
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
            </div>
          </div>
        </div>
      </form>
      <Toaster />
    </>
  )
}

export default QuestionnaireForm