import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllData = createAsyncThunk('search/getAllData', async (query) => {
    try {
        const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
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
        console.error('Error fetching data:', error);
        return { hits: [], nbPages: 0 };
    }
});

// New pagination thunk
export const getPaginationData = createAsyncThunk('search/getPaginationData', async ({ query = '', page }) => {
    try {
        const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}&page=${page}`);
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
        console.error('Error fetching pagination data:', error);
        return { hits: [], nbPages: 0 };
    }
});

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchResults: [],
        totalPages: 1,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllData.fulfilled, (state, action) => {
                state.searchResults = action.payload.hits;
                state.totalPages = action.payload.nbPages;
            })
            .addCase(getPaginationData.fulfilled, (state, action) => {
                state.searchResults = action.payload.hits;
                state.totalPages = action.payload.nbPages;
            });
    },
});

export const selectSearchResults = (state) => state.search.searchResults;
export const selectTotalPages = (state) => state.search.totalPages;

export default searchSlice.reducer;
