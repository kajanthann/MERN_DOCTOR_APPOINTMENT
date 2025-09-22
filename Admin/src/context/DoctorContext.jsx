import axios from "axios";
import { useState, createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dtoken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  // Fetch all appointments for the logged-in doctor
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { dtoken: dToken }, // header must match backend middleware
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log("Appointments:", data.appointments);
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch appointments");
      console.error("Error fetching appointments:", error);
    }
  };

  // Mark an appointment as completed
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message || "Appointment Completed");
        getAppointments();
      } else {
        toast.error(data.message || "Failed to complete appointment");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error completing appointment");
      console.error("Error completing appointment:", error);
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message || "Appointment Cancelled");
        getAppointments();
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error cancelling appointment");
      console.error("Error cancelling appointment:", error);
    }
  };

  const getDashData = async () => {
    try {

      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { dtoken: dToken }, // header must match backend middleware
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log("Dashboard Data:", data.dashData);
      }else{
        toast.error(data.message || "Failed to fetch dashboard data");
      }
      
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  // Get doctor's profile
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { dtoken: dToken },
      });
      if (data.success) {
        setProfileData(data.profileData);
      } else {
        toast.error(data.message || "Failed to fetch profile data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Update doctor profile (fees, address, available)
  const updateProfile = async (updatedData) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updatedData,
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message || "Profile updated successfully!");
        await getProfileData();
        return true;
      } else {
        toast.error(data.message || "Failed to update profile");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  const value = {
    backendUrl,
    dToken,
    setDToken,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,profileData,
    getProfileData,updateProfile
  };

  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;
