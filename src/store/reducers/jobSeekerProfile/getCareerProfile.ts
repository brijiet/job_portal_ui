import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


interface CareerProfileData {
  id: number,
  industry: { title: string, id: number }
  department: { title: string, id: number }
  roleCategory: { title: string, id: number }
  jobRole: { title: string, id: number }
  careerProfileJobType: [{ jobType: { title: string } }]
  careerProfileEmployeeType: [{ employeeType: { title: string } }]
  careerProfilePreferredLocations: [{ location: { title: string, id: number } }]
  careerProfilePreferredShift: [{ preferredShift: { title: string } }]
  currency: { title: string, id: number }
  expectedSalary: string | null
  jobSeekerProfile: number
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  careerProfileDetails: Array<CareerProfileData>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  careerProfileDetails: [],
  errorMessage: undefined,
}

export const careerProfileDetailsGet = createAsyncThunk(
  "getCareerProfileDetails", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/getCareerProfile`,
        {
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

const getCareerProfileDetailsSlice = createSlice({
  name: 'getCareerProfileDetails',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(careerProfileDetailsGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(careerProfileDetailsGet.fulfilled, (state, action: PayloadAction<CareerProfileData[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.careerProfileDetails = action.payload;
    });
    builder.addCase(careerProfileDetailsGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.careerProfileDetails = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetCareerProfileDetails: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getCareerProfileDetailsSlice.reducer;
export const { clearGetCareerProfileDetails } = getCareerProfileDetailsSlice.actions;