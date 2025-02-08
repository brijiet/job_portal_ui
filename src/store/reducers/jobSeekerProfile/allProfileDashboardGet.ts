import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


interface AllProfileDashboard {
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
  allProfileDashboard: AllProfileDashboard;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  allProfileDashboard: {} as any,
  errorMessage: undefined,
}

export const allProfileDashboardGet = createAsyncThunk(
  "getAllProfileDashboard", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/getAllProfileDashboard`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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

const getAllProfileDashboardSlice = createSlice({
  name: 'getAllProfileDashboard',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(allProfileDashboardGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(allProfileDashboardGet.fulfilled, (state, action: PayloadAction<AllProfileDashboard>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.allProfileDashboard = action.payload;
    });
    builder.addCase(allProfileDashboardGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.allProfileDashboard = {} as any;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetAllProfileDashboardSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getAllProfileDashboardSlice.reducer;
export const { clearGetAllProfileDashboardSlice } = getAllProfileDashboardSlice.actions;