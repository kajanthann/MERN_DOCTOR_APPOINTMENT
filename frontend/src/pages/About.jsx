import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl text-gray-700">
        <p>
          ABOUT <span>US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga id
            distinctio iste reiciendis impedit. Vitae porro velit pariatur
            sapiente tempora dolor omnis rerum suscipit, totam autem dignissimos
            incidunt, quibusdam odit.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
            nisi nemo impedit saepe laborum ipsam minus porro. Ut dignissimos
            optio recusandae totam, quo nisi. Quisquam quo eos ullam at illo!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            perferendis temporibus cupiditate deleniti dolores! Accusamus
            impedit et officia vitae natus distinctio alias laborum deserunt
            perspiciatis quo, incidunt nobis ab est.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>why choose us</p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 py-8 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer">
          <p>title</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero consectetur fugit</p>
        </div>
        <div className="border px-10 py-8 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer">
          <p>title</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero consectetur fugit</p>
        </div>
        <div className="border px-10 py-8 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer">
          <p>title</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero consectetur fugit</p>
        </div>
        
      </div>
    </div>
  );
};

export default About;
