import React, { useState } from 'react';
import { ProfileForm, ModalBox, UpdateProfilePic } from '../index.js';
import { Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileHeader = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <div className="p-4 rounded-lg w-full text-white">
      <div className="w-full text-center flex flex-col space-y-0 items-center">
        <img
          src={user?.coverImage?.url || 'https://placekitten.com/200/200'} // Replace with user's profile picture
          alt={user?.account?.username}
          className="w-[100px] h-[100px] rounded-full mx-auto mb-4"
        />
        <div className="">
          <button
            className="rounded-2xl text-gray-400"
            onClick={() => {
              setVisible(true);
            }}
          >
            <Edit />
          </button>
          <ModalBox
            open={visible}
            setOpen={setVisible}
            children={<UpdateProfilePic profile={user} />}
          />
        </div>
      </div>
      <div className="w-full flex justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-sm text-gray-400 ">{user?.bio}</p>
        </div>
        <div className="">
          <button
            className="bg-gray-600 rounded-2xl px-2 py-1"
            onClick={() => {
              setOpen(true);
            }}
          >
            Edit Profile
          </button>
          <ModalBox
            open={open}
            setOpen={setOpen}
            children={<ProfileForm profile={user} />}
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex space-x-2">
          <p className="text-gray-400 text-sm">{user?.followersCount}</p>
          <Link
            to={`/followers/${user?.account?.username}`}
            className="text-gray-400 text-sm cursor-pointer"
          >
            Followers
          </Link>
        </div>
        <div className="flex space-x-2">
          <p className="text-gray-400 text-sm">{user?.followingCount}</p>
          <Link
            to={`/following/${user?.account?.username}`}
            className="text-gray-400 text-sm cursor-pointer"
          >
            Following
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
