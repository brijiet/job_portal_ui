import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Location {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  location: Array<Location>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  location: [],
  errorMessage: undefined,
}

export const locationGet = createAsyncThunk(
  "getLocation", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/location/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getLocationSlice = createSlice({
  name: 'getLocation',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(locationGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(locationGet.fulfilled, (state, action: PayloadAction<Location[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.location = action.payload;
    });
    builder.addCase(locationGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.location = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetLocationSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getLocationSlice.reducer;
export const { clearGetLocationSlice } = getLocationSlice.actions;