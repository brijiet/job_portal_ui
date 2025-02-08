import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ComposeMail {

  mailTemplate: {
    id: number,
  },


  fromEmailId: string,
  subject: string,
  jobTitle: string,
  jobSubject: string,
  message: string,
  signature: string,
  fromWorkExperience: number,
  toWorkExperience: number,
  currency: number,
  minSalaryRange: number,
  maxSalaryRange: number,
  composeNumberSystem: number,
  composeJobLocation: {
    composeLocation: number
  }[],
  composeMailKeySkills: {
    composeKeySkills: number
  }[],
  composeMailJobs: {
    composeJob: number
  }[],

  applicantUser:
  {
    composeJobSeekerProfile: number
  }[]
  ,
  recruiterUser: {
    id: number
  }

}

export interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  composeMail: Array<ComposeMail>;
  errorMessage: string | undefined;
}

const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  composeMail: [],
  errorMessage: undefined,
}

export const composeMailUpdate = createAsyncThunk(
  "composeMail", async (data: ComposeMail) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/composeMail/post`,
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

const updateComposeMailSlice = createSlice({
  name: 'composeMail',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(composeMailUpdate.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(composeMailUpdate.fulfilled, (state, action: PayloadAction<ComposeMail[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.composeMail = action.payload;
    });
    builder.addCase(composeMailUpdate.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.composeMail = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearUpdateComposeMailSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default updateComposeMailSlice.reducer;
export const { clearUpdateComposeMailSlice } = updateComposeMailSlice.actions;