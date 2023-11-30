import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/user.slice';

function Header({ close }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col w-full justify-center space-y-3">
      <button
        onClick={() => {
          navigate('/');
          close();
        }}
      >
        Tweeter
      </button>
      <button
        onClick={() => {
          navigate('/');
          close();
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate('/profile');
          close();
        }}
      >
        Profile
      </button>
      <button
        onClick={() => {
          navigate('/add-post');
          close();
        }}
      >
        Add Post
      </button>

      <button
        onClick={() => {
          navigate('/all-posts');
          close();
        }}
      >
        All Posts
      </button>
      <button
        onClick={() => {
          dispatch(logout());
          close();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
