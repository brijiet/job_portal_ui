import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
  password: string,
  email: string,
}
export interface signInUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  login:any;
  errorMessage: string | undefined;

}
const initialState: signInUserState = {
  loading: false,
  error: false,
  success: false,
  login: [],
  errorMessage: undefined,
}

export const signInUser = createAsyncThunk(
  "signIn", async (data: User) => {
    try {
      //axios.defaults.withCredentials = true;
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/auth/login`,
        {
          password: data.password,
          email: data.email,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        Cookies.set("token", response.data.token);
        Cookies.set("name", response.data.data.name);
        Cookies.set("userId", response.data.data.id);
        Cookies.set("userType", response.data.data.userType);
        return response.data;
      }
     } catch (error:any) {
      return error
    }
  });

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(signInUser.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.login = action.payload;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
       state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearSignInSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default signInSlice.reducer;
export const { clearSignInSlice } = signInSlice.actions;