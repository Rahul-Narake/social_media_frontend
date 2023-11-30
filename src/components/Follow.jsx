import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import config from '../config/config';
import { Link, NavLink } from 'react-router-dom';

function Follow({ type = 'followers', username }) {
  const [users, setUsers] = useState([]);

  const getFollowers = async () => {
    try {
      const { data } = await axios.get(
        `${config.BASE_URL}/social-media/follow/list/followers/${username}`
      );
      if (data?.success) {
        setUsers(data?.data?.followers);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const getFollowing = async () => {
    try {
      const { data } = await axios.get(
        `${config.BASE_URL}/social-media/follow/list/following/${username}`
      );

      if (data?.success) {
        setUsers(data?.data?.following);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (username) {
      if (type === 'followers') {
        getFollowers();
      } else {
        getFollowing();
      }
    }
  }, [username]);

  return (
    <div className="bg-[#14131a] md:w-[500px] w-full mx-auto p-2 rounded-xl flex flex-col">
      <div className="flex text-gray-300 justify-around px-4 py-2 w-full">
        <NavLink
          to={`/following/${username}`}
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-400 rounded-3xl px-2 py-1 w-full text-center'
              : 'px-2 py-1 w-full text-center'
          }
        >
          Following
        </NavLink>
        <NavLink
          to={`/followers/${username}`}
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-400 rounded-3xl px-2 py-1 w-full text-center'
              : 'px-2 py-1 w-full text-center'
          }
        >
          Followers
        </NavLink>
      </div>
      <hr />

      {users.length > 0 && (
        <div className="flex flex-col space-y-2 overflow-y-scroll h-[400px] w-full px-2 py-1 mt-4">
          {users &&
            users.map((user) => {
              return (
                <Link
                  key={user?._id}
                  className="flex space-x-2 items-center hover:bg-gray-500 hover:rounded-xl hover:cursor-pointer px-2 py-1"
                >
                  <img
                    src={user?.avatar?.url}
                    alt={user?.username}
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  <p className="text-base text-gray-200">{user?.username}</p>
                </Link>
              );
            })}
        </div>
      )}

      {users.length == 0 && (
        <div className="flex flex-col space-y-2 content-center text-gray-400 my-4">
          <h1>Don't have any {type} yet!!!</h1>
          <Link
            to={'/'}
            className="text-sm hover:underline bg-gray-400 rounded-2xl px-2 py-1 text-black text-center"
          >
            Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default Follow;
