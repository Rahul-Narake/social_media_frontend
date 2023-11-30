import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../index.js';
import {
  createPost as createNewPost,
  updatePost,
} from '../../store/slices/post.slice.js';
function PostForm({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      content: post?.content || '',
      images: post?.images || null,
      tags: post?.tags || '',
    },
  });

  const submit = async (data) => {
    if (post) {
      dispatch(updatePost({ newData: data, _id: post?._id }));
      navigate(`/posts/${post?._id}`);
    } else {
      dispatch(createNewPost(data));
      setValue('content', '');
      setValue('images', null);
      setValue('tags', '');
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mx-auto">
      <div className="flex flex-col space-y-4 bg-[#E0E0E0] rounded-md shadow-xl px-4 py-8">
        <h1 className="text-xl font-bold text-gray-700 text-center">
          {post ? "Let's update" : 'Tweeter'}
        </h1>

        <div className="flex flex-col space-y-2">
          <textarea
            className=" px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
            placeholder="Write Here..."
            {...register('content', {
              required: 'Content required',
              minLength: 3,
            })}
          />
          {errors.content?.type === 'required' && (
            <p role="alert" className="text-red-600 mt-8 text-start">
              Content is required
            </p>
          )}
          {errors.content?.type === 'minLength' && (
            <p role="alert" className="text-red-600 mt-8 text-start">
              Content length should be grater than 4
            </p>
          )}
        </div>

        <div>
          <Input
            type={'file'}
            label={'Image'}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register('images', {
              required: !post,
            })}
          />
          {post && (
            <div className="mb-4 mt-2 ">
              <img
                src={post?.images[0].url}
                alt={post.title}
                className="rounded-lg w-[300px] h-[200px]"
              />
            </div>
          )}
        </div>
        <div>
          <Input type={'text'} label={'Tags'} {...register('tags', {})} />
        </div>
        <div>
          <Button type="submit" bgColor={post ? 'bg-blue-500' : 'bg-pink-500'}>
            {post ? 'Update' : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
