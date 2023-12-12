// postDetailsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPostDetails = createAsyncThunk('postDetails/getPostDetails', async (objectID) => {
    try {
        const response = await axios.get(`http://hn.algolia.com/api/v1/items/${objectID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post details:', error);
        return {};
    }
});

export const postDetailsSlice = createSlice({
    name: 'postDetails',
    initialState: {
        postDetails: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPostDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.postDetails = action.payload;
            })
            .addCase(getPostDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectPostDetails = (state) => state.postDetails.postDetails;

export default postDetailsSlice.reducer;
