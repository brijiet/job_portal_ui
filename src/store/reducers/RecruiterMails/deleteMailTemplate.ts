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
export const deleteMailTemplate = createAsyncThunk(
    "mailTemplateDelete", async (data: any) => {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_PATH}/mailTemplate/mailTemplateDelete`,
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('token')}`
            },
            data
          }
  
        );
        if (response.status === 200) {
          return response;
        }
      } catch (error) { 
        throw error;
      }
    });

const mailTemplateDeleteSlice = createSlice({
  name: 'mailTemplateDelete',
  initialState,
  extraReducers: (builder) => {
    
    builder.addCase(deleteMailTemplate.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = '';
      state.success = false;
    });
    builder.addCase(deleteMailTemplate.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.errorMessage = '';
      state.formData = action.payload.data;
    });
    builder.addCase(deleteMailTemplate.rejected, (state, action: any) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
      state.success = false;
    })
  }
  ,
  reducers: {
    clearMailTemplateDeleteState: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});

export default mailTemplateDeleteSlice.reducer;
export const { clearMailTemplateDeleteState }=  mailTemplateDeleteSlice.actions ;