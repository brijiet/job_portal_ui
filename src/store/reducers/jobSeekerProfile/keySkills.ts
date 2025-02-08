import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Headline {
  keySkills: string[],
  jobSeekerId: string
}
export interface keySkillsState {
  loading: boolean;
  error: boolean;
  success: boolean;
  user: Array<Headline>;
  errorMessage: string | undefined;

}
const initialState: keySkillsState = {
  loading: false,
  error: false,
  success: false,
  user: [],
  errorMessage: undefined,
}

export const keySkillsUpdate = createAsyncThunk(
  "profile/keySkills", async (data: Headline) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/keySkills`,
        {
          keySkills: data.keySkills,
          jobSeekerId: data.jobSeekerId
        }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  });

const keySkillsSlice = createSlice({
  name: 'keySkillsUpdate',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(keySkillsUpdate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(keySkillsUpdate.fulfilled, (state, action: PayloadAction<Headline[]>) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = action.payload;
    });
    builder.addCase(keySkillsUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.user = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearKeySkillsSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default keySkillsSlice.reducer;
export const { clearKeySkillsSlice } = keySkillsSlice.actions;