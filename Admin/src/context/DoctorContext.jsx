import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '');
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dToken } });
            if (data.success) {
                setAppointments(data.appointments.reverse());
                console.log(data.appointments);
            }else{
                toast.error(data.message || 'Failed to fetch appointments');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch appointments');
            console.error('Error fetching appointments:', error);
        }
    }

    const value = {
        backendUrl,
        dToken, setDToken,
        setAppointments,appointments,
        getAppointments,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}   

export default DoctorContextProvider