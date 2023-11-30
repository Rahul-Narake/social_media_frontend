// SelectBox.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { deletePost } from '../store/slices/post.slice';
import toast from 'react-hot-toast';
import { followUnfollowUser } from '../store/slices/user.slice';

const SelectBox = ({ options, post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelectBox = () => {
    setIsOpen(!isOpen);
  };
  const handleDeletePost = async () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(post?._id));
        navigate('/all-posts');
      } else {
        swal('Your Post is safe!');
      }
    });
  };

  const handleFollow = async () => {
    try {
      dispatch(followUnfollowUser(post?.author?.account?._id));
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    switch (option?.value) {
      case 'edit':
        navigate(`/posts/update/${post?._id}`);
        break;
      case 'delete':
        handleDeletePost();
        break;
      case 'follow':
        handleFollow();
        break;
    }
  };

  return (
    <div className="relative inline-block text-left text-white">
      <div>
        <span className="cursor-pointer" onClick={toggleSelectBox}>
          {/* Three dots icon */}
          <span className="text-white">&#8230;</span>
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-2  md:w-56 w-[80px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectBox;
