import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState: any = {
    loading: false,
    error: false,
    success: false,
    errorMessage: undefined,
}

export const deletePersonalDetailsLanguages = createAsyncThunk(
    "deletePersonalDetailsLanguages", async (data: number[]) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/deletePersonalDetailsLanguages`,
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    },
                    data
                },
            );
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            }
        } catch (error) {
            throw error;
        }
    });

const deletePersonalDetailsLanguagesSlice = createSlice({
    name: 'deletePersonalDetailsLanguages',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(deletePersonalDetailsLanguages.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(deletePersonalDetailsLanguages.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
        });
        builder.addCase(deletePersonalDetailsLanguages.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearDeletePersonalDetailsLanguages: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});

export default deletePersonalDetailsLanguagesSlice.reducer;
export const { clearDeletePersonalDetailsLanguages } = deletePersonalDetailsLanguagesSlice.actions;