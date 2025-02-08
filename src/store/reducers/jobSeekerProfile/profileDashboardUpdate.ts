import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ProfileDashboard {
    id: number,
    profileSummary?: string | null,
    about?: string | null
}
export interface registerUserState {
    loading: boolean;
    error: boolean;
    success: boolean;
    profileDashboard: Array<ProfileDashboard>;
    errorMessage: string | undefined;
}

const initialState: registerUserState = {
    loading: false,
    error: false,
    success: false,
    profileDashboard: [],
    errorMessage: undefined,
}


export const profileDashboardUpdate = createAsyncThunk(
    "profileDashboard", async (data: ProfileDashboard) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/profileDashboard`,
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

const updateProfileDashboardSlice = createSlice({
    name: 'profileDashboard',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(profileDashboardUpdate.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(profileDashboardUpdate.fulfilled, (state, action: PayloadAction<ProfileDashboard[]>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.profileDashboard = action.payload;
        });
        builder.addCase(profileDashboardUpdate.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.profileDashboard = [];
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearUpdateProfileDashboardSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default updateProfileDashboardSlice.reducer;
export const { clearUpdateProfileDashboardSlice } = updateProfileDashboardSlice.actions;