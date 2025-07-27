import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

interface PostCategoryState {
  categories: string[];
}

const initialState: PostCategoryState = {
  categories: [],
};

const postCategorySlice = createSlice({
  name: 'postCategory',
  initialState,
  reducers: {
    setPostCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setPostCategories } = postCategorySlice.actions;

export const selectPostCategories = (state: RootState) => state.categories.categories;

export default postCategorySlice.reducer;
