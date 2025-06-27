import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { atoken, doctors, getAllDoctors, backendUrl,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors && doctors.length > 0 ? (
          doctors.map((item) => (
            <div className='border border-indigo-800 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={item._id || item.email}>
              <img className='bg-indigo-50 group-hover:bg-blue-200 transition-all duration-500' src={`${backendUrl}/uploads/${item.image}`} alt="doctor" />
              <div className='p-4'>
                <p className='text-neutral-600 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={(e) => changeAvailability(item._id, e.target.checked)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
