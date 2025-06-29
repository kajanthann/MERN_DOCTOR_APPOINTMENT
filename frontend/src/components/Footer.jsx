import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="md:mx-10 mt-40 text-sm text-gray-700">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10">

        {/* Logo and About */}
        <div>
          <img className="w-40 mb-4" src={assets.logo} alt="Site Logo" />
          <p className="w-full md:w-2/3 leading-6 text-gray-600">
            Book trusted doctors online anytime, anywhere. Our platform helps you find experienced doctors, schedule appointments easily, and stay healthy with expert care.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-semibold mb-5">Company</p>
          <ul className="flex md:flex-col  gap-2 text-gray-600 cursor-pointer">
            <li>Home</li> <div className='md:hidden'>|</div>
            <li>About Us</li> <div className='md:hidden'>|</div>
            <li>Doctors</li> <div className='md:hidden'>|</div>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-semibold mb-5">Contact</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Email: support@doctorbook.com</li>
            <li>Phone: +1 (234) 567-8901</li>
            <li>Address: 123 Health St, Wellness City</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10">
        <hr />
        <p className="py-5 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} DoctorBook. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
