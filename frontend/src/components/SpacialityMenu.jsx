import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">Find by speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, porro!
      </p>

      {/* Scrollable Container */}
      <div className="w-full overflow-x-auto mt-4">
        <div className="flex gap-6 pt-2 px-4 sm:justify-center min-w-max">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              className="flex flex-col items-center text-sm flex-shrink-0 hover:-translate-y-2 transition-all duration-300"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                className="md:w-18 w-16 mb-2 border-2 rounded-full border-indigo-500"
                src={item.image}
                alt={item.speciality}
              />
              <p>{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
