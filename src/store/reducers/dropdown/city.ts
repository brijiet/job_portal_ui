import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface City {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  city: Array<City>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  city: [],
  errorMessage: undefined,
}

export const cityGet = createAsyncThunk(
  "getCity", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/city/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getCitySlice = createSlice({
  name: 'getCity',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(cityGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(cityGet.fulfilled, (state, action: PayloadAction<City[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.city = action.payload;
    });
    builder.addCase(cityGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.city = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetCitySlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getCitySlice.reducer;
export const { clearGetCitySlice } = getCitySlice.actions;