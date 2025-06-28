import express from "express";
import { Appointment, getProfile, loginUser, registerUser, updateProfile } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile",authUser, getProfile);
userRouter.post("/update-profile", authUser, upload.single('image'), updateProfile);
userRouter.post("/book-appointment", authUser, Appointment);


export default userRouter;
