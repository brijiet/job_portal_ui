import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';



const initialState: any = {
    loading: false,
    error: false,
    success: false,
    personalDetails: [],
    errorMessage: undefined,
}


export const personalDetails = createAsyncThunk(
    "personalDetails", async (data: any) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/personalDetails`,
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

const personalDetailsSlice = createSlice({
    name: 'personalDetails',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(personalDetails.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(personalDetails.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.personalDetails = action.payload;
        });
        builder.addCase(personalDetails.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.personalDetails = [];
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearPersonalDetailsSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default personalDetailsSlice.reducer;
export const { clearPersonalDetailsSlice } = personalDetailsSlice.actions;