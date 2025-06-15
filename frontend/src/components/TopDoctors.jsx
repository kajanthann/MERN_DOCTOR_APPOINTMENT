import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const TopDoctors = () => {

    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10'>
        <h1 className='text-3xl'>Top doctors to book</h1>
        <p className='sm-w-1/3 text-center text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, earum inventore doloremque qui sit quis sed enim ad, maxime quo eveniet</p>
        <div className='w-full grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2 gap-4 pt-5 gap-t-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((item,index)=>(
                <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0) }} className='border border-blue-800 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='bg-blue-50' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p>{item.name}</p>
                        <p>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-500 text-white px-12 py-3 rounded-full mt-10'>More</button>
    </div>
  )
}

export default TopDoctors