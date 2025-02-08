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

export const deleteProfilePicture = createAsyncThunk(
  'upload/deleteProfilePicture', async (data:any) => {
    try {
    
      const response = await axios.put(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/profilePictureDelete`,
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

const jobSeekerDeleteProfilePictureSlice = createSlice({
  name: 'deleteProfilePicture',
  initialState,
  extraReducers: (builder) => {
    
    builder.addCase(deleteProfilePicture.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = '';
      state.success = false;
    });
    builder.addCase(deleteProfilePicture.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.errorMessage = '';
      state.formData = action.payload.data;
    });
    builder.addCase(deleteProfilePicture.rejected, (state, action: any) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
      state.success = false;
    })
  }
  ,
  reducers: {
    clearDeleteProfilePictureState: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});

export default jobSeekerDeleteProfilePictureSlice.reducer;
export const { clearDeleteProfilePictureState }=  jobSeekerDeleteProfilePictureSlice.actions ;