import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


interface ProfileDashboard {
    [x: string]: any;
    currentJobTitle: any;
    currentCompany: any;
    currentSalary: any
    resumeLastUpdated: any;
    profileLastUpdated: any;
    noticePeriod: any;
    keySkills: {
      filter(arg0: (item: any) => any): unknown; id: number, profileKeySkills: { title: string, id: number } 
};
    jobSeekerType: string;
    resumeFile: string;
    resumePath: string;
    currentCountry: string;
    currentLocation: any;
    workStatus: boolean;
    profilePictureFile: string;
    profilePicturePath: string;
    id: number,
    profileSummary: string,
    resumeHeadline: string,
    personalDetails: any,
    educations: any,
    employments: any,
    about: string,
}

interface registerUserState {
    loading: boolean;
    error: boolean;
    success: boolean;
    profileDashboard: ProfileDashboard;
    errorMessage: string | undefined;
}
const initialState: registerUserState = {
    loading: false,
    error: false,
    success: false,
    profileDashboard: {} as any,
    errorMessage: undefined,
}

export const profileDashboardGet = createAsyncThunk(
    "getProfileDashboard", async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/getProfileDashboard`,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                }
            );
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            }
        } catch (error) {
            throw error;
        }
    });

const getProfileDashboardSlice = createSlice({
    name: 'getProfileDashboard',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(profileDashboardGet.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(profileDashboardGet.fulfilled, (state, action: PayloadAction<ProfileDashboard>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.profileDashboard = action.payload;
        });
        builder.addCase(profileDashboardGet.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.profileDashboard = {} as any;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearGetProfileDashboardSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default getProfileDashboardSlice.reducer;
export const { clearGetProfileDashboardSlice } = getProfileDashboardSlice.actions;