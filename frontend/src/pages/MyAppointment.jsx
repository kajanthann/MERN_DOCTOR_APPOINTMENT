import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointment = () => {
  const { backendUrl, token, userData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Converts "DD_MM_YYYY" to "DD - Mon - YYYY"
  const convertDate = (slotDate) => {
    if (!slotDate) return 'Invalid Date'
    const parts = slotDate.split('_')
    if (parts.length !== 3) return slotDate
    const day = parts[0]
    const monthIndex = parseInt(parts[1], 10) - 1
    const year = parts[2]
    if (monthIndex < 0 || monthIndex > 11) return slotDate
    return `${day} - ${months[monthIndex]} - ${year}`
  }

  const getUserAppointments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      })
      const data = response.data
      if (data.success) {
        // Add a 'cancelled' property to each appointment if not present
        const parsedAppointments = data.appointments.map((item) => {
          let docData = item.docData
          if (typeof docData === 'string') {
            try {
              docData = JSON.parse(docData)
            } catch {
              docData = {}
            }
          }
          if (docData.address && typeof docData.address === 'string') {
            try {
              docData.address = JSON.parse(docData.address)
            } catch {
              docData.address = {}
            }
          }
          // Ensure a cancelled flag exists (false by default)
          return { ...item, docData, cancelled: item.cancelled || false }
        })
        setAppointments(parsedAppointments.reverse())
      } else {
        toast.error(data.message || 'Failed to fetch appointments.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while fetching appointments.')
    }
  }

  // Show confirmation toast before cancelling
  const confirmCancelAppointment = (appointmentId) => {
    if (!userData || !userData._id) {
      toast.error('User not authenticated')
      return
    }

    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to cancel this appointment?</p>
          <div className="mt-2 flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={async () => {
                try {
                  const { data } = await axios.post(
                    `${backendUrl}/api/user/cancelled-appointments`,
                    { appointmentId, userId: userData._id },
                    { headers: { token } }
                  )

                  if (data.success) {
                    toast.success(data.message || 'Appointment cancelled.')
                    // Update local state: mark appointment as cancelled
                    setAppointments((prev) =>
                      prev.map((appt) =>
                        appt._id === appointmentId ? { ...appt, cancelled: true } : appt
                      )
                    )
                  } else {
                    toast.error(data.message || 'Failed to cancel appointment.')
                  }
                } catch (error) {
                  console.error(error)
                  toast.error(error.message || 'Something went wrong while cancelling appointment.')
                }
                closeToast()
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-700 text-white rounded"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    )
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
  <div>
    <h2 className="pb-3 mt-12 text-lg font-semibold border-b">My Appointments</h2>
    <div>
      {appointments.length === 0 ? (
        <p className="text-gray-500 mt-4">You have no appointments yet.</p>
      ) : (
        appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
          >
            <div>
              <img
                className="w-32 h-32 object-cover rounded bg-indigo-100"
                src={`${backendUrl}/uploads/${item.docData?.image || ''}`}
                alt={item.docData?.name || 'Doctor'}
              />
            </div>

            <div className="flex-1 text-sm">
              <p className="font-medium">{item.docData?.name || 'No Name'}</p>
              <p className="text-gray-600">{item.docData?.speciality || 'No Speciality'}</p>
              <p className="mt-2 font-medium">Address</p>
              <p className="text-gray-600">{item.docData?.address?.line1 || 'N/A'}</p>
              <p className="text-gray-600">{item.docData?.address?.line2 || ''}</p>
              <p className="mt-2">
                <span className="font-medium">Time:</span>{' '}
                {`${convertDate(item.slotDate)} - ${item.slotTime}`}
              </p>
                <p className="md:hidden text-red-600 font-semibold">Appointment Cancelled</p>
            </div>

            <div className="flex flex-col gap-2 justify-center items-end min-w-[150px]">
              {/* Show cancellation status on the right side if cancelled */}
              {item.cancelled ? (
                <p className="hidden md:block text-red-600 font-semibold text-center">Appointment Cancelled</p>
              ) : (
                <>
                  <button className="text-sm w-full sm:w-auto py-2 px-4 border rounded-lg hover:bg-black hover:text-white transition-all duration-300">
                    Pay Online
                  </button>
                  <button
                    onClick={() => confirmCancelAppointment(item._id)}
                    className="text-sm w-full sm:w-auto py-2 px-4 border rounded-lg hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)

}

export default MyAppointment
