import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user.slice';
import postSlice from './slices/post.slice';
import commentSlice from './slices/comment.slice';
const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    comment: commentSlice,
  },
});

export default store;
