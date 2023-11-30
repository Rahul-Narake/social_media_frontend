import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config/config';
import toast from 'react-hot-toast';
const initialState = {
  isLoggedIn: false,
  user: null,
  socialProfile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doLogin: (state, actions) => {
      state.isLoggedIn = true;
    },
    logout: (state, actions) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.isLoggedIn = false;
      state.user = null;
      state.socialProfile = null;
    },
  },
  extraReducers: (reducer) => {
    reducer
      .addCase(register.fulfilled, (state, actions) => {
        if (actions.payload.success) {
          toast.success(actions.payload.message);
        }
      })
      .addCase(register.rejected, (state, actions) => {
        toast.error(actions.payload.message);
      })
      .addCase(login.fulfilled, (state, actions) => {
        if (actions.payload.success) {
          localStorage.setItem('accessToken', actions.payload.data.accessToken);
          localStorage.setItem(
            'refreshToken',
            actions.payload.data.refreshToken
          );
          state.isLoggedIn = true;
          toast.success(actions.payload.message);
        } else {
          toast.error(actions.payload.message);
        }
      })
      .addCase(login.rejected, (state, actions) => {
        toast.error(actions.payload.message);
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoggedIn = true;
          state.user = action.payload.data;
          // toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getCurrentUser.rejected, (state, actions) => {
        toast.error(actions.payload.message);
      })
      .addCase(getSocialProfile.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.socialProfile = action.payload.data;
          // toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getSocialProfile.rejected, (state, actions) => {
        toast.error(actions.payload.message);
      })
      .addCase(updateSocialProfile.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.socialProfile = action.payload.data;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(updateSocialProfile.rejected, (state, actions) => {
        toast.error(actions.payload.message);
      })
      .addCase(updateCoverImage.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.socialProfile = action.payload.data[0];
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(updateCoverImage.rejected, (state, actions) => {
        toast.error(actions.payload.message);
      })
      .addCase(followUnfollowUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(followUnfollowUser.rejected, (state, actions) => {
        toast.error(actions.payload.message);
      });
  },
});

export const register = createAsyncThunk('user/register', async (userData) => {
  try {
    const { data } = await axios.post(
      `${config.BASE_URL}/users/register`,
      userData
    );
    return data;
  } catch (error) {
    console.log('ERROR:: REGISTER' + error);
    throw error;
  }
});

export const login = createAsyncThunk('user/login', async (credentials) => {
  try {
    const { data } = await axios.post(
      `${config.BASE_URL}/users/login`,
      credentials
    );

    return data;
  } catch (error) {
    toast.error(error.message);
    console.log('ERROR:: LOGIN' + error);
    throw error;
  }
});

export const getCurrentUser = createAsyncThunk('user/current', async () => {
  try {
    const { data } = await axios.get(`${config.BASE_URL}/users/current-user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return data;
  } catch (error) {
    toast.error(error.message);
    console.log('ERROR:: CURRENTUSER' + error);
    throw error;
  }
});

export const getSocialProfile = createAsyncThunk(
  'user/socialProfile',
  async () => {
    try {
      const { data } = await axios.get(
        `${config.BASE_URL}/social-media/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log('ERROR:: GETSOCIALPROFILE' + error);
      throw error;
    }
  }
);
export const updateSocialProfile = createAsyncThunk(
  'user/ProfileUpdate',
  async (profileData) => {
    try {
      const { data } = await axios.patch(
        `${config.BASE_URL}/social-media/profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log('ERROR:: PROFILEUPDATE' + error);
      throw error;
    }
  }
);

export const followUnfollowUser = createAsyncThunk(
  'user/followUnfollw',
  async (_id) => {
    try {
      const { data } = await axios.post(
        `${config.BASE_URL}/social-media/follow/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      return data;
    } catch (error) {
      toast.error(error?.message);
      console.log('ERROR:: FOLLOWUNFOLLOW' + error);
      throw error;
    }
  }
);

export const updateCoverImage = createAsyncThunk(
  'user/updateCoverImage',
  async (profileData) => {
    const formData = new FormData();
    formData.append('coverImage', profileData?.coverImage);
    try {
      const { data } = await axios.patch(
        `${config.BASE_URL}/social-media/profile/cover-image`,
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
      console.log('ERROR:: PROFILEUPDATE' + error);
      throw error;
    }
  }
);

export const { doLogin, logout } = userSlice.actions;
export default userSlice.reducer;
