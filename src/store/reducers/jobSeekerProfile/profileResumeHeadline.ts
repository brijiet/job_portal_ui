import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ResumeHeadline {
  id: number,
  resumeHeadline: string | null
}
export interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  resumeHeadline: Array<ResumeHeadline>;
  errorMessage: string | undefined;
}

const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  resumeHeadline: [],
  errorMessage: undefined,
}


export const resumeHeadlineUpdate = createAsyncThunk(
  "resumeHeadline", async (data: ResumeHeadline) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/profileDashboard`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  });

const updateResumeHeadlineSlice = createSlice({
  name: 'resumeHeadline',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resumeHeadlineUpdate.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(resumeHeadlineUpdate.fulfilled, (state, action: PayloadAction<ResumeHeadline[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.resumeHeadline = action.payload;
    });
    builder.addCase(resumeHeadlineUpdate.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.resumeHeadline = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearUpdateResumeHeadlineSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default updateResumeHeadlineSlice.reducer;
export const { clearUpdateResumeHeadlineSlice } = updateResumeHeadlineSlice.actions;