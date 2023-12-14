// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';  //method to create a store
import searchReducer from '../features/search/searchSlice';
import postDetailsReducer from '../features/postDetails/postDetailsSlice';
const store = configureStore({
    reducer: {
        search: searchReducer,                  //search reducer
        postDetails: postDetailsReducer,        //postDetails reducer
    },

});
export default store;  //exported
