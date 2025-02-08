import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface CompanyLocation {
    id: number,
    title: string,
    status: boolean
}

interface GetCompany {
    id: number,
    title: string,
    jobs: number,
    companyDescription: string,
    companyImage?: string,
    employeeCount: number,
    rating: number,
    reviews:number,
    createdAt: string,
    updatedAt: string,
    status: boolean,
    location: Array<CompanyLocation>,
}
interface GetCompanyState {
    loading: boolean;
    error: boolean;
    success: boolean;
    companyDetail: GetCompany;
    errorMessage: string | undefined;
}
let company = {} as GetCompany;
const initialState:GetCompanyState = {
    loading: false,
    error: false,
    success: false,
    companyDetail: company,
    errorMessage: undefined,
}

export const getCompanyDetails = createAsyncThunk(
    "getCompanyDetails", async (data: number) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/companies/get/${data}`);
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            }
        } catch (error) {
            throw error;
        }
    });

const getCompanyDetailSlice = createSlice({
    name: 'getCompanyDetails',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCompanyDetails.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(getCompanyDetails.fulfilled, (state, action: PayloadAction<GetCompany>) => {
            state.loading = false;
            state.success = true;
            state.error = false;            
            state.companyDetail = action.payload;
        });
        builder.addCase(getCompanyDetails.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearCompanyDetailSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default getCompanyDetailSlice.reducer;
export const { clearCompanyDetailSlice } = getCompanyDetailSlice.actions;