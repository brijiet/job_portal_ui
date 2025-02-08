import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState: any = {
  loading: false,
  error: false,
  success: false,
  changeApplicantStatus: {},
  errorMessage: undefined,
}

export const changeApplicantStatus = createAsyncThunk(
  "changeApplicantStatus", async (data: any) => {

    try {

      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/applyJob/saveApplicantStatus`,
        {
          params: data,
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }

      );
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const changeApplicantStatusSlice = createSlice({
  name: 'changeApplicantStatus',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(changeApplicantStatus.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(changeApplicantStatus.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.companyDetails = action.payload;
    });
    builder.addCase(changeApplicantStatus.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearChangeApplicantStatusSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default changeApplicantStatusSlice.reducer;
export const { clearChangeApplicantStatusSlice } = changeApplicantStatusSlice.actions;