import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctors = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [degree, setDegree] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, atoken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name || !speciality || !phone || !email || !password || !fees || 
      !degree || !about || !docImg
    ) {
      return toast.error("Please fill all fields and select an image");
    }

    try {
      const formData = new FormData();
      formData.append('imageFile', docImg); // ✅ Must match backend
      formData.append("name", name);
      formData.append("speciality", speciality);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("degree", degree);
      formData.append("about", about);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            atoken,
           }
        }
      );

      if (data.success) {
        toast.success(data.message);
        setName("");
        setSpeciality("General physician");
        setPhone("");
        setEmail("");
        setPassword("");
        setAddress1("");
        setAddress2("");
        setExperience("1 Year");
        setFees("");
        setDegree("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[80%] mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Doctor</h2>

      <div className="bg-white p-6 md:p-10 rounded-lg border shadow-sm max-h-[80vh] overflow-y-auto">
        {/* Upload Image */}
        <div className="flex items-center gap-4 mb-6 text-gray-700">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 h-16 rounded-full object-cover border"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
          />
          <p className="text-sm">Upload Doctor Image</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 text-gray-700">
          {/* Left Inputs */}
          <div className="flex-1 flex flex-col gap-4">
            <Input label="Name" value={name} onChange={setName} />
            <Input label="Phone" value={phone} onChange={setPhone} />
            <Input label="Email" value={email} onChange={setEmail} />
            <Input label="Password" value={password} onChange={setPassword} type="password" />
            <Select
              label="Experience"
              value={experience}
              onChange={setExperience}
              options={[...Array(10)].map((_, i) => `${i + 1} Year`)}
            />
            <Input label="Fee" value={fees} onChange={setFees} type="number" />
          </div>

          {/* Right Inputs */}
          <div className="flex-1 flex flex-col gap-4">
            <Select
              label="Speciality"
              value={speciality}
              onChange={setSpeciality}
              options={[
                "General physician",
                "Gynecologist",
                "Dermatologist",
                "Pediatricians",
                "Neurologist",
                "Gastroenterologist",
              ]}
            />
            <Input label="Education" value={degree} onChange={setDegree} />
            <Input label="Address 1" value={address1} onChange={setAddress1} />
            <Input label="Address 2" value={address2} onChange={setAddress2} />
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About Doctor
          </label>
          <textarea
            placeholder="Enter Doctor About"
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition text-sm"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

// Reusable Input Component
const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={`Enter Doctor ${label}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Reusable Select Component
const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default AddDoctors;
