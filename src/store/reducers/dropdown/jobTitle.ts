import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface JobTitle {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  jobTitle: Array<JobTitle>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  jobTitle: [],
  errorMessage: undefined,
}

export const jobTitleGet = createAsyncThunk(
  "getJobTitle", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobTitle/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getJobTitleSlice = createSlice({
  name: 'getJobTitle',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(jobTitleGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(jobTitleGet.fulfilled, (state, action: PayloadAction<JobTitle[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.jobTitle = action.payload;
    });
    builder.addCase(jobTitleGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.jobTitle = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetJobTitleSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getJobTitleSlice.reducer;
export const { clearGetJobTitleSlice } = getJobTitleSlice.actions;