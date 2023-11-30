import React, { useEffect } from 'react';
import { PostForm } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../store/slices/post.slice';
function UpdatePost() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId));
    }
  }, [postId]);
  return (
    <div className="flex w-full">
      <PostForm post={post} />
    </div>
  );
}

export default UpdatePost;
