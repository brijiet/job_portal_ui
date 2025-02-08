import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


interface SearchResumeResult {
  [x: string]: any;
  currentJobTitle: any;
  currentCompany: any;
  currentSalary: any
  resumeLastUpdated: any;
  profileLastUpdated: any;
  noticePeriod: any;
  keySkills: {
    filter(arg0: (item: any) => any): unknown; id: number, profileKeySkills: { title: string, id: number }
  };
  jobSeekerType: string;
  resumeFile: string;
  resumePath: string;
  currentCountry: string;
  currentLocation: any;
  workStatus: boolean;
  profilePictureFile: string;
  profilePicturePath: string;
  id: number,
  profileSummary: string,
  resumeHeadline: string,
  personalDetails: any,
  educations: any,
  employments: any,
  about: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  searchResumeResult: SearchResumeResult;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  searchResumeResult: [] as any,
  errorMessage: undefined,
}

export const searchResumeResultGet = createAsyncThunk(
  "getSearchResumeResult", async (data: any) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/searchResume/searchResumeResult`,
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

const getSearchResumeResultSlice = createSlice({
  name: 'getSearchResumeResult',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(searchResumeResultGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(searchResumeResultGet.fulfilled, (state, action: PayloadAction<SearchResumeResult>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.searchResumeResult = action.payload;
    });
    builder.addCase(searchResumeResultGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.searchResumeResult = {} as any;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetSearchResumeResultSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getSearchResumeResultSlice.reducer;
export const { clearGetSearchResumeResultSlice } = getSearchResumeResultSlice.actions;