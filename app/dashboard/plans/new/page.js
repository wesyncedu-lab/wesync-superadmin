"use client";

import { savePlan } from "@/lib/planService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

export default function AddPlanPage() {
  const router = useRouter();

  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [schoolsAllowed, setSchoolsAllowed] = useState("");
  const [features, setFeatures] = useState("");

  const handleSave = () => {
    if (!planName || !price || !schoolsAllowed) {
      alert("Please fill all required fields");
      return;
    }

    savePlan({
      name: planName,
      price,
      schools: Number(schoolsAllowed),
      features: features.split(",").map((f) => f.trim()),
      active: true,
    });

    alert("Plan created successfully!");
    router.push("/dashboard/plans");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white border rounded-2xl shadow">

      <div className="flex items-center gap-3 mb-8">
        <FiPlusCircle className="text-blue-600 text-4xl" />
        <h1 className="text-3xl font-bold text-gray-800">Add New Plan</h1>
      </div>

      <div className="space-y-6">

        {/* Plan Name */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Plan Name *
          </label>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Ex: Standard, Premium"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Price (Monthly) *
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ex: ₹999/month"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Schools Allowed */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Schools Allowed *
          </label>
          <input
            type="number"
            value={schoolsAllowed}
            onChange={(e) => setSchoolsAllowed(e.target.value)}
            placeholder="Ex: 3, 10"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Features (Optional)
          </label>
          <textarea
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="Homework, Attendance, Fees, Transportation"
            className="w-full border p-3 h-32 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Save Plan
        </button>
      </div>
    </div>
  );
}
