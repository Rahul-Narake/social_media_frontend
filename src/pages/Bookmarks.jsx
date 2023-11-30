import React, { useEffect } from 'react';
import { PostCard } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBookmarks } from '../store/slices/post.slice';

function Bookmarks() {
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.post);
  //   useEffect(() => {
  //     dispatch(getMyBookmarks());
  //   }, []);
  useEffect(() => {
    dispatch(getMyBookmarks());
  }, [bookmarks.length]);
  if (bookmarks.length == 0)
    return (
      <div>
        <h1 className="text-white text-xl">Don't have bookmarks</h1>
      </div>
    );
  return (
    <div className="flex flex-col justify-center items-start w-full">
      {bookmarks &&
        bookmarks.map((post) => {
          return (
            <div key={post._id} className="flex w-full mb-4">
              <PostCard post={post} />
            </div>
          );
        })}
    </div>
  );
}

export default Bookmarks;
