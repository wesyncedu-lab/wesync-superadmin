"use client";

import { fetchPlans } from "@/lib/planService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchPlans();
      setPlans(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center text-gray-600">
        Loading plans…
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Plans</h1>
          <Link
            href="/dashboard/plans/new"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
          >
            + Create Plan
          </Link>
        </div>

        {/* PLANS TABLE */}
        <div className="bg-white shadow-sm rounded-xl border overflow-hidden">
          <table className="w-full text-left">
            <thead className="text-gray-500 text-sm border-b bg-gray-50">
              <tr>
                <th className="py-3 px-4">Plan Name</th>
                <th className="px-4">Price</th>
                <th className="px-4">Students</th>
                <th className="px-4">Storage</th>
                <th className="px-4">Modules</th>
                <th className="px-4">Status</th>
                <th className="px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {plans.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                  
                  <td className="py-3 px-4 font-medium">{p.name}</td>

                  <td className="px-4">₹ {p.price}/mo</td>

                  <td className="px-4">{p.students}</td>

                  <td className="px-4">{p.storage}</td>

                  <td className="px-4 text-sm text-gray-600">
                    {Array.isArray(p.modules)
                      ? p.modules.join(", ")
                      : "—"}
                  </td>

                  <td className="px-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        p.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-4">
                    <Link
                      href={`/dashboard/plans/${p.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
