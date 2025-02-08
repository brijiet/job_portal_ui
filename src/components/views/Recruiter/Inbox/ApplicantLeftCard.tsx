import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../';
import {
  setDepartment,
  setLocation,
  setWorkMode,
  setCompanyType,
  setRoleCategory,
  setFilterDepartment,
  setFilterLocation,
  setFilterWorkMode,
  setFilterCompanyType,
  setFilterRoleCategory,
  setFilterExpYear,
  setFilterSalary,
  setNavigateFilterOption,
  clearAll,
  clearIndividual,
  setKeySkills,
  setFilterKeySkills
} from '../../../../store/reducers/applicant/GetFilterApplicant';
import { scrollToTop } from '../../../utils/utils';
import { RxCross2 } from 'react-icons/rx';
import { ExperienceApplicantBasedFilter } from './FiltersExperience';
import { KeySkillsApplicantBasedFilter } from './FiltersKeySkills';
import { LocationApplicantBasedFilter } from './FiltersLocation';
import FiltersApplicantModal from './FiltersModal';
import { SalaryApplicantBasedFilter } from './FiltersSalary';

const ApplicantLeftCard = ({ setJobApplicantCard, setToggleDispatch, setPage, filtersCount }: any) => {

  const dispatch = useAppDispatch();
  const { success,
    allApplicant,
    loading,
    department,
    location,
    workMode,
    roleCategory,
    companyType,
    salary,
    expYear,
    filtersData,
    keySkills,
    toggleFilter } = useAppSelector((state) => state.getFilterApplicant);
  const [isOpen, setIsOpen] = useState(false);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev: any) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTotalExpYearChange = (totalExpYear: number) => {
    dispatch(setFilterExpYear(totalExpYear))
    setPage(1);
    scrollToTop();
    setToggleDispatch(true);
    setJobApplicantCard([]);
  };

  const handleDepartmentCheckbox = (data: any) => {
    scrollToTop();
    setPage(1);
    setToggleDispatch(true);
    setJobApplicantCard([]);

    dispatch(setDepartment(
      department?.map((item: any) =>
        item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
      )
    ));
    if (data?.isChecked === undefined || data?.isChecked === false) {
      dispatch(setFilterDepartment(data?.id));
    } else {
      dispatch(setFilterDepartment({ filterDepartment: data?.id }));
    }
  };

  const handleLocationCheckbox = (data: any) => {
    scrollToTop();
    setPage(1);
    setToggleDispatch(true);
    setJobApplicantCard([]);
    dispatch(setLocation(
      location?.map((item: any) =>
        item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
      )
    ))
    if (data?.isChecked === undefined || data?.isChecked === false) {
      dispatch(setFilterLocation(data?.id));
    } else {
      dispatch(setFilterLocation({ filterLocation: data?.id }));
    }
  };

  const handleWorkModeCheckbox = (data: any) => {
    scrollToTop();
    setPage(1);
    setToggleDispatch(true);
    setJobApplicantCard([]);
    dispatch(setWorkMode(
      workMode?.map((item: any) =>
        item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
      )
    ));
    if (data?.isChecked === undefined || data?.isChecked === false) {
      dispatch(setFilterWorkMode(data?.id));
    } else {
      dispatch(setFilterWorkMode({ filterWorkMode: data?.id }));
    }
  };

  const handleSalaryFilter = (salary: number) => {
    dispatch(setFilterSalary(salary));
    setPage(1);
    scrollToTop();
    setToggleDispatch(true);
    setJobApplicantCard([]);
  };

  const handleCompanyTypeCheckbox = (data: any) => {
    scrollToTop();
    setPage(1);
    setToggleDispatch(true);
    setJobApplicantCard([]);
    dispatch(setCompanyType(
      companyType?.map((item: any) =>
        item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
      )
    ));
    if (data?.isChecked === undefined || data?.isChecked === false) {
      dispatch(setFilterCompanyType(data?.id));
    } else {
      dispatch(setFilterCompanyType({ filterCompanyType: data?.id }));
    }
  }

  const handleRoleCategoryCheckbox = (data: any) => {
    scrollToTop();
    setPage(1);
    setToggleDispatch(true);
    setJobApplicantCard([]);
    dispatch(setRoleCategory(
      roleCategory?.map((item: any) =>
        item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
      )
    ));
    if (data?.isChecked === undefined || data?.isChecked === false) {
      dispatch(setFilterRoleCategory(data?.id));
    } else {
      dispatch(setFilterRoleCategory({ filterRoleCategory: data?.id }));
    }
  };

  const handleKeySkillsCheckbox = (data: any) => {
    scrollToTop();
    setPage(1);
    setToggleDispatch(true);
    setJobApplicantCard([]);
    dispatch(setKeySkills(
      keySkills?.map((item: any) =>
        item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
      )
    ));
    if (data?.isChecked === undefined || data?.isChecked === false) {
      dispatch(setFilterKeySkills(data?.id));
    } else {
      dispatch(setFilterKeySkills({ filterKeySkills: data?.id }));
    }
  };

  const handleViewAll = () => {
    setIsOpen(true);
    dispatch(setNavigateFilterOption("Experience"));
  }

  const handleClearAll = () => {
    dispatch(clearAll());
    setToggleDispatch(true);
  }

  return (
    <>
      <div className="bg-[#FFF] rounded-xl p-4 sticky top-[13%]">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[#475569] font-bold mr-2">Filters</span>
            <span>{filtersCount !== 0 && filtersCount}</span>
          </div>
          {
            filtersCount !== 0 &&
            <button className=" border-b border-[#475569] text-[#475569]" onClick={handleClearAll}>Clear all</button>
          }
        </div>
        <div className="mt-5 flex flex-wrap justify-start items-center gap-2">
          {filtersData?.expYear !== null && expYear?.map((item: any) => item?.id == filtersData?.expYear &&
            <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
              <span className="mr-1">0 - {item?.title}</span>
              <span className="cursor-pointer"
                onClick={() => {
                  dispatch(clearIndividual({ expYear: item?.id }))
                  setToggleDispatch(true)
                }}>
                <RxCross2 />
              </span>
            </span>
          )}
          {filtersData?.department?.map((item: any) => {
            const departmentFilter = department?.filter((departmentItem: any) => departmentItem?.id === item);
            return (
              <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                <span className="mr-1">{departmentFilter[0]?.title}</span>
                <span className="cursor-pointer"
                  onClick={() => {
                    dispatch(clearIndividual({ department: departmentFilter[0]?.id }))
                    setToggleDispatch(true)
                  }}>
                  <RxCross2 />
                </span>
              </span>
            )
          })}
          {filtersData?.location?.map((item: any) => {
            const locationFilter = location?.filter((locationItem: any) => locationItem?.id === item);
            return (
              <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                <span className="mr-1">{locationFilter[0]?.title}</span>
                <span className="cursor-pointer"
                  onClick={() => {
                    dispatch(clearIndividual({ location: locationFilter[0]?.id }))
                    setToggleDispatch(true)
                  }}>
                  <RxCross2 />
                </span>
              </span>
            )
          })}
          {filtersData?.workMode?.map((item: any) => {
            const workModeFilter = workMode?.filter((workModeItem: any) => workModeItem?.id === item);
            return (
              <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                <span className="mr-1">{workModeFilter[0]?.title}</span>
                <span className="cursor-pointer"
                  onClick={() => {
                    dispatch(clearIndividual({ workMode: workModeFilter[0]?.id }))
                    setToggleDispatch(true)
                  }}>
                  <RxCross2 />
                </span>
              </span>
            )
          })}
          {filtersData?.salary !== null && salary?.map((item: any) => item?.id == filtersData?.salary &&
            <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
              <span className="mr-1">0 - {item?.title} LPA</span>
              <span className="cursor-pointer"
                onClick={() => {
                  dispatch(clearIndividual({ salary: item?.id }))
                  setToggleDispatch(true)
                }}>
                <RxCross2 />
              </span>
            </span>
          )}
          {filtersData?.companyType?.map((item: any) => {
            const companyTypeFilter = companyType?.filter((companyTypeItem: any) => companyTypeItem?.id === item);
            return (
              <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                <span className="mr-1">{companyTypeFilter[0]?.title}</span>
                <span className="cursor-pointer"
                  onClick={() => {
                    dispatch(clearIndividual({ companyType: companyTypeFilter[0]?.id }))
                    setToggleDispatch(true)
                  }}>
                  <RxCross2 />
                </span>
              </span>
            )
          })}
          {filtersData?.keySkills?.map((item: any) => {
            const keySkillsFilter = keySkills?.filter((keySkillsItem: any) => keySkillsItem?.id === item);
            return (
              <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                <span className="mr-1">{keySkillsFilter[0]?.title}</span>
                <span className="cursor-pointer"
                  onClick={() => {
                    dispatch(clearIndividual({ keySkills: keySkillsFilter[0]?.id }))
                    setToggleDispatch(true)
                  }}>
                  <RxCross2 />
                </span>
              </span>
            )
          })}
          {filtersData?.roleCategory?.map((item: any) => {
            const roleCategoryFilter = roleCategory?.filter((roleCategoryItem: any) => roleCategoryItem?.id === item);
            return (
              <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                <span className="mr-1">{roleCategoryFilter[0]?.title}</span>
                <span className="cursor-pointer"
                  onClick={() => {
                    dispatch(clearIndividual({ roleCategory: roleCategoryFilter[0]?.id }))
                    setToggleDispatch(true)
                  }}>
                  <RxCross2 />
                </span>
              </span>
            )
          })}
          {filtersCount >= 4 &&
            <button className=" border-b border-[#475569] text-[#475569] text-xs" onClick={handleViewAll}>All</button>
          }
        </div>
        <hr className="bg-[#E0E7FF] my-5" />
        <ExperienceApplicantBasedFilter handleTotalExpYearChange={handleTotalExpYearChange} isOpen={isOpen} />
        <hr className="bg-[#E0E7FF] my-5" />
        <LocationApplicantBasedFilter
          handleLocationCheckbox={handleLocationCheckbox}
          setIsOpen={setIsOpen}
        />
        <hr className="bg-[#E0E7FF] my-5" />
        <SalaryApplicantBasedFilter handleSalaryFilter={handleSalaryFilter} isOpen={isOpen} />
        <hr className="bg-[#E0E7FF] my-5" />
        <KeySkillsApplicantBasedFilter
          handleKeySkillsCheckbox={handleKeySkillsCheckbox}
          setIsOpen={setIsOpen}
        />
      </div>
      <FiltersApplicantModal isOpen={isOpen} setIsOpen={setIsOpen} setToggleDispach={setToggleDispatch} setJobCard={setJobApplicantCard} />
    </>
  )
}

export default ApplicantLeftCard;