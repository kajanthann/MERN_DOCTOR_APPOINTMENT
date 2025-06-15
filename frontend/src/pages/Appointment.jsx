import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfweek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSolot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlote = async () => {
    setDocSlot([]);
    //get current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //geting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting time
      let endtime = new Date();
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);

      //set hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getDate() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endtime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        //increment current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlote();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSolot);
  }, [docSolot]);

  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-blue-400 w-full sm:max-w-72 rounded-lg "
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p>
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div className="">
              <p className="flex items-center gap-1 text-sm mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-700">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-700">
                {currencySymbol}
                {docInfo.fees}{" "}
              </span>
            </p>
          </div>
        </div>

        {/*--------------*/}
        <div className="sm:ml-72 sm:pl-4 font-medium">
          <p>Booking slot</p>
          <div className="flex gap-3 items-center wifull overflow-x-scroll mt-4">
            {docSolot.length &&
              docSolot.map((item, index) => (
                <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-500 text-white' : 'border border-gray-300'}`} key={index}>
                  <p>{item[0] && daysOfweek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
            }
          </div>

          <div className="flex items-center gap-3 overflow-x-scroll mt-4">
            {
              docSolot.length && docSolot[slotIndex].map((item,index)=>(
                <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-400 text-white' : 'text-gray-400 border border-gray-600'}`} key={index}>
                  {item.time.toLowerCase()}
                </p>
              ))
            }
          </div>
          <button className="bg-blue-500 text-white text-sm px-14 py-3 rounded-full my-6">Book & appointment</button>
        </div>
        {/*related doctors*/}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

      </div>
    )
  );
};

export default Appointment;
