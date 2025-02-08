import SaveSearch from './SaveSearch';
import { useAppDispatch } from '../../../..';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getKeySkillsList, getSaveResumeList, randomNumberInRange } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { saveResumeResult } from '../../../../store/reducers/recruiter/saveResume';
import { toast } from 'react-toastify';
import Toaster from '../../../commonComponents/Toaster';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface SearchResumeInputs {
  searchKeyWord: string[],
  minExperience: string | undefined,
  maxExperience: string | undefined,
  minSalary: string | undefined,
  maxSalary: string | undefined,
}

const SearchResumeSchema = yup.object().shape({
  searchKeyWord: yup.array()
    .min(1, 'Pick at least one keySkills')
    .max(10, 'Pick at most ten location').required("Please select keySkills"),
  minExperience: yup.string().optional(),
  maxExperience: yup.string().optional(),
  minSalary: yup.string().optional(),
  maxSalary: yup.string().optional(),
});

const SearchResumesForm = ({
  resumeSearchFormData,
  setResumeSearchFormData,
  setActionFill,
  showAllSaveSearch,
  viewAllSaveSearch,
  handleSingleSaveSearch,
  savedStatus,
  setSavedStatus }: any) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [keySkills, setKeySkills] = useState<any>([]);
  const [actionType, setActionType] = useState('');
  const [saveResume, setSaveResume] = useState<any>([])

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<SearchResumeInputs>({
    resolver: yupResolver(SearchResumeSchema)
  });
  const selectedSearchKeyWord: any = [];
  const onSubmit = (data: any) => {
    console.log(data)
    if (actionType === 'Save') {
      data?.searchKeyWord?.filter((item: any) => item && selectedSearchKeyWord.push({ resumeKeySkills: item?.value }));
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
      data?.searchKeyWord?.filter((item: any) => item && selectedSearchKeyWord.push({ resumeSearchKeywords: { id: item?.value } }));

      setResumeSearchFormData({
        resumeSearchKeywords: selectedSearchKeyWord,
        minExperience: data?.minExperience,
        maxExperience: data?.maxExperience,
        minSalary: data?.minSalary,
        maxSalary: data?.maxSalary,
      })
      setActionFill(true)
    }
  }

  useEffect(() => {
    (async () => {
      const keySkillsList = await getKeySkillsList()
      if (Object.keys(keySkillsList)?.length) {
        setKeySkills(keySkillsList as any)
      }

      const saveResumeList = await getSaveResumeList()
      if (Object.keys(saveResumeList)?.length) {
        setSaveResume(saveResumeList as any)
      }
    })();
  }, [savedStatus]);

  return (
    <>
      <div className="h-[10%]  w-full"></div>
      <div className="grid grid-cols-12 gap-10 py-6 px-32 bg-[#F8FAFC] ">
        <div className="col-start-1 col-end-9  p-5">
          <form id="my-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full h-auto flex-col justify-start items-start gap-10 inline-flex">
              <div className="w-full justify-start items-center gap-5 inline-flex">
                <div className="w-10 h-10 bg-rose-50 rounded-[60px] shadow justify-center items-center flex">
                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}search-candidate-resume.svg`} alt='search-candidate-resume' />
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-black text-2xl font-bold leading-[28.80px] tracking-tight">Search Candidate Resumes</div>
                  </div>
                  <div className="self-stretch justify-start items-start gap-2 inline-flex">
                    <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">Use the fields below to filter your results</div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto flex-col justify-start items-start gap-10 flex">
                <div className="self-stretch h-auto flex-col justify-start items-start gap-10 flex">
                  <div className="self-stretch h-auto flex-col justify-start items-start gap-7 flex">
                    <div className="self-stretch h-auto flex-col justify-start items-start gap-2 flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Keywords</div>
                      <div className="self-stretch h-auto py-3 flex-col justify-center items-start gap-2 flex">
                        <div className="self-stretch justify-start items-center gap-2  inline-flex">
                          <div className="w-6 h-6 mb-2 relative justify-center items-center flex"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}search_icon_lense.svg`} alt='search_icon_lense' /></div>
                          <div className="grow shrink basis-0 h-[17px] rounded-lg justify-start items-center flex">
                            <Controller
                              name="searchKeyWord"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isClearable
                                  isSearchable={true}
                                  isMulti={true}
                                  className="w-full focus:border-blue-500 outline-none rounded-md h-12 mt-1"
                                  classNamePrefix="dropdown"
                                  options={keySkills?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                                  defaultValue={watch('searchKeyWord')}
                                  placeholder="Search keyword"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      {errors?.searchKeyWord && <div className="ml-7 font-normal text-xs text-red-500 ">{errors?.searchKeyWord?.message}</div>}
                    </div>

                    <div className="self-stretch h-[73px] flex-col justify-start items-start gap-2 flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Experience</div>
                      <div className="self-stretch justify-start items-start gap-5 inline-flex">
                        <div className="grow shrink basis-0 h-12  justify-start items-center gap-2 flex">
                          <Controller
                            name="minExperience"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="number"
                                placeholder="Min (Yrs)"
                                {...field}
                                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md h-12 p-3 px-2 py-1.5 mt-1"
                                readOnly={false}
                              />
                            )}
                          />
                          {errors.minExperience && <p className="font-normal text-xs text-red-500">{errors?.minExperience?.message as string}</p>}
                        </div>
                        <div className="grow shrink basis-0 h-12  justify-start items-center gap-2 flex">
                          <Controller
                            name="maxExperience"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="number"
                                placeholder="Max (Yrs)"
                                {...field}
                                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md h-12 p-3 px-2 py-1.5 mt-1"
                                readOnly={false}
                              />
                            )}
                          />
                          {errors.maxExperience && <p className="font-normal text-xs text-red-500">{errors?.maxExperience?.message as string}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[73px] flex-col justify-start items-start gap-2 flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Salary</div>
                      <div className="self-stretch justify-start items-start gap-5 inline-flex">

                        <div className="grow shrink basis-0 h-12  justify-start items-center gap-2 flex">
                          <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
                            <Controller
                              name="minSalary"
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="number"
                                  placeholder="Min (Lacs)"
                                  {...field}
                                  className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md h-12 p-3 px-2 py-1.5 mt-1"
                                  readOnly={false}
                                />
                              )}
                            />
                            {errors.minSalary && <p className="font-normal text-xs text-red-500">{errors?.minSalary?.message as string}</p>}
                          </div>
                        </div>
                        <div className="grow shrink basis-0 h-12 justify-start items-center gap-2 flex">
                          <Controller
                            name="maxSalary"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="number"
                                placeholder="Max (Lacs)"
                                {...field}
                                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md h-12 p-3 px-2 py-1.5 mt-1"
                                readOnly={false}
                              />
                            )}
                          />
                          {errors.maxSalary && <p className="font-normal text-xs text-red-500">{errors?.maxSalary?.message as string}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-start items-start gap-5 inline-flex">
                  <button name='SaveAsDraft' className="text-indigo-900 text-xl grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 " onClick={() => setActionType('Save')}>Save search</button>
                  <button name='SaveAsDraft' type='submit' className="text-white text-xl grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3" onClick={() => setActionType('Search')}>Search</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-start-9 col-end-13">
          <SaveSearch
            saveResume={saveResume}
            showAllSaveSearch={showAllSaveSearch}
            viewAllSaveSearch={viewAllSaveSearch}
            handleSingleSaveSearch={handleSingleSaveSearch}
          />
        </div>
      </div >
      <Toaster />
    </>
  )
}

export default SearchResumesForm;