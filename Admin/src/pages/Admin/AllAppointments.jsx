import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { appointments, getAllAppointments, atoken, cancellAppointment } = useContext(AdminContext);
  const { calculateAge, convertDate, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-semibold bg-gray-100">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Rows */}
        {appointments.map((item, index) => (
          <div
            key={item._id || index}
            className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b hover:bg-gray-50"
          >
            {/* Index */}
            <p>{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              {item.userData?.image && (
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-8 h-8 rounded-full border object-cover"
                />
              )}
              <p>{item.userData?.name}</p>
            </div>

            {/* Age */}
            <p>{item.userData?.dob ? calculateAge(item.userData.dob) : "-"}</p>

            {/* Date & Time */}
            <p>
              {convertDate(item.date)} {item.slotTime}
            </p>

            {/* Doctor */}
            <div className="flex items-center gap-2">
              {item.docData?.image && (
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-8 h-8 rounded-full border object-cover"
                />
              )}
              <p>{item.docData?.name}</p>
            </div>

            {/* Fees */}
            <p>
              {currency}
              {item.amount || item.fees}
            </p>

            {/* Actions */}
            <div className="flex justify-center">
              {item.cancelled ? (
                <p className="text-red-600 font-medium">Cancelled</p>
              ) : (
                <img
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                  src={assets.cancel_icon}
                  alt="Cancel"
                  onClick={() => cancellAppointment(item._id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
