import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Department {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  department: Array<Department>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  department: [],
  errorMessage: undefined,
}

export const departmentGet = createAsyncThunk(
  "getDepartment", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/department/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getDepartmentSlice = createSlice({
  name: 'getDepartment',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(departmentGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(departmentGet.fulfilled, (state, action: PayloadAction<Department[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.department = action.payload;
    });
    builder.addCase(departmentGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.department = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetDepartmentSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getDepartmentSlice.reducer;
export const { clearGetDepartmentSlice } = getDepartmentSlice.actions;