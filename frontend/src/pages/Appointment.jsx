import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getAllDoctors } =
    useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Load selected doctor details
  useEffect(() => {
    const selectedDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(selectedDoc || null);
  }, [doctors, docId]);

  // Generate available slots for the next 7 days
  useEffect(() => {
    if (!docInfo) return;

    const today = new Date();
    const generatedSlots = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const startTime = new Date(date);
      const endTime = new Date(date);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const now = new Date();
        startTime.setHours(now.getHours() + 1);
        startTime.setMinutes(now.getMinutes() > 30 ? 0 : 30);
      } else {
        startTime.setHours(10);
        startTime.setMinutes(0);
      }

      const slots = [];
      while (startTime < endTime) {
        const formattedTime = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        slots.push({ datetime: new Date(startTime), time: formattedTime });
        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      generatedSlots.push(slots);
    }

    setDocSlots(generatedSlots);
    setSlotIndex(0);
    setSlotTime("");
  }, [docInfo]);

  // Book Appointment API Call
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment.");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.error("Please select a slot time.");
      return;
    }

    try {
      const slotObj = docSlots[slotIndex].find(
        (slot) => slot.time === slotTime
      );
      if (!slotObj) {
        toast.error("Invalid slot selected.");
        return;
      }

      const date = slotObj.datetime;
      const slotDate = `${date.getDate()}_${
        date.getMonth() + 1
      }_${date.getFullYear()}`;

      const payload = { docId, slotDate, slotTime };
      console.log("Sending appointment data:", payload);

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        payload,
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
        navigate("/my-appointment");
      } else {
        toast.error(data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Booking failed due to server error."
      );
    }
  };

  if (!docInfo) return <p>Loading doctor info...</p>;

  return (
    <div className="p-4">
      {/* Doctor Card */}
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={`${backendUrl}/uploads/${docInfo.image}`}
          alt="Doctor"
          className="w-full sm:w-72 rounded-lg bg-blue-200 object-cover"
        />
        <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {docInfo.name}
            <img
              src={assets.verified_icon}
              alt="Verified"
              className="w-5 h-5"
            />
            <span
              className={`ml-4 px-2 py-1 rounded-full text-xs font-semibold ${
                docInfo.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {docInfo.available ? "Available" : "Not Available"}
            </span>
          </h2>

          <p className="text-sm text-gray-600 mt-1">
            {docInfo.degree} - {docInfo.speciality}
          </p>
          <p className="text-xs text-blue-600 mt-1 border px-2 py-0.5 w-fit rounded-full">
            {docInfo.experience} years experience
          </p>
          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm text-gray-800 font-medium">
              About <img src={assets.info_icon} alt="Info" className="w-4" />
            </p>
            <p className="text-sm text-gray-600 mt-1">{docInfo.about}</p>
          </div>
          <p className="mt-4 text-sm text-gray-700">
            Appointment Fee:{" "}
            <span className="text-blue-700 font-medium">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-10 px-2 sm:px-0">
        <h3 className="text-lg font-medium mb-2">Book a Slot</h3>

        {/* Days */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {docSlots.map((daySlots, index) => {
            const dateObj = daySlots[0]?.datetime;
            return (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime("");
                }}
                className={`text-center min-w-16 py-3 px-4 rounded-lg cursor-pointer ${
                  index === slotIndex
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 text-gray-700"
                }`}
              >
                <p className="font-semibold">
                  {dateObj ? daysOfWeek[dateObj.getDay()] : ""}
                </p>
                <p className="text-sm">{dateObj ? dateObj.getDate() : ""}</p>
              </div>
            );
          })}
        </div>

        {/* Time Slots */}
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {docSlots[slotIndex]?.map((slot, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(slot.time)}
              className={`px-5 py-2 rounded-full cursor-pointer text-sm whitespace-nowrap ${
                slotTime === slot.time
                  ? "bg-blue-600 text-white"
                  : "border border-gray-400 text-gray-700"
              }`}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-blue-600 text-white px-10 py-3 rounded-full mt-6 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!slotTime || !docInfo.available}
        >
          {docInfo.available ? "Book Appointment" : "Doctor Not Available"}
        </button>
      </div>

      {/* Related Doctors */}
      <div className="mt-10">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  );
};

export default Appointment;
