import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const { dToken, getAppointments, appointments, completeAppointment, cancelAppointment } =
    useContext(DoctorContext);
  const { convertDate, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="border rounded-lg p-3 sm:p-5 overflow-x-auto bg-white shadow h-[80vh]">
        {/* Header (hidden on small screens) */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-3 text-sm font-medium text-gray-600 border-b pb-2">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {/* Rows */}
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-3 items-center text-sm text-gray-700 py-3 border-b last:border-none"
          >
            {/* Index */}
            <p className="font-medium">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              <img
                src={item.userData?.image || assets.default_user}
                alt={item.userData?.name || "Patient"}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="sm:block">
                <p className="font-medium">{item.userData?.name}</p>
                {/* Show age and payment on small screens */}
                <p className="text-xs text-gray-500 sm:hidden">
                  {calculateAge(item.userData?.age)} yrs | {item.payment ? "Online" : "Cash"}
                </p>
              </div>
            </div>

            {/* Payment (hidden on small screens) */}
            <p className="hidden sm:block border px-3 w-14 bg-slate-50 rounded-full">
              {item.payment ? "Online" : "Cash"}
            </p>

            {/* Age (hidden on small screens) */}
            <p className="hidden sm:block">{calculateAge(item.userData?.age)}</p>

            {/* Date & Time */}
            <p className="sm:block hidden">
              {convertDate(item.slotDate)}, {item.slotTime}
            </p>
            <p className="sm:hidden text-xs text-gray-500">
              {convertDate(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fee */}
            <p className="sm:block hidden">
              {currency}
              {item.fees}
            </p>
            <p className="sm:hidden text-xs text-gray-500">
              {currency}
              {item.fees}
            </p>

            {/* Status / Actions */}
            <div className="flex items-center gap-2 justify-end">
              {item.cancelled ? (
                <p className="text-red-600 font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-600 font-medium">Completed</p>
              ) : (
                <>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    src={assets.tick_icon}
                    alt="Confirm"
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
