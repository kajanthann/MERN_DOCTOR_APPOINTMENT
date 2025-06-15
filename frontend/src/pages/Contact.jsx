import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div>
      <div className='text-center text-2xl'>
        <h1>contact us</h1>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p>jnoj</p>
          <p>jonioh</p>
          <p>098765432</p>
          <p>kjknjn@gmail.com</p>

          <button className='border border-black px-4 py-2 rounded-2xl hover:bg-black hover:text-white transition-all duration-300'>Explore jop</button>
        </div>
      </div>

    </div>
  )
}

export default Contact