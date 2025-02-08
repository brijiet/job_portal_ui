import React, { useEffect, useState } from 'react'
import { getBoardList, getCourseList, getEducationTypeList, getInstituteList, getPassOutYearList, getSpecializationList } from '../../../utils/utils';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../..';
import { jobSeekerEducationAdd } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEducation';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
interface IFormInputs {
  id: number,
  courseType: string,
  education: { value: string; label: string; },
  institute: { value: string; label: string; },
  passingYear: { value: string; label: string; },
  board: { value: string; label: string; },
  percentage: number,
  specialization: { value: string; label: string; },
  course: { value: string; label: string; },
}

const options = ['Part Time', 'Full Time', 'Distance'];

export default function ({ closeDialog, educationDetails, selectedEducation, isEdit }: any) {
  const [courses, setCourses] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [eductionType, setEducationType] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [passOutYear, setPassOutYear] = useState([]);
  const [board, setBoard] = useState([]);

  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);

  const id = profileDashboard?.id;
  const dispatch = useAppDispatch();

  const EducationDetailsSchema = yup.object({
    //currentEmployment: yup.string().required('Current Employment is required'),
    courseType: yup.string().required('Course Type is required'),
    education: yup.object().required('Education is required'),
    institute: yup.object().required('Institute is required'),
    //board: yup.object().required('Board is required'),
    board: yup.object().when("education", {
      is: (education: any) => {
        return (education?.label === '10th' || education?.label === '12th') && true
      },
      then: (schema) => schema.required("Please select board"),
      otherwise: (schema) => schema.notRequired(),
    }),
    //specialization: yup.object().required('Specialization is required'),
    course: yup.object().when("education", {
      is: (education: any) => {
        return (education?.label !== '10th' && education?.label !== '12th') && true
      },
      then: (schema) => schema.required("Please select course"),
      otherwise: (schema) => schema.notRequired(),
    }),
    specialization: yup.object().when("education", {
      is: (education: any) => {
        return (education?.label !== '10th' && education?.label !== '12th') && true
      },
      then: (schema) => schema.required("Please select specialization"),
      otherwise: (schema) => schema.notRequired(),
    }),
    passingYear: yup.object().required('Passing Year is required'),
    percentage: yup.number()
      .min(1, 'Percentage should lie between 1 and 100.')
      .max(100, 'Percentage should lie between 1 and 100.')
      .required('Percentage is required').typeError('Percentage must be a number')
  }).required();
  //react hook form controls
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<IFormInputs | any>({
    defaultValues: {
      courseType: selectedEducation?.courseType && selectedEducation?.courseType,
      education: selectedEducation?.education
        && {
        value: (institute?.filter((item: any) => item?.title === selectedEducation?.education) as any)?.[0]?.id, label: selectedEducation?.education
      },
      institute: selectedEducation?.institute
        && {
        value: (institute?.filter((item: any) => item?.title === selectedEducation?.institute) as any)?.[0]?.id, label: selectedEducation?.institute
      },
      board: selectedEducation?.board
        && {
        value: (board?.filter((item: any) => item?.title === selectedEducation?.board) as any)?.[0]?.id, label: selectedEducation?.board
      },
      course: selectedEducation?.course
        && {
        value: (institute?.filter((item: any) => item?.title === selectedEducation?.course) as any)?.[0]?.id, label: selectedEducation?.course
      },
      specialization: selectedEducation?.specialization
        && {
        value: (institute?.filter((item: any) => item?.title === selectedEducation?.specialization) as any)?.[0]?.id, label: selectedEducation?.specialization
      },
      passingYear: selectedEducation?.passingYear
        && {
        value: (institute?.filter((item: any) => item?.title === selectedEducation?.passingYear) as any)?.[0]?.id, label: selectedEducation?.passingYear
      },
      percentage: selectedEducation?.percentage ? selectedEducation?.percentage : null,
    },
    resolver: yupResolver(EducationDetailsSchema as any)
  });

  useEffect(() => {
    (async () => {
      const courseList = await getCourseList()
      setCourses(courseList as any)
    })();

    (async () => {
      const specializationList = await getSpecializationList()
      setSpecialization(specializationList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const eductionTypeList = await getEducationTypeList()
      const coursesString = [] as any
      if (Object.keys(educationDetails).length && !Object.keys(selectedEducation).length && !isEdit) {
        educationDetails.map((item: any) => {
          coursesString.push(item.education)
          const filteredCourses = eductionTypeList.filter((item1: any) => !coursesString.includes(item1.title))
          setEducationType(filteredCourses as any)
        })
      } else {
        setEducationType(eductionTypeList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const instituteList = await getInstituteList()
      setInstitute(instituteList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const passOutYearList = await getPassOutYearList()
      setPassOutYear(passOutYearList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const boardList = await getBoardList()
      setBoard(boardList as any)
    })();
  }, [])

  // OnSubmit button
  const onSubmit = (data: IFormInputs) => {
    let educationData = [];
    educationData.push({
      jobSeekerProfile: id,
      courseType: data?.courseType,
      education: data?.education?.label,
      board: data?.board?.label,
      institute: data?.institute?.label,
      passingYear: data?.passingYear?.label,
      percentage: data?.percentage,
      specialization: data?.specialization?.label,
      id: selectedEducation?.id ? selectedEducation?.id : null,
      course: data?.course?.label
    })

    dispatch(jobSeekerEducationAdd(educationData as any));
  };

  const filterCoursList = () => {
    const coursesFilter = courses?.filter(({ educationType }: any) => (getValues()?.education?.label == educationType));
    const coursesMap = coursesFilter?.map(({ id, title }: any) => ({ value: id, label: title }));
    return coursesMap;
  }

  const filterSpecializationList = () => {
    const specializationFilter = specialization?.filter(({ course }: any) => (getValues()?.course?.label == course));
    const specializationMap = specializationFilter?.map(({ id, title }: any) => ({ value: id, label: title }));
    return specializationMap;
  }

  const handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    let cleanedValue = inputValue.replace(/[^0-9,]/g, ''); // Remove non-numeric characters
    if (/^0[^,]/.test(inputValue)) {
      inputValue = cleanedValue.substring(1); // Exclude the leading '0' 
    }
    if (inputValue.length >= 3) {
      // Check if the number is within the range of 1 to 100
      if (inputValue >= 101 || inputValue == "000") {
        // Identify the third character and replace it with an empty string
        cleanedValue = inputValue.substring(0, 2) + inputValue.substring(3);
      }
    }
    const formattedValue = cleanedValue === '' ? '' : cleanedValue
    e.target.value = formattedValue;
  };


  return (
    <div className="mt-2">
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-full mb-4">
          <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">Education</label>
          <div className="mt-1">
            <Controller
              control={control}
              name="education"
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  placeholder="Select education"
                  options={eductionType?.map(({ id, title }: any) => ({ value: id, label: title }))}
                  defaultValue={watch('education')}

                />
              )}
            />
            {errors.education && <p className="font-normal text-xs text-red-500">{errors.education.message as string}</p>}
          </div>
        </div>

        {(watch('education')?.label === "10th" || watch('education')?.label === "12th") &&
          <div className="col-span-full mb-4">
            <label htmlFor="board" className="block text-sm font-medium leading-6 text-gray-900">Board</label>
            <div className="mt-1">
              <Controller
                control={control}
                name="board"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Select board"
                    options={board?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch('board')}

                  />
                )}
              />
              {errors.board && <p className="font-normal text-xs text-red-500">{errors.board.message as string}</p>}
            </div>
          </div>
        }

        <div className="col-span-full mb-4">
          <label htmlFor="institute" className="block text-sm font-medium leading-6 text-gray-900">Institute</label>
          <div className="mt-1">
            <Controller
              control={control}
              name="institute"
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  placeholder="Select institute"
                  options={institute?.map(({ id, title }: any) => ({ value: id, label: title }))}
                  defaultValue={watch('institute')}
                />
              )}
            />
            {errors.institute && <p className="font-normal text-xs text-red-500">{errors.institute.message as string}</p>}
          </div>
        </div>

        {(watch('education')?.label !== "10th" && watch('education')?.label !== "12th") &&
          <div className="col-span-full mb-4">
            <label htmlFor="specialization" className="block text-sm font-medium leading-6 text-gray-900">Course</label>
            <div className="mt-1">
              <Controller
                control={control}
                name="course"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Select Course"
                    options={filterCoursList()}
                    defaultValue={watch('course')}
                  />
                )}
              />
              {errors.course && <p className="font-normal text-xs text-red-500">{errors.course.message as string}</p>}
            </div>
          </div>
        }
        {(watch('education')?.label !== "10th" && watch('education')?.label !== "12th") && watch('course') !== undefined && watch('course') !== null &&
          <div className="col-span-full mb-4">
            <label htmlFor="specialization" className="block text-sm font-medium leading-6 text-gray-900">Specialization</label>
            <div className="mt-1">
              <Controller
                control={control}
                name="specialization"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Select specialization"
                    options={filterSpecializationList()}
                    defaultValue={watch('specialization')}
                  />
                )}
              />
              {errors.specialization && <p className="font-normal text-xs text-red-500">{errors.specialization.message as string}</p>}
            </div>
          </div>
        }
        <div className="col-span-full mb-4">
          <label htmlFor="courseType" className="block text-sm font-medium leading-6 text-gray-900">Course Type</label>
          <div className="mt-2 flex justify-between items-center">
            {
              options.map((option) => (
                <div key={option}>
                  <label className="mr-3">
                    {option}
                    <Controller
                      name="courseType"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          type="radio"
                          className="ml-5"
                          {...field}
                          checked={getValues("courseType") === option}
                          onChange={() => {
                            setValue("courseType", option);
                          }}
                        />
                      )}
                    />
                  </label>
                </div>
              ))
            }
          </div>
          {errors.courseType && <p className="font-normal text-xs text-red-500">{errors.courseType.message as string}</p>}
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="passingYear" className="block text-sm font-medium leading-6 text-gray-900">Passing Year</label>
          <div className="mt-1">
            <Controller
              control={control}
              name="passingYear"
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  menuPlacement="top"
                  placeholder="Select passing year"
                  options={passOutYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                  defaultValue={watch('passingYear')}
                />
              )}
            />
            {errors.passingYear && <p className="font-normal text-xs text-red-500">{errors.passingYear.message as string}</p>}
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">Percentage</label>
          <div className="mt-2">
            <Controller
              name="percentage"
              control={control}
              //defaultValue={userData?.name}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  onInput={handleInputChange}
                  className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                  readOnly={false}
                />
              )}
            />
            {errors.percentage && <p className="font-normal text-xs text-red-500">{errors.percentage.message as string}</p>}
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
