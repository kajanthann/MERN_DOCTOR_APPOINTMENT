import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 text-gray-800' id='speciality'>
        <h1 className='text-3xl font-medium'>Find by speciality</h1>
        <p className='sm:w-1/3 text-center text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, porro!</p>
        
        <div className='flex sm:justify-center gap-4 pt-5 overflow-x-auto'>
            {specialityData.map((item, index) => (
                <Link 
                    key={index} 
                    to={`/doctors/${item.speciality}`} 
                    className='flex flex-col items-center text-sm flex-shrink-0 hover:translate-y-[10px] transition-all duration-500'
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <img className='w-16 sm:w-23 mb-2' src={item.image} alt={item.speciality} />
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu
