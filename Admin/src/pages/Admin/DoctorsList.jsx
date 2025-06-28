import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { atoken, doctors, getAllDoctors, backendUrl, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors && doctors.length > 0 ? (
          doctors.map((item) => (
            <div
              className="border border-indigo-800 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
              key={item._id || item.email}
            >
              <img
                className="bg-indigo-50 group-hover:bg-blue-200 transition-all duration-500"
                src={`${backendUrl}/uploads/${item.image}`}
                alt="doctor"
              />
              <div className="p-4">
                <p className="text-neutral-600 text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-zinc-600 text-sm">{item.speciality}</p>
                <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id, item.name || item.fullName || "Doctor", item.available)}
                  />
                  <div className="w-10 h-5 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>
                  <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  <span>Available</span>
                </label>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
