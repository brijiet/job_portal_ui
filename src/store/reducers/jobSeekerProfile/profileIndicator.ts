import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


interface ProfileIndicatorData {
  calculatedProfileIndicator: number,
  resume: { status: boolean, value: number },
  resumeHeadLine: { status: boolean, value: number },
  profilePicture: { status: boolean, value: number },
  careerProfile: { status: boolean, value: number },
  keySkill: { status: boolean, value: number },
  education: { status: boolean, value: number },
  itSkills: { status: boolean, value: number },
  projects: { status: boolean, value: number },
  profileSummery: { status: boolean, value: number },
  accomplishments: { status: boolean, value: number },
  personalDetails: { status: boolean, value: number },
  employment: { status: boolean, value: number },
  language: { status: boolean, value: number }
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  profileIndicator: Array<ProfileIndicatorData>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  profileIndicator: [],
  errorMessage: undefined,
}

export const profileIndicatorGet = createAsyncThunk(
  "getProfileIndicator", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/profileIndicator`,
        {
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

const getProfileIndicatorSlice = createSlice({
  name: 'getProfileIndicator',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(profileIndicatorGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(profileIndicatorGet.fulfilled, (state, action: PayloadAction<ProfileIndicatorData[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.profileIndicator = action.payload;
    });
    builder.addCase(profileIndicatorGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.profileIndicator = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetProfileIndicator: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getProfileIndicatorSlice.reducer;
export const { clearGetProfileIndicator } = getProfileIndicatorSlice.actions;