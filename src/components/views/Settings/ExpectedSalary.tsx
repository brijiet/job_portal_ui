import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from '../../..';
import { careerProfileUpdate } from '../../../store/reducers/jobSeekerProfile/careerProfileUpdate';
import { clearGetCurrencySlice, currencyGet } from '../../../store/reducers/dropdown/currency';
import AutocompleteBox from '../../commonComponents/AutocompleteBox';
import { separateComma } from '../../utils/currencyFormat';

interface IFormInputs {
  industry: { value: string; label: string; }
  roleCategory: { value: string; label: string; }
  department: { value: string; label: string; }
  jobType: string[]
  jobRole: { value: string; label: string; }
  employeeType: string[]
  preferredShift: string[]
  preferredWorkLocation: string[]
  currency: { value: string; label: string; }
  expectedSalary: string
}

const CareerProfileSchema = yup.object().shape({
  industry: yup.object().shape({
    value: yup.string().required("Please select industry"),
    label: yup.string().required("Please select industry"),
  }).nullable().required("Please select industry"),

  roleCategory: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),

  department: yup.object().shape({
    value: yup.string().required("Please select department"),
    label: yup.string().required("Please select department"),
  }),

  jobType: yup.array()
    .min(1, "Pick at least one job type")
    .of(yup.string().required())
    .required("Please check Job type"),

  jobRole: yup.object().shape({
    value: yup.string().required("Please select job role"),
    label: yup.string().required("Please select job role"),
  }),

  employeeType: yup.array()
    .min(1, "Pick at least one employee type")
    .of(yup.string().required())
    .required("Please check employee type"),

  preferredShift: yup.array()
    .min(1, "Pick at least one preferred shift")
    .of(yup.string().required())
    .required("Please check preferred shift"),

  preferredWorkLocation: yup.array()
    .min(2, 'Pick at least two location')
    .max(10, 'Pick at most ten location').required("Please select preferred work location")
  ,

  currency: yup.object().shape({
    value: yup.string().required("Select currency"),
    label: yup.string().required("Select currency"),
  }),

  expectedSalary: yup.string()
    .matches(/^[0-9,]*$/, 'Expected salary should be Only numbers')
    .required("Expected salary is required field"),

}).required();

const ExpectedSalary = ({ id, profileDashboard, closeExpectedSalaryDialog, setIsExpectedSalaryOpen }: any) => {

  const dispatch = useAppDispatch();
  const { success: currencySuccess, currency } = useAppSelector((state) => state.getCurrency);

  const selectedPreferredWorkLocation: any = [];
  profileDashboard?.careerProfilePreferredLocations?.filter((item: any) => item && selectedPreferredWorkLocation.push({ value: item?.location?.id, label: item?.location?.title }));
  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(CareerProfileSchema),
    defaultValues: {
      preferredWorkLocation: profileDashboard?.careerProfilePreferredLocations && [selectedPreferredWorkLocation],
      jobType: [],
      employeeType: [],
      preferredShift: []
    }
  });

  useEffect(() => {
    if (profileDashboard) {

      const jobType = profileDashboard?.careerProfileJobType?.map((item: any) => (item?.jobType?.id));
      const employeeType = profileDashboard?.careerProfileEmployeeType?.map((item: any) => (item?.employeeType?.id));
      const preferredShift = profileDashboard?.careerProfilePreferredShift?.map((item: any) => (item.preferredShift.id));

      profileDashboard?.industry && setValue('industry', { label: profileDashboard?.industry?.title, value: profileDashboard?.industry?.id });
      profileDashboard?.department && setValue('department', { label: profileDashboard?.department?.title, value: profileDashboard?.department?.id });
      profileDashboard?.careerProfilePreferredLocations && setValue('preferredWorkLocation', selectedPreferredWorkLocation);
      profileDashboard?.roleCategory && setValue('roleCategory', { label: profileDashboard?.roleCategory?.title, value: profileDashboard?.roleCategory?.id });
      profileDashboard?.jobRole && setValue('jobRole', { label: profileDashboard?.jobRole?.title, value: profileDashboard?.jobRole?.id });
      profileDashboard?.expectedSalary && setValue('expectedSalary', profileDashboard?.expectedSalary);
      profileDashboard?.currency && setValue('currency', { label: profileDashboard?.currency?.title, value: profileDashboard?.currency?.id });
      profileDashboard?.careerProfileEmployeeType && setValue('employeeType', employeeType);
      profileDashboard?.careerProfileJobType && setValue('jobType', jobType);
      profileDashboard?.careerProfilePreferredShift && setValue('preferredShift', preferredShift);
    }
  }, [setValue, profileDashboard]);

  useEffect(() => {
    dispatch(currencyGet());
  }, [dispatch]);

  useEffect(() => {

    if (currencySuccess)
      dispatch(clearGetCurrencySlice());

  }, [dispatch, currencySuccess]);

  const onSubmit = (data: IFormInputs) => {
    const jobType = profileDashboard?.careerProfileJobType?.map((item: any) => ({ jobType: item?.jobType?.id }));
    const employeeType = profileDashboard?.careerProfileEmployeeType?.map((item: any) => ({ employeeType: item?.employeeType?.id }));
    const preferredShift = profileDashboard?.careerProfilePreferredShift?.map((item: any) => ({ preferredShift: item?.preferredShift.id }));
    const preferredLocations = profileDashboard.careerProfilePreferredLocations.map((location: any) => ({ location: location?.id }));

    dispatch(careerProfileUpdate({
      industry: profileDashboard?.industry.id,
      department: profileDashboard?.department?.id,
      roleCategory: profileDashboard?.roleCategory?.id,
      jobRole: profileDashboard?.jobRole?.id,
      careerProfileJobType: jobType,
      careerProfileEmployeeType: employeeType,
      careerProfilePreferredLocations: preferredLocations,
      careerProfilePreferredShift: preferredShift,
      currency: data?.currency.value,
      expectedSalary: data?.expectedSalary,
      jobSeekerProfile: id
    })).then(() => {
      setIsExpectedSalaryOpen(false)
    })
  }

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
    <div className="flex flex-col">
      <span className="text-sm text-gray-500 mb-3 mt-2">
        This information will help the recruiters  know about your current job profile and also your desired job criteria. This will also help us personalize your job recommendations.
      </span>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="grid grid-cols-8 gap-4 mt-1">
            <div className="col-span-1">
              <AutocompleteBox
                control={control}
                fieldName={"currency"}
                dropdownData={currency?.map(({ id, title }: any) => ({ value: id, label: title }))}
                default={watch("currency")}
                placeholder={""}
              />
              {errors?.currency && <p className="font-normal text-xs text-red-500 absolute">{errors?.currency?.label?.message}</p>}
            </div>
            <div className="col-span-7">
              <input
                defaultValue={profileDashboard?.expectedSalary}
                className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                placeholder={"Salary"}
                {...register("expectedSalary")}
                onInput={handleInputChange}
              />
              {errors?.expectedSalary && <p className="font-normal text-xs text-red-500">{errors?.expectedSalary?.message}</p>}
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={closeExpectedSalaryDialog}
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

export default ExpectedSalary