import express from "express";
import { Appointment, cancelAppointment, getProfile, listAppointment, loginUser, payment, registerUser, updateProfile } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile",authUser, getProfile);
userRouter.post("/update-profile", authUser, upload.single('image'), updateProfile);
userRouter.post("/book-appointment", authUser, Appointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancelled-appointments", authUser, cancelAppointment);
userRouter.post("/payment-stripe", authUser, payment);


export default userRouter;
