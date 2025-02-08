import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface jobSeekerEmployment {
  jobSeekerProfile: number,
  courseType: string
  employment: string
  institute: string
  passingYear: string
  percentage: string
  specialization: string
}
export interface registerUserState {
    loading: boolean;
    error: boolean;
    success: boolean;
    employmentData:[],
    errorMessage: string | undefined;
}

const initialState: registerUserState = {
    loading: false,
    error: false,
    success: false,
    //profileDashboard: [],
    employmentData:[],
    errorMessage: undefined,
}


export const jobSeekerEmploymentAdd = createAsyncThunk(
    "employment", async (data: jobSeekerEmployment) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobSeekerProfileEmployment/post`,
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

const jobSeekerEmploymentAddSlice = createSlice({
    name: 'employment',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(jobSeekerEmploymentAdd.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        // builder.addCase(jobSeekerEmploymentAdd.fulfilled, (state, action: PayloadAction<jobSeekerEmployment[]>) => {
        builder.addCase(jobSeekerEmploymentAdd.fulfilled, (state, action: any) => {
            state.loading = false;
            state.success = true;
            state.error = false;            
            state.employmentData = action?.payload?.data;
        });
        builder.addCase(jobSeekerEmploymentAdd.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            //state.profileDashboard = [];
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearJobSeekerEmploymentAddSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default jobSeekerEmploymentAddSlice.reducer;
export const { clearJobSeekerEmploymentAddSlice } = jobSeekerEmploymentAddSlice.actions;