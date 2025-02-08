import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface JobSeekerEducation {
  jobSeekerProfile: number,
  courseType: string
    education: string
    board:string
  institute: string
  passingYear: string
  percentage: string
  specialization: string
}
export interface registerUserState {
    loading: boolean;
    error: boolean;
    success: boolean;
    educationData:[],
    errorMessage: string | undefined;
}

const initialState: registerUserState = {
    loading: false,
    error: false,
    success: false,
    //profileDashboard: [],
    educationData:[],
    errorMessage: undefined,
}


export const jobSeekerEducationAdd = createAsyncThunk(
    "education", async (data: JobSeekerEducation) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/education`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                }
            );
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    });

const jobSeekerEducationAddSlice = createSlice({
    name: 'education',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(jobSeekerEducationAdd.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        // builder.addCase(jobSeekerEducationAdd.fulfilled, (state, action: PayloadAction<JobSeekerEducation[]>) => {
        builder.addCase(jobSeekerEducationAdd.fulfilled, (state, action: any) => {
            state.loading = false;
            state.success = true;
            state.error = false;            
            state.educationData = action?.payload?.data;
        });
        builder.addCase(jobSeekerEducationAdd.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            //state.profileDashboard = [];
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearJobSeekerEducationAddSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default jobSeekerEducationAddSlice.reducer;
export const { clearJobSeekerEducationAddSlice } = jobSeekerEducationAddSlice.actions;