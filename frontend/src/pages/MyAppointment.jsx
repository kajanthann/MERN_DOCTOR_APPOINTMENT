import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointment = () => {

  const { doctors} = useContext(AppContext)
  return (
    <div>
      <p className='pb-3 mt-12 border-b'>My Appointment</p>
      <div>
        {
          doctors.slice(0,2).map((item,index) => (
            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
                <div>
                  <img className='w-32 bg-indigo-100' src={item.image} alt="" />
                </div>
                <div className='flex-1 text-sm'>
                  <p>{item.name}</p>
                  <p>{item.spesciality}</p>
                  <p>Address</p>
                  <p>{item.address.line1}</p>
                  <p>{item.address.line2}</p>
                  <p><span>Date & Time:</span> 25, july, 2024 | 8.30 PM</p>
                </div>
                <div></div>
                <div className='flex flex-col gap-2 justify-end'>
                  <button className='text-sm text-center sm:min-w-48 py-2 border rounded-lg hover:bg-black hover:text-white transition-all duration-300'>Pay Online</button>
                  <button className='text-sm text-center sm:min-w-48 py-2 border rounded-lg hover:bg-black hover:text-white transition-all duration-300'>Cancel Appointment</button>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointment