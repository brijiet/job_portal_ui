import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface JobType {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  jobType: Array<JobType>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  jobType: [],
  errorMessage: undefined,
}

export const jobTypeGet = createAsyncThunk(
  "getJobType", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobType/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getJobTypeSlice = createSlice({
  name: 'getJobType',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(jobTypeGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(jobTypeGet.fulfilled, (state, action: PayloadAction<JobType[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.jobType = action.payload;
    });
    builder.addCase(jobTypeGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.jobType = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetJobTypeSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getJobTypeSlice.reducer;
export const { clearGetJobTypeSlice } = getJobTypeSlice.actions;