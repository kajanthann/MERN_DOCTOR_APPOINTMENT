import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },

    userData: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: false },
    },

    docData: {
      name: { type: String, required: true },
      speciality: { type: String, required: false },
      image: { type: String, required: false },
      address: {
        line1: { type: String, required: false },
        line2: { type: String, required: false },
      },
    },

    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
  }
);

const appointmentModel =
  mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
