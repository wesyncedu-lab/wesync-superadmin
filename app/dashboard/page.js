// app/dashboard/page.js
"use client";
import { FiCheckCircle, FiTrendingUp, FiUsers } from "react-icons/fi";

export default function SuperAdminDashboard() {
  const stats = [
    { title: "Total Schools", value: 32, icon: <FiUsers />, color: "bg-blue-600" },
    { title: "Active Plans", value: 5, icon: <FiCheckCircle />, color: "bg-green-600" },
    { title: "Total Revenue", value: "₹ 2,45,000", icon: <FiTrendingUp />, color: "bg-purple-600" },
  ];

  const recentSchools = [
    { name: "Delhi Public School", city: "Delhi", plan: "Premium", status: "Active" },
    { name: "Modern Academy", city: "Lucknow", plan: "Standard", status: "Active" },
    { name: "Little Flower School", city: "Kolkata", plan: "Trial", status: "Pending" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg text-white flex items-center justify-center ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{s.title}</p>
                <p className="text-2xl font-bold mt-1">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold">Recent Schools</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">School</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Plan</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentSchools.map((r, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{r.name}</td>
                <td className="p-4">{r.city}</td>
                <td className="p-4">{r.plan}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${r.status === "Active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
