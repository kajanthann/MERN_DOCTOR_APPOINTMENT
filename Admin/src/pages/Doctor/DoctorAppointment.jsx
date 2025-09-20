import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const { dToken, getAppointments, appointments } = useContext(DoctorContext);
  const { convertDate, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="border rounded-lg p-5 overflow-x-auto bg-white shadow h-[80vh]">
        {/* Header */}
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
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-3 items-center text-sm text-gray-700 py-3 border-b last:border-none"
          >
            {/* # */}
            <p>{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              <img
                src={item.userData?.image || assets.default_user}
                alt={item.userData?.name || "Patient"}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <p>{item.userData?.name}</p>
            </div>

            {/* Payment */}
            <p className="border px-3 bg-slate-50 rounded-full">{item.payment ? "Online" : "Cash"}</p>

            {/* Age */}
            <p>{calculateAge(item.userData?.age)}</p>

            {/* Date & Time */}
            <p>
              {convertDate(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fee */}
            <p>
              {currency}
              {item.fees}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <img
                src={assets.cancel_icon}
                alt="Cancel"
                className="w-6 h-6 cursor-pointer hover:scale-110 transition"
              />
              <img
                src={assets.tick_icon}
                alt="Confirm"
                className="w-6 h-6 cursor-pointer hover:scale-110 transition"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
