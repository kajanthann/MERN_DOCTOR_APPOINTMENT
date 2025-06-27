import React from "react";
import { assets } from "../assets/assets";

const Head = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-blue-500 md:px-10 lg:px-20">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-start gap-4 py-10 m-auto md:py-[8vw] md:mb-[-30px]">
        <p className="text-3xl text-white font-semibold leading-snug">
          Book Appointment <br />
          With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center text-white gap-4">
          <img className="w-28" src={assets.group_profiles} alt="Group Profiles" />
          <p className="text-sm max-w-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam alias 
            <br className="hidden sm:block" />
            voluptas quidem, reprehenderit vero saepe?
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center bg-white rounded-full gap-3 text-gray-700 px-6 py-3 m-auto md:m-0 hover:scale-x-105 transition-transform duration-300 font-medium shadow-md"
        >
          Book Appointment <img src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>

      {/* Right Section */}
      <div className="md:w-2/5 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg object-cover"
          src={assets.header_img}
          alt="Doctor consultation"
        />
      </div>
    </div>
  );
};

export default Head;
