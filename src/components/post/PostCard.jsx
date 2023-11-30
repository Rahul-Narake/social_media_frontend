import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  bookmarkPost,
  getAllPosts,
  getMyBookmarks,
  likeUnlikePost,
} from '../../store/slices/post.slice';
import toast from 'react-hot-toast';
import { CommentBox } from '../index.js';
function PostCard({ post }) {
  const disPatch = useDispatch();
  const [open, setOpen] = useState(false);

  const likePost = async (_id) => {
    try {
      const res = await disPatch(likeUnlikePost(_id));
      if (res?.payload?.success) {
        disPatch(getAllPosts());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const bookMark = async (_id) => {
    try {
      const res = await disPatch(bookmarkPost(_id));
      if (res?.payload?.success) {
        disPatch(getAllPosts());
        disPatch(getMyBookmarks());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center mx-auto bg-[#252529] text-white rounded-md p-4 md:w-[500px] w-full">
      <div className="flex items-start justify-between space-x-2">
        <div className="">
          <img
            src={
              post?.author?.coverImage?.url ||
              'https://tse4.mm.bing.net/th?id=OIP.Abfh1-533tuvhdyYnx21dAHaHs&pid=Api&P=0&h=180'
            }
            alt={`${post?.author?.account?.username}`}
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>

        {/* <ProfilePic img={post?.author.coverImage.url} width="10px" /> */}
        <div className="flex flex-col w-full">
          <Link
            to={`/profile/user/${post?.author?.account?.username}`}
            className="flex flex-wrap items-center space-x-2 "
          >
            <h2 className="font-bold ">{post?.author.account.username}</h2>
            <p className="text-gray-500 text-sm">
              {post?.author.account.email}
            </p>
          </Link>
          <Link to={`/posts/${post?._id}`} className="mb-1">
            <p className="text-normal">{post?.content}</p>
          </Link>
          <div className="mb-4">
            <img
              src={post?.images[0]?.url}
              alt="post image"
              className="md:h-[250px] md:w-[400px] h-[200px]"
            />
          </div>
          <div className="flex justify-between items-center text-gray-300 md:px-2">
            <button
              className="flex space-x-2 items-center"
              onClick={() => {
                likePost(post?._id);
              }}
            >
              <Heart
                size={18}
                color={post?.isLiked === true ? 'red' : 'white'}
              />
              <p className="text-[12px]">{post?.likes}</p>
            </button>
            <button
              className="flex space-x-2 items-center"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <MessageCircle size={18} />
              <p className="text-[12px]">{post?.comments}</p>
            </button>
            <button
              onClick={() => {
                bookMark(post?._id);
              }}
              className="flex space-x-2 items-center"
            >
              <Bookmark
                size={18}
                color={post?.isBookmarked === true ? 'red' : 'white'}
              />
            </button>
          </div>
          {open && (
            <div className="mt-4 mb-2">
              <CommentBox post={post} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
