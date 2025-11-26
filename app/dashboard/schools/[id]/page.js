"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBarChart2,
  FiCalendar,
  FiEdit,
  FiMapPin,
  FiUser
} from "react-icons/fi";

export default function SchoolViewPage() {
  const { id } = useParams();

  const [school, setSchool] = useState(null);

  // ---- Temporary Dummy Data (Later replace with Firebase) ----
  useEffect(() => {
    setSchool({
      id,
      name: "Green Valley Public School",
      address: "Sector 22, Noida",
      city: "Noida",
      phone: "+91 9876543210",
      email: "contact@gvschool.com",
      plan: "Standard",
      createdOn: "12 Jan 2024",
      students: 850,
      teachers: 42,
      status: "Active",
    });
  }, [id]);

  if (!school) return <p>Loading...</p>;

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{school.name}</h1>

        <button className="px-4 py-2 bg-blue-600 rounded-lg text-white flex items-center gap-2 shadow">
          <FiEdit /> Edit School
        </button>
      </div>

      {/* TOP INFO CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-white border p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">School Info</h3>

          <div className="space-y-3 text-gray-700">
            <p className="flex items-center gap-2">
              <FiUser /> {school.name}
            </p>
            <p className="flex items-center gap-2">
              <FiMapPin /> {school.address}, {school.city}
            </p>
            <p className="flex items-center gap-2">
              📞 {school.phone}
            </p>
            <p className="flex items-center gap-2">
              ✉️ {school.email}
            </p>
          </div>
        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Plan Details</h3>

          <p className="text-xl font-semibold text-blue-600">{school.plan}</p>
          <p className="text-gray-600 mt-2 flex items-center gap-2">
            <FiCalendar /> Created on: {school.createdOn}
          </p>

          <button className="mt-4 px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-50 transition">
            Change Plan
          </button>
        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Status</h3>

          <p
            className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
              school.status === "Active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {school.status}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <p className="text-xl font-bold">{school.students}</p>
            <span className="text-gray-600">Students</span>
          </div>

          <div className="mt-2 flex items-center gap-4">
            <p className="text-xl font-bold">{school.teachers}</p>
            <span className="text-gray-600">Teachers</span>
          </div>
        </div>

      </div>

      {/* ANALYTICS SECTION */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
          <FiBarChart2 /> Analytics Overview
        </h3>

        <p className="text-gray-500 mb-4">
          (Charts will be added in next task — usage, login stats, module heatmap)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 border rounded-lg text-center">📌 Daily Active Users</div>
          <div className="p-5 border rounded-lg text-center">📌 Module Usage</div>
          <div className="p-5 border rounded-lg text-center">📌 Fee Collection Impact</div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-10">
        <button className="px-5 py-2 bg-red-600 text-white rounded-lg shadow">
          Suspend School
        </button>
        <button className="px-5 py-2 bg-gray-600 text-white rounded-lg shadow">
          Delete School
        </button>
      </div>

    </div>
  );
}
