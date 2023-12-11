// searchSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllData = createAsyncThunk('search/getAllData', async (query) => {
    try {
        const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
        return response.data.hits.map((hit) => ({
            objectID: hit.objectID,
            title: hit.title,
            url: hit.url,
            points: hit.points,
            author: hit.author,
            created_at: hit.created_at,
            num_comments: hit.num_comments,
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
});

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchResults: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllData.fulfilled, (state, action) => {
                state.searchResults = action.payload;
            });
    },
});

export const selectSearchResults = (state) => state.search.searchResults;

export default searchSlice.reducer;
