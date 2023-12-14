// Importing necessary dependencies
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Creating an asynchronous thunk to fetch all data based on a query
export const getAllData = createAsyncThunk('search/getAllData', async (query) => {
    try {
        // Making an API call to fetch data based on the provided query
        const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);

        // Extracting relevant information from the API response and returning a formatted object
        return {
            hits: response.data.hits.map((hit) => ({
                objectID: hit.objectID,
                title: hit.title,
                url: hit.url,
                points: hit.points,
                author: hit.author,
                created_at: hit.created_at,
                num_comments: hit.num_comments,
            })),
            nbPages: response.data.nbPages,
        };
    } catch (error) {
        // Handling errors during the API call and returning a default object on failure
        console.error('Error fetching data:', error);
        return { hits: [], nbPages: 0 };
    }
});

// Creating a new pagination thunk to fetch data for a specific page
export const getPaginationData = createAsyncThunk('search/getPaginationData', async ({ query = '', page }) => {
    try {
        // Making an API call to fetch paginated data based on the provided query and page
        const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}&page=${page}`);

        // Extracting relevant information from the API response and returning a formatted object
        return {
            hits: response.data.hits.map((hit) => ({
                objectID: hit.objectID,
                title: hit.title,
                url: hit.url,
                points: hit.points,
                author: hit.author,
                created_at: hit.created_at,
                num_comments: hit.num_comments,
            })),
            nbPages: response.data.nbPages,
        };
    } catch (error) {
        // Handling errors during the API call and returning a default object on failure
        console.error('Error fetching pagination data:', error);
        return { hits: [], nbPages: 0 };
    }
});

// Creating a slice for the search state
export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchResults: [],  // Holds the search results
        totalPages: 1,      // Represents the total number of pages available
    },
    extraReducers: (builder) => {
        // Handling different states of the asynchronous operations using extraReducers
        builder
            .addCase(getAllData.fulfilled, (state, action) => {
                // Updating searchResults and totalPages on successful API response for getAllData
                state.searchResults = action.payload.hits;
                state.totalPages = action.payload.nbPages;
            })
            .addCase(getPaginationData.fulfilled, (state, action) => {
                // Updating searchResults and totalPages on successful API response for getPaginationData
                state.searchResults = action.payload.hits;
                state.totalPages = action.payload.nbPages;
            });
    },
});

// Selecting searchResults and totalPages from the state
export const selectSearchResults = (state) => state.search.searchResults;
export const selectTotalPages = (state) => state.search.totalPages;

// Exporting the searchSlice reducer
export default searchSlice.reducer;
