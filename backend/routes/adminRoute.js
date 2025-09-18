import express from 'express';
import { addDoctor, adminCancelAppointment, allDoctors, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.post('/add-doctor', authAdmin, upload.single('imageFile'), addDoctor);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, adminCancelAppointment);

export default adminRouter;
