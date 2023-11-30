import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../config/config';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { followUnfollowUser } from '../store/slices/user.slice';

function UserProfile() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      if (username) {
        const { data } = await axios.get(
          `${config.BASE_URL}/social-media/profile/u/${username}`
        );
        if (data.success) {
          setUser(data?.data);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (username) {
        const { data } = await axios.get(
          `${config.BASE_URL}/social-media/profile/u/${username}`
        );
        if (data.success) {
          setUser(data?.data);
        }
      }
    })();
  }, [username]);

  const followUnfollow = async () => {
    try {
      if (user) {
        const response = await dispatch(followUnfollowUser(user?.account?._id));
        if (response?.payload.success) {
          const { data } = await axios.get(
            `${config.BASE_URL}/social-media/profile/u/${username}`
          );
          if (data.success) {
            setUser(data?.data);
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="text-white md:w-[500px] mx-auto">
      <div className="bg-gray-600 p-4 rounded-md">
        <div className="flex justify-center mb-2">
          <img
            src={user?.coverImage?.url}
            alt="user profile"
            className="w-[150px] h-[150px] rounded-full"
          />
        </div>
        <p className="text-gray-400 text-base">
          Name: {user?.firstName} {user?.lastName}
        </p>
        <p className="text-gray-400 text-base">Email: {user?.account?.email}</p>

        <div className="flex text-gray-400 space-x-2 mb-2">
          <div className="flex space-x-1 hover:underline">
            <p>{user?.followersCount}</p>
            <Link to={`/followers/${user?.account?.username}`}>Followers</Link>
          </div>
          <div className="flex space-x-1 hover:underline">
            <p>{user?.followingCount}</p>
            <Link to={`/following/${user?.account?.username}`}>Following</Link>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              followUnfollow();
            }}
            className="w-full bg-pink-400 text-white px-2 py-1 rounded-md"
          >
            {user?.isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
