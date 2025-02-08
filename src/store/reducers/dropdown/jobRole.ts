import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface JobRole {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  jobRole: Array<JobRole>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  jobRole: [],
  errorMessage: undefined,
}

export const jobRoleGet = createAsyncThunk(
  "getJobRole", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobRole/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getJobRoleSlice = createSlice({
  name: 'getJobRole',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(jobRoleGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(jobRoleGet.fulfilled, (state, action: PayloadAction<JobRole[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.jobRole = action.payload;
    });
    builder.addCase(jobRoleGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.jobRole = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetJobRoleSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getJobRoleSlice.reducer;
export const { clearGetJobRoleSlice } = getJobRoleSlice.actions;