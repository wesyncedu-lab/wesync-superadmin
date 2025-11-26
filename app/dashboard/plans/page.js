"use client";

import { deletePlan, getPlans } from "@/lib/planService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEdit, FiLayers, FiPlus, FiTrash2 } from "react-icons/fi";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setPlans(getPlans());
  }, []);

  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      deletePlan(index);
      setPlans(getPlans()); // refresh UI
    }
  };

  return (
    <div className="p-2">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <FiLayers className="text-blue-600 text-4xl" /> Plans
        </h1>

        <Link
          href="/dashboard/plans/new"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg flex items-center gap-2 shadow hover:bg-blue-700 transition"
        >
          <FiPlus className="text-lg" /> Add New Plan
        </Link>
      </div>

      {/* PLAN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, index) => (
          <div
            key={index}
            className="p-6 bg-white border shadow-md rounded-2xl hover:shadow-xl transition-all group"
          >
            <h2 className="text-2xl font-bold group-hover:text-blue-600 transition">
              {p.name}
            </h2>

            <p className="text-4xl font-extrabold text-blue-600 mt-3">
              {p.price}
            </p>

            <p className="text-gray-600 mt-2 text-sm">
              {p.schools} school{p.schools > 1 ? "s" : ""}
            </p>

            {/* STATUS */}
            <span
              className={`inline-block mt-5 px-3 py-1 rounded-full text-xs font-semibold ${
                p.active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {p.active ? "Active" : "Inactive"}
            </span>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-4 mt-6">
              <Link
                href={`/dashboard/plans/${index}/edit`}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <FiEdit /> Edit
              </Link>

              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 hover:underline flex items-center gap-1"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
