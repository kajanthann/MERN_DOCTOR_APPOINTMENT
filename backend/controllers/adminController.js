import validator from 'validator';
import bcrypt from 'bcrypt';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

const addDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            available,
            fees,
            address,
            phone,
        } = req.body;

        const imageFile = req.file;


        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
            image: imageFile.filename
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        return res.status(201).json({ success: true, message: "Doctor added successfully" });

    } catch (error) {
        console.error("Add Doctor Error:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

// api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password , process.env.JWT_SECRET);
            return res.status(200).json({ success: true, token});
        } else{
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// api to get doctors list in admin panel
const allDoctors = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// get appointments
const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// cancel appointment
const adminCancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    
    // Check if already cancelled
    if (appointment.cancelled) {
      return res.status(400).json({ success: false, message: "Appointment is already cancelled" });
    }
    
    // Update appointment as cancelled
    appointment.cancelled = true;
    await appointment.save();

    const { docId, slotDate, slotTime } = appointment;
    const docData = await doctorModel.findById(docId);

    let slots_booked = docData.slots_booked || {};
    if (slots_booked[slotDate]) {
      const index = slots_booked[slotDate].indexOf(slotTime);
      if (index !== -1) {
        slots_booked[slotDate].splice(index, 1);
      }
    }
    
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api for admin panel
const adminDashboard = async (req,res) => {
    try {

        const doctors = await doctorModel.find({});
        const users  = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors : doctors.length,
            users : users.length,
            appointments : appointments.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }

        res.status(200).json({ success: true, dashData });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });   
    }
}

export { addDoctor,loginAdmin,allDoctors,appointmentsAdmin, adminCancelAppointment, adminDashboard };
