"use client";

import { fetchPlan, updatePlan } from "@/lib/planService";
import { useEffect, useState } from "react";

export default function EditPlanPage({ params }) {
  const planId = params.id;

  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState({
    name: "",
    price: "",
    students: "",
    storage: "",
    modules: [],
  });

  const allModules = [
    "Attendance",
    "Homework",
    "Notice",
    "Fees",
    "Chat",
    "Transport",
    "Gallery",
    "Exams",
    "Messages",
    "Timetable",
  ];

  // Toggle module
  const toggleModule = (m) => {
    if (plan.modules.includes(m)) {
      setPlan({
        ...plan,
        modules: plan.modules.filter((x) => x !== m),
      });
    } else {
      setPlan({
        ...plan,
        modules: [...plan.modules, m],
      });
    }
  };

  // Fetch single plan
  useEffect(() => {
    async function load() {
      const data = await fetchPlan(planId);

      if (!data) {
        alert("Plan not found!");
        return;
      }

      setPlan({
        name: data.name,
        price: data.price,
        students: data.students,
        storage: data.storage,
        modules: data.modules || [],
      });

      setLoading(false);
    }

    load();
  }, [planId]);

  // Save
  async function saveChanges() {
    await updatePlan(planId, plan);
    alert("Plan updated successfully!");
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border">

        <h2 className="text-2xl font-semibold mb-6">
          Edit Plan — {planId}
        </h2>

        {/* Name */}
        <label className="block mb-2 font-medium">Plan Name</label>
        <input
          type="text"
          className="w-full border px-4 py-3 rounded-lg bg-gray-50 mb-4"
          value={plan.name}
          onChange={(e) => setPlan({ ...plan, name: e.target.value })}
        />

        {/* Price */}
        <label className="block mb-2 font-medium">Price (₹)</label>
        <input
          type="number"
          className="w-full border px-4 py-3 rounded-lg bg-gray-50 mb-4"
          value={plan.price}
          onChange={(e) => setPlan({ ...plan, price: Number(e.target.value) })}
        />

        {/* Students */}
        <label className="block mb-2 font-medium">Students Limit</label>
        <input
          type="text"
          className="w-full border px-4 py-3 rounded-lg bg-gray-50 mb-4"
          value={plan.students}
          onChange={(e) => setPlan({ ...plan, students: e.target.value })}
        />

        {/* Storage */}
        <label className="block mb-2 font-medium">Storage Limit</label>
        <input
          type="text"
          className="w-full border px-4 py-3 rounded-lg bg-gray-50 mb-4"
          value={plan.storage}
          onChange={(e) => setPlan({ ...plan, storage: e.target.value })}
        />

        {/* Modules */}
        <h3 className="font-medium mt-6 mb-2">Modules Included</h3>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {allModules.map((m) => (
            <label key={m} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={plan.modules.includes(m)}
                onChange={() => toggleModule(m)}
              />
              <span>{m}</span>
            </label>
          ))}
        </div>

        <button
          onClick={saveChanges}
          className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}
