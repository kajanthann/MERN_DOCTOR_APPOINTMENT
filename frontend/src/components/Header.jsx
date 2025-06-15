import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navicate = useNavigate();

  const [Showmenu, setShowmenu] = useState(false);
  const [Token, setToken] = useState(true);
  return (
    <div className="flex items-center justify-between border-b border-b-gray-600 py-2">
      <img onClick={() => navicate("/")} src={assets.logo} alt="" />
      <ul className="hidden md:flex font-medium gap-5">
        <NavLink to="/">
          <li className="py-1 ">Home</li>
          <hr className="border-none outline-none h-0.5 bg-blue-900 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-blue-900 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-blue-900 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-blue-900 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex justify-end">
        {Token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative:">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="top-0 absolute right-0 pt-14 font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 me-10 p-4">
                <p
                  onClick={() => navicate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My-Profile
                </p>
                <p
                  onClick={() => navicate("my-appointment")}
                  className="hover:text-black cursor-pointer"
                >
                  My-Appointment
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  LogOut
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navicate("/login")}
            className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 font-light hidden md:block rounded-full"
          >
            Create Account
          </button>
        )}
        {/* Menu Icon */}
<img
  onClick={() => setShowmenu(true)}
  className="w-6 md:hidden cursor-pointer"
  src={assets.menu_icon}
  alt="Open Menu"
/>

{/* Sidebar Menu */}
<div
  className={`${
    Showmenu ? "fixed w-full" : "h-0 w-0"
  } md:hidden right-0 top-0 bottom-0 overflow-hidden z-20 bg-white transition-all`}
>
  <div className="flex items-center justify-between px-5 py-6">
    <img className="w-36" src={assets.logo} alt="Logo" />
    <img
      className="w-7 cursor-pointer"
      onClick={() => setShowmenu(false)}
      src={assets.cross_icon}
      alt="Close Menu"
    />
  </div>
  <ul className="flex flex-col items-center gap-2 mt-5 px-7 text-lg font-medium">
    <NavLink onClick={() => {setShowmenu(false);scrollTo(0,0)}} to="/">
      <p>Home</p>
    </NavLink>
    <NavLink onClick={() => {setShowmenu(false);scrollTo(0,0)}} to="/doctors">
      <p>All Doctors</p>
    </NavLink>
    <NavLink onClick={() => {setShowmenu(false);scrollTo(0,0)}} to="/about">
      <p>About</p>
    </NavLink>
    <NavLink onClick={() => {setShowmenu(false);scrollTo(0,0)}} to="/contact">
      <p>Contact</p>
    </NavLink>
  </ul>
</div>

      </div>
    </div>
  );
};

export default Header;
