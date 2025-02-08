import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface KeySkills {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  keySkills: Array<KeySkills>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  keySkills: [],
  errorMessage: undefined,
}

export const keySkillsGet = createAsyncThunk(
  "getKeySkills", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/keySkills/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getKeySkillsSlice = createSlice({
  name: 'getKeySkills',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(keySkillsGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(keySkillsGet.fulfilled, (state, action: PayloadAction<KeySkills[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.keySkills = action.payload;
    });
    builder.addCase(keySkillsGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.keySkills = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetKeySkillsSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getKeySkillsSlice.reducer;
export const { clearGetKeySkillsSlice } = getKeySkillsSlice.actions;