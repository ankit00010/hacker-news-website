// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import postDetailsReducer from '../features/postDetails/postDetailsSlice';
const store = configureStore({
    reducer: {
        search: searchReducer,
        postDetails: postDetailsReducer,
    },
    middleware: (getDefaultMiddleware) => {
        if (process.env.NODE_ENV !== 'production') {
            return getDefaultMiddleware({
                serializableCheck: false,
            });
        }
        return getDefaultMiddleware();
    },
});
export default store;
