"use client";

import { useState } from "react";

export default function CreatePlanPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [students, setStudents] = useState("");
  const [storage, setStorage] = useState("");
  const [modules, setModules] = useState([]);

  const toggleModule = (m) => {
    if (modules.includes(m)) {
      setModules(modules.filter((x) => x !== m));
    } else {
      setModules([...modules, m]);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h2 className="text-2xl font-semibold mb-6">Create New Plan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block font-medium mb-1">Plan Name</label>
            <input
              type="text"
              className="w-full border px-4 py-3 rounded-lg bg-gray-50"
              placeholder="Premium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price (Monthly)</label>
            <input
              type="number"
              className="w-full border px-4 py-3 rounded-lg bg-gray-50"
              placeholder="₹ 999"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Students Limit</label>
            <input
              type="text"
              className="w-full border px-4 py-3 rounded-lg bg-gray-50"
              placeholder="Unlimited"
              value={students}
              onChange={(e) => setStudents(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Storage Limit</label>
            <input
              type="text"
              className="w-full border px-4 py-3 rounded-lg bg-gray-50"
              placeholder="100 GB"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
            />
          </div>

        </div>

        <h3 className="font-medium mt-6 mb-2">Modules Included</h3>

        <div className="grid grid-cols-2 gap-3">
          {["Attendance", "Homework", "Notice", "Fees", "Chat", "Transport"].map(
            (m) => (
              <label key={m} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={modules.includes(m)}
                  onChange={() => toggleModule(m)}
                />
                <span>{m}</span>
              </label>
            )
          )}
        </div>

        <button className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg">
          Save Plan
        </button>
      </div>
    </div>
  );
}
