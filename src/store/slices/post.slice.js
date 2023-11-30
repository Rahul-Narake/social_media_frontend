import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import config from '../../config/config';
const initialState = {
  posts: [],
  post: {},
  bookmarks: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (reducer) => {
    reducer
      .addCase(createPost.fulfilled, (state, actions) => {
        if (actions.payload.success) {
          toast.success(actions.payload.message);
        } else {
          toast.error(actions.payload.message);
        }
      })
      .addCase(getAllPosts.fulfilled, (state, actions) => {
        if (actions.payload.success) {
          state.posts = actions.payload.data.posts;
        } else {
          toast.error(actions.payload.message);
        }
      })
      .addCase(getMyPosts.fulfilled, (state, actions) => {
        if (actions.payload.success) {
          state.posts = actions.payload.data.posts;
        } else {
          toast.error(actions.payload.message);
        }
      })
      .addCase(getMyBookmarks.fulfilled, (state, actions) => {
        if (actions.payload.success) {
          state.bookmarks = actions.payload.data.bookmarkedPosts;
        } else {
          toast.error(actions.payload.message);
        }
      })
      .addCase(getPost.fulfilled, (state, actions) => {
        if (actions.payload.success) {
          state.post = actions.payload.data;
        } else {
          toast.error(actions.payload.message);
        }
      })
      .addCase(deletePost.fulfilled, (state, actions) => {
        if (actions.payload.success) {
          state.post = actions.payload.data;
          toast.success(actions.payload.message);
        } else {
          toast.error(actions.payload.message);
        }
      })
      .addCase(likeUnlikePost.fulfilled, (state, actions) => {
        if (actions.payload.success) {
          toast.success(actions.payload.message);
        } else {
          toast.error(actions.payload.message);
        }
      })
      .addCase(bookmarkPost.fulfilled, (state, actions) => {
        if (actions.payload.success) {
          toast.success(actions.payload.message);
        } else {
          toast.error(actions.payload.message);
        }
      });
  },
});

export const createPost = createAsyncThunk('post/create', async (postData) => {
  try {
    const formData = new FormData();
    const tags = postData.tags ? postData?.tags.split(' ') : [];

    formData.append('images', postData?.images[0]);
    formData.append('content', postData?.content);
    //formData.append('tags', tags);

    const { data } = await axios.post(
      `${config.BASE_URL}/social-media/posts`,
      formData,
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
});

export const updatePost = createAsyncThunk('post/update', async (postData) => {
  try {
    const formData = new FormData();
    const tags = postData?.tags?.split(' ');

    formData.append('images', postData?.newData?.images[0]);
    formData.append('content', postData?.newData?.content);
    //formData.append('tags', tags);

    const { data } = await axios.patch(
      `${config.BASE_URL}/social-media/posts/${postData._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
});
export const getAllPosts = createAsyncThunk('post/getAll', async () => {
  try {
    const { data } = await axios.get(`${config.BASE_URL}/social-media/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
});
export const getMyPosts = createAsyncThunk('post/myPosts', async () => {
  try {
    const { data } = await axios.get(
      `${config.BASE_URL}/social-media/posts/get/my`,
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
});
export const getMyBookmarks = createAsyncThunk('post/bookmarks', async () => {
  try {
    const { data } = await axios.get(
      `${config.BASE_URL}/social-media/bookmarks`,
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
});

export const getPost = createAsyncThunk('post/getPost', async (_id) => {
  try {
    const { data } = await axios.get(
      `${config.BASE_URL}/social-media/posts/${_id}`,
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
});
export const deletePost = createAsyncThunk('post/delete', async (_id) => {
  try {
    const { data } = await axios.delete(
      `${config.BASE_URL}/social-media/posts/${_id}`,
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
});

export const likeUnlikePost = createAsyncThunk(
  'post/likeUnlike',
  async (_id) => {
    try {
      const { data } = await axios.post(
        `${config.BASE_URL}/social-media/like/post/${_id}`,
        {},
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
  }
);

export const bookmarkPost = createAsyncThunk('post/bookmark', async (_id) => {
  try {
    const { data } = await axios.post(
      `${config.BASE_URL}/social-media/bookmarks/${_id}`,
      {},
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
});

export const {} = postSlice.actions;
export default postSlice.reducer;
