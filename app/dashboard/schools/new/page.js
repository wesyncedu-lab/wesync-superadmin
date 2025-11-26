"use client";

import { useState } from "react";

export default function NewSchoolPage() {
  const [schoolName, setSchoolName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [planId, setPlanId] = useState("");

  function generateSubdomain(name) {
    return name.toLowerCase().replace(/ /g, "") + ".wesync.app";
  }

  return (
    <div className="w-full min-h-screen p-10 bg-[#f5f7fb] flex justify-center">
      
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-10 border border-gray-200">
        
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          🚀 Create New School
        </h2>

        {/* TWO COLUMN FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* School Name */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">School Name</label>
            <input
              type="text"
              className="border px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Ex: Delhi Public School"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </div>

          {/* School Email */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">School Email</label>
            <input
              type="email"
              className="border px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="example@school.com"
              value={schoolEmail}
              onChange={(e) => setSchoolEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">Phone Number</label>
            <input
              type="text"
              className="border px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">City</label>
            <input
              type="text"
              className="border px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Mumbai / Delhi / Lucknow"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Address (full width) */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-1 text-gray-700">Address</label>
            <input
              type="text"
              className="border px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="School full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Subdomain */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">School Subdomain</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="border px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none w-full"
                placeholder="dps.wesync.app"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setSubdomain(generateSubdomain(schoolName))}
                className="px-4 rounded-lg bg-blue-600 text-white font-semibold"
              >
                Auto
              </button>
            </div>
          </div>

          {/* Plan Dropdown */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">Assign Plan</label>
            <select
              className="border px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
            >
              <option value="">Select Plan</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>

        </div>

        {/* Submit Button */}
        <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg shadow-md">
          Create School
        </button>
      </div>
    </div>
  );
}
