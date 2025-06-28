import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors, backendUrl } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialties = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div>
      <p className="text-gray-600 my-2">*********************</p>

      <div className="flex flex-col sm:flex-row items-start gap-5">
        <button
          className={`py-1 px-3 border rounded transition-all sm:hidden ${
            showFilter ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filter
        </button>

        <div
          className={`flex-col gap-4 text-sm mt-5 text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {specialties.map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-300 rounded transition-all cursor-pointer ${
                speciality === spec ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        <div className="w-full grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 gap-4 pt-5 gap-t-6 px-3 sm:px-0">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-blue-800 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img
                className="bg-blue-50"
                src={`${backendUrl}/uploads/${item.image}`}
                alt={`${item.name} profile`}
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
