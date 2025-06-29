import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js'; 

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ success: true, token });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// profile

const getProfile = async (req,res) => {
  try {
    const {userId} = req.user;
    const userData = await userModel.findById(userId).select('-password');

    res.json({success : true, userData});

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.user.userId; // From authUser middleware
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.status(400).json({ success: false, message: "Data Missing" });
    }

    const updatedFields = {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    };

    if (imageFile) {
      updatedFields.image = imageFile.filename; // save uploaded image name as 'image'
    }

    await userModel.findByIdAndUpdate(userId, updatedFields);

    res.json({ success: true, message: "Profile Updated" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const Appointment = async (req, res) => {
  try {
    const { userId } = req.user;
    const { docId, slotDate, slotTime } = req.body;

    // Fetch doctor data and exclude sensitive fields
    const docData = await doctorModel.findById(docId).select("-password");
    console.log("Doctor Data:", docData);

    // Check if doctor exists
    if (!docData) {
      return res.status(400).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check doctor availability
    if (!docData.available) {
      return res.status(400).json({
        success: false,
        message: "Doctor is not available",
      });
    }

    // Initialize booked slots object if undefined
    let slots_booked = docData.slots_booked || {};
    console.log("Existing Booked Slots:", slots_booked);

    // Check if selected slot is already booked
    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.status(400).json({
        success: false,
        message: "Selected slot is already booked",
      });
    }

    // If no slots on the selected date, initialize array
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = [];
    }

    // Add selected slot to booked list
    slots_booked[slotDate].push(slotTime);

    // Fetch user data
    const userData = await userModel.findById(userId).select("-password");

    // Create appointment document
    const appointmentData = {
  userId,
  docId,
  slotDate,
  slotTime,
  userData: {
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  },
  docData: {
    name: docData.name,
    speciality: docData.speciality,
    image: docData.image,
    address: {
      line1: docData.address.line1,
      line2: docData.address.line2,
    },
  },
  amount: docData.fees,
  date: Date.now(),
};


    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor’s booked slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    console.log("Updated Booked Slots:", slots_booked);

    return res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
    });

  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


const listAppointment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    
    // Convert ObjectIds to string for comparison if necessary
    if (appointment.userId.toString() !== userId) {
      return res.status(401).json({ success: false, message: "Unauthorized to cancel this appointment" });
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




export { registerUser, loginUser, getProfile, updateProfile,Appointment, listAppointment, cancelAppointment };
