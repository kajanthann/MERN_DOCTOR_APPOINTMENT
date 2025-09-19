import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { dashData, getDashData, atoken, cancellAppointment } =
    useContext(AdminContext);
  const { convertDate } = useContext(AppContext);
  const IMAGE_BASE_URL = "http://localhost:8000/uploads/";

  useEffect(() => {
    if (atoken) getDashData();
  }, [atoken]);

  // Helper to determine status
  const getStatus = (item) => {
    if (item.cancelled) return { text: "Cancelled", color: "text-red-600" };

    const [day, month, year] = item.slotDate.split("_").map(Number);
    const appointmentDate = new Date(year, month - 1, day);
    const today = new Date();

    return appointmentDate < today
      ? { text: "Done", color: "text-green-600" }
      : { text: "Upcoming", color: "text-blue-600" };
  };

  return (
    dashData && (
      <div className="p-8 w-full">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Doctors */}
          <div className="flex items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <img className="w-14 h-14" src={assets.doctor_icon} alt="Doctors" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <img
              className="w-14 h-14"
              src={assets.appointment_icon}
              alt="Appointments"
            />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          {/* Users */}
          <div className="flex items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <img className="w-14 h-14" src={assets.patients_icon} alt="Users" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.users}
              </p>
              <p className="text-gray-400">Users</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white mt-10 rounded-2xl shadow border border-gray-100">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-gray-200 px-6 py-4">
            <img src={assets.list_icon} alt="List" />
            <p className="font-semibold text-gray-700 text-lg">
              Latest Bookings
            </p>
          </div>

          {/* Appointment List */}
          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments?.map((item, index) => {
              const status = getStatus(item);
              return (
                <div
                  key={item._id || index}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
                >
                  {/* Left: Doctor Info */}
                  <div className="flex items-center gap-3">
                    <img
                      className="rounded-full w-12 h-12 object-cover border border-gray-200"
                      src={`${IMAGE_BASE_URL}${item.docData.image}`}
                      alt={item.docData.name}
                    />
                    <div>
                      <p className="text-gray-800 font-medium">
                        {item.docData.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {convertDate(item.slotDate)} • {item.slotTime}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status */}
                  <div className="flex items-center gap-3">
                    <p className={`font-medium ${status.color}`}>{status.text}</p>
                    {!item.cancelled && status.text === "Upcoming"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
