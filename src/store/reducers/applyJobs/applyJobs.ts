import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState: any = {
  loading: false,
  error: false,
  success: false,
  applyJobs: {},
  errorMessage: undefined,
}

export const applyJobs = createAsyncThunk(
  "applyJobs", async (data: any) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/applyJob/post`,
        data, {
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

export const applyJobsCount = createAsyncThunk(
  "applyJobsCount", async (data: any) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/applyJob/countApplicantWithList/${data}`,
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


export const applyJobList = createAsyncThunk(
  "applyJobsList", async (data: any) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/applyJob/applyJobList/${data}`,
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

const applyJobsSlice = createSlice({
  name: 'applyJobs',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(applyJobs.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(applyJobs.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.companyDetails = action.payload;
    });
    builder.addCase(applyJobs.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearApplyJobsSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default applyJobsSlice.reducer;
export const { clearApplyJobsSlice } = applyJobsSlice.actions;