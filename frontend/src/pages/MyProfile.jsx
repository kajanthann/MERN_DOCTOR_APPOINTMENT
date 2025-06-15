import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "utfyo",
    image: assets.profile_pic,
    email: "kbvrurtigliuo",
    phoneNum: "1234567890",
    address: {
      line1: "cfugviuhbijnk",
      line2: "cfugviuhbijnk",
    },
    gender: "male",
    dateofB: "2002-02-02",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-10">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <img className="w-24 h-24 rounded-full border-4 border-gray-300" src={userData.image} alt="Profile" />

        {/* Name Input */}
        {isEdit ? (
          <input
            type="text"
            className="border p-2 rounded w-full mt-2 text-center"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="text-xl font-semibold mt-2">{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Contact Information */}
      <div className="text-gray-700">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <p className="mt-1"><strong>Email:</strong> {userData.email}</p>

        <p className="mt-1"><strong>Phone:</strong>  
          {isEdit ? (
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={userData.phoneNum}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phoneNum: e.target.value }))
              }
            />
          ) : (
            <span className="ml-2">{userData.phoneNum}</span>
          )}
        </p>

        <p className="mt-1"><strong>Address:</strong></p>
        {isEdit ? (
          <div>
            <input
              type="text"
              className="border p-2 rounded w-full mb-2"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
              value={userData.address.line1}
            />
            <input
              type="text"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
              value={userData.address.line2}
            />
          </div>
        ) : (
          <p>{userData.address.line1} <br /> {userData.address.line2}</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Basic Information */}
      <div className="text-gray-700">
        <h2 className="text-lg font-semibold">Basic Information</h2>
        <p className="mt-1"><strong>Gender:</strong>
          {isEdit ? (
            <select
              className="border p-2 rounded w-full"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <span className="ml-2">{userData.gender}</span>
          )}
        </p>

        <p className="mt-1"><strong>Birthday:</strong>
          {isEdit ? (
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={userData.dateofB}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dateofB: e.target.value }))
              }
            />
          ) : (
            <span className="ml-2">{userData.dateofB}</span>
          )}
        </p>
      </div>

      {/* Edit/Save Button */}
      <button
        onClick={() => setIsEdit(!isEdit)}
        className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 w-full hover:bg-blue-600 transition-all"
      >
        {isEdit ? "Save" : "Edit Profile"}
      </button>
    </div>
  );
};

export default MyProfile;
