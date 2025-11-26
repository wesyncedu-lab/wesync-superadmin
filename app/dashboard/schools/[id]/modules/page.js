"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";

export default function SchoolModulesSettings() {
  const { id } = useParams();

  const [modules, setModules] = useState({
    attendance: true,
    homework: true,
    fees: true,
    gatepass: false,
    timetable: true,
    noticeboard: true,
    messages: false,
    reportcard: true,
    certificate: false,
    assignment: true,
  });

  // 🔹 Dummy data load (replace with database later)
  useEffect(() => {
    // example: fetch school modules from Firebase
  }, []);

  const toggle = (key) => {
    setModules((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    alert("Modules Updated Successfully (Dummy for now)");
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white border rounded-2xl shadow">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-10">
        <FiSettings className="text-blue-600 text-4xl" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            App Modules Settings
          </h1>
          <p className="text-sm text-gray-500">
            Control which features are enabled for this school
          </p>
        </div>
      </div>

      {/* MODULE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {Object.keys(modules).map((key) => (
          <div
            key={key}
            className="flex items-center justify-between bg-gray-50 px-5 py-4 border rounded-xl hover:bg-gray-100 transition"
          >
            <span className="capitalize font-semibold text-gray-700">
              {key.replace(/([A-Z])/g, " $1")}
            </span>

            <button
              onClick={() => toggle(key)}
              className={`w-14 h-7 rounded-full flex items-center transition ${
                modules[key] ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <span
                className={`w-6 h-6 bg-white rounded-full shadow transform transition ${
                  modules[key] ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}

      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="mt-10 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
      >
        Save Settings
      </button>
    </div>
  );
}
