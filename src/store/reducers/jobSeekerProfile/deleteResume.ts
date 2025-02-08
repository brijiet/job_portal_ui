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

// interface JobSeekerProfile {
//   id: number
//   workStatus: boolean
//   resume: string
//   profilePicture: string
//   noOfSections: number
//   completedSections: number
// }

// interface FormParams  extends FormData{
//   id: number
//   file:File
// }

export interface UploadState {
  loading: boolean
  error: boolean
  success: boolean
  formData: any
  errorMessage: string | undefined
}

// const formData = {} as FormParams;
const initialState: UploadState = {
  loading: false,
  error: false,
  success: false,
  formData: '',
  errorMessage: ''

}

export const resumeDelete = createAsyncThunk(
  'upload/resumeDelete', async (data:any) => {
    try {
      
      const response = await axios.put(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/resumeDelete`,
        data,
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

const jobSeekerResumeDeleteSlice = createSlice({
  name: 'resumeDelete',
  initialState,
  extraReducers: (builder) => {
    
    builder.addCase(resumeDelete.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = '';
      state.success = false;
    });
    builder.addCase(resumeDelete.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.errorMessage = '';
      state.formData = action.payload.data;
    });
    builder.addCase(resumeDelete.rejected, (state, action: any) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
      state.success = false;
    })
  }
  ,
  reducers: {
    clearresumeDeleteState: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});

export default jobSeekerResumeDeleteSlice.reducer;
export const { clearresumeDeleteState }=  jobSeekerResumeDeleteSlice.actions ;