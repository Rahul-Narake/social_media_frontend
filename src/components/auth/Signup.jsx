import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Logo } from '../index';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register as authSignup } from '../../store/slices/user.slice';

function Signup() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const signup = async (data) => {
    setError('');
    try {
      dispatch(authSignup(data));
      setValue('email', '');
      setValue('username', '');
      setValue('password', '');
    } catch (error) {
      setError(error);
    }
  };

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <div className="bg-white p-8 rounded shadow-md mx-auto">
      <Logo />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit(signup)}>
        <div className="mb-4">
          <Input
            label="Email"
            placeholder="Enter Email"
            type="email"
            {...register('email', {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
          />
          {errors.email?.type === 'required' && (
            <p role="alert" className="text-red-600 mt-4 text-start">
              Email is required
            </p>
          )}
        </div>
        <div className="mb-4">
          <Input
            label="Username"
            placeholder="Enter UserName"
            type="text"
            {...register('username', {
              required: true,
              minLength: 3,
            })}
          />
          {errors.username?.type === 'required' && (
            <p role="alert" className="text-red-600 mt-4 text-start">
              Username is required
            </p>
          )}
          {errors.username?.type === 'minLength' && (
            <p role="alert" className="text-red-600 mt-4 text-start">
              Username length should be greate than 2
            </p>
          )}
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
            {...register('password', {
              required: true,
              minLength: 5,
            })}
          />
          {errors.password?.type === 'required' && (
            <p role="alert" className="text-red-600 mt-4 text-start">
              Password is required
            </p>
          )}
          {errors.password?.type === 'minLength' && (
            <p role="alert" className="text-red-600 mt-4 text-start">
              Password length should be greate than 4
            </p>
          )}
        </div>
        <div className="mb-4">
          <Button type="submit" bgColor="bg-blue-500" textColor="white">
            SignUp
          </Button>
        </div>

        <div>
          <p className="text-gray-400">
            Already have account?{' '}
            <Link to={'/login'} className="hover:underline text-blue-600">
              SignIn
            </Link>{' '}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
