"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";

export default function EditSchoolPage() {
  const { id } = useParams();
  const router = useRouter();

  const [school, setSchool] = useState({
    name: "",
    address: "",
    city: "",
    email: "",
    phone: "",
    plan: "",
    status: "",
  });

  // 🌍 Dummy existing data (Firebase add later)
  useEffect(() => {
    setSchool({
      name: "Green Valley Public School",
      address: "Sector 22, Noida",
      city: "Noida",
      email: "contact@gvschool.com",
      phone: "+91 9876543210",
      plan: "Standard",
      status: "Active",
    });
  }, [id]);

  const handleChange = (key, value) => {
    setSchool((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    alert("School Updated Successfully (Demo)");
    router.push(`/dashboard/schools/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md border">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          onClick={() => router.back()}
        >
          <FiArrowLeft />
        </button>

        <h1 className="text-3xl font-bold text-gray-900">
          Edit School Details
        </h1>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* School Name */}
        <div>
          <label className="block mb-1 font-semibold">School Name</label>
          <input
            type="text"
            value={school.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-semibold">City</label>
          <input
            type="text"
            value={school.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Address</label>
          <input
            type="text"
            value={school.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={school.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="text"
            value={school.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Plan */}
        <div>
          <label className="block mb-1 font-semibold">Assigned Plan</label>
          <select
            value={school.plan}
            onChange={(e) => handleChange("plan", e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            value={school.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
      >
        <FiSave className="text-lg" />
        Save Changes
      </button>

    </div>
  );
}
