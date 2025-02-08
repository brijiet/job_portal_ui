import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../..';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { saveResumeResult } from '../../../../store/reducers/recruiter/saveResume';
import { getKeySkillsList, randomNumberInRange } from '../../../utils/utils';
import Toaster from '../../../commonComponents/Toaster';
import { useNavigate } from 'react-router-dom';

const SearchResumeResultLeftPanel = ({ resumeSearchFormData, setResumeSearchFormData, setSavedStatus }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [keySkills, setKeySkills] = useState<any>([]);
  const [keySkillFilter, setKeySkillFilter] = useState<any>([]);
  const [actionType, setActionType] = useState('');
  const [filterCount, setFilterCount] = useState<number>(0);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<any>({
    // resolver: yupResolver(SearchResumeSchema)
  });

  useEffect(() => {
    const selectedKeySkill = [] as any
    if (keySkills) {
      resumeSearchFormData?.resumeSearchKeywords && resumeSearchFormData?.resumeSearchKeywords?.map((item: any) => keySkills?.filter((item1: any) => item1?.id === item?.resumeSearchKeywords?.id)?.map((itemSub: any) => {
        selectedKeySkill?.push({ value: itemSub?.id, label: itemSub?.title })
      }));
      setKeySkillFilter(selectedKeySkill)
    }
    setValue("minSalary", resumeSearchFormData?.minSalary);
    setValue("maxSalary", resumeSearchFormData?.maxSalary);
    setValue("minExperience", resumeSearchFormData?.minExperience);
    setValue("maxExperience", resumeSearchFormData?.maxExperience);
    setValue("searchKeyWord", selectedKeySkill);
  }, [resumeSearchFormData, keySkills])

  useEffect(() => {
    let count = 0;
    if (resumeSearchFormData?.minSalary && resumeSearchFormData?.maxSalary) {
      count = count + 1;
    }
    if (resumeSearchFormData?.minExperience && resumeSearchFormData?.maxExperience) {
      count = count + 1;
    }
    if (resumeSearchFormData?.resumeSearchKeywords) {
      count = count + resumeSearchFormData?.resumeSearchKeywords.length;
    }
    setFilterCount(count)
  }, [resumeSearchFormData])


  const onSubmit = (data: any) => {

    if (actionType === 'Save') {
      const selectedSearchKeyWord: any = [];
      data?.searchKeyWord?.filter((item: any) => item && selectedSearchKeyWord.push({ resumeKeySkills: { id: item?.value } }));
      dispatch(saveResumeResult({
        resumeSearchKeywords: selectedSearchKeyWord,
        minExperience: data?.minExperience,
        maxExperience: data?.maxExperience,
        minSalary: data?.minSalary,
        maxSalary: data?.maxSalary,
      })).then(() => {
        setSavedStatus(randomNumberInRange(1, 5))
        toast.success("Search save successfully")
      })
    } else {
      const selectedSearchKeyWord: any = [];
      data?.searchKeyWord?.filter((item: any) => item && selectedSearchKeyWord.push({ resumeSearchKeywords: { id: item?.value } }));
      setResumeSearchFormData({
        resumeSearchKeywords: selectedSearchKeyWord,
        minExperience: data?.minExperience,
        maxExperience: data?.maxExperience,
        minSalary: data?.minSalary,
        maxSalary: data?.maxSalary,
      })
    }
  }

  useEffect(() => {
    (async () => {
      const keySkillsList = await getKeySkillsList()
      if (Object.keys(keySkillsList)?.length) {
        setKeySkills(keySkillsList as any)
      }
    })();

  }, []);

  const handleDeleteFilterAll = () => {
    const updatedItem = {
      resumeSearchKeywords: [],
      minExperience: '',
      maxExperience: '',
      minSalary: '',
      maxSalary: '',
    }
    setResumeSearchFormData(updatedItem)
  }

  const handleDeleteFilterKeyWords = (fieldName: string, id: number) => {
    const removeSearchKeyWord = [] as any
    if (fieldName === 'resumeSearchKeywords') {
      resumeSearchFormData?.resumeSearchKeywords?.filter((itemFilter: any) => Number(itemFilter?.resumeSearchKeywords?.id) !== Number(id))?.map((item: any) => item && removeSearchKeyWord.push({ resumeSearchKeywords: { id: item?.resumeSearchKeywords?.id } }));
      const updatedItem = {
        resumeSearchKeywords: removeSearchKeyWord,
        minExperience: resumeSearchFormData?.minExperience,
        maxExperience: resumeSearchFormData?.maxExperience,
        minSalary: resumeSearchFormData?.minSalary,
        maxSalary: resumeSearchFormData?.maxSalary,
      }
      setResumeSearchFormData(updatedItem)
    }
  }
  const handleDeleteFilter = (fieldName: string) => {
    let updatedItem = {}
    if (fieldName === 'minSalary') {
      updatedItem = {
        resumeSearchKeywords: resumeSearchFormData?.resumeSearchKeywords,
        minExperience: resumeSearchFormData?.minExperience,
        maxExperience: resumeSearchFormData?.maxExperience,
        minSalary: '',
        maxSalary: '',
      }
    }
    if (fieldName === 'minExperience') {
      updatedItem = {
        resumeSearchKeywords: resumeSearchFormData?.resumeSearchKeywords,
        minExperience: '',
        maxExperience: '',
        minSalary: resumeSearchFormData?.minSalary,
        maxSalary: resumeSearchFormData?.maxSalary,
      }
    }
    setResumeSearchFormData(updatedItem)
  }

  return (
    <form id="my-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-auto pr-5 pt-10 pb-[180px] border-r border-indigo-100 flex-col justify-start items-start gap-5 inline-flex">
        <div className="self-stretch h-auto flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="justify-start items-center gap-2 flex">
              <div className="text-slate-600 text-base font-bold leading-snug tracking-tight">Filters</div>
              <div className="w-8 px-3 py-2 bg-slate-50 rounded-[40px] justify-center items-center flex">
                <div className="text-black text-xs font-normal leading-[14.40px] tracking-tight">{filterCount}</div>
              </div>
            </div>
            <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
              <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={handleDeleteFilterAll}>Clear all</div>
            </div>
          </div>

          <div className="self-stretch justify-start items-center grid gap-3 grid-cols-2">

            {keySkillFilter && keySkillFilter?.map((item: any, index: any) =>
              <div className="w-full pl-1 pr-0.5  bg-slate-100 rounded justify-center items-center grid grid-cols-2" key={index}>
                <div className="justify-center items-center gap-1 flex">
                  <div className="text-indigo-900 text-xs font-normal leading-[16.80px]">{item.label}</div>
                </div>
                <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex cursor-pointer"><img onClick={() => handleDeleteFilterKeyWords('resumeSearchKeywords', item.value)} src={`${process.env.REACT_APP_IMAGE_BASE_URL}close.svg`} alt='close' /></div>
              </div>
            )}

            {watch("minExperience") && watch("maxExperience") && <div className="w-full pl-1 pr-0.5 py-2 bg-slate-100 rounded justify-center items-center  grid grid-cols-2">
              <div className="justify-center items-center gap-1 flex">
                <div className="text-indigo-900 text-xs font-normal leading-[16.80px] tracking-tight">{watch("minExperience")}-{watch("maxExperience")} Yrs</div>
              </div>
              <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex cursor-pointer"><img onClick={() => handleDeleteFilter('minExperience')} src={`${process.env.REACT_APP_IMAGE_BASE_URL}close.svg`} alt='close' /></div>
            </div>}

            {watch("minSalary") && watch("maxSalary") && <div className="w-full pl-1 pr-0.5 py-2 bg-slate-100 rounded justify-center items-center  grid grid-cols-2">
              <div className="justify-center items-center gap-1 flex">
                <div className="text-indigo-900 text-xs font-normal leading-[16.80px] tracking-tight">{watch("minSalary")}-{watch("maxSalary")} Lacs</div>
              </div>
              <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex cursor-pointer"><img onClick={() => handleDeleteFilter('minSalary')} src={`${process.env.REACT_APP_IMAGE_BASE_URL}close.svg`} alt='close' /></div>
            </div>}
            {/* <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
              <div className="text-right text-slate-600 text-xs font-medium leading-[16.80px] tracking-tight">View all</div>
            </div> */}
          </div>
        </div>
        <div className="self-stretch h-[0px] border border-indigo-100"></div>
        <div className="self-stretch h-auto flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="text-slate-600 text-base font-bold leading-snug tracking-tight">Keywords</div>
            <div className="w-6 h-6 justify-center items-center flex"></div>
          </div>
          <Controller
            name="searchKeyWord"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isClearable
                isSearchable={true}
                isMulti={true}
                className="w-full border text-xs border-gray-200 focus:border-blue-500 outline-none rounded-md  p-3 px-2 py-1.5 mt-1"
                classNamePrefix="dropdown"
                options={keySkills?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                defaultValue={keySkillFilter}
                placeholder="Search keyword"

              />
            )}
          />
        </div>

        <div className="self-stretch h-auto flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="text-slate-600 text-base font-bold leading-snug tracking-tight">Experience</div>
            <div className="w-6 h-6 justify-center items-center flex"></div>
          </div>
          <div className="self-stretch h-auto flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch justify-start items-start gap-5 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Min experience</div>
                <Controller
                  name="minExperience"
                  control={control}

                  render={({ field }) => (
                    <input
                      type="number"
                      placeholder="Min (Yrs)"
                      {...field}
                      onChange={(e) => setValue("minExperience", e.target.value)}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md h-8 p-3 px-2 py-1.5 mt-1"
                      readOnly={false}
                    />
                  )}
                />
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Max experience</div>
                <Controller
                  name="maxExperience"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      placeholder="Max (Yrs)"
                      {...field}
                      onChange={(e) => setValue("maxExperience", e.target.value)}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md h-8 p-3 px-2 py-1.5 mt-1"
                      readOnly={false}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[0px] border border-indigo-100"></div>
        <div className="self-stretch h-[157px] flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="justify-start items-center gap-5 flex">
              <div className="text-slate-600 text-base font-bold leading-snug tracking-tight">Annual Salary</div>
              <div className="justify-start items-center flex">
                <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">INR</div>
                <div className="w-6 h-6 flex-col justify-center items-center inline-flex"></div>
              </div>
            </div>
            <div className="w-6 h-6 justify-center items-center flex"></div>
          </div>
          <div className="self-stretch h-auto flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch justify-start items-start gap-5 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Min salary (Lacs)</div>
                <Controller
                  name="minSalary"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      placeholder=""
                      {...field}
                      onChange={(e) => setValue("minSalary", e.target.value)}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md h-8 p-3 px-2 py-1.5 mt-1"
                      readOnly={false}
                    />
                  )}
                />
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Max salary (Lacs)</div>
                <Controller
                  name="maxSalary"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      placeholder=""
                      {...field}
                      onChange={(e) => setValue("maxSalary", e.target.value)}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md h-8 p-3 px-2 py-1.5 mt-1"
                      readOnly={false}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-5 inline-flex">
          <button name='SaveAsDraft' className="text-indigo-900 text-xl grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 " onClick={() => setActionType('Save')}>Save</button>
          <button name='SaveAsDraft' type='submit' className="text-white text-xl grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3" onClick={() => setActionType('Search')}>Search</button>
        </div>
      </div>
      <Toaster />
    </form>
  )
}

export default SearchResumeResultLeftPanel