import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (atoken) {
      setAtoken('');
      localStorage.removeItem('atoken');
    }
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img
          className='w-36 sm:w-40 cursor-pointer'
          src={assets.admin_logo}
          alt=''
        />
        <p className='border px-3 py-1 rounded-full border-gray-500 text-gray-600'>
          {atoken ? 'Admin' : 'Doctor'}
        </p>
      </div>
      <button
        onClick={logout}
        className='bg-blue-400 text-white px-5 py-2 rounded-full'
      >
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
