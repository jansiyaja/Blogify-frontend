import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/frontend_Api';
import ErrorToast from '../components/ErrorToast';
import { useLogin } from '../endpoints/useEndpoints';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  status: number;
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: any; // Replace with your actual user type if available
  };
}

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(emailRegex, 'Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

const Login: React.FC = () => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response: LoginResponse = await useLogin(data);
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);

        dispatch(
          setCredentials({
            user: response.data.user,
            accessToken: response.data.tokens.accessToken,
            refreshToken: response.data.tokens.refreshToken,
          })
        );

        setToast({ message: 'Login successfully', type: 'success' });
        navigate(ROUTES.PUBLIC.HOME);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Something went wrong';
      console.error('Error:', errorMessage);
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login
          </button>

          <p className="text-center mt-4">
            Don't have an account?{' '}
            <Link to={ROUTES.PUBLIC.REGISTER} className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
      {toast && <ErrorToast type={toast.type} message={toast.message} />}
    </div>
  );
};

export default Login;
