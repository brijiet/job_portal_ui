import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../';
import {
    getFilterJobs,
    clearGetFilterJobsSlice,
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
    setFilterKeySkills,
    setToggleFilter
} from '../../../store/reducers/jobs/GetFilterJobs';
import { getCheckJobToSave, listBlockedCompanies, scrollToTop } from '../../utils/utils';
import JobCard from './JobCard';
import { ExperienceBasedFilter } from './FiltersExperience';
import { DepartmentBasedFilter } from './FiltersDepartment';
import { LocationBasedFilter } from './FiltersLocation';
import { WorkModeBasedFilter } from './FiltersWorkMode';
import { SalaryBasedFilter } from './FiltersSalary';
import { CompanyTypeBasedFilter } from './FiltersCompanyType';
import { KeySkillsBasedFilter } from './FiltersKeySkills';
import { RoleCategoryBasedFilter } from './FiltersRoleCategory';
import FiltersModal from './FiltersModal';
import { RxCross2 } from 'react-icons/rx';
import TopCompanies from '../Companies/TopCompanies';
import Cookies from 'js-cookie';
import { saveJobs } from '../../../store/reducers/applyJobs/saveJob';
import { ToastContainer, toast } from 'react-toastify';

const AllJobs = () => {
    const dispatch = useAppDispatch();
    const { success,
        allJobs,
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
        toggleFilter } = useAppSelector((state) => state.getFilterJobs);
    const userId = Cookies.get("userId");
    const [jobCard, setJobCard] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [toggleDispach, setToggleDispach] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [filtersCount, setFiltersCount] = useState(0);
    const [saveJobCount, setSaveJobCount] = useState<{ [key: string]: boolean }>({});
    const [saveButton, setSaveButton] = useState<string>('');
    const [jobId, setJobId] = useState<any>(null);
    const [blockCompanyList, setBlockCompanyList] = useState<any>([]);

    useEffect(() => {
        let filtersCount = 0;
        if (filtersData?.expYear) {
            filtersCount += 1
        }
        if (filtersData?.department?.length) {
            filtersCount += filtersData?.department?.length
        }
        if (filtersData?.location?.length) {
            filtersCount += filtersData?.location?.length
        }
        if (filtersData?.workMode?.length) {
            filtersCount += filtersData?.workMode?.length
        }
        if (filtersData?.salary) {
            filtersCount += 1
        }
        if (filtersData?.companyType?.length) {
            filtersCount += filtersData?.companyType?.length
        }
        if (filtersData?.roleCategory?.length) {
            filtersCount += filtersData?.roleCategory?.length
        }
        if (filtersData?.keySkills?.length) {
            filtersCount += filtersData?.keySkills?.length
        }
        setFiltersCount(filtersCount);
    }, [filtersData]);

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);

    useEffect(() => {
        if (toggleDispach) {
            if (filtersData?.expYear !== null
                || (filtersData?.department !== undefined && filtersData?.department?.length !== 0)
                || (filtersData?.location !== undefined && filtersData?.location?.length !== 0)
                || (filtersData?.workMode !== undefined && filtersData?.workMode?.length !== 0)
                || filtersData?.salary !== null
                || (filtersData?.companyType !== undefined && filtersData?.companyType?.length !== 0)
                || (filtersData?.roleCategory !== undefined && filtersData?.roleCategory?.length !== 0)
                || (filtersData?.keySkills !== undefined && filtersData?.keySkills?.length !== 0)
            ) {
                dispatch(getFilterJobs({ page, data: filtersData }));
                if (toggleFilter) {
                    setPage(1);
                    setJobCard([]);
                    dispatch(setToggleFilter());
                }
            } else {
                dispatch(getFilterJobs({ page }));
            }
        }
    }, [dispatch, page, filtersData, toggleDispach, toggleFilter]);

    useEffect(() => {
        if (success) {
            if (allJobs.length !== 0) {
                setJobCard((prev: any) => [...prev, ...allJobs]);
            } else {
                setToggleDispach(false);
            }
            dispatch(clearGetFilterJobsSlice());
        }
    }, [success, blockCompanyList]);

    const handelInfiniteScroll = async () => {
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight
            ) {
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleTotalExpYearChange = (totalExpYear: number) => {
        dispatch(setFilterExpYear(totalExpYear))
        setPage(1);
        scrollToTop();
        setToggleDispach(true);
        setJobCard([]);
    };

    const handleDepartmentCheckbox = (data: any) => {
        scrollToTop();
        setPage(1);
        setToggleDispach(true);
        setJobCard([]);
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
        setToggleDispach(true);
        setJobCard([]);
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
        setToggleDispach(true);
        setJobCard([]);
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
        setToggleDispach(true);
        setJobCard([]);
    };

    const handleCompanyTypeCheckbox = (data: any) => {
        scrollToTop();
        setPage(1);
        setToggleDispach(true);
        setJobCard([]);
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
        setToggleDispach(true);
        setJobCard([]);
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
        setToggleDispach(true);
        setJobCard([]);
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

    const onClickJobCard = (jobId: any) => {
        window.open(`/allJobs/jobDescription/${jobId}`, '_blank');
    }

    const handleViewAll = () => {
        setIsOpen(true);
        dispatch(setNavigateFilterOption("Experience"));
    }

    const handleClearAll = () => {
        dispatch(clearAll());
        setToggleDispach(true);
    }


    useEffect(() => {
        jobCard?.map((job: { id: any; }) => {
            getCheckJobToSave(Number(userId), Number(job?.id)).then((count: any) => {
                if (count > 0) {
                    setSaveJobCount((prevSavedJobs) => ({
                        ...prevSavedJobs,
                        [job?.id]: true,
                    }));
                } else {
                    setSaveJobCount((prevSavedJobs) => ({
                        ...prevSavedJobs,
                        [job?.id]: false,
                    }));
                }
            });
        })
    }, [jobCard, userId]);

    useEffect(() => {
        if (saveButton === 'save') {
            setSaveJobCount((prevSavedJobs) => ({
                ...prevSavedJobs,
                [jobId]: true,
            }));
            dispatch(
                saveJobs({
                    jobSeekerProfile: userId && parseInt(userId),
                    jobs: jobId && parseInt(jobId),
                })
            ).then((data: any) => {
                if (data?.payload?.count > 0) {
                    toast.info("job already saved !!");
                } else {
                    toast.success("job save successfully !!");
                }
            })
        }
    }, [userId, jobId, saveButton])

    useEffect(() => {
        if (userId) {
            (async () => {
                const saveBlockList = await listBlockedCompanies(Number(userId))
                if (Object?.keys(saveBlockList)?.length) {
                    let companyId = [] as any
                    saveBlockList.map((item: any) => { companyId?.push(item?.company?.id) })
                    setBlockCompanyList(companyId);
                }
            })();
        }
    }, [userId]);

    useEffect(() => {
        if (blockCompanyList)
            setJobCard(jobCard.filter((item: any) => !blockCompanyList.find((twoElement: any) => {
                return Number(item.company.id) === Number(twoElement)
            })))
    }, [blockCompanyList])

    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
                <div className="col-start-1 col-end-4">
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
                                            setToggleDispach(true)
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
                                                setToggleDispach(true)
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
                                                setToggleDispach(true)
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
                                                setToggleDispach(true)
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
                                            setToggleDispach(true)
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
                                                setToggleDispach(true)
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
                                                setToggleDispach(true)
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
                                                setToggleDispach(true)
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
                        <ExperienceBasedFilter handleTotalExpYearChange={handleTotalExpYearChange} isOpen={isOpen} />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <DepartmentBasedFilter
                            handleDepartmentCheckbox={handleDepartmentCheckbox}
                            setIsOpen={setIsOpen}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <LocationBasedFilter
                            handleLocationCheckbox={handleLocationCheckbox}
                            setIsOpen={setIsOpen}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <WorkModeBasedFilter
                            handleWorkModeCheckbox={handleWorkModeCheckbox}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <SalaryBasedFilter handleSalaryFilter={handleSalaryFilter} isOpen={isOpen} />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <CompanyTypeBasedFilter
                            handleCompanyTypeCheckbox={handleCompanyTypeCheckbox}
                            setIsOpen={setIsOpen}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <KeySkillsBasedFilter
                            handleKeySkillsCheckbox={handleKeySkillsCheckbox}
                            setIsOpen={setIsOpen}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <RoleCategoryBasedFilter
                            handleRoleCategoryCheckbox={handleRoleCategoryCheckbox}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                </div>
                <div className="col-start-4 col-end-11">
                    <JobCard
                        onClickJobCard={onClickJobCard}
                        jobCard={jobCard}
                        saveJobCount={saveJobCount}
                        setJobId={setJobId}
                        setSaveButton={setSaveButton}
                        loading={loading}
                        userId={userId}
                    />
                </div>
                <div className="col-start-11 col-end-13">
                    <div className="bg-[#F1F5F9] rounded-xl w-full p-5 sticky top-[13%]">
                        <h1 className="leading-none mb-3">Top Companies</h1>
                        <TopCompanies />
                    </div>
                </div>
            </div >
            <FiltersModal isOpen={isOpen} setIsOpen={setIsOpen} setToggleDispach={setToggleDispach} setJobCard={setJobCard} />
            <ToastContainer />
        </>
    )
}

export default AllJobs;