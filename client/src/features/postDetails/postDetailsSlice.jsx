// Importing necessary dependencies
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Creating an asynchronous thunk to fetch post details
export const getPostDetails = createAsyncThunk('postDetails/getPostDetails', async (objectID) => {
    try {
        // Making an API call to fetch post details based on the objectID
        const response = await axios.get(`http://hn.algolia.com/api/v1/items/${objectID}`);
        return response.data;
    } catch (error) {
        // Handling errors during the API call
        console.error('Error fetching post details:', error);
        throw error;
    }
});

// Creating a slice for the postDetails state
const postDetailsSlice = createSlice({
    name: 'postDetails',
    initialState: {
        postDetails: {}, // Holds the details of the fetched post
        status: 'idle',   // Represents the status of the asynchronous operation (idle/loading/succeeded/failed)
        error: null,      // Holds error information if the operation fails
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handling different states of the asynchronous operation using extraReducers
        builder
            .addCase(getPostDetails.pending, (state) => {
                // Setting the status to 'loading' when the API call is in progress
                state.status = 'loading';
            })
            .addCase(getPostDetails.fulfilled, (state, action) => {
                // Setting the status to 'succeeded' and updating postDetails on successful API response
                state.status = 'succeeded';
                state.postDetails = action.payload;
            })
            .addCase(getPostDetails.rejected, (state, action) => {
                // Setting the status to 'failed' and capturing error information on API call failure
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Selecting postDetails from the state
export const selectPostDetails = (state) => state.postDetails.postDetails;

// Exporting the postDetailsSlice reducer
export default postDetailsSlice.reducer;
