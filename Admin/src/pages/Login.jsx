import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAtoken, backendUrl } = useContext(AdminContext);

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      const endpoint =
        state === 'Admin'
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctor/login`;

      const { data } = await axios.post(endpoint, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (data.success && data.token) {
        localStorage.setItem('atoken', data.token);
        setAtoken(data.token);
        toast.success(`${state} login successful`);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      toast.error(error.message || 'Login request failed');
    }
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-black">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-4 py-2 transition-all duration-200"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-4 py-2 transition-all duration-200"
          />
        </div>
        <button className="bg-blue-600 text-white w-full py-2 my-4 rounded-md text-base">
          Login
        </button>
        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span
              onClick={() => setState('Doctor')}
              className="cursor-pointer text-blue-400 underline"
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              onClick={() => setState('Admin')}
              className="cursor-pointer text-blue-400 underline"
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
