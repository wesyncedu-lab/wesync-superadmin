"use client";

import { useParams, useRouter } from "next/navigation";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"];

export default function SchoolAnalyticsPage() {
  const { id } = useParams();
  const router = useRouter();

  // Dummy Data (Firebase later)
  const dailyUsage = [
    { day: "Mon", users: 40 },
    { day: "Tue", users: 55 },
    { day: "Wed", users: 50 },
    { day: "Thu", users: 65 },
    { day: "Fri", users: 90 },
    { day: "Sat", users: 30 },
  ];

  const moduleUsage = [
    { name: "Attendance", value: 85 },
    { name: "Homework", value: 60 },
    { name: "Fees", value: 40 },
    { name: "Messages", value: 30 },
  ];

  const monthlyFees = [
    { month: "Jan", amount: 45000 },
    { month: "Feb", amount: 52000 },
    { month: "Mar", amount: 61000 },
    { month: "Apr", amount: 58000 },
    { month: "May", amount: 76000 },
  ];

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">School Analytics</h1>

        <button
          onClick={() => router.push(`/dashboard/schools/${id}`)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Back
        </button>
      </div>

      {/* GRID WRAPPER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* 1) Daily Active Users */}
        <div className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-xl font-bold mb-4">Daily Active Users</h2>
          <LineChart width={500} height={260} data={dailyUsage}>
            <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={3} />
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        {/* 2) Module Usage Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-xl font-bold mb-4">Module Usage</h2>

          <PieChart width={500} height={260}>
            <Pie
              data={moduleUsage}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {moduleUsage.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* 3) Monthly Fee Collection */}
        <div className="bg-white p-6 rounded-2xl shadow border lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Fee Collection (Monthly)</h2>
          <BarChart width={800} height={280} data={monthlyFees}>
            <Bar dataKey="amount" fill="#22C55E" />
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </div>

      </div>
    </div>
  );
}
