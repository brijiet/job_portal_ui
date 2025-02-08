import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { getGenderList, getMaritalStatusList, getDayList, getJoiningDateMonthList, getJoiningDateYearList, getCategoryList, getProficiencyList } from '../../../utils/utils';
import { personalDetails } from '../../../../store/reducers/jobSeekerProfile/personalDetails';
import { deletePersonalDetailsLanguages } from '../../../../store/reducers/jobSeekerProfile/deletePersonalDetailsLanguages';
import { useAppDispatch } from '../../../../';

const SignUpSchema = yup
    .object({
        gender: yup.string().label("Gender").required(),
        maritalStatus: yup.string().label("Marital status").required(),
        day: yup.mixed().required('Date is required field').test({
            name: 'valid-day',
            message: 'Please select a valid date.',
            exclusive: true,
            test: function (value:any) {
                const { month, year } = this.parent;
                if (!value || !value?.label) {
                    return true;
                }
                const monthNumber = new Date(`${month?.label} 1, ${year?.label}`).getMonth() + 1;
                const daysInMonth = new Date(Number(year?.label), monthNumber, 0).getDate();
                const selectedDay = Number(value?.label);
                return !isNaN(selectedDay) && selectedDay >= 1 && selectedDay <= daysInMonth;
            },
        }),
        month: yup.mixed().required().label("Month"),
        year: yup.mixed().required().label("Year"),
        category: yup.string().label("Category").required(),
        differentlyAbled: yup.boolean().label("Differently abled").required(),
        careerBreak: yup.boolean().label("Career Break").required(),
        permanentAddress: yup.string().label("permanent Address").required(),
        homeTown: yup.string().label("Home Town").required(),
        pinCode: yup.string().label("Pincode").matches(/^[a-zA-z0-9,]*$/, 'Pincode accepts only numbers and characters.').required(),
        language: yup
            .array()
            .of(
                yup.object({
                    language: yup.string().required().label("Language"),
                    proficiency: yup.object().shape({
                        value: yup.string().required(),
                        label: yup.string().required(),
                    }),
                })
            )
            .required(),
    })
    .required();

const PersonalDetailsForm = ({ closeDialog, defaultPersonalDetails, id }: any) => {
    const dispatch = useAppDispatch();
    const [genderList, setGenderList] = useState([]);
    const [maritalStatusList, setMaritalStatusList] = useState([]);
    const [dayList, setDayList] = useState([]);
    const [monthList, setMonthList] = useState([]);
    const [yearList, setYearList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [proficiencyList, setProficiencyList] = useState([]);
    const [deletedLanguages, setDeletedLanguages] = useState<number[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        formState: { errors }
    } = useForm<any>({
        defaultValues: {
            gender: defaultPersonalDetails?.gender,
            maritalStatus: defaultPersonalDetails?.maritalStatus,
            category: defaultPersonalDetails?.category,
            differentlyAbled: defaultPersonalDetails?.differentlyAbled,
            careerBreak: defaultPersonalDetails?.careerBreak,
            permanentAddress: defaultPersonalDetails?.permanentAddress,
            homeTown: defaultPersonalDetails?.homeTown,
            pinCode: defaultPersonalDetails?.pinCode,
            language: [],
        },
        resolver: yupResolver(SignUpSchema)
    });

    const { fields, append, remove } = useFieldArray({
        name: 'language',
        control
    });

    useEffect(() => {
        setValue('day', dayList?.find((item: any) => item?.label === defaultPersonalDetails?.birthDate?.split("-")?.[0]));
        setValue('month', monthList?.find((item: any) => item?.label === defaultPersonalDetails?.birthDate?.split("-")?.[1]));
        setValue('year', yearList?.find((item: any) => item?.label === defaultPersonalDetails?.birthDate?.split("-")?.[2]));
        setValue('language', defaultPersonalDetails?.language?.length !== undefined ? defaultPersonalDetails?.language?.map((item: any) => {
            return {
                languageId: item?.languageId,
                language: item?.language,
                proficiency: proficiencyList?.find((field: any) => field?.label === item?.proficiency),
                read: item?.read,
                write: item?.write,
                speak: item?.speak
            }
        }) : []);
    }, [setValue, defaultPersonalDetails, dayList, monthList, yearList]);

    useEffect(() => {
        (async () => {
            const genderList = await getGenderList();
            setGenderList(genderList);
        })();
        (async () => {
            const maritalStatusList = await getMaritalStatusList();
            setMaritalStatusList(maritalStatusList);
        })();
        (async () => {
            const dayList = await getDayList();
            setDayList(dayList?.map(({ id, day }: any) => ({ value: id, label: day })));
        })();
        (async () => {
            const monthList = await getJoiningDateMonthList();
            setMonthList(monthList?.map(({ id, title }: any) => ({ value: id, label: title })));
        })();
        (async () => {
            const yearList = await getJoiningDateYearList();
            setYearList(yearList?.map(({ id, title }: any) => ({ value: id, label: title })));
        })();
        (async () => {
            const categoryList = await getCategoryList();
            setCategoryList(categoryList);
        })();
        (async () => {
            const proficiencyList = await getProficiencyList();
            setProficiencyList(proficiencyList?.map(({ id, title }: any) => ({ value: id, label: title })));
        })();
    }, []);

    const onSubmit = (data: any) => {
        dispatch(personalDetails({
            ...(defaultPersonalDetails?.id && { id: defaultPersonalDetails?.id }),
            jobSeekerProfile: id,
            gender: data?.gender,
            maritalStatus: data?.maritalStatus,
            birthDate: `${data?.day?.label}-${data?.month?.label}-${data?.year?.label}`,
            category: data?.category,
            differentlyAbled: data?.differentlyAbled,
            careerBreak: data?.careerBreak,
            permanentAddress: data?.permanentAddress,
            homeTown: data?.homeTown,
            pinCode: data?.pinCode,
            ...(data?.language.length > 0 && {
                language: data?.language?.map((item: any) => {
                    return {
                        ...item,
                        proficiency: item?.proficiency?.label
                    }
                })
            })
        })).then(() => {
            if (deletedLanguages?.length > 0) {
                dispatch(deletePersonalDetailsLanguages(deletedLanguages)).then(() => setDeletedLanguages([]));
            }
        })
    };

    return (
        <div className="mt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <h6 className="font-semibold">Gender</h6>
                    <div className="flex flex-wrap">
                        {genderList?.map((item: any) => (
                            <button type="button" className={watch('gender') === item?.title ? "border border-gray-700 bg-gray-300 px-3 py-1.5 rounded-3xl mr-2 mt-2 cursor-pointer text-sm m-0 p-0" : "border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2 cursor-pointer text-sm m-0 p-0"} onClick={() => setValue('gender', item?.title)}>{item?.title}</button>
                        ))}
                    </div>
                    {errors.gender && <p className="font-normal text-xs text-red-500 mt-1">{errors.gender.message as string}</p>}
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold">Marital status</h6>
                    <div className="flex flex-wrap">
                        {maritalStatusList?.map((item: any) => (
                            <button type="button" className={watch('maritalStatus') === item?.title ? "border border-gray-700 bg-gray-300 px-3 py-1.5 rounded-3xl mr-2 mt-2 cursor-pointer" : "border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2 cursor-pointer"} onClick={() => setValue('maritalStatus', item?.title)}>{item?.title}</button>
                        ))}
                    </div>
                    {errors.maritalStatus && <p className="font-normal text-xs text-red-500 mt-1">{errors.maritalStatus.message as string}</p>}
                </div>
                <div className="mb-5">
                    <h6 className="mb-2 font-semibold">Date of birth</h6>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Controller
                                name="day"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        isSearchable={true}
                                        className="text-sm"
                                        classNamePrefix="dropdown"
                                        options={dayList}
                                        defaultValue={watch('day')}
                                        placeholder="DD"

                                    />
                                )}
                            />
                            {errors.day && <p className="font-normal text-xs text-red-500 mt-1">{errors.day.message as string}</p>}
                        </div>
                        <div>
                            <Controller
                                name="month"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        isSearchable={true}
                                        className="text-sm"
                                        classNamePrefix="dropdown"
                                        options={monthList}
                                        defaultValue={watch('month')}
                                        placeholder="MM"

                                    />
                                )}
                            />
                            {errors.month && <p className="font-normal text-xs text-red-500 mt-1">{errors.month.message as string}</p>}
                        </div>
                        <div>
                            <Controller
                                name="year"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        isSearchable={true}
                                        className="text-sm"
                                        classNamePrefix="dropdown"
                                        options={yearList}
                                        defaultValue={watch('year')}
                                        placeholder="YYYY"

                                    />
                                )}
                            />
                            {errors.year && <p className="font-normal text-xs text-red-500 mt-1">{errors.year.message as string}</p>}
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold">Category</h6>
                    <p className="text-gray-400">Companies welcome people from various categories to bring equality among all citizens</p>
                    <div className="flex flex-wrap">
                        {categoryList?.map((item: any) => (
                            <button type="button" className={watch('category') === item?.title ? "border border-gray-700 bg-gray-300 px-3 py-1.5 rounded-3xl mr-2 mt-2 cursor-pointer" : "border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2 cursor-pointer"} onClick={() => setValue('category', item?.title)}>{item?.title}</button>
                        ))}
                    </div>
                    {errors.category && <p className="font-normal text-xs text-red-500 mt-1">{errors.category.message as string}</p>}
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold mb-3">Are you differently abled?</h6>
                    <div className="flex justify-between w-1/3">
                        <div>
                            <input
                                type="radio"
                                name="differentlyAbled"
                                onClick={() => setValue('differentlyAbled', true)}
                                checked={watch('differentlyAbled')}
                            />
                            <label className="ml-1">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="differentlyAbled"
                                onClick={() => setValue('differentlyAbled', false)}
                                checked={watch('differentlyAbled') === undefined || null ? false : !watch('differentlyAbled')}
                            />
                            <label className="ml-1">No</label>
                        </div>
                    </div>
                    {errors.differentlyAbled && <p className="font-normal text-xs text-red-500 mt-1">{errors.differentlyAbled.message as string}</p>}
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold mb-3">Have you taken a career break?</h6>
                    <div className="flex justify-between w-1/3">
                        <div>
                            <input
                                type="radio"
                                name="break"
                                onClick={() => setValue('careerBreak', true)}
                                checked={watch('careerBreak')}
                            />
                            <label className="ml-1">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="break"
                                onClick={() => setValue('careerBreak', false)}
                                checked={watch('careerBreak') === undefined || null ? false : !watch('careerBreak')}
                            />
                            <label className="ml-1">No</label>
                        </div>
                    </div>
                    {errors.careerBreak && <p className="font-normal text-xs text-red-500 mt-1">{errors.careerBreak.message as string}</p>}
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold mb-3">Permanent address</h6>
                    <input
                        type="text"
                        placeholder="Enter your permanent address"
                        className="w-full rounded border border-gray-300 px-2 py-1.5"
                        {...register("permanentAddress")}
                    />
                    {errors.permanentAddress && <p className="font-normal text-xs text-red-500 mt-1">{errors.permanentAddress.message as string}</p>}
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold mb-3">Hometown</h6>
                    <input
                        type="text"
                        placeholder="Enter your hometown"
                        className="w-full rounded border border-gray-300 px-2 py-1.5"
                        {...register("homeTown")}
                    />
                    {errors.homeTown && <p className="font-normal text-xs text-red-500 mt-1">{errors.homeTown.message as string}</p>}
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold mb-3">Pincode</h6>
                    <input
                        type="text"
                        placeholder="Enter your Pincode"
                        className="w-full rounded border border-gray-300 px-2 py-1.5"
                        {...register("pinCode")}
                    />
                    {errors.pinCode && <p className="font-normal text-xs text-red-500 mt-1">{errors.pinCode.message as string}</p>}
                </div>
                <div className="mb-5">
                    <h1 className="font-semibold mb-3 text-xl">Language</h1>
                    {fields.map((item: any, index: number) => (
                        <div className="mb-5" key={item.id}>
                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className="mb-1 block">Language<span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        {...register(`language.${index}.language`)}
                                        placeholder="Enter Language"
                                        className="w-full rounded border border-gray-300 px-2 py-1.5"
                                    />
                                    {(errors?.language !== undefined && (errors?.language as any)[index]?.language) && <p className="font-normal text-xs text-red-500 mt-1">{(errors?.language as any)[index]?.language?.message}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block">Proficiency<span className="text-red-500">*</span></label>
                                    <Controller
                                        name={`language.${index}.proficiency`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable={true}
                                                className="text-sm"
                                                classNamePrefix="dropdown"
                                                options={proficiencyList}
                                                defaultValue={item?.proficiency}
                                                placeholder="Select Proficiency"
                                            />
                                        )}
                                    />
                                    {(errors?.language !== undefined && (errors?.language as any)[index]?.proficiency) && <p className="font-normal text-xs text-red-500 mt-1">Select Proficiency</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                <div>
                                    <Controller
                                        control={control}
                                        name={`language.${index}.read`}
                                        render={({ field }) => (
                                            <input type="checkbox" {...field} defaultChecked={item?.read} />
                                        )}
                                    />
                                    <label className="ml-1">Read</label>
                                </div>
                                <div>
                                    <Controller
                                        control={control}
                                        name={`language.${index}.write`}
                                        defaultValue={item?.write}
                                        render={({ field }) => (
                                            <input type="checkbox" {...field} defaultChecked={item?.write} />
                                        )}
                                    />
                                    <label className="ml-1">Write</label>
                                </div>
                                <div>
                                    <Controller
                                        control={control}
                                        name={`language.${index}.speak`}
                                        defaultValue={item?.speak}
                                        render={({ field }) => (
                                            <input type="checkbox" {...field} defaultChecked={item?.speak} />
                                        )}
                                    />
                                    <label className="ml-1">Speak</label>
                                </div>
                                <div className="flex justify-end items-center">
                                    <button
                                        type="button"
                                        className="text-blue-700 font-semibold"
                                        onClick={() => {
                                            if (!item?.languageId) {
                                                remove(index)
                                            } else {
                                                setDeletedLanguages(prevArray => [...prevArray, Number(item?.languageId)]);
                                                remove(index);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="text-blue-700 font-semibold"
                        onClick={() =>
                            append({
                                language: "",
                                proficiency: "",
                                read: false,
                                write: false,
                                speak: false
                            })}>
                        {watch("language")?.length > 0 ? "Add another language" : "Add language"}
                    </button>
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
                            type="submit"
                            className="rounded-3xl bg-blue-500 text-white px-5 py-1.5"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default PersonalDetailsForm;