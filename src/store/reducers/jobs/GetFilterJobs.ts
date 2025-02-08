import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Company {
    id: number,
    title: string,
    status: boolean
}
interface TotalExpYearStart {
    id: number,
    title: string,
    status: boolean
}
interface TotalExpYearEnd {
    id: number,
    title: string,
    status: boolean
}
interface NumberSystem {
    id: number,
    title: string,
    status: boolean
}
interface Recurrence {
    id: number,
    title: string,
    status: boolean
}
interface JobsLocation {
    id: number,
    title: string,
    status: boolean
}
interface JobsRole {
    id: number,
    title: string,
    status: boolean
}
interface industryType {
    id: number,
    title: string,
    status: boolean
}
interface Department {
    id: number,
    title: string,
    status: boolean
}
interface EmployeeType {
    id: number,
    title: string,
    status: boolean
}
interface JobType {
    id: number,
    title: string,
    status: boolean
}
interface RoleCategory {
    id: number,
    title: string,
    status: boolean
}
interface Education {
    id: number,
    title: string,
    status: boolean
}
interface KeySkills {
    id: number,
    title: string,
    status: boolean
}
interface EmploymentType {
    id: number,
    title: string,
    status: boolean
}
interface JobsKeySkills {
    id: number,
    preferred: boolean,
    keySkills: KeySkills

}
interface AllJobs {
    id: number,
    title: string,
    payScaleLowerRange: number,
    jobsOpening: number,
    userType: string,
    payScaleUpperRange: number,
    jobDescription: string,
    createdAt: string,
    updatedAt: string,
    status: boolean,
    company: Company,
    totalExpYearStart: TotalExpYearStart,
    totalExpYearEnd: TotalExpYearEnd,
    numberSystem: NumberSystem,
    recurrence: Recurrence,
    jobsLocation: JobsLocation[],
    jobsRole: JobsRole,
    industryType: industryType,
    department: Department,
    employeeType: EmployeeType,
    jobType: JobType,
    roleCategory: RoleCategory,
    education: Education,
    user: null,
    jobsKeySkills: Array<JobsKeySkills>,
    employmentType: EmploymentType
}
interface AllJobsState {
    loading: boolean;
    error: boolean;
    success: boolean;
    allJobs: Array<AllJobs>;
    department: any;
    location: any;
    workMode: any;
    roleCategory: any;
    companyType: any;
    expYear: any;
    filtersData: any;
    checkItems: any;
    salary: any;
    keySkills: any;
    navigateFilterOption: string;
    departmentIds: number[];
    locationIds: number[];
    workModeIds: number[];
    companyTypeIds: number[];
    keySkillsIds: number[];
    roleCategoryIds: number[];
    maxExpYearId: any;
    maxSalaryId: any;
    errorMessage: string | undefined;
    searchDepartment: boolean,
    searchLocation: boolean,
    searchKeySkills: boolean,
    toggleFilter: boolean,
}
const initialState: AllJobsState = {
    loading: false,
    error: false,
    success: false,
    allJobs: [],
    department: [],
    location: [],
    workMode: [],
    roleCategory: [],
    companyType: [],
    expYear: [],
    salary: [],
    keySkills: [],
    filtersData: {
        expYear: null,
        department: [],
        location: [],
        workMode: [],
        salary: null,
        companyType: [],
        roleCategory: [],
        keySkills: []
    },
    checkItems: {
        department: [],
        location: [],
        workMode: [],
        companyType: [],
        keySkills: [],
    },
    navigateFilterOption: "",
    departmentIds: [],
    locationIds: [],
    workModeIds: [],
    companyTypeIds: [],
    keySkillsIds: [],
    roleCategoryIds: [],
    maxExpYearId: null,
    maxSalaryId: null,
    errorMessage: undefined,
    searchDepartment: true,
    searchLocation: true,
    searchKeySkills: true,
    toggleFilter: false,
}

export const getFilterJobs = createAsyncThunk(
    "jobList", async (data: any) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobs/list`, { params: data });
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            }
        } catch (error) {
            throw error;
        }
    });

const getFilterJobsSlice = createSlice({
    name: "jobList",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getFilterJobs.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(getFilterJobs.fulfilled, (state, action: PayloadAction<Array<AllJobs>>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.allJobs = action.payload;
        });
        builder.addCase(getFilterJobs.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearGetFilterJobsSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
        setDepartment: (state, action) => {
            state.department = action.payload;
            state.checkItems.department = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
            state.checkItems.location = action.payload;
        },
        setWorkMode: (state, action) => {
            state.workMode = action.payload;
            state.checkItems.workMode = action.payload;
        },
        setCompanyType: (state, action) => {
            state.companyType = action.payload;
            state.checkItems.companyType = action.payload;
        },
        setRoleCategory: (state, action) => {
            state.roleCategory = action.payload;
            state.checkItems.roleCategory = action.payload;
        },
        setExpYears: (state, action) => {
            state.expYear = action.payload;
        },
        setSalarys: (state, action) => {
            state.salary = action.payload;
        },
        setKeySkills: (state, action) => {
            state.keySkills = action.payload;
            state.checkItems.keySkills = action.payload;
        },
        setFilterDepartment: (state, action) => {
            if (!action?.payload?.filterDepartment) {
                state?.filtersData?.department?.push(action.payload);
                state?.departmentIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.department?.filter((item: any) => action?.payload?.filterDepartment !== item);
                state.filtersData.department = filterData;
                state.departmentIds = filterData;
            }
        },
        setFilterLocation: (state, action) => {
            if (!action?.payload?.filterLocation) {
                state?.filtersData?.location?.push(action.payload);
                state?.locationIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.location?.filter((item: any) => action?.payload?.filterLocation !== item);
                state.filtersData.location = filterData;
                state.locationIds = filterData;
            }
        },
        setFilterWorkMode: (state, action) => {
            if (!action?.payload?.filterWorkMode) {
                state?.filtersData?.workMode?.push(action.payload);
                state?.workModeIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.workMode?.filter((item: any) => action?.payload?.filterWorkMode !== item);
                state.filtersData.workMode = filterData;
                state.workModeIds = filterData;
            }
        },
        setFilterCompanyType: (state, action) => {
            if (!action?.payload?.filterCompanyType) {
                state?.filtersData?.companyType?.push(action.payload);
                state?.companyTypeIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.companyType?.filter((item: any) => action?.payload?.filterCompanyType !== item);
                state.filtersData.companyType = filterData;
                state.companyTypeIds = filterData;
            }
        },
        setFilterRoleCategory: (state, action) => {
            if (!action?.payload?.filterRoleCategory) {
                state?.filtersData?.roleCategory?.push(action.payload);
                state?.roleCategoryIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.roleCategory?.filter((item: any) => action?.payload?.filterRoleCategory !== item);
                state.filtersData.roleCategory = filterData;
                state.roleCategoryIds = filterData;
            }
        },
        setFilterKeySkills: (state, action) => {
            if (!action?.payload?.filterKeySkills) {
                state?.filtersData?.keySkills?.push(action.payload);
                state?.keySkillsIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.keySkills?.filter((item: any) => action?.payload?.filterKeySkills !== item);
                state.filtersData.keySkills = filterData;
                state.keySkillsIds = filterData;
            }
        },
        setFilterExpYear: (state, action) => {
            const experienceYearsData = state?.expYear?.filter((item: any) => {
                let data = item?.title?.split('');
                let splitVal = data?.slice(0, data.length - 5);
                let joinedVal = parseInt(splitVal?.join(''));
                if (joinedVal === action.payload) {
                    return item
                }
            })
            state.filtersData.expYear = action.payload !== 0 ? experienceYearsData?.[0]?.id : 0;
            if (experienceYearsData?.[0]?.title !== undefined) {
                let data = experienceYearsData?.[0]?.title?.split('');
                let splitVal = data?.slice(0, data.length - 5);
                let joinedVal = parseInt(splitVal?.join(''));
                state.maxExpYearId = action.payload !== 0 ? joinedVal : 0;
            } else {
                state.maxExpYearId = action.payload !== 0 ? action.payload : 0;
            }
        },
        setFilterSalary: (state, action) => {
            const salaryRangeListData = state?.salary?.filter((item: any) => parseInt(item?.title) === action.payload);
            state.filtersData.salary = action.payload !== 0 ? salaryRangeListData?.[0]?.id : 0;
            if (salaryRangeListData?.[0]?.title !== undefined) {
                state.maxSalaryId = action.payload !== 0 ? salaryRangeListData?.[0]?.title : 0;
            } else {
                state.maxSalaryId = action.payload !== 0 ? action.payload : 0;
            }
        },
        bulkFilter: (state, action) => {
            const experienceYearsData = state?.expYear?.filter((item: any) => {
                let data = item?.title?.split('');
                let splitVal = data?.slice(0, data.length - 5);
                let joinedVal = parseInt(splitVal?.join(''));
                if (joinedVal === action?.payload?.expYear) {
                    return item
                }
            })
            if (action?.payload?.expYear) {
                state.filtersData.expYear = experienceYearsData?.[0]?.id;
            } else {
                state.filtersData.expYear = null;
            }
            const salaryRangeListData = state?.salary?.filter((item: any) => parseInt(item?.title) === action?.payload?.salary);
            if (action?.payload?.salary) {
                state.filtersData.salary = salaryRangeListData?.[0]?.id;
            } else {
                state.filtersData.salary = null;
            }

            state.filtersData.department = action?.payload?.department;
            state.filtersData.location = action?.payload?.location;
            state.filtersData.workMode = action?.payload?.workMode;
            state.filtersData.companyType = action?.payload?.companyType;
            state.filtersData.keySkills = action?.payload?.keySkills;
            state.filtersData.roleCategory = action?.payload?.roleCategory;
        },
        setNavigateFilterOption: (state, action) => {
            state.navigateFilterOption = action?.payload;
        },
        setCheckItems: (state, action) => {
            if (action?.payload?.department) {
                state.checkItems.department = action?.payload?.department;
            }
            if (action?.payload?.location) {
                state.checkItems.location = action?.payload?.location;
            }
            if (action?.payload?.workMode) {
                state.checkItems.workMode = action?.payload?.workMode;
            }
            if (action?.payload?.companyType) {
                state.checkItems.companyType = action?.payload?.companyType;
            }
            if (action?.payload?.keySkills) {
                state.checkItems.keySkills = action?.payload?.keySkills;
            }
            if (action?.payload?.roleCategory) {
                state.checkItems.roleCategory = action?.payload?.roleCategory;
            }
        },
        setDepartmentIds: (state, action) => {
            if (action?.payload?.filter) {
                const departmentFilter = state?.departmentIds?.filter((item: any) => item !== action?.payload?.filter);
                state.departmentIds = departmentFilter;
            } else {
                state.departmentIds?.push(action.payload);
            }
        },
        setLocationIds: (state, action) => {
            if (action?.payload?.filter) {
                const locationFilter = state?.locationIds?.filter((item: any) => item !== action?.payload?.filter);
                state.locationIds = locationFilter;
            } else {
                state.locationIds?.push(action.payload);
            }
        },
        setKeySkillsIds: (state, action) => {
            if (action?.payload?.filter) {
                const keySkillsFilter = state?.keySkillsIds?.filter((item: any) => item !== action?.payload?.filter);
                state.keySkillsIds = keySkillsFilter;
            } else {
                state.keySkillsIds?.push(action.payload);
            }
        },
        setRoleCategoryIds: (state, action) => {
            if (action?.payload?.filter) {
                const roleCategoryFilter = state?.roleCategoryIds?.filter((item: any) => item !== action?.payload?.filter);
                state.roleCategoryIds = roleCategoryFilter;
            } else {
                state.roleCategoryIds?.push(action.payload);
            }
        },
        setWorkModeIds: (state, action) => {
            if (action?.payload?.filter) {
                const workModeFilter = state?.workModeIds?.filter((item: any) => item !== action?.payload?.filter);
                state.workModeIds = workModeFilter;
            } else {
                state.workModeIds?.push(action.payload);
            }
        },
        setCompanyTypeIds: (state, action) => {
            if (action?.payload?.filter) {
                const companyTypFilter = state?.companyTypeIds?.filter((item: any) => item !== action?.payload?.filter);
                state.companyTypeIds = companyTypFilter;
            } else {
                state.companyTypeIds?.push(action.payload);
            }
        },
        setMaxExpYearId: (state, action) => {
            state.maxExpYearId = action.payload;
        },
        setMaxSalaryId: (state, action) => {
            state.maxSalaryId = action.payload;
        },
        resetCheckItem: (state) => {
            const experienceYearsData = state?.expYear?.filter((item: any) => parseInt(item?.id) === state?.filtersData?.expYear);
            const experienceData = experienceYearsData[0]?.title?.split('');
            state.maxExpYearId = parseInt(experienceData?.slice(0, experienceData.length - 5).join(''));

            const salaryRangeListData = state?.salary?.filter((item: any) => parseInt(item?.id) === state?.filtersData?.salary);
            state.maxSalaryId = parseInt(salaryRangeListData?.[0]?.title);

            state.checkItems.department = state?.department;
            const department = JSON.stringify(state?.department?.filter((item: any) => item?.isChecked));
            state.departmentIds = JSON.parse(department).map((item: any) => item.id);

            state.checkItems.location = state?.location;
            const location = JSON.stringify(state?.location?.filter((item: any) => item?.isChecked));
            state.locationIds = JSON.parse(location).map((item: any) => item.id);

            state.checkItems.workMode = state?.workMode;
            const workMode = JSON.stringify(state?.workMode?.filter((item: any) => item?.isChecked));
            state.workModeIds = JSON.parse(workMode).map((item: any) => item.id);

            state.checkItems.companyType = state?.companyType;
            const companyType = JSON.stringify(state?.companyType?.filter((item: any) => item?.isChecked));
            state.companyTypeIds = JSON.parse(companyType).map((item: any) => item.id);


            state.checkItems.keySkills = state?.keySkills;
            const keySkills = JSON.stringify(state?.keySkills?.filter((item: any) => item?.isChecked));
            state.keySkillsIds = JSON.parse(keySkills).map((item: any) => item.id);

            state.checkItems.roleCategory = state?.roleCategory;
            const roleCategory = JSON.stringify(state?.roleCategory?.filter((item: any) => item?.isChecked));
            state.roleCategoryIds = JSON.parse(roleCategory).map((item: any) => item.id);
        },
        clearAll: (state) => {
            state.filtersData.expYear = null;
            state.filtersData.department = [];
            state.filtersData.location = [];
            state.filtersData.workMode = [];
            state.filtersData.salary = null;
            state.filtersData.companyType = [];
            state.filtersData.keySkills = [];
            state.filtersData.roleCategory = [];
            state.departmentIds = [];
            state.locationIds = [];
            state.workModeIds = [];
            state.companyTypeIds = [];
            state.keySkillsIds = [];
            state.maxExpYearId = null;
            state.maxSalaryId = null;
            state.department = state?.department?.map((item: any) => { return { ...item, isChecked: false } });
            state.location = state?.location?.map((item: any) => { return { ...item, isChecked: false } });
            state.workMode = state?.workMode?.map((item: any) => { return { ...item, isChecked: false } });
            state.companyType = state?.companyType?.map((item: any) => { return { ...item, isChecked: false } });
            state.keySkills = state?.keySkills?.map((item: any) => { return { ...item, isChecked: false } });
            state.roleCategory = state?.roleCategory?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.department = state?.department?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.location = state?.location?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.workMode = state?.workMode?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.companyType = state?.companyType?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.keySkills = state?.keySkills?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.roleCategory = state?.roleCategory?.map((item: any) => { return { ...item, isChecked: false } });
            state.toggleFilter = true;
        },
        modalReset: (state) => {
            state.departmentIds = []
            state.locationIds = [];
            state.workModeIds = [];
            state.companyTypeIds = [];
            state.keySkillsIds = [];
            state.roleCategoryIds = [];
            state.maxExpYearId = null;
            state.maxSalaryId = null;
            state.checkItems.department = state?.department?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.location = state?.location?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.workMode = state?.workMode?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.companyType = state?.companyType?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.keySkills = state?.keySkills?.map((item: any) => { return { ...item, isChecked: false } });
            state.checkItems.roleCategory = state?.roleCategory?.map((item: any) => { return { ...item, isChecked: false } });
        },
        clearIndividual: (state, action) => {
            state.toggleFilter = true;
            if (action?.payload?.expYear) {
                state.filtersData.expYear = null;
                state.maxExpYearId = null;
            }
            if (action?.payload?.department) {
                const filterData = state?.filtersData?.department?.filter((item: any) => item !== action?.payload?.department);
                state.filtersData.department = filterData;
                state.departmentIds = filterData;
                const mapData = state?.department?.map((item: any) => {
                    if (item?.id !== action?.payload?.department) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.department = mapData;
                state.checkItems.department = mapData;
            }
            if (action?.payload?.location) {
                const filterData = state?.filtersData?.location?.filter((item: any) => item !== action?.payload?.location);
                state.filtersData.location = filterData;
                state.locationIds = filterData;
                const mapData = state?.location?.map((item: any) => {
                    if (item?.id !== action?.payload?.location) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.location = mapData;
                state.checkItems.location = mapData;
            }
            if (action?.payload?.workMode) {
                const filterData = state?.filtersData?.workMode?.filter((item: any) => item !== action?.payload?.workMode);
                state.filtersData.workMode = filterData;
                state.workModeIds = filterData;
                const mapData = state?.workMode?.map((item: any) => {
                    if (item?.id !== action?.payload?.workMode) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.workMode = mapData;
                state.checkItems.workMode = mapData;
            }
            if (action?.payload?.salary) {
                state.filtersData.salary = null;
                state.maxSalaryId = null;
            }
            if (action?.payload?.companyType) {
                const filterData = state?.filtersData?.companyType?.filter((item: any) => item !== action?.payload?.companyType);
                state.filtersData.companyType = filterData;
                state.companyTypeIds = filterData;
                const mapData = state?.companyType?.map((item: any) => {
                    if (item?.id !== action?.payload?.companyType) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.companyType = mapData;
                state.checkItems.companyType = mapData;
            }
            if (action?.payload?.keySkills) {
                const filterData = state?.filtersData?.keySkills?.filter((item: any) => item !== action?.payload?.keySkills);
                state.filtersData.keySkills = filterData;
                state.keySkillsIds = filterData;
                const mapData = state?.keySkills?.map((item: any) => {
                    if (item?.id !== action?.payload?.keySkills) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.keySkills = mapData;
                state.checkItems.keySkills = mapData;
            }
            if (action?.payload?.roleCategory) {
                const filterData = state?.filtersData?.roleCategory?.filter((item: any) => item !== action?.payload?.roleCategory);
                state.filtersData.roleCategory = filterData;
                state.roleCategoryIds = filterData;
                const mapData = state?.roleCategory?.map((item: any) => {
                    if (item?.id !== action?.payload?.roleCategory) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.roleCategory = mapData;
                state.checkItems.roleCategory = mapData;
            }
        },
        modalResetIndividual: (state, action) => {
            if (action?.payload?.expYear) {
                state.maxExpYearId = null;
            }
            if (action?.payload?.department) {
                const filterData = state.departmentIds?.filter((item: any) => item !== action?.payload?.department);
                state.departmentIds = filterData;
                const mapData = state?.checkItems?.department?.map((item: any) => {
                    if (item?.id !== action?.payload?.department) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.checkItems.department = mapData;
            }
            if (action?.payload?.location) {
                const filterData = state.locationIds?.filter((item: any) => item !== action?.payload?.location);
                state.locationIds = filterData;
                const mapData = state?.checkItems?.location?.map((item: any) => {
                    if (item?.id !== action?.payload?.location) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.checkItems.location = mapData;
            }
            if (action?.payload?.workMode) {
                const filterData = state.workModeIds?.filter((item: any) => item !== action?.payload?.workMode);
                state.workModeIds = filterData;
                const mapData = state?.checkItems?.workMode?.map((item: any) => {
                    if (item?.id !== action?.payload?.workMode) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.checkItems.workMode = mapData;
            }
            if (action?.payload?.salary) {
                state.maxSalaryId = null;
            }
            if (action?.payload?.companyType) {
                const filterData = state.companyTypeIds?.filter((item: any) => item !== action?.payload?.companyType);
                state.companyTypeIds = filterData;
                const mapData = state?.checkItems?.companyType?.map((item: any) => {
                    if (item?.id !== action?.payload?.companyType) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.checkItems.companyType = mapData;
            }
            if (action?.payload?.keySkills) {
                const filterData = state.keySkillsIds?.filter((item: any) => item !== action?.payload?.keySkills);
                state.keySkillsIds = filterData;
                const mapData = state?.checkItems?.keySkills?.map((item: any) => {
                    if (item?.id !== action?.payload?.keySkills) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.checkItems.keySkills = mapData;
            }
            if (action?.payload?.roleCategory) {
                const filterData = state.roleCategoryIds?.filter((item: any) => item !== action?.payload?.roleCategory);
                state.roleCategoryIds = filterData;
                const mapData = state?.checkItems?.roleCategory?.map((item: any) => {
                    if (item?.id !== action?.payload?.roleCategory) {
                        return item
                    } else {
                        return { ...item, isChecked: false }
                    }
                });
                state.checkItems.roleCategory = mapData;
            }
        },
        setSearchDepartment: (state, action) => {
            state.searchDepartment = action?.payload;
        },
        setSearchLocation: (state, action) => {
            state.searchLocation = action?.payload;
        },
        setSearchKeySkills: (state, action) => {
            state.searchKeySkills = action?.payload;
        },
        setToggleFilter: (state) => {
            state.toggleFilter = false
        }
    }
});
export default getFilterJobsSlice.reducer;
export const { clearGetFilterJobsSlice,
    setDepartment,
    setLocation,
    setWorkMode,
    setRoleCategory,
    setCompanyType,
    setExpYears,
    setSalarys,
    setKeySkills,
    setFilterDepartment,
    setFilterLocation,
    setFilterWorkMode,
    setFilterCompanyType,
    setFilterRoleCategory,
    setFilterKeySkills,
    setFilterExpYear,
    setFilterSalary,
    bulkFilter,
    setNavigateFilterOption,
    setCheckItems,
    setDepartmentIds,
    setLocationIds,
    setKeySkillsIds,
    setRoleCategoryIds,
    setWorkModeIds,
    setCompanyTypeIds,
    setMaxExpYearId,
    setMaxSalaryId,
    resetCheckItem,
    clearAll,
    modalReset,
    clearIndividual,
    modalResetIndividual,
    setSearchDepartment,
    setSearchLocation,
    setSearchKeySkills,
    setToggleFilter } = getFilterJobsSlice.actions;