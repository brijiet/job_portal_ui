import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface SaveResumeResult {
  resumeSearchKeywords: string[],
  minExperience: string,
  maxExperience: string,
  minSalary: string,
  maxSalary: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  saveResumeSearchFormData: any;
  searchResumeResult: SaveResumeResult;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  searchResumeResult: [] as any,
  saveResumeSearchFormData: {},
  errorMessage: undefined,
}

export const saveResumeResult = createAsyncThunk(
  "saveResumeResult", async (data: SaveResumeResult) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/searchResume/saveResume`,
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
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

const saveResumeResultSlice = createSlice({
  name: 'saveResumeResult',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(saveResumeResult.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(saveResumeResult.fulfilled, (state, action: PayloadAction<SaveResumeResult>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.searchResumeResult = action.payload;
    });
    builder.addCase(saveResumeResult.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.searchResumeResult = {} as any;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetSaveResumeResultSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
    saveResumeSearchFormData: (state, action) => {
      state.saveResumeSearchFormData = { ...state.saveResumeSearchFormData, ...action.payload };
    },

    saveResumeSearchFormDataReset: (state) => {
      state.saveResumeSearchFormData = {}
    }
  }
});
export default saveResumeResultSlice.reducer;
export const { clearGetSaveResumeResultSlice, saveResumeSearchFormData, saveResumeSearchFormDataReset } = saveResumeResultSlice.actions;