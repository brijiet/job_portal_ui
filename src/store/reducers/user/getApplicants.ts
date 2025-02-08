import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AllAplicants {
    name: string;
    location: string;
    experience: string;
    highestQualification: string;
    skills: string;
}

const emptyUserData = (): AllAplicants => ({
    name: '',
    location: '',
    experience: '',
    highestQualification: '',
    skills: '',
})

interface allAplicantsState {
    loading: boolean;
    error: boolean;
    success: boolean;
    applicantsData: AllAplicants;
    errorMessage: string | undefined;
}

const initialState: allAplicantsState = {
    loading: false,
    error: false,
    success: false,
    applicantsData: emptyUserData(),
    errorMessage: '',
}

export const getApplicants = createAsyncThunk(
    "getApplicants", async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/getApplicants`,
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

const getApplicantsSlice = createSlice({
    name: 'getApplicants',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getApplicants.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(getApplicants.fulfilled, (state, action: PayloadAction<AllAplicants>) => {
            state.loading = false;
            state.success = true;
            state.applicantsData = action.payload;
        });
        builder.addCase(getApplicants.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.applicantsData = emptyUserData();
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        cleargetApplicantsSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default getApplicantsSlice.reducer;
export const { cleargetApplicantsSlice } = getApplicantsSlice.actions;