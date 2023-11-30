import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './components/index.js';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { AuthLayout } from './components/index.js';
import AddPost from './pages/AddPost.jsx';
import AllPosts from './pages/AllPosts.jsx';
import Post from './pages/Post.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import Profile from './pages/Profile.jsx';
import MyPosts from './pages/MyPosts.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Future from './pages/Future.jsx';
import Followers from './pages/Followers.jsx';
import Following from './pages/Following.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication>
            <Home />
          </AuthLayout>
        ),
        children: [
          {
            path: 'add-post',
            element: (
              <AuthLayout authentication>
                <AddPost />
              </AuthLayout>
            ),
          },
          {
            path: 'all-posts',
            element: (
              <AuthLayout authentication>
                <AllPosts />
              </AuthLayout>
            ),
          },
          {
            path: 'bookmarks',
            element: (
              <AuthLayout authentication>
                <Bookmarks />
              </AuthLayout>
            ),
          },
          {
            path: 'followers/:username',
            element: (
              <AuthLayout authentication>
                <Followers />
              </AuthLayout>
            ),
          },
          {
            path: 'following/:username',
            element: (
              <AuthLayout authentication>
                <Following />
              </AuthLayout>
            ),
          },
          {
            path: 'in-progress',
            element: (
              <AuthLayout authentication>
                <Future />
              </AuthLayout>
            ),
          },
          {
            path: 'posts/:postId',
            element: (
              <AuthLayout authentication>
                <Post />
              </AuthLayout>
            ),
          },
          {
            path: 'posts/update/:postId',
            element: (
              <AuthLayout authentication>
                <UpdatePost />
              </AuthLayout>
            ),
          },
          {
            path: 'profile',
            element: (
              <AuthLayout authentication>
                <Profile />
              </AuthLayout>
            ),
            children: [
              {
                path: '',
                element: <MyPosts />,
              },
              {
                path: 'bookmarks',
                element: <Bookmarks />,
              },
            ],
          },
          {
            path: 'profile/user/:username',
            element: <UserProfile />,
          },
        ],
      },
      {
        path: 'login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: 'signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
