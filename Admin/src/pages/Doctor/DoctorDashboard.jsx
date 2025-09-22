import { assets } from "../../assets/assets";
import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, getDashData, dashData } = useContext(DoctorContext);
  const { convertDate } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="p-4 sm:p-8 w-full">
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Earnings */}
          <div className="flex items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <img className="w-14 h-14" src={assets.earning_icon} alt="Earnings" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-700">${dashData.totalEarnings}</p>
              <p className="text-gray-400">Total Earnings</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <img className="w-14 h-14" src={assets.appointment_icon} alt="Appointments" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-700">{dashData.totalAppointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          {/* Users */}
          <div className="flex items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <img className="w-14 h-14" src={assets.patients_icon} alt="Users" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-700">{dashData.Patients}</p>
              <p className="text-gray-400">Users</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white mt-10 rounded-2xl shadow border border-gray-100 overflow-x-auto">
          <div className="flex items-center gap-2 border-b border-gray-200 px-6 py-4">
            <img src={assets.list_icon} alt="List" />
            <p className="font-semibold text-gray-700 text-lg">Latest Bookings</p>
          </div>

          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments?.map((item, index) => (
              <div
                key={item._id || index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 hover:bg-gray-50 transition gap-3 sm:gap-0"
              >
                {/* Left: Doctor Info */}
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full w-12 h-12 object-cover border border-gray-200"
                    src={item.docData?.image || assets.default_user}
                    alt={item.docData?.name || "Doctor"}
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{item.docData?.name}</p>
                    <p className="text-sm text-gray-500">
                      {convertDate(item.slotDate)} • {item.slotTime}
                    </p>
                  </div>
                </div>

                {/* Right: Status */}
                <div className="mt-2 sm:mt-0 text-sm font-medium text-gray-600">
                  {item.cancelled ? (
                    <span className="text-red-600">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    <span className="text-blue-600">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
