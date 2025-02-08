import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState: any = {
  loading: false,
  error: false,
  success: false,
  saveJobs: {},
  errorMessage: undefined,
}

export const saveJobs = createAsyncThunk(
  "saveJobs", async (data: any) => {
    try {

      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/saveJob/post`,
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

export const deleteSaveJob = createAsyncThunk(
  "saveJobs", async (data: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_PATH}/saveJob/deleteJob/${data.jobs}/${data.user}`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          },
          params: data
        }

      );
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });


export const saveJobList = createAsyncThunk(
  "saveJobs", async (data: any) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/saveJob/saveJobList/${data}`,
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

const saveJobsSlice = createSlice({
  name: 'saveJobs',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(saveJobs.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(saveJobs.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.companyDetails = action.payload;
    });
    builder.addCase(saveJobs.rejected, (state, action) => {
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
export default saveJobsSlice.reducer;
export const { clearApplyJobsSlice } = saveJobsSlice.actions;