"use client";

import { getPlanByIndex, updatePlan } from "@/lib/planService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

export default function EditPlanPage() {
  const router = useRouter();
  const { id } = useParams();

  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const data = getPlanByIndex(id);
    setPlan(data);
  }, [id]);

  if (!plan) return <p>Loading...</p>;

  const handleSave = () => {
    updatePlan(id, plan);
    alert("Plan updated successfully!");
    router.push("/dashboard/plans");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white border rounded-2xl shadow">
      <div className="flex items-center gap-3 mb-8">
        <FiEdit className="text-blue-600 text-4xl" />
        <h1 className="text-3xl font-bold text-gray-800">Edit Plan</h1>
      </div>

      {/* INPUT FIELDS */}
      <div className="space-y-6">

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Plan Name</label>
          <input
            className="w-full border p-3 rounded-lg"
            value={plan.name}
            onChange={(e) => setPlan({ ...plan, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Price</label>
          <input
            className="w-full border p-3 rounded-lg"
            value={plan.price}
            onChange={(e) => setPlan({ ...plan, price: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Schools Allowed</label>
          <input
            type="number"
            className="w-full border p-3 rounded-lg"
            value={plan.schools}
            onChange={(e) => setPlan({ ...plan, schools: Number(e.target.value) })}
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
