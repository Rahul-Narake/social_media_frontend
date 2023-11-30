import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../index.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSocialProfile } from '../../store/slices/user.slice.js';

function ProfileForm({ profile }) {
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      bio: profile?.bio || '',
      dob: profile?.dob || '',
      location: profile?.location || '',
      phoneNumber: profile?.phoneNumber || '',
    },
  });
  const [error, setError] = useState('');

  const submit = async (data) => {
    setError('');
    try {
      disPatch(updateSocialProfile(data));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full">
      {error && <p className="text-red-400">{error}</p>}
      <div className="flex flex-col">
        <div className="flex flex-col mb-2">
          <div className="">
            <Input
              label="First Name"
              type="text"
              {...register('firstName', {
                required: true,
              })}
            />
          </div>
          {errors?.firstName?.type === 'required' && (
            <p role="alert" className="text-red-500">
              FirstName is required
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <div className="">
            <Input
              label="Last Name"
              type="text"
              {...register('lastName', {
                required: true,
              })}
            />
          </div>
          {errors?.lastName?.type === 'required' && (
            <p role="alert" className="text-red-500">
              LastName is required
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <div className="">
            <Input
              type="text"
              label="Bio"
              {...register('bio', {
                required: true,
              })}
            />
          </div>
          {errors?.bio?.type === 'required' && (
            <p role="alert" className="text-red-500">
              Bio is required
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <div className="">
            <Input
              type="text"
              label="Location"
              {...register('location', {
                required: true,
              })}
            />
          </div>
          {errors?.location?.type === 'required' && (
            <p role="alert" className="text-red-500">
              Location is required
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <div className="">
            <Input
              type="phone"
              label="Contact"
              {...register('phoneNumber', {
                required: true,
                maxLength: 10,
                minLength: 10,
              })}
            />
          </div>
          {errors?.phoneNumber?.type === 'required' && (
            <p role="alert" className="text-red-500">
              Contact is required
            </p>
          )}
          {errors?.phoneNumber?.type === 'minLength' && (
            <p role="alert" className="text-red-500">
              Minimum 10 digits required
            </p>
          )}
          {errors?.phoneNumber?.type === 'maxLength' && (
            <p role="alert" className="text-red-500">
              Maximum 10 digits required
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <div className="">
            <Input
              type="date"
              label="Date Of Birth"
              {...register('dob', {
                required: true,
              })}
            />
          </div>
          {errors?.dob?.type === 'required' && (
            <p role="alert" className="text-red-500">
              DOB is required
            </p>
          )}
        </div>
        <div>
          <Button
            bgColor={profile ? 'bg-blue-500' : 'bg-pink-500'}
            textColor="white"
            type="submit"
          >
            {profile ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ProfileForm;
