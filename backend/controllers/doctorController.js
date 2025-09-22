import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// Change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get list of doctors (excluding password & email)
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const docData = await doctorModel.findOne({ email });
    if (!docData) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, docData.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: docData._id }, process.env.JWT_SECRET);

    return res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// appointment api
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.doctor;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });   
    }
}

// api mark appintment as completed
const markAppointmentCompleted = async (req, res) => {
  try {

    const { appointmentId } = req.body;
     const { docId } = req.doctor;
    const appointmentData =await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ success: true, message: 'Appointment completed' });
    }
    else{
      return res.status(404).json({ success: false, message: 'Appointment failed' });
    }
    
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
  }
}

// api cancel appintment 
const cancelAppointment = async (req, res) => {
  try {

    const { appointmentId } = req.body;
     const { docId } = req.doctor;
    const appointmentData =await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.json({ success: true, message: 'Appointment Cancelled' });
    }
    else{
      return res.status(404).json({ success: false, message: 'Appointment Cancel failed' });
    }
    
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
  }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, cancelAppointment,markAppointmentCompleted };
