import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
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
    userType: ''
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

export const sendUserOtp = createAsyncThunk(
    "sendUserOtp", async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/sendOtp`,
                {
                    headers: {
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

const sendUserOtpSlice = createSlice({
    name: 'sendUserOtp',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(sendUserOtp.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(sendUserOtp.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.success = true;
            state.userData = action.payload;
        });
        builder.addCase(sendUserOtp.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.userData = emptyUserData();
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearSendUserOtpSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default sendUserOtpSlice.reducer;
export const { clearSendUserOtpSlice } = sendUserOtpSlice.actions;