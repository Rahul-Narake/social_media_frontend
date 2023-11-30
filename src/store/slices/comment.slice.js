import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import config from '../../config/config';
const initialState = {
  comments: [],
};
const commentSlice = createSlice({
  name: 'Comment',
  initialState,
  reducers: {},
  extraReducers: (reducer) => {
    reducer
      .addCase(addComment.fulfilled, (state, action) => {
        if (action.payload.success) {
          toast.success(action.payload.message);
        }
      })
      .addCase(getComments.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.comments = action.payload?.data?.comments;
        }
      });
  },
});

export const addComment = createAsyncThunk(
  'comment/add',
  async (commentData) => {
    try {
      const { data } = await axios.post(
        `${config.BASE_URL}/social-media/comments/post/${commentData._id}`,
        { content: commentData.content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);

export const getComments = createAsyncThunk('comment/get', async (_id) => {
  try {
    const { data } = await axios.get(
      `${config.BASE_URL}/social-media/comments/post/${_id}?page=1&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
