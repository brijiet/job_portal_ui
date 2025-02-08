import { useEffect, type FC, useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from '../../../../';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import { getAllMailTemplateList, getCurrencyList, getKeySkillsList, getLocationList, getNumberSystemList, getRecurrenceList, getSalaryRangeList, getTotalYearsExpList, userBasedJobList } from '../../../utils/utils';
import ComposePreview from './Preview';
import Cookies from 'js-cookie';
import { getEmployerCompanyList } from '../../../../store/reducers/companies/employerCompanyList';

interface IFormInputs {
  fromEmailId: string
  mailSubject: string
  jobSubject: string
  jobTitle: string
  message: string
  signature: string
  fromWorkExperience: { value: string; label: string; }
  currency: { value: string; label: string; }
  toWorkExperience: { value: string; label: string; }
  fromSalaryRange: { value: string; label: string; }
  toSalaryRange: { value: string; label: string; }
  numberSystem: { value: string; label: string; }
  location: { value: string; label: string; }[]
  keySkills: { value: string; label: string; }[]
}

interface SelectedFormInputs {
  recruiterUser: any;
  fromEmailId: string
  subject: string
  jobSubject: string
  jobTitle: string
  message: string
  signature: string
  saveAsTemplate: boolean
  selectTemplate: number
  fromWorkExperience: { id: string; title: string; }
  currency: { id: string; title: string; }
  toWorkExperience: { id: string; title: string; }
  minSalaryRange: { id: string; title: string; }
  maxSalaryRange: { id: string; title: string; }
  mailTemplateNumberSystem: { id: string; title: string; }
  mailTemplateJobLocation: { location: { id: string; title: string; } }[]
  mailTemplateKeySkills: { keySkills: { id: string; title: string; } }[]
}

const ComposeMailSchema = yup
  .object({
    fromEmailId: yup.string().label("From email id").required().nullable(),
    mailSubject: yup.string().label("Mail subject").required(),
    fromWorkExperience: yup.object().shape({
      value: yup.string().required("From work experience"),
      label: yup.string().required("From work experience"),
    }),
    toWorkExperience: yup.object().shape({
      value: yup.string().required("To work experience"),
      label: yup.string().required("To work experience"),
    }),
    selectJob: yup.string().label("Job").required(),
    jobSubject: yup.string().label("Job subject").required(),
    jobTitle: yup.string().label("Job title").required(),
    message: yup.string().label("Message").required(),
    signature: yup.string().label("Signature").required(),
    location: yup.array()
      .min(1, 'Pick at least one location')
      .max(3, 'Pick at most three location').required("Please select location"),
    keySkills: yup.array()
      .min(2, 'Pick at least two keySkills')
      .max(10, 'Pick at most ten keySkills').required("Please select keySkills"),
  })
  .required();

const ComposeMail = ({ profileDashboard, applicantMailId, closeDialog, setComposePreviewTitle, composePreviewTitle, mulitUser, applicantEmailId }: any) => {

  const [totalExpYear, setTotalExpYear] = useState<any>([]);
  const [currency, setCurrency] = useState<any>([]);
  const [salaryRange, setSalaryRange] = useState<any>([]);
  const [numberSystem, setNumberSystem] = useState<any>([]);
  const [recurrence, setRecurrence] = useState<any>([]);
  const [location, setLocation] = useState<any>([]);
  const [formSubmitData, setFormSubmitData] = useState<any>([]);
  const [keySkills, setKeySkills] = useState<any>([]);
  const [userJobList, setUserJobList] = useState<any>([]);
  const [preview, setPreview] = useState(false);
  const [fromEmailId, setFromEmailId] = useState('');
  const [saveTemplate, setSaveTemplate] = useState(false);
  const [selectedTemplated, setSelectedTemplated] = useState<number>();
  const [mailTemplateList, setMailTemplateList] = useState([]);
  const [selectedMailTemplate, setSelectedMailTemplate] = useState<SelectedFormInputs[]>([]);
  const [selectedMailJob, setSelectedMailJob] = useState<any[]>([]);
  const recruiterUser = Cookies.get("userId");
  const { success, companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);

  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<IFormInputs | any>({
    resolver: yupResolver(ComposeMailSchema)
  });

  const onSubmit = (data: IFormInputs) => {
    setPreview(true);
    setComposePreviewTitle("Mail Preview");
    setFormSubmitData(data);
  }

  useEffect(() => {
    (async () => {

      const totalExpYearList = await getTotalYearsExpList()
      if (Object.keys(totalExpYearList)?.length) {
        setTotalExpYear(totalExpYearList as any)
      }

      const salaryRangeList = await getSalaryRangeList()
      if (Object.keys(salaryRangeList)?.length) {
        setSalaryRange(salaryRangeList as any)
      }

      const numberSystemList = await getNumberSystemList()
      if (Object.keys(numberSystemList)?.length) {
        setNumberSystem(numberSystemList as any)
      }

      const currencyList = await getCurrencyList()
      if (Object.keys(currencyList)?.length) {
        setCurrency(currencyList as any)
      }

      const recurrenceList = await getRecurrenceList()
      if (Object.keys(recurrenceList)?.length) {
        setRecurrence(recurrenceList as any)
      }

      const locationList = await getLocationList()
      if (Object.keys(locationList)?.length) {
        setLocation(locationList as any)
      }
      const JobList = await userBasedJobList()
      if (Object.keys(JobList)?.length) {
        setUserJobList(JobList as any)
      }

      const keySkillsList = await getKeySkillsList()
      if (Object.keys(keySkillsList)?.length) {
        setKeySkills(keySkillsList as any)
      }

      const allMailTemplateList = await getAllMailTemplateList(
        recruiterUser as any
      );
      if (Object.keys(allMailTemplateList)?.length) {
        setMailTemplateList(allMailTemplateList.sort().reverse() as any);
      }

    })();

  }, []);

  useEffect(() => {
    dispatch(getEmployerCompanyList({ data: { user: { id: recruiterUser } } }));
  }, [dispatch]);

  const changeTemplate = (id: number) => {
    setSelectedTemplated(id)
    setSelectedMailTemplate(mailTemplateList?.filter((item: any) => item.id === id))
  }

  const changeJobList = (id: number) => {
    setSelectedMailJob(userJobList?.filter((item: any) => item.id === id))
  }

  useEffect(() => {

    setValue('fromEmailId', selectedMailTemplate[0]?.recruiterUser?.email ? selectedMailTemplate[0]?.recruiterUser?.email : companyDetails?.[0]?.user?.[0]?.email);
    if (selectedMailJob?.length > 0) {
      const selectedKeySkills: any = [];
      const selectedLocation: any = [];

      selectedMailJob[0]?.jobsKeySkills?.filter((item: any) => item?.keySkills && selectedKeySkills?.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }));

      selectedMailJob[0]?.jobsLocation?.filter((item: any) => {
        item?.location && selectedLocation?.push({ label: item?.location?.title, value: item?.location?.id })
      });
      setValue('location', selectedLocation);
      setValue('keySkills', selectedKeySkills);
      setValue('fromWorkExperience', { value: selectedMailJob[0]?.totalExpYearStart?.id, label: selectedMailJob[0]?.totalExpYearStart?.title });
      setValue('toWorkExperience', { value: selectedMailJob[0]?.totalExpYearEnd?.id, label: selectedMailJob[0]?.totalExpYearEnd?.title });
      setValue('fromSalaryRange', { value: selectedMailJob[0]?.payScaleLowerRange?.id, label: selectedMailJob[0]?.payScaleLowerRange?.title });
      setValue('toSalaryRange', { value: selectedMailJob[0]?.payScaleUpperRange?.id, label: selectedMailJob[0]?.payScaleUpperRange?.title });
      setValue('numberSystem', {
        value: selectedMailJob[0]?.numberSystem?.id, label: selectedMailJob[0]?.numberSystem?.title
      });
      setValue('currency', { value: selectedMailJob[0]?.currency?.id, label: selectedMailJob[0]?.currency?.title });
      setValue('jobTitle', selectedMailJob[0]?.title);
      setValue('selectJob', selectedMailJob[0]?.id);
    }
    if (selectedMailTemplate.length > 0) {
      setValue('mailSubject', selectedMailTemplate[0]?.subject);
      setValue('selectTemplate', selectedTemplated);
      setValue('saveAsTemplate', saveTemplate);
      setValue('jobSubject', selectedMailTemplate[0]?.jobSubject);
      setValue('message', selectedMailTemplate[0]?.message);
      setValue('signature', selectedMailTemplate[0]?.signature);
    }
    setFromEmailId(selectedMailTemplate[0]?.recruiterUser?.email)
  }, [selectedMailTemplate, selectedMailJob])

  return (
    <>
      <div className="flex flex-col mt-2">
        {!preview && <form id="my-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2 mb-4 mt-2 p-2 font-semibold bg-slate-200">
              Mail Body
            </div>
            <div className="col-span-6 mb-4 mt-2 p-2 text-right bg-slate-200">
              <Controller
                name="selectTemplate"

                control={control}

                render={({ field }) => (
                  <select {...field} onChange={(e) => changeTemplate(Number(e.target.value))}>
                    <option>Select Template</option>
                    {mailTemplateList.map((item: any) => <option value={item?.id}>{item.templateName}</option>)}
                  </select>
                )}
              />
              {errors.selectTemplate && <p className="font-normal text-xs text-red-500">{errors?.selectTemplate?.message as string}</p>}

            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="fromEmailId" className="block text-sm font-medium leading-6 text-gray-900">From Email-Id</label>
            </div>
            <div className="col-span-6">
              <Controller
                name="fromEmailId"
                control={control}
                defaultValue={selectedMailTemplate[0]?.recruiterUser?.email}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={true}
                  />
                )}
              />
              {errors.fromEmailId && <p className="font-normal text-xs text-red-500">{errors.fromEmailId.message as string}</p>}
            </div>
          </div>

          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="fromEmailId" className="block text-sm font-medium leading-6 text-gray-900">To Email-Id</label>
            </div>
            <div className="col-span-6">
              <Controller
                name="toEmailId"
                control={control}
                defaultValue={fromEmailId}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    value={[...applicantEmailId]}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={true}
                  />
                )}
              />
              {errors.toEmailId && <p className="font-normal text-xs text-red-500">{errors.toEmailId.message as string}</p>}
            </div>
          </div>

          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="mailSubject" className="block text-sm font-medium leading-6 text-gray-900">Subject</label>
            </div>
            <div className="col-span-6">
              <Controller
                name="mailSubject"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={false}
                  />
                )}
              />
              {errors.mailSubject && <p className="font-normal text-xs text-red-500">{errors.mailSubject.message as string}</p>}
            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2 mb-4 mt-2 p-2 font-semibold bg-slate-200">
              Job Detail
            </div>
            <div className="col-span-6 mb-4 mt-2 p-2 text-right bg-slate-200">
              {errors.selectJob && <span className="font-normal text-xs text-red-500 pr-4">{errors?.selectJob?.message as string}</span>}
              <Controller
                name="selectJob"
                control={control}
                render={({ field }) => (
                  <select {...field} onChange={(e) => changeJobList(Number(e.target.value))}>
                    <option>Select a job</option>
                    {userJobList.map((item: any) => <option value={item?.id}>{item?.title}</option>)}
                  </select>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="jobTitle" className="block text-sm font-medium leading-6 text-gray-900">Job Title</label>
            </div>
            <div className="col-span-6">
              <Controller
                name="jobTitle"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={false}
                  />
                )}
              />
              {errors.jobTitle && <p className="font-normal text-xs text-red-500">{errors.jobTitle.message as string}</p>}
            </div>
          </div>

          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="jobSubject" className="block text-sm font-medium leading-6 text-gray-900">Subject</label>
            </div>
            <div className="col-span-6">
              <Controller
                name="jobSubject"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={false}
                  />
                )}
              />
              {errors.jobSubject && <p className="font-normal text-xs text-red-500">{errors?.jobSubject?.message as string}</p>}
            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="fromWorkExperience" className="block text-sm font-medium leading-6 text-gray-900">Total Experience</label>
            </div>
            <div className="col-span-6">
              <div className="w-full justify-start  gap-5 inline-flex">
                <div className="w-full flex-col justify-start  gap-2 inline-flex">
                  <div className='w-full'>
                    <AutocompleteBox
                      control={control}
                      isClearable={true}
                      fieldName={"fromWorkExperience"}
                      dropdownData={totalExpYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      default={watch("fromWorkExperience")}
                      placeholder={"From work experience"}
                    />
                    {errors.fromWorkExperience && <p className="font-normal text-xs text-red-500">{errors?.fromWorkExperience?.message as string}</p>}
                  </div>
                </div>
                <div className="w-full flex-col justify-start  gap-2 inline-flex">
                  <div className='w-full'>
                    <AutocompleteBox
                      control={control}
                      isClearable={true}
                      fieldName={"toWorkExperience"}
                      dropdownData={totalExpYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      default={watch("toWorkExperience")}
                      placeholder={"To work experience"}
                    />
                    {errors.toWorkExperience && <p className="font-normal text-xs text-red-500">{errors?.toWorkExperience?.message as string}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900">CTC</label>
            </div>
            <div className="col-span-6">
              <div className="mb-4">
                <div className="grid grid-cols-8 gap-4 mt-1">
                  <div className="col-span-2">
                    <AutocompleteBox
                      control={control}
                      fieldName={"currency"}
                      dropdownData={currency?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      default={watch("currency")}
                      placeholder={"Currency"}
                    />
                    {errors.message && <p className="font-normal text-xs text-red-500">{errors?.currency?.message as string}</p>}
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
                    {errors.message && <p className="font-normal text-xs text-red-500">{errors?.fromSalaryRange?.message as string}</p>}
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
                    {errors.message && <p className="font-normal text-xs text-red-500">{errors?.toSalaryRange?.message as string}</p>}
                  </div>
                  <div className="col-span-2">
                    <AutocompleteBox
                      control={control}
                      isClearable={true}
                      fieldName={"numberSystem"}
                      dropdownData={numberSystem?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      default={watch("numberSystem")}
                      placeholder={"Number system"}
                    />
                    {errors.message && <p className="font-normal text-xs text-red-500">{errors?.numberSystem?.message as string}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
            </div>
            <div className="col-span-6">
              <AutocompleteBox
                control={control}
                isClearable={true}
                isMulti={true}
                fieldName={"location"}
                dropdownData={location?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                placeholder={"Select job location"}
                defaultValue={watch("location")}
              />
              {errors.message && <p className="font-normal text-xs text-red-500">{errors?.location?.message as string}</p>}
            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="keySkills" className="block text-sm font-medium leading-6 text-gray-900">Key Skills</label>
            </div>
            <div className="col-span-6">
              <AutocompleteBox
                control={control}
                isClearable={true}
                isMulti={true}
                fieldName={"keySkills"}
                dropdownData={keySkills?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                placeholder={"Select Key Skills"}
                defaultValue={watch("keySkills")}
              />
              {errors.message && <p className="font-normal text-xs text-red-500">{errors?.keySkills?.message as string}</p>}
            </div>
          </div>

          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Message</label>
            </div>
            <div className="col-span-6">
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <textarea rows={4} {...field} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your message here..."></textarea>
                )}
              />
              {errors.message && <p className="font-normal text-xs text-red-500">{errors?.message?.message as string}</p>}
            </div>
          </div>

          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Signature</label>
            </div>
            <div className="col-span-6">
              <Controller
                name="signature"
                control={control}
                render={({ field }) => (
                  <textarea rows={4} {...field} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your signature here..."></textarea>
                )}
              />
              {errors.signature && <p className="font-normal text-xs text-red-500">{errors?.signature?.message as string}</p>}
            </div>
          </div>
          <div className="col-span-full mb-4 mt-2 p-2 font-semibold bg-slate-200">
            Mail Option
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900"></label>
            </div>
            <div className="col-span-6">
              <div className="flex items-center">
                <Controller
                  name="saveAsTemplate"
                  control={control}
                  render={({ field }) => (
                    <input  {...field} type="checkbox" onClick={() => setSaveTemplate(!saveTemplate)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                  )}
                />
                {errors.saveAsTemplate && <p className="font-normal text-xs text-red-500">{errors?.saveAsTemplate?.message as string}</p>}
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Save this contact mail as a template</label>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end items-center">
            <div>
              <button
                type="button"
                className="mr-3"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                type="submit" className={"rounded-3xl bg-blue-500 text-white px-5 py-1.5"} >
                Preview and Send
              </button>
            </div>
          </div>
        </form>}
        {preview && <ComposePreview
          applicantMailId={applicantMailId}
          formSubmitData={formSubmitData}
          profileDashboard={profileDashboard}
          closeDialog={closeDialog}
          composePreviewTitle={composePreviewTitle}
          mulitUser={mulitUser}
        />
        }
      </div>
    </>
  )
}

export default ComposeMail;