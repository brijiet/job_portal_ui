import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface RoleCategory {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  roleCategory: Array<RoleCategory>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  roleCategory: [],
  errorMessage: undefined,
}

export const roleCategoryGet = createAsyncThunk(
  "getRoleCategory", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/roleCategory/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getRoleCategorySlice = createSlice({
  name: 'getRoleCategory',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(roleCategoryGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(roleCategoryGet.fulfilled, (state, action: PayloadAction<RoleCategory[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.roleCategory = action.payload;
    });
    builder.addCase(roleCategoryGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.roleCategory = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetRoleCategorySlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getRoleCategorySlice.reducer;
export const { clearGetRoleCategorySlice } = getRoleCategorySlice.actions;