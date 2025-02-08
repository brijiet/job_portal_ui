import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


interface EducationData {
  jobSeekerProfile: number,
  courseType: string
    education: string
    board:string
  institute: string
  passingYear: string
  percentage: string
  specialization: string
}

interface registerUserState {
    loading: boolean;
    error: boolean;
    success: boolean;
    educationDetails: Array<EducationData>;
    errorMessage: string | undefined;
}
const initialState: registerUserState = {
    loading: false,
    error: false,
    success: false,
    educationDetails: [],
    errorMessage: undefined,
}

export const educationDetailsGet = createAsyncThunk(
    "getEducationDetails", async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/getEducation`,
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

const getEducationDetailsSlice = createSlice({
    name: 'getEducationDetails',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(educationDetailsGet.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(educationDetailsGet.fulfilled, (state, action: PayloadAction<EducationData[]>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.educationDetails = action.payload;
        });
        builder.addCase(educationDetailsGet.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.educationDetails = [];
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearGetEducationDetails: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default getEducationDetailsSlice.reducer;
export const { clearGetEducationDetails } = getEducationDetailsSlice.actions;