import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PostCompanyDraft, PostCompanySave, PostJobDetailDraft, PostJobDetailSave, PostJobUpdate, PostQuestionnaireDraft, PostQuestionnaireSave, PostRequirementDraft, PostRequirementSave, PostResponseDraft } from '../../../interface/employer';

export interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  postJob: Array<PostJobUpdate>;
  formData: any;
  errorMessage: string | undefined;
}

const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  postJob: [],
  formData: {},
  errorMessage: undefined,
}

export const postResponseDraft = createAsyncThunk(
  "postJob", async (data: PostResponseDraft) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
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

export const postCompanyDraft = createAsyncThunk(
  "postJob", async (data: PostCompanyDraft) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
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


export const postQuestionnaireDraft = createAsyncThunk(
  "postJob", async (data: PostQuestionnaireDraft) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
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



export const postCompanySave = createAsyncThunk(
  "postJob", async (data: PostCompanySave) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
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

export const postQuestionnaireSave = createAsyncThunk(
  "postJob", async (data: PostQuestionnaireSave) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
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

export const postRequirementDraft = createAsyncThunk(
  "postJob", async (data: PostRequirementDraft) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
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

export const postRequirementSave = createAsyncThunk(
  "postJob", async (data: PostRequirementSave) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
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

export const postJobDetailSave = createAsyncThunk(
  "postJob", async (data: PostJobDetailSave) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
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

export const postJobDetailDraft = createAsyncThunk(
  "postJob", async (data: PostJobDetailDraft) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
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

export const postJobUpdate = createAsyncThunk(
  "postJob", async (data: PostJobUpdate) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
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

const updatePostJobUpdateSlice = createSlice({
  name: 'postJob',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postJobUpdate.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(postJobUpdate.fulfilled, (state, action: PayloadAction<PostJobUpdate[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.postJob = action.payload;
    });
    builder.addCase(postJobUpdate.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.postJob = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearUpdatePostJobUpdateSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
    formData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    formDataReset: (state) => {
      state.formData = {}


    }
  }
});
export default updatePostJobUpdateSlice.reducer;
export const { clearUpdatePostJobUpdateSlice, formData, formDataReset } = updatePostJobUpdateSlice.actions;