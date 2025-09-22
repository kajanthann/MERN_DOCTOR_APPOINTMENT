import express from 'express';
import { appointmentsDoctor, cancelAppointment, doctorList, loginDoctor, markAppointmentCompleted } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments',authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointment',authDoctor, markAppointmentCompleted);
doctorRouter.post('/cancel-appointment',authDoctor, cancelAppointment);

export default doctorRouter;
