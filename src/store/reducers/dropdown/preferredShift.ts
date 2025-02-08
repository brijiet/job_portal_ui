import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PreferredShift {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  preferredShift: Array<PreferredShift>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  preferredShift: [],
  errorMessage: undefined,
}

export const preferredShiftGet = createAsyncThunk(
  "getPreferredShift", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/preferredShift/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getPreferredShiftSlice = createSlice({
  name: 'getPreferredShift',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(preferredShiftGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(preferredShiftGet.fulfilled, (state, action: PayloadAction<PreferredShift[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.preferredShift = action.payload;
    });
    builder.addCase(preferredShiftGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.preferredShift = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetPreferredShiftSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getPreferredShiftSlice.reducer;
export const { clearGetPreferredShiftSlice } = getPreferredShiftSlice.actions;