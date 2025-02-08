import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface TotalExpYear {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  totalExpYear: Array<TotalExpYear>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  totalExpYear: [],
  errorMessage: undefined,
}

export const totalExpYearGet = createAsyncThunk(
  "getTotalExpYear", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/totalExpYear/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getTotalExpYearSlice = createSlice({
  name: 'getTotalExpYear',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(totalExpYearGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(totalExpYearGet.fulfilled, (state, action: PayloadAction<TotalExpYear[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.totalExpYear = action.payload;
    });
    builder.addCase(totalExpYearGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.totalExpYear = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetTotalExpYearSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getTotalExpYearSlice.reducer;
export const { clearGetTotalExpYearSlice } = getTotalExpYearSlice.actions;