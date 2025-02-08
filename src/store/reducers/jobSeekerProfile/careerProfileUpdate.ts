import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface CareerProfileUpdate {
  industry: string
  department: string
  roleCategory: string
  jobRole: string
  careerProfileJobType: { jobType: string; }[]
  careerProfileEmployeeType: { employeeType: string; }[]
  careerProfilePreferredLocations: { location: string; }[]
  careerProfilePreferredShift: { preferredShift: string; }[]
  currency: string
  expectedSalary: string
  jobSeekerProfile: number
}
export interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  careerProfile: Array<CareerProfileUpdate>;
  errorMessage: string | undefined;
}

const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  careerProfile: [],
  errorMessage: undefined,
}

export const careerProfileUpdate = createAsyncThunk(
  "careerProfile", async (data: CareerProfileUpdate) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/careerProfile`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  });

const updateCareerProfileUpdateSlice = createSlice({
  name: 'careerProfile',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(careerProfileUpdate.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(careerProfileUpdate.fulfilled, (state, action: PayloadAction<CareerProfileUpdate[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.careerProfile = action.payload;
    });
    builder.addCase(careerProfileUpdate.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.careerProfile = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearUpdateCareerProfileUpdateSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default updateCareerProfileUpdateSlice.reducer;
export const { clearUpdateCareerProfileUpdateSlice } = updateCareerProfileUpdateSlice.actions;