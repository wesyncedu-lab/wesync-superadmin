"use client";

import { db } from "@/common/firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function EditSchoolPage({ params }) {
  const { id } = params;

  const [loading, setLoading] = useState(true);

  const [schoolName, setSchoolName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [planId, setPlanId] = useState("");

  const [features, setFeatures] = useState([]);

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

  function toggleFeature(item) {
    if (features.includes(item)) {
      setFeatures(features.filter((f) => f !== item));
    } else {
      setFeatures([...features, item]);
    }
  }

  function generateSubdomain(name) {
    return (
      name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-") + ".wesync.cc"
    );
  }

  // Load data from Firestore
  useEffect(() => {
    async function loadSchool() {
      const ref = doc(db, "schools", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("School not found!");
        return;
      }

      const data = snap.data();

      setSchoolName(data.name || "");
      setSchoolEmail(data.email || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
      setCity(data.city || "");
      setSubdomain(data.subdomain || "");
      setPlanId(data.plan || "");
      setFeatures(data.features || []);

      setLoading(false);
    }

    loadSchool();
  }, [id]);

  // Auto apply plan → features
  useEffect(() => {
    if (planId && features.length === 0) {
      setFeatures(featureSets[planId]);
    }
  }, [planId]);

  const updateSchool = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "schools", id), {
      name: schoolName,
      email: schoolEmail,
      phone,
      city,
      address,
      subdomain,
      plan: planId,
      features,
      updatedAt: new Date(),
    });

    alert("School updated successfully!");
    window.location.href = "/dashboard/schools/" + id;
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg text-gray-600">
        Loading school details…
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gradient-to-b from-[#eef3ff] to-[#f9fbff] flex justify-center">

      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl shadow-[0_15px_60px_rgba(0,0,0,0.08)] rounded-2xl p-10 border border-white/40">

        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          📝 Edit School
        </h1>

        <form onSubmit={updateSchool} className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* SCHOOL NAME */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">School Name *</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">School Email *</label>
            <input
              type="email"
              value={schoolEmail}
              onChange={(e) => setSchoolEmail(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PHONE */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Phone Number *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* CITY */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">City *</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ADDRESS */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-medium mb-1 text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SUBDOMAIN */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Subdomain *</label>

            <div className="flex gap-2">
              <input
                type="text"
                value={subdomain}
                readOnly
                className="px-4 py-3 rounded-lg border bg-gray-100 text-gray-500 w-full"
              />

              <button
                type="button"
                onClick={() => setSubdomain(generateSubdomain(schoolName))}
                className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Auto
              </button>
            </div>
          </div>

          {/* PLAN */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Plan *</label>
            <select
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              className="px-4 py-3 rounded-lg border bg-white/60 focus:ring-2 focus:ring-blue-500"
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
                  <span>{f}</span>
                </label>
              ))}

            </div>
          </div>

          {/* UPDATE BUTTON */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-lg transition"
            >
              Update School
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
