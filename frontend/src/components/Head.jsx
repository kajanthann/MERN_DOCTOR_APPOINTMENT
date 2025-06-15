import React from "react";
import { assets } from "../assets/assets";

const Head = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-blue-600 md:px-10 lg:px-20">
      <div className="md:w-1/2 flex flex-col items-start gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl">
          Book Appointment <br />
          With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center text-white">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam alias <br className="hidden sm:block" />
            
          </p>
        </div>
        <a href="#speciality" className="flex items-center bg-white rounded-full gap-3 text-gray-500 px-6 py-3  m-auto md:m-o hover:scale-105 transition-all duration-300">
          Book Appointment <img src={assets.arrow_icon} alt="" />
        </a>
      </div>
      <div className="md:w-1/2 relative ">
        <img className="w-full md:absolute bottom-0 h-auto rounded-lg" src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Head;
