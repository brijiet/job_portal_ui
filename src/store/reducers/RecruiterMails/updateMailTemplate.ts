import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface MailTemplate {
    id:number,
  templateName:string,
  fromEmailId:string,
  subject: string,
  message: string,
  jobTitle: string,
  signature: string,
  jobSubject: string,
  fromWorkExperience: {
    id: number,
  },
  toWorkExperience: {
    id: number,
  },
  currency: {
    id: number,
  },
  minSalaryRange: {
    id: number,
  },
  maxSalaryRange: {
    id: number,
  },
  mailTemplateNumberSystem: {
    id: number,
  },
  mailTemplateJobLocation: [
    {
      jobLocation: number,
    }
  ],
  mailTemplateKeySkills: [
    {
      keySkills: number,
    }
  ],
  applicantUser:
  {
    mailTemplateJobSeekerProfile: number
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
  MailTemplate: Array<MailTemplate>;
  errorMessage: string | undefined;
}

const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  MailTemplate: [],
  errorMessage: undefined,
}

export const UpdateMailTemplate = createAsyncThunk(
  "updateMailTemplate", async (data: MailTemplate) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_PATH}/mailTemplate/updateMailTemplate`,
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

const updateMailTemplateSlice = createSlice({
  name: 'updateMailTemplate',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(UpdateMailTemplate.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(UpdateMailTemplate.fulfilled, (state, action: PayloadAction<MailTemplate[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.MailTemplate = action.payload;
    });
    builder.addCase(UpdateMailTemplate.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.MailTemplate = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearUpdateMailTemplateSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});


export default updateMailTemplateSlice.reducer;
export const { clearUpdateMailTemplateSlice } = updateMailTemplateSlice.actions;