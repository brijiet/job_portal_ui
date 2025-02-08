import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Company {
    companyImage: any;
    user: any;
    employeeCount: any;
    location: Array<Location>;
    reviews: any;
    rating: any;
    id: number,
    title: string,
    status: boolean
}
interface Location {
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
interface Industry {
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
interface Locality {
    id: number,
    title: string,
    status: boolean
}
interface JobType {
    id: number,
    title: string,
    status: boolean
}
interface Currency {
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
interface SalaryRange {
    id: number,
    title: string,
    status: boolean
}

interface KeySkills {
    id: number,
    title: string,
    status: boolean
}
interface JobsKeySkills {
    id: number,
    preferred: boolean,
    keySkills: KeySkills
}
interface employmentType {
    id: number,
    title: string,
    status: boolean
}
interface WorkMode {
    id: number,
    title: string,
    status: boolean
}

interface JobStatus {
    id: number,
    title: string,
    statusValue: number,
    status: boolean
}

interface JobExpiry {
    id: number,
    title: string,
    numberOfDays: number,
    status: boolean
}
interface GetJob {
    id: number,
    title: string,
    companyImage:string
    payScaleLowerRange: { id: string, title: string },
    jobsOpening: number,
    userType: string,
    payScaleUpperRange: { id: string, title: string },
    jobDescription: string,
    createdAt: string,
    updatedAt: string,
    jobStatus: JobStatus,
    jobExpiry: JobExpiry,
    company: Company,
    totalExpYearStart: TotalExpYearStart,
    totalExpYearEnd: TotalExpYearEnd,
    numberSystem: NumberSystem,
    recurrence: Recurrence,
    jobsLocation: Array<JobsLocation>,
    jobsRole: JobsRole,
    industryType: industryType,
    employmentType: employmentType,
    department: Department,
    employeeType: EmployeeType,
    jobsType: JobType,
    roleCategory: RoleCategory,
    education: Education,
    workMode: WorkMode,
    user: null,
    jobsKeySkills: Array<JobsKeySkills>,
    candidateRelocate: boolean,
    jobLocality: Array<Locality>,
    currency: Currency,
    fromSalaryRange: SalaryRange,
    toSalaryRange: SalaryRange,
    companyType: Industry,
    jobEducation: Array<Education>,
    premiumBTech: boolean,
    premiumMBAAll: boolean,
    jobCandidateIndustry: Array<Industry>,
    diversityHiring: boolean,
    hideCompanyRating: boolean,
    videoProfile: boolean,
    includeWalkInDetails: boolean,
    notifyMeAbout: boolean,
    notificationEmailAddress1: string,
    notificationEmailAddress2: string,
    companyWebsite: string,
    aboutCompany: string,
    companyAddress: string,
    keyResponsibility: string,
    hideSalaryDetails: boolean,
    questionnaire: {
        question: string
        questionType: string
        characterLimit: string
        requiredCheck: string
        rangeMax: string
        singleSelection: { option: string }[]
        multipleSelection: { option: string }[]
    }[]
}
interface GetJobState {
    loading: boolean;
    error: boolean;
    success: boolean;
    jobDetail: GetJob;
    errorMessage: string | undefined;
}
let job = {} as GetJob;
const initialState: GetJobState = {
    loading: false,
    error: false,
    success: false,
    jobDetail: job,
    errorMessage: undefined,
}

export const getJobDetail = createAsyncThunk(
    "getJobDetail", async (data: any) => {
        try {

            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobs/get/${data}`);
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            }
        } catch (error) {
            throw error;
        }
    });

const getJobDetailSlice = createSlice({
    name: 'getJobDetail',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getJobDetail.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(getJobDetail.fulfilled, (state, action: PayloadAction<GetJob>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.jobDetail = action.payload;
        });
        builder.addCase(getJobDetail.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearGetJobDetailSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },

        resetJobDetail: (state) => {
            state.jobDetail = job
        }
    }
});
export default getJobDetailSlice.reducer;
export const { clearGetJobDetailSlice, resetJobDetail } = getJobDetailSlice.actions;