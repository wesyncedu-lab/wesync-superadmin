"use client";

import { db } from "@/common/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function NewSchoolPage() {
  const [schoolName, setSchoolName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [planId, setPlanId] = useState("");

  const [features, setFeatures] = useState([]);

  // PLAN → FEATURES
  const featureSets = {
    basic: ["Attendance", "Notices"],
    standard: ["Attendance", "Homework", "Notices", "Gallery", "Fees"],
    premium: [
      "Attendance",
      "Homework",
      "Fees",
      "Gallery",
      "Notices",
      "Transport",
      "Exams",
      "Messages",
      "Timetable",
    ],
  };

  // Auto select features based on plan
  useEffect(() => {
    if (planId) {
      setFeatures(featureSets[planId]);
    }
  }, [planId]);

  // Toggle individual feature
  function toggleFeature(item) {
    if (features.includes(item)) {
      setFeatures(features.filter((f) => f !== item));
    } else {
      setFeatures([...features, item]);
    }
  }

  // Auto domain generator
  function generateSubdomain(name) {
    return (
      name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-") + ".wesync.cc"
    );
  }

  // Auto generate domain when typing school name
  useEffect(() => {
    if (schoolName.trim().length > 2) {
      setSubdomain(generateSubdomain(schoolName));
    }
  }, [schoolName]);

  // Submit form
  const createSchool = async (e) => {
    e.preventDefault();

    if (!schoolName || !schoolEmail || !phone || !city || !planId) {
      alert("Please fill all required fields.");
      return;
    }

    await addDoc(collection(db, "schools"), {
      name: schoolName,
      email: schoolEmail,
      phone,
      city,
      address,
      subdomain,
      plan: planId,
      features,
      createdAt: serverTimestamp(),
    });

    alert("School created successfully!");
    window.location.href = "/dashboard/schools";
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-b from-[#eef3ff] to-[#f9fbff] flex justify-center">

      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl shadow-[0_15px_60px_rgba(0,0,0,0.08)] rounded-2xl p-10 border border-white/40">

        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          🎓 Create New School
        </h1>

        <form onSubmit={createSchool} className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* SCHOOL NAME */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">School Name *</label>
            <input
              type="text"
              placeholder="Ex: Delhi Public School"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">School Email *</label>
            <input
              type="email"
              placeholder="contact@school.com"
              value={schoolEmail}
              onChange={(e) => setSchoolEmail(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PHONE */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Phone Number *</label>
            <input
              type="text"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* CITY */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">City *</label>
            <input
              type="text"
              placeholder="Delhi / Mumbai / Lucknow"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ADDRESS */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-medium mb-1 text-gray-700">Address</label>
            <input
              type="text"
              placeholder="Full school address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SUBDOMAIN */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Subdomain *</label>
            <input
              type="text"
              value={subdomain}
              readOnly
              className="px-4 py-3 rounded-lg border bg-gray-100 text-gray-500"
            />
          </div>

          {/* PLAN SELECT */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Assign Plan *</label>
            <select
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Plan</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          {/* FEATURES */}
          <div className="md:col-span-2">
            <label className="font-medium mb-2 text-gray-700">Enabled Features</label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl border">

              {[
                "Attendance",
                "Homework",
                "Fees",
                "Gallery",
                "Notices",
                "Transport",
                "Exams",
                "Messages",
                "Timetable",
              ].map((f) => (
                <label key={f} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={features.includes(f)}
                    onChange={() => toggleFeature(f)}
                  />
                  <span className="text-gray-700">{f}</span>
                </label>
              ))}

            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-lg transition"
            >
              Create School
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
