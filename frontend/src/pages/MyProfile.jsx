import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, loadUserData, token } = useContext(AppContext);
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

  return userData && (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl mt-12 p-6 transition-all duration-300">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        My Profile
      </h2>

      {/* Profile Picture & Name */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {isEdit ? (
            <label htmlFor="image" className="relative cursor-pointer group">
              <img
                src={image ? URL.createObjectURL(image) : `${backendUrl}/uploads/${userData.image}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-gray-300 group-hover:opacity-80 transition"
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
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
            />
          )}
        </div>

        <div className="flex-1">
          {isEdit ? (
            <input
              type="text"
              className="border p-2 rounded w-full focus:outline-blue-400"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <p className="text-xl font-semibold">{userData.name}</p>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {/* Contact Info */}
      <div className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700">Email</label>
          <p className="text-gray-600">{userData.email}</p>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Phone</label>
          {isEdit ? (
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={userData.phone}
              onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className="text-gray-600">{userData.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Address</label>
          {isEdit ? (
            <>
              <input
                type="text"
                className="border p-2 rounded w-full mb-2"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))
                }
              />
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))
                }
              />
            </>
          ) : (
            <p className="text-gray-600">{userData.address?.line1}<br />{userData.address?.line2}</p>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700">Gender</label>
          {isEdit ? (
            <select
              className="border p-2 rounded w-full"
              value={userData.gender}
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Date of Birth</label>
          {isEdit ? (
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={userData.dob}
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>
      </div>

      <button
        onClick={isEdit ? updateProfile : handleEditClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium mt-8 py-2 px-6 rounded-full w-full transition-all duration-200"
      >
        {isEdit ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
};

export default MyProfile;
