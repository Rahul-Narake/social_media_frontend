import React, { useEffect } from 'react';
import { Container, ProfileHeader } from '../index.js';
import { useDispatch, useSelector } from 'react-redux';
import { getSocialProfile } from '../../store/slices/user.slice';
import { NavLink, Outlet } from 'react-router-dom';
function Profile() {
  const dispatch = useDispatch();
  const { socialProfile } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getSocialProfile());
    }
  }, [isLoggedIn]);

  return (
    <div className="container mx-auto mt-8 md:w-[500px] bg-[#14131a] md:p-2 rounded-md ">
      <Container className="mb-4">
        <ProfileHeader user={socialProfile} />
      </Container>
      <div className="flex w-full justify-around px-2 mb-2">
        <NavLink
          to={`/profile`}
          className={({ isActive }) =>
            isActive ? ' text-gray-700' : 'text-gray-400'
          }
        >
          Posts
        </NavLink>
        <NavLink
          to={`/profile/bookmarks`}
          className={({ isActive }) =>
            isActive ? ' text-gray-700' : 'text-gray-400'
          }
        >
          Bookmarks
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? ' text-gray-700' : 'text-gray-400'
          }
        >
          Likes
        </NavLink>
      </div>
      <hr />
      <div className="px-2 h-[400px] overflow-y-scroll mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
