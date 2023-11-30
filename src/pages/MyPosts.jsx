import React, { useEffect } from 'react';
import { Container, PostCard } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts } from '../store/slices/post.slice';

function MyPosts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getMyPosts());
  }, []);
  return (
    <div className="flex flex-col justify-center items-start w-full">
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id} className="flex w-full mb-4">
              <PostCard post={post} />
            </div>
          );
        })}
    </div>
  );
}

export default MyPosts;
