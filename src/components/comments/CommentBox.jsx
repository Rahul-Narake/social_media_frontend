import React, { useEffect } from 'react';
import { Button, Container } from '../index.js';
import { useForm } from 'react-hook-form';
import { SendHorizonal } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getComments } from '../../store/slices/comment.slice.js';
import { getAllPosts } from '../../store/slices/post.slice.js';
function CommentBox({ post }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  const {
    register,
    handleSubmit,
    formState = { errors },
    setValue,
  } = useForm();

  const doComment = async (data) => {
    try {
      const res = await dispatch(
        addComment({ _id: post?._id, content: data?.content })
      );
      setValue('content', '');
      if (res.payload.success) {
        dispatch(getComments(post?._id));
        dispatch(getAllPosts());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (post) {
      dispatch(getComments(post?._id));
    }
  }, []);

  return (
    <Container className="flex flex-col">
      <div className="flex flex-col space-y-2">
        {comments &&
          comments.map((comment) => {
            return (
              <p key={comment._id} className="text-sm text-gray-300">
                {comment?.content}
              </p>
            );
          })}
      </div>
      <form
        onSubmit={handleSubmit(doComment)}
        className="grid border w-full pl-1 mt-2 rounded-md"
      >
        <input
          type="text"
          placeholder="add comment.."
          {...register('content', {
            required: true,
          })}
          className="bg-transparent text-gray-100 px-2 w-full  focus:outline-none col-span-11 col-start-1"
        />
        <Button
          type="submit"
          bgColor="blue"
          textColor="white"
          className="flex justify-end col-span-1 col-start-12"
        >
          <SendHorizonal />
        </Button>
      </form>
    </Container>
  );
}

export default CommentBox;
