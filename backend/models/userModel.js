import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA5uSURBVHgB..."
  },
  address: {
    type: Object,
    default: { line1: "", line2: "" },
  },
  phone: { type: String, default: "0000000000" },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
}, { timestamps: true });

const userModel = mongoose.models.users || mongoose.model("users", userSchema);
export default userModel;
