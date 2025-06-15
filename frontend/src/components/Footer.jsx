import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 mt-40 text-sm'>

            <div>
                <img className='w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis dolorum hic velit? Facilis mollitia sit animi, esse odio incidunt. Nobis repellat error laudantium facilis molestiae maiores qui eos iure doloribus?</p>
            </div>
            <div>
                <p className='text-xl mb-5'>COMPAY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>jbj lj</li>
                    <li>jnjnjj</li>
                </ul>
            </div>
            <div>
                <p>vrpinvirvi</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>imirepr</li>
                    <li>0987654</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>rbfyngyfiymgntnfit</p>
        </div>
    </div>
  )
}

export default Footer