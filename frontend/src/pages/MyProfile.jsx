import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, loadUserData, token } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleEditClick = () => setIsEdit(true);

  return (
    userData && (
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl mt-10 p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 transition-all duration-300">
        {/* Left SVG illustration */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src={assets.proweb}
            alt="Profile Illustration"
            className="max-w-xs w-full"
          />
        </div>

        {/* Right profile details */}
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            My Profile
          </h2>

          <div className="flex flex-col items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              {isEdit ? (
                <label htmlFor="image" className="relative cursor-pointer group">
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : `${backendUrl}/uploads/${userData.image}`
                    }
                    alt="Profile"
                    className="w-40 h-40 object-cover rounded-full border border-gray-300 group-hover:opacity-80 transition"
                  />
                  <img
                    src={assets.upload_icon}
                    alt="Upload"
                    className="w-6 h-6 absolute bottom-1 right-1 bg-white p-1 rounded-full shadow"
                  />
                  <input
                    type="file"
                    id="image"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              ) : (
                <img
                  src={`${backendUrl}/uploads/${userData.image}`}
                  alt="Profile"
                  className="w-40 h-40 object-cover rounded-full border-4 border-blue-200"
                />
              )}
            </div>

            {/* Name */}
            <div className="w-full">
              <label className="block font-semibold text-gray-700">Name</label>
              {isEdit ? (
                <input
                  type="text"
                  className="border p-2 rounded w-full focus:outline-blue-400"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-800 border-b pb-1">{userData.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="block font-semibold text-gray-700">Email</label>
              <p className="text-gray-600 border-b">{userData.email}</p>
            </div>

            {/* Phone */}
            <div className="w-full">
              <label className="block font-semibold text-gray-700">Phone</label>
              {isEdit ? (
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-600 border-b">{userData.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="w-full">
              <label className="block font-semibold text-gray-700">Address</label>
              {isEdit ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Line 1"
                    className="border p-2 rounded w-full"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Line 2"
                    className="border p-2 rounded w-full"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <p className="text-gray-600 border-b">
                  {userData.address?.line1}, {userData.address?.line2}
                </p>
              )}
            </div>

            {/* Gender and DOB */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gender */}
              <div>
                <label className="block font-semibold text-gray-700">Gender</label>
                {isEdit ? (
                  <select
                    className="border p-2 rounded w-full"
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-600 border-b">{userData.gender}</p>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="block font-semibold text-gray-700">
                  Date of Birth
                </label>
                {isEdit ? (
                  <input
                    type="date"
                    className="border p-2 rounded w-full"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-gray-600 border-b">{userData.dob}</p>
                )}
              </div>
            </div>

            {/* Save / Edit Button */}
            <div className="pt-6 text-end w-full">
              <button
                onClick={isEdit ? updateProfile : handleEditClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-full transition-all duration-200"
              >
                {isEdit ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
