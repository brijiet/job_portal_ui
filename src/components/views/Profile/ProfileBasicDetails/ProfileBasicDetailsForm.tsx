import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../..';
import { getCompanyList, getCurrencyList, getLocationList, getNoticePeriodList, getTotalMonthsExpList, getTotalYearsExpList, getjobTitleList } from '../../../utils/utils';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { Controller, useForm } from 'react-hook-form';
import { filterArray } from '../../../utils/filterArray';
import { updateProfileBasicDetails } from '../../../../store/reducers/jobSeekerProfile/profileBasicDetailsUpdate';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAllCompanies } from '../../../../store/reducers/companies/getAllCompanies';
import { removeComma, separateComma } from '../../../utils/currencyFormat';

type Parameters = {
  closeDialog: () => void;
  profileDashboard: any;
  userData: any;
}

interface IFormInputs {
  totalExpMonth: { value: string; label: string; },
  currentJobTitle: { value: string; label: string; },
  currentCompany: { value: string; label: string; },
  totalExpYear: { value: string; label: string; },
  name: string,
  jobSeekerType: string,
  currentLocation: { value: string; label: string; },
  currency:string | undefined,
  currentSalary: string | undefined,
  mobileNumber: string,
  noticePeriod: string,
  email: string,
}

const basicDetailsSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  mobileNumber: yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be a valid 10-digit number'),

    currentSalType: yup.object().when("jobSeekerType", {
      is: 'Experienced',
        then: (schema) => schema.required("Please select currency type"),
        otherwise: (schema) => schema.notRequired(),
    }),
  currentSalary: yup.string().when(
    'jobSeekerType', {
    is: 'Experienced',
    then: (schema) => schema.required("Current salary is required").label('Current salary')
      .matches(/^[0-9,]*$/, 'Current salary should be valid'),
    otherwise: (schema) => schema.notRequired(),
  }
  ),
  jobSeekerType: yup.string()
    .required('Job seeker type is required.'),
  noticePeriod: yup.string().required('Please select a notice period'),
  currentLocation: yup.object().required("Please select current location"),
  totalExpYear: yup.object().when(
    'jobSeekerType', {
    is: 'Experienced',
    then: (schema) => schema.required("Please select total experience years"),
    otherwise: (schema) => schema.notRequired(),
  }),
  totalExpMonth: yup.object().when(
    'jobSeekerType', {
    is: 'Experienced',
    then: (schema) => schema.required("Please select total experience months"),
    otherwise: (schema) => schema.notRequired(),
  }),

  currentCompany: yup.object().when(
    'jobSeekerType', {
    is: 'Experienced',
    then: (schema) => schema.required("Please select current company"),
    otherwise: (schema) => schema.notRequired(),
  }),
  currentJobTitle: yup.object().when(
    'jobSeekerType', {
    is: 'Experienced',
    then: (schema) => schema.required("Please select current company"),
    otherwise: (schema) => schema.notRequired(),
  }),
}).required();


// interface IFormInputs {
//   totalExpMonth: any
//   totalExpYear: any
//   name: string
//   jobSeekerType: string;
//   currentLocation: any
//   currentCurrency: any
//   currentSalary: string
//   mobileNumber: string
//   noticePeriod: any
//   email: string
// }


const ProfileBasicDetailsForm: FC<Parameters> = ({ closeDialog, profileDashboard, userData }) => {
  const dispatch = useAppDispatch();
  // dropdown constants
  const [totalExpMonthList, setTotalExpMonthList] = useState<any>([]);
  const [totalExpYearList, setTotalExpYearList] = useState<any>([]);
  const [locationList, setLocationList] = useState<any>([]);
  const [noticePeriodList, setNoticePeriodList] = useState<any>([]);
  const [companyList, setCompanyList] = useState<any>([]);
  const [jobTitleList, setJobTitleList] = useState<any>([]);

  const [currency, setCurrency] = useState<any>([]);
  const { success, allCompanies } = useAppSelector((state) => state.getAllCompanies);


  //react hook form controls
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<IFormInputs | any>({
    resolver: yupResolver(basicDetailsSchema)
  });

  useEffect(() => {
    if (userData) {
      setValue('email', userData?.email);
      setValue('mobileNumber', userData?.mobileNumber);
      setValue('name', userData?.name);
    }
    if (profileDashboard) {
      setValue('currentLocation', profileDashboard?.currentLocation && { value: profileDashboard?.currentLocation?.id, label: profileDashboard?.currentLocation?.title });
      setValue('currentSalary', profileDashboard?.currentSalary);
      setValue('jobSeekerType', profileDashboard?.jobSeekerType);
      setValue('totalExpMonth', profileDashboard?.totalExpMonth && { value: profileDashboard?.totalExpMonth?.id, label: profileDashboard?.totalExpMonth?.title });
      setValue('totalExpYear', profileDashboard?.totalExpYear && { value: profileDashboard?.totalExpYear?.id, label: profileDashboard?.totalExpYear?.title });
      setValue('currentJobTitle', profileDashboard?.currentJobTitle && { value: profileDashboard?.currentJobTitle?.id, label: profileDashboard?.currentJobTitle?.title });
      setValue('currentCompany', profileDashboard?.currentCompany && { value: profileDashboard?.currentCompany?.id, label: profileDashboard?.currentCompany?.title });
      setValue('noticePeriod', profileDashboard?.noticePeriod?.title);
      setValue('currentSalType',profileDashboard?.careerProfile?.currency && {value:profileDashboard?.careerProfile?.currency?.id, label:profileDashboard?.careerProfile?.currency?.title});
    }
  }, [profileDashboard, setValue, userData])

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

  useEffect(() => {
    dispatch(getAllCompanies({} as any));
  }, [dispatch])

  useEffect(() => {
    setCompanyList(allCompanies as any)
  }, [success])

  useEffect(() => {
    (async () => {
      const jobTitle = await getjobTitleList();
      setJobTitleList(jobTitle);
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      const currencyList = await getCurrencyList()
      if (Object.keys(currencyList)?.length) {
        setCurrency(currencyList as any)
      }
    })();
  }, [])

  const options = ['Fresher', 'Experienced'];

  const handleButtonClick = (noticePeriodOption: any) => {
    setValue("noticePeriod", noticePeriodOption);
  };

  const onSubmit = (data: IFormInputs) => {

    let currancySal = removeComma(data.currentSalary)
    const monthArray = filterArray(totalExpMonthList, parseInt(data?.totalExpMonth?.value));
    const yearArray = filterArray(totalExpYearList, parseInt(data?.totalExpYear?.value));
    const locationArray = filterArray(locationList, parseInt(data?.currentLocation.value));
    const noticeArray = noticePeriodList.filter((notice: any) => notice?.title === data.noticePeriod);
    const companyArray = filterArray(companyList, parseInt(data?.currentCompany?.value));
    const jobTitleArray = filterArray(jobTitleList, parseInt(data?.currentJobTitle?.value));

    data.totalExpMonth = monthArray[0];
    data.totalExpYear = yearArray[0];
    data.currentLocation = locationArray[0];
    data.noticePeriod = noticeArray[0];
    data.currentCompany = companyArray[0];
    data.currentJobTitle = jobTitleArray[0];
    data.currentSalary = currancySal;
    data.currency = currency;
    console.log("data====", data);

    dispatch(updateProfileBasicDetails(data as any));

  };

  const handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/[^0-9,]/g, ''); // Remove non-numeric characters

    if (/^0[^,]/.test(inputValue)) {
      inputValue = cleanedValue.substring(1); // Exclude the leading '0' 
    }

    const formattedValue = cleanedValue === '' ? '' : separateComma(cleanedValue);
    e.target.value = formattedValue;
  };
  
  const noticePeriodClass = "border border-gray-400 py-1 mx-3 px-3 my-2 rounded-2xl";
  const noticePeriodClassHighLighted = "border border-gray-400 py-1 mx-3 px-3 my-2 rounded-2xl bg-slate-200"

  return (
    <div>
      <form action="" id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* <label htmlFor="name" className="font-medium">Name</label> */}
          <h1 className="font-medium mb-2 mt-4">Name</h1>
          <Controller
            name="name"
            control={control}
            defaultValue={userData?.name}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                readOnly={false}
              />
            )}
          />
          {errors.name && <p className="font-normal text-xs text-red-500">{errors.name.message as string}</p>}
        </div>

        <div className="mt-3 mb-6 flex flex-row gap-24">
          {
            options.map((option) => (
              <div key={option}>
                <label className="mr-3">
                  {option}
                  <Controller
                    name="jobSeekerType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="radio"
                        className="ml-5"
                        {...field}
                        checked={getValues("jobSeekerType") === option}
                        onChange={() => {
                          setValue("jobSeekerType", option);
                        }}
                      />
                    )}
                  />
                </label>
                {errors.jobSeekerType && <p className="font-normal text-xs text-red-500">{errors.jobSeekerType.message as string}</p>}
              </div>
            ))
          }
        </div>
        {watch('jobSeekerType') === 'Experienced' &&
          (<div>
            <h1 className="font-medium mb-2 mt-4">Total experience</h1>
            <div className="flex flex-row gap-5">
              <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg">
                <Controller
                  control={control}
                  name="totalExpYear"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder=""
                      options={totalExpYearList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch('totalExpYear')}

                    />
                  )}
                />
                {watch('jobSeekerType') === 'Experienced' && errors.totalExpYear && <p className="font-normal text-xs text-red-500 ">Please select total exp years</p>}
              </div>
              <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg ">
                <Controller
                  control={control}
                  name="totalExpMonth"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder=""
                      options={totalExpMonthList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={getValues("totalExpMonth")}
                    />
                  )}
                />
                {watch('jobSeekerType') === 'Experienced' && errors.totalExpMonth && <p className="font-normal text-xs text-red-500 ">Please select total exp months</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <div>
                  <h1 className="font-medium mb-2 mt-4">Current Company</h1>
                </div>
                <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg">
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
                  {watch('jobSeekerType') === 'Experienced' && errors.currentCompany && <p className="font-normal text-xs text-red-500 ">Please select Current Company</p>}
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex-grow">
                  <h1 className="font-medium mb-2 mt-4">Current Designation</h1>
                </div>
                <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg flex-grow">
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
                  {watch('jobSeekerType') === 'Experienced' && errors.currentJobTitle && <p className="font-normal text-xs text-red-500 ">Please select current designation</p>}
                </div>
              </div>
            </div>
            <h1 className="font-medium mb-2 mt-4">Current salary (Annual Package)</h1>
            <div className="grid grid-cols-8 gap-2 ">
              <div className="mt-1 col-span-1">
              <Controller
               control={control}
               name="currentSalType"
                  render={({ field }) => (
                    <Select
                      {...field}
                      // isClearable
                      placeholder=""
                      options={currency?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={getValues("currentSalType")}
                    />
                  )}
                />
                {errors.currentSalType && <p className="font-normal text-xs text-red-500">{errors.currentSalType.message as string}</p>}
               </div>
              <div className="mt-1 col-span-7">
              <Controller
                  control={control}
                  name="currentSalary"
                  render={({ field }) => (
                    <input
                      {...field}
                      onInput={handleInputChange}
                      value={watch("currentSalary") ? separateComma(watch("currentSalary")) : undefined}
                      // value={watch("currentSalary")}
                      type="text"
                      readOnly={false}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5"
                    />
                  )}
                />
              {errors.currentSalary && <p className="font-normal text-xs text-red-500 ">{errors.currentSalary.message as string}</p>}
             </div>
            </div>
            </div>
          )}
        <div>
          <h1 className="font-medium mb-2 mt-4">Current location</h1>
          <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg  mb-4">
            <Controller
              control={control}
              name="currentLocation"
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  placeholder="Tell us about your current location"
                  options={locationList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                  defaultValue={watch("currentLocation")}
                />
              )}
            />
            {errors.currentLocation && (<p className="font-normal text-xs text-red-500 ">Please select current location </p>)}
          </div>

        </div>
        <h1 className="font-medium mb-2 mt-4">Mobile number</h1>
        <div>
          <Controller
            name="mobileNumber"
            control={control}
            defaultValue={watch("mobileNumber")}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                readOnly={false}
              />
            )}
          />
          {errors.mobileNumber && <p className="font-normal text-xs text-red-500 ">{errors.mobileNumber.message as string}</p>}
        </div>
        <h1 className="font-medium mb-2 mt-4">Email address</h1>
        <Controller
          name="email"
          control={control}
          defaultValue={watch("email")}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
              readOnly={false}
            />
          )}
        />
        {errors.email && <p className="font-normal text-xs text-red-500 ">{errors.email.message as string}</p>}

        <h1 className="font-medium mt-4 mb-2">Notice Period</h1>
        <div className="flex flex-wrap flex-row mt-3">
          {
            noticePeriodList?.map((noticePeriod: any) =>
              <div key={noticePeriod?.id}>
                <Controller
                  name="noticePeriod"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (

                    <div>
                      <button
                        type="button"
                        {...field}
                        className={watch("noticePeriod") === noticePeriod?.title ? noticePeriodClassHighLighted : noticePeriodClass}
                        onClick={() => handleButtonClick(noticePeriod?.title)
                        }
                      >
                        {noticePeriod?.title}
                      </button>
                    </div>
                  )}
                />

              </div>
            )
          }

        </div>
        {errors.noticePeriod && <p className="font-normal text-xs text-red-500">{errors.noticePeriod.message as string}</p>}
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
              type="submit"
              className="rounded-3xl bg-blue-500 text-white px-5 py-1.5" >
              Save
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default ProfileBasicDetailsForm