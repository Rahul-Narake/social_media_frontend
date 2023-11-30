import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  bookmarkPost,
  getAllPosts,
  getPost,
  likeUnlikePost,
} from '../store/slices/post.slice';
import { ArrowLeft, Bookmark, Heart, MessageCircle } from 'lucide-react';
import SelectBox from '../components/SelectBox';
import toast from 'react-hot-toast';

function Post() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const options =
    post?.author?.account?._id === user?._id
      ? [
          { value: 'edit', label: 'Update' },
          { value: 'delete', label: 'Delete Post' },
        ]
      : [{ value: 'follow', label: 'Follow' }];

  const likePost = async (_id) => {
    try {
      const res = await dispatch(likeUnlikePost(_id));
      if (res?.payload?.success) {
        dispatch(getPost(postId));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const bookMark = async (_id) => {
    try {
      const res = await dispatch(bookmarkPost(_id));
      if (res?.payload?.success) {
        dispatch(getPost(postId));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (postId) dispatch(getPost(postId));
  }, [postId]);

  return (
    <div className="flex flex-col px-4 py-4 text-white bg-gray-600 md:w-[500px]">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4 mb-4">
          <Link to={'/all-posts'}>
            <ArrowLeft />
          </Link>
          <h2 className="text-white font-semibold md:text-xl">Post</h2>
        </div>

        <div className="flex items-center justify-center text-white">
          <SelectBox options={options} post={post} />
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-2">
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.Abfh1-533tuvhdyYnx21dAHaHs&pid=Api&P=0&h=180"
          alt="post"
          className="w-[50px] h-[50px] rounded-full"
        />
        <Link
          to={`/profile/user/${post?.author?.account?.username}`}
          className="flex flex-col"
        >
          <h2>{post?.author?.account?.username}</h2>
          <h4 className="text-gray-400">{post?.author?.account?.email}</h4>
        </Link>
      </div>
      <div className="mb-2">
        <p className="text-gray-100">{post?.content}</p>
      </div>
      {post && post.images && (
        <div>
          <img
            src={post?.images[0]?.url}
            alt="post image"
            className="h-[250px]"
          />
        </div>
      )}
      <div className="py-1 mb-2">
        <p className="text-gray-400 text-sm">{`${new Date(
          post?.createdAt
        ).toDateString()}`}</p>
      </div>
      <hr />
      <div className="flex justify-between items-center text-gray-300 mt-4">
        <button
          className="flex space-x-2 items-center"
          onClick={() => {
            likePost(post?._id);
          }}
        >
          <Heart size={18} color={post?.isLiked === true ? 'red' : 'white'} />
          <p className="text-[12px]">{post?.likes}</p>
        </button>
        <button className="flex space-x-2 items-center">
          <MessageCircle size={18} />
          <p className="text-[12px]">4</p>
        </button>
        <button
          className="flex space-x-2 items-center"
          onClick={() => {
            bookMark(post?._id);
          }}
        >
          <Bookmark
            size={18}
            color={post?.isBookmarked === true ? 'red' : 'white'}
          />
        </button>
      </div>
    </div>
  );
}

export default Post;
