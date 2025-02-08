import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
    isEmailVerified: any;
    isMobileVerified: any;
    id: number
    name: string
    email: string
    accountType: string
    accountId: string
    mobileNumber: string
    userType: string

}

const emptyUserData = (): User => ({
    id: 0,
    email: '',
    name: '',
    accountType: '',
    accountId: '',
    mobileNumber: '',
    userType: '',
    isMobileVerified: false,
    isEmailVerified: false
})

interface getUserState {
    loading: boolean;
    error: boolean;
    success: boolean;
    userData: User;
    errorMessage: string | undefined;
}

const initialState: getUserState = {
    loading: false,
    error: false,
    success: false,
    userData: emptyUserData(),
    errorMessage: undefined,
}

export const verifyEmail = createAsyncThunk(
    "verifyEmail", async (data:any) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/emailVerification`,
            data,
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                }
            );
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            }
        } catch (error: any) {
            console.log('error ', error)
            throw error?.response?.data?.message;
        }
    });

const verifyEmailSlice = createSlice({
    name: 'verifyEmail',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(verifyEmail.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(verifyEmail.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.success = true;
            state.userData = action.payload;
        });
        builder.addCase(verifyEmail.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.userData = emptyUserData();
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearVerifyEmailSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default verifyEmailSlice.reducer;
export const { clearVerifyEmailSlice } = verifyEmailSlice.actions;