import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../index';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
  getSocialProfile,
  updateCoverImage,
} from '../../store/slices/user.slice';
import { useNavigate } from 'react-router-dom';

function UpdateProfilePic({ profile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      images: profile?.coverImage || '',
    },
  });

  const update = async (data) => {
    try {
      if (data) {
        const response = await dispatch(
          updateCoverImage({ coverImage: data?.images[0] })
        );
        if (response.payload.success) {
          dispatch(getSocialProfile());
          navigate('/profile');
        }
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit(update)}>
        {profile && (
          <div className="flex justify-center">
            <img
              src={profile?.coverImage?.url}
              alt={profile?.account?.username}
              className="w-[300px] h-[300px]"
            />
          </div>
        )}
        <div className="mb-2">
          <Input
            type={'file'}
            label={'Image'}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register('images', {
              required: true,
            })}
          />
          {errors?.images?.type === 'required' && (
            <p role="alert" className="text-red-500 mb-2">
              Image required to update
            </p>
          )}
        </div>
        <Button type="submit"> Update</Button>
      </form>
    </div>
  );
}

export default UpdateProfilePic;
