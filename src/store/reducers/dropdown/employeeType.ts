import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface EmployeeType {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  employeeType: Array<EmployeeType>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  employeeType: [],
  errorMessage: undefined,
}

export const employeeTypeGet = createAsyncThunk(
  "getEmployeeType", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/employeeType/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getEmployeeTypeSlice = createSlice({
  name: 'getEmployeeType',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(employeeTypeGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(employeeTypeGet.fulfilled, (state, action: PayloadAction<EmployeeType[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.employeeType = action.payload;
    });
    builder.addCase(employeeTypeGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.employeeType = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetEmployeeTypeSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getEmployeeTypeSlice.reducer;
export const { clearGetEmployeeTypeSlice } = getEmployeeTypeSlice.actions;