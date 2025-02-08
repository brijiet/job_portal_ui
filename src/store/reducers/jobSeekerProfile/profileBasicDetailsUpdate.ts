import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

class ProfileBasicDetails {
    totalExpMonth: any
    totalExpYear: any
    name!: string;
    jobSeekerType!: string;
    currentLocation: any
    currentSalary!: string;
    mobileNumber!: string;
    noticePeriod: any
    email!: string;
}
export class registerUserState {
    loading!: boolean;
    error!: boolean;
    success!: boolean;
    profileBasicDetails!: any;
    errorMessage: string | undefined;
}

const profileBasicDetails: ProfileBasicDetails = new ProfileBasicDetails()
const initialState: registerUserState = {
    loading: false,
    error: false,
    success: false,
    profileBasicDetails: profileBasicDetails,
    errorMessage: undefined,
}

export const updateProfileBasicDetails = createAsyncThunk(
    "profileBasicDetails", async (data: ProfileBasicDetails) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/profileBasicDetails`,
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

const updateProfileBasicDetailsSlice = createSlice({
    name: 'profileBasicDetails',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(
            updateProfileBasicDetails.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = false;
            });
        builder.addCase(
            updateProfileBasicDetails.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.error = false;
                state.profileBasicDetails = profileBasicDetails;
            });
        builder.addCase(
            updateProfileBasicDetails.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.profileBasicDetails = profileBasicDetails;
                state.errorMessage = action.error.message;
            });
    },
    reducers: {
        clearUpdateProfileBasicDetailsSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default updateProfileBasicDetailsSlice.reducer;
export const { clearUpdateProfileBasicDetailsSlice } = updateProfileBasicDetailsSlice.actions;