import express from 'express';
import { appointmentsDoctor, cancelAppointment, dashboardDataDoctor, doctorList, doctorProfile, loginDoctor, markAppointmentCompleted, updateDoctorProfile } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments',authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointment',authDoctor, markAppointmentCompleted);
doctorRouter.post('/cancel-appointment',authDoctor, cancelAppointment);
doctorRouter.get('/dashboard',authDoctor, dashboardDataDoctor);
doctorRouter.get('/profile',authDoctor, doctorProfile);
doctorRouter.post('/update-profile',authDoctor, updateDoctorProfile);

export default doctorRouter;
