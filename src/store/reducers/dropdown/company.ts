import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Company {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  company: Array<Company>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  company: [],
  errorMessage: undefined,
}

export const companyGet = createAsyncThunk(
  "getCompany", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/company/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getCompanySlice = createSlice({
  name: 'getCompany',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(companyGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(companyGet.fulfilled, (state, action: PayloadAction<Company[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.company = action.payload;
    });
    builder.addCase(companyGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.company = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetCompanySlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getCompanySlice.reducer;
export const { clearGetCompanySlice } = getCompanySlice.actions;