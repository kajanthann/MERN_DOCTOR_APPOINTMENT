import React, { useActionState } from 'react'
import { assets } from '../assets/assets'
import{ useNavigate } from 'react-router-dom'

const Banner = () => {

  const navigate = useNavigate()

  return (
    <div className='flex bg-blue-600 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
        <div className='w-1/2 flex-1 py-8 sm:py-10 lg:py-24 ly:pl-5'>
            <div className='text-white text-2xl mt-5'>
                <p>Bokk Appointment</p>
                <p className=''>With 100+ trusted doctors</p>
            </div>
            <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className='bg-white  text-sm text-gray-600 px-8 py-3 mt-4 rounded-full hover:bg-blue-800 hover:text-white hover:scale-105 transition-all'>create Account</button>
        </div>

        <div className='hidden sm:block md:w-1/2  lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner