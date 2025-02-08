import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '../../../../';
import {
  bulkFilter,
  setNavigateFilterOption,
  setDepartment,
  setLocation,
  setWorkMode,
  setCompanyType,
  resetCheckItem,
  modalReset,
  clearAll,
  modalResetIndividual,
  setKeySkills,
  setRoleCategory
} from '../../../../store/reducers/applicant/GetFilterApplicant';
import FiltersApplicantLocation from './FiltersLocation';
import FiltersApplicantKeySkills from './FiltersKeySkills';
import FiltersApplicantExperience from './FiltersExperience';
import FiltersApplicantSalary from './FiltersSalary';

const FiltersApplicantModal = ({ isOpen, setIsOpen, setToggleDispach, setJobCard }: any) => {
  const dispatch = useAppDispatch();
  const { navigateFilterOption, checkItems, departmentIds, locationIds, workModeIds, companyTypeIds, maxExpYearId, maxSalaryId, expYear, department, location, workMode, salary, companyType, keySkillsIds, roleCategoryIds, keySkills, roleCategory } = useAppSelector((state) => state.getFilterApplicant);
  const [clearAllToggle, setClearAllToggle] = useState(false);
  const [filtersCount, setFiltersCount] = useState(0);

  useEffect(() => {
    let filtersCount = 0;
    if (maxExpYearId) {
      filtersCount += 1
    }
    if (departmentIds?.length) {
      filtersCount += departmentIds?.length
    }
    if (locationIds?.length) {
      filtersCount += locationIds?.length
    }
    if (workModeIds?.length) {
      filtersCount += workModeIds?.length
    }
    if (maxSalaryId) {
      filtersCount += 1
    }
    if (companyTypeIds?.length) {
      filtersCount += companyTypeIds?.length
    }
    if (keySkillsIds?.length) {
      filtersCount += keySkillsIds?.length
    }
    if (roleCategoryIds?.length) {
      filtersCount += roleCategoryIds?.length
    }
    setFiltersCount(filtersCount);
  }, [maxExpYearId, maxSalaryId, departmentIds, locationIds, workModeIds, companyTypeIds, keySkillsIds, roleCategoryIds]);

  const closeDialog = () => {
    setIsOpen(false);
    dispatch(resetCheckItem());
  };

  const handleSubmit = () => {
    setToggleDispach(true);
    dispatch(bulkFilter({ department: departmentIds, location: locationIds, workMode: workModeIds, companyType: companyTypeIds, expYear: maxExpYearId, salary: maxSalaryId, keySkills: keySkillsIds, roleCategory: roleCategoryIds }));
    dispatch(setDepartment(checkItems?.department));
    dispatch(setLocation(checkItems?.location));
    dispatch(setWorkMode(checkItems?.workMode));
    dispatch(setCompanyType(checkItems?.companyType));
    dispatch(setKeySkills(checkItems?.keySkills));
    dispatch(setRoleCategory(checkItems?.roleCategory));
    setIsOpen(false);
    if (clearAllToggle) {
      dispatch(clearAll());
      setClearAllToggle(false);
    }
    setJobCard([]);
  }

  const handleReset = () => {
    dispatch(modalReset());
    setClearAllToggle(true);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900 text-right flex justify-between items-center p-5">
                  <div className="flex justify-start items-center">
                    <h1 className="font-bold leading-none mr-2">Filters</h1>
                    {filtersCount !== 0 &&
                      <>
                        <span className="bg-[#F1F5F9] text-sm mr-2 w-6 h-6 rounded-full flex justify-center items-center">
                          {filtersCount}
                        </span>
                        <button className=" border-b border-[#475569] text-[#475569] text-sm" onClick={handleReset}>Reset</button>
                      </>
                    }
                  </div>
                  <button
                    onClick={closeDialog}
                    type="button"
                    className="outline-0"
                  >
                    <RxCross1 />
                  </button>
                </Dialog.Title>
                {filtersCount !== 0 && <div className="mb-5 flex flex-wrap justify-start items-center gap-2 mx-5">
                  {maxExpYearId !== 0 && expYear?.map((item: any) => {
                    let data = item?.title?.split('');
                    let splitVal = data?.slice(0, data.length - 5);
                    let joinedVal = parseInt(splitVal?.join(''));
                    if (joinedVal === parseInt(maxExpYearId)) {
                      return (
                        < span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs" >
                          <span className="mr-1">0 - {item?.title}</span>
                          <span className="cursor-pointer"
                            onClick={() => {
                              dispatch(modalResetIndividual({ expYear: item?.id }))
                            }}>
                            <RxCross2 />
                          </span>
                        </span>
                      )
                    }
                  })}
                  {maxSalaryId !== 51 && salary?.map((item: any) => {
                    if (parseInt(item?.title) === parseInt(maxSalaryId)) {
                      return (
                        <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                          <span className="mr-1">0 - {item?.title} LPA</span>
                          <span className="cursor-pointer"
                            onClick={() => {
                              dispatch(modalResetIndividual({ salary: item?.id }))
                            }}>
                            <RxCross2 />
                          </span>
                        </span>
                      )
                    }
                  }
                  )}
                  {departmentIds?.map((item: any) => {
                    const departmentFilter = department?.filter((departmentItem: any) => departmentItem?.id === item);
                    return (
                      <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                        <span className="mr-1">{departmentFilter[0]?.title}</span>
                        <span className="cursor-pointer"
                          onClick={() => {
                            dispatch(modalResetIndividual({ department: departmentFilter[0]?.id }))
                          }}>
                          <RxCross2 />
                        </span>
                      </span>
                    )
                  })}
                  {locationIds?.map((item: any) => {
                    const locationFilter = location?.filter((locationItem: any) => locationItem?.id === item);
                    return (
                      <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                        <span className="mr-1">{locationFilter[0]?.title}</span>
                        <span className="cursor-pointer"
                          onClick={() => {
                            dispatch(modalResetIndividual({ location: locationFilter[0]?.id }))
                          }}>
                          <RxCross2 />
                        </span>
                      </span>
                    )
                  })}
                  {workModeIds?.map((item: any) => {
                    const workModeFilter = workMode?.filter((workModeItem: any) => workModeItem?.id === item);
                    return (
                      <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                        <span className="mr-1">{workModeFilter[0]?.title}</span>
                        <span className="cursor-pointer"
                          onClick={() => {
                            dispatch(modalResetIndividual({ workMode: workModeFilter[0]?.id }))
                          }}>
                          <RxCross2 />
                        </span>
                      </span>
                    )
                  })}
                  {companyTypeIds?.map((item: any) => {
                    const companyTypeFilter = companyType?.filter((companyTypeItem: any) => companyTypeItem?.id === item);
                    return (
                      <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                        <span className="mr-1">{companyTypeFilter[0]?.title}</span>
                        <span className="cursor-pointer"
                          onClick={() => {
                            dispatch(modalResetIndividual({ companyType: companyTypeFilter[0]?.id }))
                          }}>
                          <RxCross2 />
                        </span>
                      </span>
                    )
                  })}
                  {keySkillsIds?.map((item: any) => {
                    const keySkillsFilter = keySkills?.filter((keySkillsItem: any) => keySkillsItem?.id === item);
                    return (
                      <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                        <span className="mr-1">{keySkillsFilter[0]?.title}</span>
                        <span className="cursor-pointer"
                          onClick={() => {
                            dispatch(modalResetIndividual({ keySkills: keySkillsFilter[0]?.id }))
                          }}>
                          <RxCross2 />
                        </span>
                      </span>
                    )
                  })}
                  {roleCategoryIds?.map((item: any) => {
                    const roleCategoryFilter = roleCategory?.filter((roleCategoryItem: any) => roleCategoryItem?.id === item);
                    return (
                      <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                        <span className="mr-1">{roleCategoryFilter[0]?.title}</span>
                        <span className="cursor-pointer"
                          onClick={() => {
                            dispatch(modalResetIndividual({ roleCategory: roleCategoryFilter[0]?.id }))
                          }}>
                          <RxCross2 />
                        </span>
                      </span>
                    )
                  })}
                </div>}
                <div className="grid grid-cols-12 border-y border-[#E0E7FF]">
                  <div className="col-start-1 col-end-4 border-r border-[#E0E7FF]">
                    <ul>
                      <li
                        className={navigateFilterOption !== "Experience" ?
                          "px-5 py-2 cursor-pointer flex justify-between items-center"
                          : "bg-[#F1F5F9] px-5 py-3 cursor-pointer flex justify-between items-center"}
                        onClick={() => dispatch(setNavigateFilterOption("Experience"))}>
                        <span>Experience</span>
                        {maxExpYearId ?
                          <span className="bg-[#F1F5F9] rounded-full w-8 h-8 flex justify-center items-center">
                            1
                          </span> : null}
                      </li>
                      <li
                        className={navigateFilterOption !== "Location" ?
                          "px-5 py-2 cursor-pointer flex justify-between items-center"
                          : "bg-[#F1F5F9] px-5 py-3 cursor-pointer flex justify-between items-center"}
                        onClick={() => dispatch(setNavigateFilterOption("Location"))}>
                        <span>Location</span>
                        {locationIds?.length !== 0 &&
                          <span className="bg-[#F1F5F9] rounded-full w-8 h-8 flex justify-center items-center">
                            {locationIds?.length}
                          </span>}
                      </li>
                      <li
                        className={navigateFilterOption !== "Salary" ?
                          "px-5 py-2 cursor-pointer flex justify-between items-center"
                          : "bg-[#F1F5F9] px-5 py-3 cursor-pointer flex justify-between items-center"}
                        onClick={() => dispatch(setNavigateFilterOption("Salary"))}>
                        <span>Salary</span>
                        {maxSalaryId ?
                          <span className="bg-[#F1F5F9] rounded-full w-8 h-8 flex justify-center items-center">
                            1
                          </span> : null}
                      </li>
                      <li
                        className={navigateFilterOption !== "Key Skils" ?
                          "px-5 py-2 cursor-pointer flex justify-between items-center"
                          : "bg-[#F1F5F9] px-5 py-3 cursor-pointer flex justify-between items-center"}
                        onClick={() => dispatch(setNavigateFilterOption("Key Skils"))}>
                        <span>Key Skils</span>
                        {keySkillsIds?.length !== 0 &&
                          <span className="bg-[#F1F5F9] rounded-full w-8 h-8 flex justify-center items-center">
                            {keySkillsIds?.length}
                          </span>}
                      </li>
                    </ul>
                  </div>
                  <div className="col-start-4 col-end-13">
                    {navigateFilterOption === "Experience" && <FiltersApplicantExperience />}
                    {navigateFilterOption === "Location" && <FiltersApplicantLocation />}
                    {navigateFilterOption === "Salary" && <FiltersApplicantSalary />}
                    {navigateFilterOption === "Key Skils" && <FiltersApplicantKeySkills />}
                  </div>
                </div>
                <div className="p-5 float-right">
                  <button className="text-[#312E81] bg-[#EEF2FF] px-8 py-2 rounded-lg text-sm mr-5" onClick={closeDialog}>Close</button>
                  <button className="text-white bg-[#4F46E5] px-8 py-2 rounded-lg text-sm" onClick={handleSubmit} >Apply</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition >
  )
}

export default FiltersApplicantModal;