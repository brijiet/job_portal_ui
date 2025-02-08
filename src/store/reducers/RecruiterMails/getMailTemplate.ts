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
export const getMailTemplateDetails = createAsyncThunk(
    "getMailTemplate", async (templateId: any) => { 
      try { 
        const response = await axios.get(`${process.env.REACT_APP_API_PATH}/mailTemplate/getMailTemplateDetails`,
          {
            params:{
                templateId:templateId
            },
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

const getMailTemplateSlice = createSlice({
  name: 'getMailTemplate',
  initialState,
  extraReducers: (builder) => {
    
    builder.addCase(getMailTemplateDetails.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = '';
      state.success = false;
    });
    builder.addCase(getMailTemplateDetails.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.errorMessage = '';
      state.formData = action.payload.data;
    });
    builder.addCase(getMailTemplateDetails.rejected, (state, action: any) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
      state.success = false;
    })
  }
  ,
  reducers: {
    cleargetMailTemplateState: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});

export default getMailTemplateSlice.reducer;
export const { cleargetMailTemplateState }=  getMailTemplateSlice.actions ;