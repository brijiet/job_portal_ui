import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

export interface UploadState {
  loading: boolean
  error: boolean
  success: boolean
  formData: any
  errorMessage: string | undefined
}

const initialState: UploadState = {
  loading: false,
  error: false,
  success: false,
  formData: '',
  errorMessage: ''

}

export const deleteCompanyDetails = createAsyncThunk(
  'deleteCompanyDetails', async (data: any) => {
    try {

      const response = await axios.put(`${process.env.REACT_APP_API_PATH}/companies/delete`,data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      throw (error.response.data.message);
    }
  }
);

const deleteCompanyDetailsSlice = createSlice({
  name: 'deleteCompanyDetails',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(deleteCompanyDetails.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = '';
      state.success = false;
    });
    builder.addCase(deleteCompanyDetails.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.errorMessage = '';
      state.formData = action.payload.data;
    });
    builder.addCase(deleteCompanyDetails.rejected, (state, action: any) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
      state.success = false;
    })
  }
  ,
  reducers: {
    deleteCompanyDetailsState: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});

export default deleteCompanyDetailsSlice.reducer;
export const { deleteCompanyDetailsState } = deleteCompanyDetailsSlice.actions;