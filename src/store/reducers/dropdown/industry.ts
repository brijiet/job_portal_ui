import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Industry {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  industry: Array<Industry>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  industry: [],
  errorMessage: undefined,
}

export const industryGet = createAsyncThunk(
  "getIndustry", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/industry/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getIndustrySlice = createSlice({
  name: 'getIndustry',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(industryGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(industryGet.fulfilled, (state, action: PayloadAction<Industry[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.industry = action.payload;
    });
    builder.addCase(industryGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.industry = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetIndustrySlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getIndustrySlice.reducer;
export const { clearGetIndustrySlice } = getIndustrySlice.actions;