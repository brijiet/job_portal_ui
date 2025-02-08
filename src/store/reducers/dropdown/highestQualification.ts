import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface HighestQualification {
  id: number,
  title: string,
}

interface registerHighestQualificationState {
  loading: boolean;
  error: boolean;
  success: boolean;
  highestQualification: Array<HighestQualification>;
  errorMessage: string | undefined;
}
const initialState: registerHighestQualificationState = {
  loading: false,
  error: false,
  success: false,
  highestQualification: [],
  errorMessage: undefined,
}

export const highestQualificationGet = createAsyncThunk(
  "getHighestQualification", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/highestQualification/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getHighestQualificationSlice = createSlice({
  name: 'getHighestQualification',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(highestQualificationGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(highestQualificationGet.fulfilled, (state, action: PayloadAction<HighestQualification[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.highestQualification = action.payload;
    });
    builder.addCase(highestQualificationGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.highestQualification = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetHighestQualificationSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getHighestQualificationSlice.reducer;
export const { clearGetHighestQualificationSlice } = getHighestQualificationSlice.actions;