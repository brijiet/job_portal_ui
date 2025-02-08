import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Currency {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  currency: Array<Currency>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  currency: [],
  errorMessage: undefined,
}

export const currencyGet = createAsyncThunk(
  "getCurrency", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/currency/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getCurrencySlice = createSlice({
  name: 'getCurrency',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(currencyGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(currencyGet.fulfilled, (state, action: PayloadAction<Currency[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.currency = action.payload;
    });
    builder.addCase(currencyGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.currency = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetCurrencySlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getCurrencySlice.reducer;
export const { clearGetCurrencySlice } = getCurrencySlice.actions;