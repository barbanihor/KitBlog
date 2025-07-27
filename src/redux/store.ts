import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postSlice';
import authReducer from './slices/authSlice';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
