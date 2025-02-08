import React, { useEffect, useState } from 'react'
import { getCompanyList, getCourseList, getCurrencyList, getDepartmentList, getEducationTypeList, getInstituteList, getJoiningDateMonthList, getJoiningDateYearList, getLocationList, getNoticePeriodList, getPassOutYearList, getTotalMonthsExpList, getTotalYearsExpList, getjobTitleList } from '../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../..';
import { jobSeekerEmploymentAdd } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEmploymentAdd';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { keySkillsGet } from '../../../../store/reducers/dropdown/keySkills';
import { filterArray } from '../../../utils/filterArray';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAllCompanies } from '../../../../store/reducers/companies/getAllCompanies';
import { removeComma, separateComma } from '../../../utils/currencyFormat';

const currentEmployment = ['Yes', 'No'];
const employmentType = ['Full Time', 'Internship'];

interface IFormInputs {
  id: number
  currentEmployment: string
  employmentType: string
  totalExpYears: any
  totalExpMonths: any
  currentCompanyName: any
  currentDesignation: any
  joiningDateYear: any
  joiningDateMonth: any
  currentSalType: any
  currentSalary: any
  skillsUsed: any
  jobProfile: string
  noticePeriod: any
  previousCompanyName: any
  previousDesignation: any
  workedTillYear: any
  workedTillMonth: any
  location: any
  department: any
  role: any
  workedFromYear: any
  workedFromMonth: any
  monthlyStipend: any
}

export default function ({ closeDialog, selectedEmployment }: any) {
  const [experienceYears, setExperienceYears] = useState<any>([]);
  const [experienceMonths, setExperienceMonths] = useState<any>([]);
  const [joiningDateYear, setJoiningDateYear] = useState<any>([]);
  const [joiningDateMonth, setJoiningDateMonth] = useState<any>([]);
  const [skillsUsed, setSkillsUsed] = useState<any>([]);
  const [currentCompany, setCurrentCompany] = useState<any>([]);
  const [designation, setDesignation] = useState<any>([]);
  const [locationList, setLocationList] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [currency, setCurrency] = useState<any>([]);
  const [noticePeriod, setNoticePeriod] = useState<any>([]);

  const dispatch = useAppDispatch();

  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success: keySkillsSuccess, keySkills } = useAppSelector((state) => state.getKeySkills);
  const { success, allCompanies } = useAppSelector((state) => state.getAllCompanies);

  const id = profileDashboard?.id;

  const EmploymentDetailsSchema = yup.object({
    currentEmployment: yup.string().required('Current Employment is required'),
    employmentType: yup.string().required('Employment Type is required'),
    jobProfile: yup.string().when("currentEmployment", {
      //is: 'Yes' || 'No',
      is: (currentEmployment: any) => {
        return (currentEmployment === 'Yes' || currentEmployment === 'No') && true
      },
      then: () => yup.string().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.test(
          'len', 'Minimum 150 characters are required',
          (data: any) => {
            if (data?.length < 150) {
              return false
            } else {
              return true
            }
          }
        ).required("Please enter Job Profile"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    skillsUsed: yup.array().when("currentEmployment", {
      is: 'Yes',
      then: () => yup.array().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.required("Please select skills used"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    previousCompanyName: yup.object().when("currentEmployment", {
      is: 'No',
      then: () => yup.object().when("employmentType", {
        //is: 'Full Time' || 'Internship',
        is: (employmentType: any) => {
          return (employmentType === 'Full Time' || employmentType === 'Internship') && true
        },
        then: (schema) => schema.required("Please select previous company"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    previousDesignation: yup.object().when("currentEmployment", {
      is: 'No',
      then: () => yup.object().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.required("Please select previous designation"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    workedTillYear: yup.object().when("currentEmployment", {
      is: 'No',
      then: () => yup.object().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.required("Please select worked till year"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    workedTillMonth: yup.object().when("currentEmployment", {
      is: 'No',
      then: () => yup.object().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.required("Please select worked till month"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    department: yup.object().when("currentEmployment", {
      //is: 'Yes' || 'No',
      is: (currentEmployment: any) => {
        return (currentEmployment === 'Yes' || currentEmployment === 'No') && true
      },
      then: () => yup.object().when("employmentType", {
        is: 'Internship',
        then: (schema) => schema.required("Please select department"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    role: yup.object().when("currentEmployment", {
      //is: 'Yes' || 'No',
      is: (currentEmployment: any) => {
        return (currentEmployment === 'Yes' || currentEmployment === 'No') && true
      },
      then: () => yup.object().when("employmentType", {
        is: 'Internship',
        then: (schema) => schema.required("Please select role"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    workedFromYear: yup.object().when("currentEmployment", {
      //is: 'Yes' || 'No',
      is: (currentEmployment: any) => {
        return (currentEmployment === 'Yes' || currentEmployment === 'No') && true
      },
      then: () => yup.object().when("employmentType", {
        is: 'Internship',
        //then: (schema) => schema.required("Please select worked from year"),
        //otherwise: (schema) => schema.notRequired(),
        then: (schema) => schema.test(
          'len', 'Working from year cant be less than worked till year',
          (data) => {
            if (parseInt(Object(data)?.label) >= parseInt(watch('workedTillYear')?.label)) {
              return false
            } else {
              return true
            }
          }
        ).required("Please select worked from year"),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    workedFromMonth: yup.object().when("currentEmployment", {
      //is: 'Yes' || 'No',
      is: (currentEmployment: any) => {
        return (currentEmployment === 'Yes' || currentEmployment === 'No') && true
      },
      then: () => yup.object().when("employmentType", {
        is: 'Internship',
        then: (schema) => schema.required("Please select worked from month"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    monthlyStipend: yup.string().when("currentEmployment", {
      //is: 'Yes' || 'No',
      is: (currentEmployment: any) => {
        return (currentEmployment === 'Yes' || currentEmployment === 'No') && true
      },
      then: () => yup.string().when("employmentType", {
        is: 'Internship',
        then: (schema) => schema.required("Please enter the monthly stipend"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    currentCompanyName: yup.object().when("currentEmployment", {
      is: 'Yes',
      then: () => yup.object().when("employmentType", {
        //is: ('Full Time' || 'Internship'),
        is: (employmentType: any) => {
          return (employmentType === 'Full Time' || employmentType === 'Internship') && true
        },
        then: (schema) => schema.required("Please select current company"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    currentDesignation: yup.object().when("currentEmployment", {
      is: 'Yes',
      then: () => yup.object().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.required("Please select current designation"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    currentSalType: yup.object().when("currentEmployment", {
      is: 'Yes',
      then: () => yup.object().when("employmentType", {
        //is: ('Full Time' || 'Internship'),
        is: (employmentType: any) => {
          return (employmentType === 'Full Time' || employmentType === 'Internship') && true
        },
        then: (schema) => schema.required("Please select currency type"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    currentSalary: yup.string().when("currentEmployment", {
      is: 'Yes',
      then: () => yup.string().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.required("Please select current salary"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    noticePeriod: yup.object().when("currentEmployment", {
      is: 'Yes',
      then: () => yup.object().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.required("Please select notice period"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    location: yup.object().when("currentEmployment", {
      //is: 'Yes' || 'No',
      is: (currentEmployment: any) => {
        return (currentEmployment === 'Yes' || currentEmployment === 'No') && true
      },
      then: () => yup.object().when("employmentType", {
        is: 'Internship',
        then: (schema) => schema.required("Please select location"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    totalExpYears: yup.object().when("currentEmployment", {
      is: 'Yes',
      then: () => yup.object().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.required("Please select total experience years"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    totalExpMonths: yup.object().when("currentEmployment", {
      is: 'Yes',
      then: () => yup.object().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.required("Please select total experience months"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    joiningDateYear: yup.object().when("currentEmployment", {
      //is: 'Yes' || 'No',
      is: (currentEmployment: any) => {
        return (currentEmployment === 'Yes' || currentEmployment === 'No') && true
      },
      then: () => yup.object().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.test(
          'len', 'Joining year cant be less than worked till year',
          (data) => {
            if (parseInt(Object(data)?.label) >= parseInt(watch('workedTillYear')?.label)) {
              return false
            } else {
              return true
            }
          }
        ).required("Please select joining date year"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
    joiningDateMonth: yup.object().when("currentEmployment", {
      //is: 'Yes',
      is: (currentEmployment: any) => {
        return (currentEmployment === 'Yes' || currentEmployment === 'No') && true
      },
      then: () => yup.object().when("employmentType", {
        is: 'Full Time',
        then: (schema) => schema.required("Please select joining date month"),
        otherwise: (schema) => schema.notRequired(),
        //   then: (schema) => schema.test(
        //     'len', 'Joining month cant be less than worked till year',
        //     (data) => {          
        //     if (parseInt(watch('workedTillYear')?.label) === parseInt(watch('joiningDateYear')?.label) &&
        //       parseInt(Object(data)?.label)) {                
        //         return false
        //       } else {
        //         return true
        //       }
        //   }
        // ).required("Please select joining date year"),
      }),
      otherwise: (schema) => schema.notRequired(),
    }),
  }).required();

  const selectedSkillsUsed: any = [];
  selectedEmployment?.jobSeekerProfileEmploymentSkills?.filter((item: any) => item && selectedSkillsUsed.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }))
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<IFormInputs>({
    defaultValues: {
      id: profileDashboard?.id && profileDashboard?.id,
      currentEmployment: selectedEmployment?.isCurrentEmployment && selectedEmployment?.isCurrentEmployment === true ? 'Yes' : (selectedEmployment?.isCurrentEmployment === false ? 'No' : 'Yes'),
      employmentType: selectedEmployment?.employmentType ? selectedEmployment?.employmentType : 'Full Time',
      totalExpYears: selectedEmployment?.totalExpYears
        && { value: selectedEmployment?.totalExpYears?.id, label: selectedEmployment?.totalExpYears?.title },
      totalExpMonths: selectedEmployment?.totalExpMonths
        && { value: selectedEmployment?.totalExpMonths?.id, label: selectedEmployment?.totalExpMonths?.title },
      currentCompanyName: selectedEmployment?.companyName
        && { value: currentCompany?.filter(({ id, title }: any) => title === selectedEmployment?.companyName && id), label: selectedEmployment?.companyName },
      currentDesignation: selectedEmployment?.designation
        //? selectedEmployment?.designation : '',
        && { value: designation?.filter(({ id, title }: any) => title === selectedEmployment?.designation && id), label: selectedEmployment?.designation },
      currentSalType: selectedEmployment?.currencyType
        //? selectedEmployment?.currencyType : '',
        && { value: selectedEmployment?.currencyType?.id, label: selectedEmployment?.currencyType?.title },
      // currentSalary: selectedEmployment?.currentSalary ? selectedEmployment?.currentSalary : null,
      skillsUsed: selectedEmployment?.jobSeekerProfileEmploymentSkills
        //? selectedEmployment?.jobSeekerProfileEmploymentSkills : '',
        && selectedSkillsUsed,
      jobProfile: selectedEmployment?.jobProfile && selectedEmployment?.jobProfile,
      noticePeriod: selectedEmployment?.noticePeriod
        //? selectedEmployment?.noticePeriod : '',
        && { value: selectedEmployment?.noticePeriod?.id, label: selectedEmployment?.noticePeriod?.title },
      previousCompanyName: selectedEmployment?.companyName
        //? selectedEmployment?.companyName : '',    
        && { value: currentCompany?.filter(({ id, title }: any) => title === selectedEmployment?.companyName && id), label: selectedEmployment?.companyName },
      previousDesignation: selectedEmployment?.designation
        //? selectedEmployment?.designation : '',
        && { value: designation?.filter(({ id, title }: any) => title === selectedEmployment?.designation && id), label: selectedEmployment?.designation },
      joiningDateYear: selectedEmployment?.joiningDateYear
        //? selectedEmployment?.joiningDateYear : null,
        && { value: selectedEmployment?.joiningDateYear?.id, label: selectedEmployment?.joiningDateYear?.title },
      joiningDateMonth: selectedEmployment?.joiningDateMonth
        //? selectedEmployment?.joiningDateMonth : null,
        && { value: selectedEmployment?.joiningDateMonth?.id, label: selectedEmployment?.joiningDateMonth?.title },
      workedFromMonth: selectedEmployment?.workedFromMonth
        //? selectedEmployment?.joiningDateMonth
        && {
        value: filterArray(joiningDateYear, selectedEmployment?.workedFromMonth)?.[0]?.id
        //joiningDateYear?.filter(({ id }: any) => id === selectedEmployment?.workedTillYear)?.[0]?.id
        , label: filterArray(joiningDateYear, selectedEmployment?.workedFromMonth)?.[0]?.title
        //joiningDateYear?.filter(({ id }: any) => id === selectedEmployment?.workedTillYear)?.[0]?.title
      },
      workedTillYear: selectedEmployment?.workedTillYear
        //? selectedEmployment?.workedTillYear : '',
        && {
        value: filterArray(joiningDateYear, selectedEmployment?.workedTillYear)?.[0]?.id
        //joiningDateYear?.filter(({ id }: any) => id === selectedEmployment?.workedTillYear)?.[0]?.id
        , label: filterArray(joiningDateYear, selectedEmployment?.workedTillYear)?.[0]?.title
        //joiningDateYear?.filter(({ id }: any) => id === selectedEmployment?.workedTillYear)?.[0]?.title
      },
      workedTillMonth: selectedEmployment?.workedTillMonth
        && {
        value: filterArray(joiningDateYear, selectedEmployment?.workedTillMonth)?.[0]?.id
        //joiningDateYear?.filter(({ id }: any) => id === selectedEmployment?.workedTillYear)?.[0]?.id
        , label: filterArray(joiningDateYear, selectedEmployment?.workedTillMonth)?.[0]?.title
        //joiningDateYear?.filter(({ id }: any) => id === selectedEmployment?.workedTillYear)?.[0]?.title
      },
      location: selectedEmployment?.location
        //? selectedEmployment?.locationId : '',     
        && { value: selectedEmployment?.location?.id, label: selectedEmployment?.location?.title },
      department: selectedEmployment?.department
        //? selectedEmployment?.departmentId : '',
        && { value: selectedEmployment?.department?.id, label: selectedEmployment?.department?.title },
      // role: selectedEmployment?.role
      // //? selectedEmployment?.departmentId : '',
      // //&& { value: selectedEmployment?.role?.id, label: selectedEmployment?.role?.title },
      // && {
      //   value: filterArray(designation, selectedEmployment?.role)?.[0]?.id
      //   //joiningDateYear?.filter(({ id }: any) => id === selectedEmployment?.workedTillYear)?.[0]?.id
      //   , label: filterArray(designation, selectedEmployment?.role)?.[0]?.title
      //   //joiningDateYear?.filter(({ id }: any) => id === selectedEmployment?.workedTillYear)?.[0]?.title
      // },
      // monthlyStipend: selectedEmployment?.monthlyStipend && selectedEmployment?.monthlyStipend,
    },
    resolver: yupResolver(EmploymentDetailsSchema as any)
  });

  useEffect(() => {
    const workedFromYear = filterArray(joiningDateYear, selectedEmployment?.workedFromYear)
    const workedFromMonth = filterArray(joiningDateMonth, selectedEmployment?.workedFromMonth)
    const workedTillYear = filterArray(joiningDateYear, selectedEmployment?.workedTillYear)
    const workedTillMonth = filterArray(joiningDateMonth, selectedEmployment?.workedTillMonth)
    const role = filterArray(designation, undefined, selectedEmployment?.role)

    setValue('workedFromYear', selectedEmployment?.workedFromYear &&
    {
      value: workedFromYear?.[0]?.id,
      label: workedFromYear?.[0]?.title
    }
    );
    setValue('workedFromMonth', selectedEmployment?.workedFromMonth &&
    {
      value: workedFromMonth?.[0]?.id,
      label: workedFromMonth?.[0]?.title
    }
    );
    setValue('workedTillYear', selectedEmployment?.workedTillYear &&
    {
      value: workedTillYear?.[0]?.id,
      label: workedTillYear?.[0]?.title
    }
    );
    setValue('workedTillMonth', selectedEmployment?.workedTillMonth &&
    {
      value: workedTillMonth?.[0]?.id,
      label: workedTillMonth?.[0]?.title
    }
    );
    setValue('role', selectedEmployment?.role &&
    {
      value: role?.[0]?.id,
      label: role?.[0]?.title
    }
    );
    selectedEmployment?.currentSalary && setValue('currentSalary', separateComma(selectedEmployment?.currentSalary))
    selectedEmployment?.monthlyStipend && setValue('monthlyStipend', separateComma(selectedEmployment?.monthlyStipend));
  }, [selectedEmployment, setValue, joiningDateYear, designation])

  useEffect(() => {
    dispatch(keySkillsGet());
  }, [dispatch]);

  useEffect(() => {
    setSkillsUsed(keySkills as any)
  }, [keySkills])

  useEffect(() => {
    const page = 1;
    dispatch(getAllCompanies({}));
  }, [dispatch])

  useEffect(() => {
    setCurrentCompany(allCompanies as any)
  }, [success])

  useEffect(() => {
    (async () => {
      const currentDesignationList = await getjobTitleList()
      setDesignation(currentDesignationList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const departmentList = await getDepartmentList()
      setDepartment(departmentList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const locationList = await getLocationList()
      setLocationList(locationList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const experienceYearsList = await getTotalYearsExpList()
      if (Object.keys(experienceYearsList)?.length) {
        setExperienceYears(experienceYearsList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const experienceMonthsList = await getTotalMonthsExpList()
      if (Object.keys(experienceMonthsList)?.length) {
        setExperienceMonths(experienceMonthsList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const joiningDateYearList = await getJoiningDateYearList()
      if (Object.keys(joiningDateYearList)?.length) {
        setJoiningDateYear(joiningDateYearList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const joiningDateMonthList = await getJoiningDateMonthList()
      if (Object.keys(joiningDateMonthList)?.length) {
        setJoiningDateMonth(joiningDateMonthList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const currencyList = await getCurrencyList()
      if (Object.keys(currencyList)?.length) {
        setCurrency(currencyList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const noticePeriodList = await getNoticePeriodList()
      if (Object.keys(noticePeriodList)?.length) {
        setNoticePeriod(noticePeriodList as any)
      }
    })();
  }, [])

  // OnSubmit button
  const onSubmit = (data: IFormInputs) => {
    // const months = [
    //   'Jan', 'Feb', 'Mar', 'Apr',
    //   'May', 'June', 'July', 'Aug',
    //   'Sep', 'Oct', 'Nov', 'Dec'
    // ];
    let currancySal = removeComma(data.currentSalary)
    let monthlyStip = removeComma(data.monthlyStipend)
    let selectedSkillsUsed: any = [];
    data?.skillsUsed?.filter((item: any) => item && selectedSkillsUsed.push(item?.value))

    const empData: any = {
      //...(data?.id && { id: data?.id }),
      id: selectedEmployment?.id ? selectedEmployment?.id : null,
      jobSeekerProfile: id,
      isCurrentEmployment: data.currentEmployment === "Yes" ? true : false,
      employmentType: data?.employmentType,
      totalExpYears: data?.totalExpYears?.value,
      totalExpMonths: data?.totalExpMonths?.value,
      companyName: data.currentEmployment === "Yes" ? data?.currentCompanyName?.label : data.previousCompanyName?.label,
      designation: data.currentEmployment === "Yes" ? data.currentDesignation?.label : data.previousDesignation?.label,
      joiningDateYear: data.joiningDateYear ? data.joiningDateYear?.value : null,
      joiningDateMonth: data.joiningDateMonth ? (data.joiningDateMonth?.value as any) : null,
      currencyType: data.currentSalType?.value,
      currentSalary: currancySal,
      jobSeekerProfileEmploymentSkills: selectedSkillsUsed,
      jobProfile: data.jobProfile,
      noticePeriod: data.noticePeriod?.value,
      //previousCompanyName: data.companyName,    
      //previousDesignation: data.designation,
      workedTillYear: data.workedTillYear ? (data.workedTillYear?.value as any) : null,
      workedTillMonth: data.workedTillMonth ? (data.workedTillMonth?.value as any) : null,
      location: data.location?.value,
      department: data.department?.value,
      role: data.role?.label,
      workedFromYear: data.workedFromYear ? (data.workedFromYear?.value as any) : null,
      workedFromMonth: data.workedFromMonth ? (data.workedFromMonth?.value as any) : null,
      monthlyStipend: monthlyStip,
    }

    dispatch(jobSeekerEmploymentAdd(empData as any));
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

  return (
    <div className="mt-3">
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-full mb-4">
          <label htmlFor="currentEmployment" className="block text-sm font-medium leading-6 text-gray-900">Is this your current employment?</label>
          <div className="grid grid-cols-4 gap-4 mt-2 justify-between items-center">
            {
              currentEmployment.map((option) => (
                <div key={option}>
                  <label className="mr-3">
                    {option}
                    <Controller
                      name="currentEmployment"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          type="radio"
                          className="ml-5"
                          {...field}
                          checked={getValues("currentEmployment") === option}
                          onChange={() => {
                            setValue("currentEmployment", option);
                          }}
                        />
                      )}
                    />
                  </label>

                </div>
              ))
            }
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="employmentType" className="block text-sm font-medium leading-6 text-gray-900">Employment type</label>
          <div className="grid grid-cols-4 gap-4 mt-2 flex justify-between items-center">
            {
              employmentType.map((option) => (
                <div key={option}>
                  <label className="mr-3">
                    {option}
                    <Controller
                      name="employmentType"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          type="radio"
                          className="ml-5"
                          {...field}
                          checked={getValues("employmentType") === option}
                          onChange={() => {
                            setValue("employmentType", option);
                          }}
                        />
                      )}
                    />
                  </label>

                </div>
              ))
            }
          </div>
        </div>

        {watch('currentEmployment') === "Yes" && watch('employmentType') === "Full Time" &&
          <div className="mb-4">
            <label htmlFor="totalExp" className="block text-sm font-medium leading-6 text-gray-900">Total Experience</label>
            <div className="grid grid-cols-4 gap-4 ">
              <div className="mt-1 col-span-2">
                <Controller
                  control={control}
                  name="totalExpYears"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder="select experience years"
                      options={experienceYears?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch("totalExpYears")}
                    />
                  )}
                />
                {errors.totalExpYears && <p className="font-normal text-xs text-red-500">{errors?.totalExpYears?.message as any}</p>}
              </div>
              <div className="mt-1 col-span-2">
                <Controller
                  control={control}
                  name="totalExpMonths"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder="select experience months"
                      options={experienceMonths?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch("totalExpMonths")}
                    />
                  )}
                />
                {errors.totalExpMonths && <p className="font-normal text-xs text-red-500">Please select total months</p>}
              </div>
            </div>
          </div>
        }

        {watch('currentEmployment') === "Yes" &&
          <div className="col-span-full mb-4">
            <label htmlFor="currentCompanyName" className="block text-sm font-medium leading-6 text-gray-900">Current Company Name</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="currentCompanyName"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your current company"
                    options={currentCompany?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("currentCompanyName")}
                  />
                )}
              />
              {errors.currentCompanyName && <p className="font-normal text-xs text-red-500">{errors.currentCompanyName.message as string}</p>}
            </div>
          </div>
        }

        {watch('currentEmployment') === "No" &&
          <div className="col-span-full mb-4">
            <label htmlFor="previousCompanyName" className="block text-sm font-medium leading-6 text-gray-900">Previous Company Name</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="previousCompanyName"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your previous company"
                    options={currentCompany?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("previousCompanyName")}
                  />
                )}
              />
              {errors.previousCompanyName && <p className="font-normal text-xs text-red-500">{errors.previousCompanyName.message as string}</p>}
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Internship") &&
          <div className="col-span-full mb-4">
            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your location"
                    options={locationList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("location")}
                  />
                )}
              />
              {errors.location && <p className="font-normal text-xs text-red-500">{errors.location.message as string}</p>}
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Internship") &&
          <div className="col-span-full mb-4">
            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">Department</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="department"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your department"
                    options={department?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("department")}
                  />
                )}
              />
              {errors.department && <p className="font-normal text-xs text-red-500">{errors.department.message as string}</p>}
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Internship") &&
          <div className="col-span-full mb-4">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Role</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your role"
                    options={designation?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("role")}
                  />
                )}
              />
              {errors.role && <p className="font-normal text-xs text-red-500">{errors.role.message as string}</p>}
            </div>
          </div>
        }

        {watch('currentEmployment') === "Yes" && watch('employmentType') === "Full Time" &&
          <div className="col-span-full mb-4">
            <label htmlFor="currentDesignation" className="block text-sm font-medium leading-6 text-gray-900">Current Designation</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="currentDesignation"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your current designation"
                    options={designation?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("currentDesignation")}
                  />
                )}
              />
              {errors.currentDesignation && <p className="font-normal text-xs text-red-500">{errors.currentDesignation.message as string}</p>}
            </div>
          </div>
        }

        {(watch('currentEmployment') === "No" && watch('employmentType') === "Full Time") &&
          <div className="col-span-full mb-4">
            <label htmlFor="previousDesignation" className="block text-sm font-medium leading-6 text-gray-900">Previous Designation</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="previousDesignation"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your previous designation"
                    options={designation?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("previousDesignation")}
                  />
                )}
              />
              {errors.previousDesignation && <p className="font-normal text-xs text-red-500">{errors.previousDesignation.message as string}</p>}
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Full Time") &&
          <div className="mb-4">
            <label htmlFor="joiningDate" className="block text-sm font-medium leading-6 text-gray-900">Joining Date</label>
            <div className="grid grid-cols-4 gap-4 ">
              <div className="mt-1 col-span-2">
                <Controller
                  control={control}
                  name="joiningDateYear"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder="select joining year"
                      options={joiningDateYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch("joiningDateYear")}
                    />
                  )}
                />
                {errors.joiningDateYear && <p className="font-normal text-xs text-red-500">{errors.joiningDateYear.message as string}</p>}
              </div>
              <div className="mt-1 col-span-2">
                <Controller
                  control={control}
                  name="joiningDateMonth"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder="select joining month"
                      options={joiningDateMonth?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch("joiningDateMonth")}
                    />
                  )}
                />
                {errors.joiningDateMonth && <p className="font-normal text-xs text-red-500">{errors.joiningDateMonth.message as string}</p>}
              </div>
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Internship") &&
          <div className="mb-4">
            <label htmlFor="workingFrom" className="block text-sm font-medium leading-6 text-gray-900">Working From</label>
            <div className="grid grid-cols-4 gap-4 ">
              <div className="mt-1 col-span-2">
                <Controller
                  control={control}
                  name="workedFromYear"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      menuPlacement="top"
                      placeholder="select working from year"
                      options={joiningDateYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch("workedFromYear")}
                    />
                  )}
                />
                {errors.workedFromYear && <p className="font-normal text-xs text-red-500">{errors.workedFromYear.message as string}</p>}
              </div>
              <div className="mt-1 col-span-2">
                <Controller
                  control={control}
                  name="workedFromMonth"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      menuPlacement="top"
                      placeholder="select worked from month"
                      options={joiningDateMonth?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch("workedFromMonth")}
                    />
                  )}
                />
                {errors.workedFromMonth && <p className="font-normal text-xs text-red-500">{errors.workedFromMonth.message as string}</p>}
              </div>
            </div>
          </div>
        }

        {watch('currentEmployment') === 'No' &&
          <div className="mb-4">
            <label htmlFor="workedTill" className="block text-sm font-medium leading-6 text-gray-900">Worked Till</label>
            <div className="grid grid-cols-4 gap-4 ">
              <div className="mt-1 col-span-2">
                <Controller
                  control={control}
                  name="workedTillYear"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      menuPlacement="top"
                      placeholder="select worked till year"
                      options={joiningDateYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch("workedTillYear")}
                    />
                  )}
                />
                {errors.workedTillYear && <p className="font-normal text-xs text-red-500">{errors.workedTillYear.message as string}</p>}
              </div>
              <div className="mt-1 col-span-2">
                <Controller
                  control={control}
                  name="workedTillMonth"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      menuPlacement="top"
                      placeholder="select worked till month"
                      options={joiningDateMonth?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch("workedTillMonth")}
                    />
                  )}
                />
                {errors.workedTillMonth && <p className="font-normal text-xs text-red-500">{errors.workedTillMonth.message as string}</p>}
              </div>
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Internship") &&
          <div className="mb-4">
            <label htmlFor="monthlyStipend" className="block text-sm font-medium leading-6 text-gray-900">Monthly Stipend</label>
            <div className="grid grid-cols-8 gap-4 ">
              <div className="mt-1 col-span-1">
                <Controller
                  control={control}
                  name="currentSalType"
                  render={({ field }) => (
                    <Select
                      {...field}
                      //isClearable
                      placeholder=""
                      options={currency?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch("currentSalType")}
                    />
                  )}
                />
                {errors.currentSalType && <p className="font-normal text-xs text-red-500">{errors.currentSalType.message as string}</p>}
              </div>
              <div className="mt-1 col-span-7">
                <Controller
                  name="monthlyStipend"
                  control={control}
                  //defaultValue={userData?.name}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      onInput={handleInputChange}
                      value={watch("monthlyStipend") ? separateComma(watch("monthlyStipend")) : undefined}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                      readOnly={false}
                    />
                  )}
                />
                {errors.monthlyStipend && <p className="font-normal text-xs text-red-500">{errors.monthlyStipend.message as string}</p>}
              </div>
            </div>
          </div>
        }



        {watch('currentEmployment') === "Yes" && watch('employmentType') === "Full Time" &&
          <div className="mb-4">
            <label htmlFor="currentSalary" className="block text-sm font-medium leading-6 text-gray-900">Current Salary</label>
            <div className="grid grid-cols-8 gap-4 ">
              <div className="mt-1 col-span-1">
                <Controller
                  control={control}
                  name="currentSalType"
                  render={({ field }) => (
                    <Select
                      {...field}
                      //isClearable
                      placeholder=""
                      options={currency?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch("currentSalType")}
                    />
                  )}
                />
                {errors.currentSalType && <p className="font-normal text-xs text-red-500">{errors.currentSalType.message as string}</p>}
              </div>
              <div className="mt-1 col-span-7">
                <Controller
                  name="currentSalary"
                  control={control}
                  //defaultValue={userData?.name}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      onInput={handleInputChange}
                      value={watch("currentSalary") ? separateComma(watch("currentSalary")) : undefined}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                      readOnly={false}
                    />
                  )}
                />
                {errors.currentSalary && <p className="font-normal text-xs text-red-500">{errors.currentSalary.message as string}</p>}
              </div>
            </div>
          </div>
        }

        {watch('currentEmployment') === "Yes" && watch('employmentType') === "Full Time" &&
          <div className="col-span-full mb-4">
            <label htmlFor="skillsUsed" className="block text-sm font-medium leading-6 text-gray-900">Skills Used</label>
            <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg  mb-6">
              <Controller
                control={control}
                name="skillsUsed"
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    isClearable
                    placeholder="Tell us about your skills"
                    options={skillsUsed?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("skillsUsed")}
                  />
                )}
              />
            </div>
            {errors.skillsUsed && <p className="font-normal text-xs text-red-500">{errors.skillsUsed.message as string}</p>}
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Full Time") &&
          <div className="col-span-full mb-4">
            <label htmlFor="jobProfile" className="block text-sm font-medium leading-6 text-gray-900">Job Profile</label>
            <div className="mt-2">
              <Controller
                name="jobProfile"
                control={control}
                //defaultValue={userData?.name}
                render={({ field }) => (
                  <textarea
                    {...field}
                    defaultValue={''}
                    maxLength={1000}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={false}
                  />
                )}
              />
              {errors.jobProfile && <p className="font-normal text-xs text-red-500">{errors.jobProfile.message as string}</p>}
              <div className="text-xs font-light text-gray-600 text-right">
                {watch('jobProfile')?.length ? 1000 - watch('jobProfile')?.length : 1000} character(s) left
              </div>
            </div>
          </div>
        }

        {watch('currentEmployment') === "Yes" && watch('employmentType') === "Full Time" &&
          <div className="col-span-full mb-4">
            <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">Notice Period</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="noticePeriod"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    menuPlacement="top"
                    placeholder="select notice period"
                    options={noticePeriod?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("noticePeriod")}
                  />
                )}
              />
              {errors.noticePeriod && <p className="font-normal text-xs text-red-500">{errors.noticePeriod.message as string}</p>}
            </div>
          </div>
        }

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
              form='my-form' type="submit"
              className={"rounded-3xl bg-blue-500 text-white px-5 py-1.5"}
            //disabled={watchProfileSummary === 0 || watch('profileSummary') === null}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
