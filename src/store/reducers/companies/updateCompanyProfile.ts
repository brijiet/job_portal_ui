import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

class companyBasicDetail {
    companyImage!: string;
    companyDescription!: string;
}
export class registerUserState {
    loading!: boolean;
    error!: boolean;
    success!: boolean;
    companyBasicDetails!: any;
    errorMessage: string | undefined;
}
const companyBasicDetails: companyBasicDetail = new companyBasicDetail()
const initialState: registerUserState = {
    loading: false,
    error: false,
    success: false,
    companyBasicDetails: companyBasicDetails,
    errorMessage: undefined,
}

export const updateCompanyprofile = createAsyncThunk(
    "updateCompanyprofile", async ({ id, data }: { id: number, data: any }) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_PATH}/companies/profileupdate/${id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                }

            );
            return response.data.data;
        } catch (error: any) {
            throw (error.response.data.message);
        }
    });

const updateCompanyprofileSlice = createSlice({
    name: 'updateCompanyprofile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateCompanyprofile.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(updateCompanyprofile.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.errorMessage = '';
            state.companyBasicDetails = action.payload;
        });
        builder.addCase(updateCompanyprofile.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearCompanyDetailsState: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default updateCompanyprofileSlice.reducer;
export const { clearCompanyDetailsState } = updateCompanyprofileSlice.actions;