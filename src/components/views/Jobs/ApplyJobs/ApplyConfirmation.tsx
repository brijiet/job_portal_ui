import { Controller, useForm } from 'react-hook-form';
import ApplyJobResume from './ApplyJobResume';
import Select from 'react-select';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../..';
import { getAllCompanies } from '../../../../store/reducers/companies/getAllCompanies';
import { getCompanyList, getKeySkillsList, getLocationList, getNoticePeriodList, getTotalMonthsExpList, getTotalYearsExpList, getjobTitleList } from '../../../utils/utils';

import { profileDashboardGet, clearGetProfileDashboardSlice } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import { applyJobs } from '../../../../store/reducers/applyJobs/applyJobs';
import { getUserData } from '../../../../store/reducers/user/getUserDetails';
import { ToastContainer, toast } from 'react-toastify';
import { updateProfileBasicDetails } from '../../../../store/reducers/jobSeekerProfile/profileBasicDetailsUpdate';
import { filterArray } from '../../../utils/filterArray';
import { keySkillsUpdate } from '../../../../store/reducers/jobSeekerProfile/keySkills';
import { useLocation } from 'react-router-dom';
import { removeComma, separateComma } from '../../../utils/currencyFormat';

const ApplyConfirmation = () => {

  const { pathname } = useLocation();
  const pathName = atob(pathname.split('/')[3]).split('&');

  const jobId = pathName[0].split('=')[1];
  const seekerId = pathName[1].split('=')[1];

  const dispatch = useAppDispatch();
  const [companyList, setCompanyList] = useState<any>([]);
  const [jobTitleList, setJobTitleList] = useState<any>([]);
  const [keySkills, setKeySkills] = useState<any>([]);
  const [actionStatus, setActionStatus] = useState('');
  const [totalExpMonthList, setTotalExpMonthList] = useState<any>([]);
  const [totalExpYearList, setTotalExpYearList] = useState<any>([]);
  const [locationList, setLocationList] = useState<any>([]);
  const [noticePeriodList, setNoticePeriodList] = useState<any>([]);

  const { success, allCompanies } = useAppSelector((state) => state.getAllCompanies);
  const { success: profileSuccess, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success: userSuccess, userData } = useAppSelector((state) => state.getUser);


  const {
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<any>({
    defaultValues: {},
  });

  // OnSubmit button
  const onSubmit = (data: any) => {

    if (actionStatus === 'SkipAndApply') {
      dispatch(applyJobs({
        "jobSeekerProfile": userData?.id && Number(userData?.id),
        "jobs": jobId && Number(jobId),
        "questionnaireAnswer": [],
        "multipleChoiceQuestionnaireAnswer": [],
      })).then((data: any) => {
        if (data?.payload?.count > 0) {
          toast.info("job already applied !!")
        } else {
          toast.success("job Applied successfully!!")
        }
      });
    }
    if (actionStatus === 'UpdateAndApply') {

      const monthArray = filterArray(totalExpMonthList, parseInt(profileDashboard?.totalExpMonth?.id));
      const yearArray = filterArray(totalExpYearList, parseInt(profileDashboard?.totalExpYear?.id));
      const locationArray = filterArray(locationList, parseInt(profileDashboard?.currentLocation.id));
      const noticeArray = noticePeriodList.filter((notice: any) => notice?.id === profileDashboard.noticePeriod.id);
      const companyArray = filterArray(companyList, parseInt(data?.currentCompany?.value));
      const jobTitleArray = filterArray(jobTitleList, parseInt(data?.currentJobTitle?.value));

      data.totalExpMonth = monthArray[0];
      data.totalExpYear = yearArray[0];
      data.currentLocation = locationArray[0];
      data.noticePeriod = noticeArray[0];
      data.currentCompany = companyArray[0];
      data.currentJobTitle = jobTitleArray[0];
      data.email = userData?.email
      data.jobSeekerType = profileDashboard?.jobSeekerType
      data.mobileNumber = userData?.mobileNumber

      dispatch(updateProfileBasicDetails(data as any)).then(() => {

        var arrayPost = new Array();
        data?.keySkills && data?.keySkills?.map((item: any) => arrayPost.push(item?.value));

        dispatch(keySkillsUpdate({
          keySkills: arrayPost,
          jobSeekerId: String(profileDashboard?.id)
        })).then(() => {
          dispatch(applyJobs({
            "jobSeekerProfile": userData?.id && Number(userData?.id),
            "jobs": jobId && Number(jobId),
            "questionnaireAnswer": [],
            "multipleChoiceQuestionnaireAnswer": [],
          })).then((data: any) => {
            if (data?.payload?.count > 0) {
              toast.info("job already applied !!")
            } else {
              toast.success("job Applied successfully!!")
            }
          });
        });
      })
    }
  };
  const selectedJobsKeySkills: any = [];
  profileDashboard?.keySkills?.filter((item: any) => item && selectedJobsKeySkills.push({ value: item?.profileKeySkills?.id, label: item?.profileKeySkills?.title }));

  useEffect(() => {
    if (profileDashboard) {
      setValue('currentSalary', profileDashboard?.currentSalary);
      setValue('currentCompany', profileDashboard?.currentCompany && { value: profileDashboard?.currentCompany?.id, label: profileDashboard?.currentCompany?.title });
      setValue('currentJobTitle', profileDashboard?.currentJobTitle && { value: profileDashboard?.currentJobTitle?.id, label: profileDashboard?.currentJobTitle?.title });
      setValue('keySkills', selectedJobsKeySkills);
    }
  }, [profileDashboard, setValue])

  useEffect(() => {
    dispatch(profileDashboardGet());
    dispatch(getAllCompanies({} as any));
    dispatch(getUserData());

  }, [dispatch])

  useEffect(() => {
    setCompanyList(allCompanies as any)
  }, [success])

  useEffect(() => {
    (async () => {
      const jobTitle = await getjobTitleList();
      setJobTitleList(jobTitle);

      const keySkillsList = await getKeySkillsList()
      if (Object.keys(keySkillsList)?.length) {
        setKeySkills(keySkillsList as any)
      }

    })();
  }, []);
  useEffect(() => {
    (async () => {
      const totalExpMonth = await getTotalMonthsExpList();
      setTotalExpMonthList(totalExpMonth);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const totalExpYear = await getTotalYearsExpList();
      setTotalExpYearList(totalExpYear);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const noticePeriod = await getNoticePeriodList();
      setNoticePeriodList(noticePeriod);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const location = await getLocationList();
      setLocationList(location);
    })();
  }, []);

  const handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/[^0-9,]/g, ''); // Remove non-numeric characters

    if (/^0[^,]/.test(inputValue)) {
      inputValue = cleanedValue.substring(1); // Exclude the leading '0' 
    }

    const formattedValue = cleanedValue === '' ? '' : separateComma(cleanedValue);
    e.target.value = formattedValue;
  };

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
        <div className="col-start-1 col-end-4">
          <div className="p-4 sticky top-[13%]">
          </div>
        </div>
        <div className="col-start-4 col-end-11">
          <div className="col-span-full border-b-2 border-indigo-500">
            <label htmlFor="composeYourMessage" className="block text-2xl text-center leading-10 text-gray-900 font-bold">Quick Review and update your Profile</label>
          </div>

          <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-full mb-4">
              <ApplyJobResume />
            </div>

            <div className="col-span-full mb-4">
              <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">Current company name</label>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="currentCompany"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder=""
                      options={companyList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch('currentCompany')}
                    />
                  )}
                />
                {errors.currentCompany && <p className="font-normal text-xs text-red-500">{errors.currentCompany.message as string}</p>}
              </div>
            </div>

            <div className="col-span-full mb-4">
              <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">Current designation</label>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="currentJobTitle"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder=""
                      options={jobTitleList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={getValues("currentJobTitle")}
                    />
                  )}
                />
                {errors.currentJobTitle && <p className="font-normal text-xs text-red-500">{errors.currentJobTitle.message as string}</p>}
              </div>
            </div>

            <div className="col-span-full mb-4">
              <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">Current Salary</label>
              <div className="mt-1 flex flex-row">
                <span className="border border-gray-300 rounded-xl py-2 px-4 text-gray-300">
                  <LiaRupeeSignSolid />
                </span>
                <Controller
                  control={control}
                  name="currentSalary"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      readOnly={false}
                      onInput={handleInputChange}
                      value={watch("currentSalary") ? separateComma(watch("currentSalary")) : undefined}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 ml-6"
                    />
                  )}
                />
                {errors.currentSalary && <p className="font-normal text-xs text-red-500 ">{errors.currentSalary.message as string}</p>}
              </div>
            </div>

            <div className="col-span-full mb-4">
              <label htmlFor="startTyping" className="block text-sm font-medium leading-6 text-gray-900">Skills</label>
              <div className="mt-1">
                <AutocompleteBox
                  control={control}
                  isClearable={true}
                  isMulti={true}
                  fieldName={"keySkills"}
                  dropdownData={keySkills?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                  placeholder={"Select key Skills (at least 2 skills)"}
                  defaultValue={watch("keySkills")}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end items-center">
              <div>
                <button
                  form='my-form' type="submit"
                  className="rounded-3xl bg-blue-500 text-white px-5 py-1.5 mr-3"
                  onClick={() => setActionStatus("UpdateAndApply")}
                >
                  Update and Apply
                </button>
                <button
                  form='my-form' type="submit"
                  className="rounded-3xl bg-blue-500 text-white px-5 py-1.5"
                  onClick={() => setActionStatus("SkipAndApply")}
                >
                  Skip and Apply
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-start-11 col-end-13">
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default ApplyConfirmation;