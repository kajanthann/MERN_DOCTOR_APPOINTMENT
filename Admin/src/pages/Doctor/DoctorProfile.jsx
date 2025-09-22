import React, { useState, useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const DoctorProfileUpdate = () => {
  const { profileData, getProfileData, updateProfile, backendUrl } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);
  const [doctorData, setDoctorData] = useState({
    fees: "",
    available: false,
    address: { line1: "", line2: "" },
  });

  useEffect(() => {
    if (profileData) {
      setDoctorData({
        fees: profileData.fees || "",
        available: profileData.available || false,
        address: profileData.address || { line1: "", line2: "" },
      });
    } else {
      getProfileData();
    }
  }, [profileData]);

  const handleEditClick = () => setIsEdit(true);

  const handleSave = async () => {
    const updated = await updateProfile({
      fees: doctorData.fees,
      available: doctorData.available,
      address: doctorData.address,
    });
    if (updated) setIsEdit(false);
  };

  const toggleAvailability = () => {
    setDoctorData((prev) => ({ ...prev, available: !prev.available }));
  };

  return (
    profileData && (
      <div className="w-full m-4 md:mx-20 bg-white rounded-2xl shadow-lg md:mt-10 p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <img src={assets.proweb} alt="Profile Illustration" className="max-w-xs w-full" />
        </div>

        {/* Right Profile Form */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center md:text-left">
            Doctor Profile
          </h2>

          {/* Name */}
          <div>
            <label className="block font-semibold text-gray-700">Name</label>
            <p className="text-gray-800 border-b pb-1">{profileData.name}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-700">Email</label>
            <p className="text-gray-600 border-b">{profileData.email}</p>
          </div>

          {/* Speciality */}
          <div>
            <label className="block font-semibold text-gray-700">Speciality</label>
            <p className="text-gray-600 border-b">{profileData.speciality}</p>
          </div>

          {/* Degree */}
          <div>
            <label className="block font-semibold text-gray-700">Degree</label>
            <p className="text-gray-600 border-b">{profileData.degree}</p>
          </div>

          {/* Experience */}
          <div>
            <label className="block font-semibold text-gray-700">Experience</label>
            <p className="text-gray-600 border-b">{profileData.experience}</p>
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fees */}
            <div>
              <label className="block font-semibold text-gray-700">Fees</label>
              {isEdit ? (
                <input
                  type="number"
                  className="border p-2 rounded w-full focus:outline-blue-500"
                  value={doctorData.fees}
                  onChange={(e) => setDoctorData({ ...doctorData, fees: e.target.value })}
                />
              ) : (
                <p className="text-gray-600 border-b">{doctorData.fees}</p>
              )}
            </div>

            {/* Availability */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Available</label>
              {isEdit ? (
                <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={doctorData.available}
                    onChange={toggleAvailability}
                  />
                  <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>
                  <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-6"></span>
                  <span className="ml-2">{doctorData.available ? "Yes" : "No"}</span>
                </label>
              ) : (
                <p className="text-gray-600 border-b">{doctorData.available ? "Yes" : "No"}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block font-semibold text-gray-700">Address</label>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Line 1"
                  className="border p-2 rounded w-full focus:outline-blue-500"
                  value={doctorData.address.line1}
                  onChange={(e) =>
                    setDoctorData({ ...doctorData, address: { ...doctorData.address, line1: e.target.value } })
                  }
                />
                <input
                  type="text"
                  placeholder="Line 2"
                  className="border p-2 rounded w-full focus:outline-blue-500"
                  value={doctorData.address.line2}
                  onChange={(e) =>
                    setDoctorData({ ...doctorData, address: { ...doctorData.address, line2: e.target.value } })
                  }
                />
              </div>
            ) : (
              <p className="text-gray-600 border-b">
                {doctorData.address.line1}, {doctorData.address.line2}
              </p>
            )}
          </div>

          {/* Save / Edit Button */}
          <div className="pt-4 text-center md:text-right">
            <button
              onClick={isEdit ? handleSave : handleEditClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-full transition-all duration-200"
            >
              {isEdit ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfileUpdate;
