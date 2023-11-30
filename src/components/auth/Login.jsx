import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin } from '../../store/slices/user.slice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    setError('');
    try {
      setLoading(true);
      dispatch(authLogin(data));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div className="bg-white p-8 rounded shadow-md mx-auto">
      <Logo />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit(login)}>
        <div className="mb-4">
          <Input
            label="Username"
            placeholder="Enter Username"
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
              minimum length should be 3
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
            {loading ? 'loading..' : 'Sign In'}
          </Button>
        </div>

        <div>
          <p className="text-gray-400">
            Don't have account?{' '}
            <Link to={'/signup'} className="hover:underline text-blue-600">
              SignUp
            </Link>{' '}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
