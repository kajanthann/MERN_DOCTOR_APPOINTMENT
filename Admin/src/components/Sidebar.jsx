import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

    const {atoken} = useContext(AdminContext);
    const {dToken} = useContext(DoctorContext);

  return (
    <div className='min-h-screen bg-white border-r'>
        {
            atoken && <ul className='text-gray-700 mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? 'border-r-5 border-blue-500 bg-[#F2F3F7]' : ''}`} to={'/admin-dashboard'}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? 'border-r-5 border-blue-500 bg-[#F2F3F7]' : ''}`} to={'/all-appointments'}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointment</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? 'border-r-5 border-blue-500 bg-[#F2F3F7]' : ''}`} to={'/add-doctor'}>
                    <img src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Doctor</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? 'border-r-5 border-blue-500 bg-[#F2F3F7]' : ''}`} to={'/doctor-list'}>
                    <img src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Doctor List</p>
                </NavLink>
            </ul>
        }
        {
            dToken && <ul className='text-gray-700 mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? 'border-r-5 border-blue-500 bg-[#F2F3F7]' : ''}`} to={'/doctor-dashboard'}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? 'border-r-5 border-blue-500 bg-[#F2F3F7]' : ''}`} to={'/doctor-appointment'}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointment</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? 'border-r-5 border-blue-500 bg-[#F2F3F7]' : ''}`} to={'/doctor-profile'}>
                    <img src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Profile</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar