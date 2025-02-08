import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState: any = {
    loading: false,
    error: false,
    success: false,
    companyDetails: {},
    errorMessage: undefined,
}

export const getEmployerCompanyList = createAsyncThunk(
    "getCompanyDetails", async (data: any) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/companies/employerCompanyList`,
                {
                    params: data,
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

const getEmployerCompanyListSlice = createSlice({
    name: 'getEmployerCompanyList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getEmployerCompanyList.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(getEmployerCompanyList.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.companyDetails = action.payload;
        });
        builder.addCase(getEmployerCompanyList.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearEmployerCompanyListSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default getEmployerCompanyListSlice.reducer;
export const { clearEmployerCompanyListSlice } = getEmployerCompanyListSlice.actions;