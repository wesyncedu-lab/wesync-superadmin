"use client";

import { useEffect, useState } from "react";

import ActivityList from "@/components/ActivityList";
import KpiCard from "@/components/KpiCard";
import PlanBarChart from "@/components/PlanBarChart";
import RevenueChart from "@/components/RevenueChart";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  // --- MOCK DATA (Replace later with Firestore or API) ---
  const kpis = [
    { title: "Monthly Recurring Revenue", value: "₹ 1,25,000", subtitle: "MRR (This month)", growth: "+12%" },
    { title: "Active Schools", value: "32", subtitle: "Active subscriptions", growth: "+3" },
    { title: "New This Month", value: "6", subtitle: "New schools signed", growth: "+50%" },
    { title: "Pending Dues", value: "₹ 18,400", subtitle: "Outstanding invoices", growth: "-8%" },
  ];

  const revenueSeries = {
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [42000, 52000, 56000, 75000, 92000, 105000, 125000],
  };

  const planDistribution = {
    labels: ["Trial", "Basic", "Standard", "Premium"],
    data: [5, 12, 8, 7],
  };

  const activities = [
    { id: 1, text: "Payment of ₹10,000 received from Delhi Public School", time: "2 hours ago" },
    { id: 2, text: "New school registered: Evergreen Academy", time: "1 day ago" },
    { id: 3, text: "Invoice #INV-102 marked overdue", time: "2 days ago" },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1400px] mx-auto">

        {/* HEADER */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Overview of subscriptions, revenue and activity</p>
          </div>

          <div className="flex gap-3 items-center">
            <button className="px-4 py-2 rounded-lg bg-white border shadow-sm text-sm">
              Export
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm">
              Create Invoice
            </button>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((k) => <KpiCard key={k.title} {...k} />)}
        </div>

        {/* CHARTS + SIDE PANEL */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* CHARTS LEFT */}
          <div className="xl:col-span-2 space-y-6">

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <RevenueChart labels={revenueSeries.labels} data={revenueSeries.data} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <PlanBarChart labels={planDistribution.labels} data={planDistribution.data} />
            </div>

          </div>

          {/* RIGHT SIDE PANEL */}
          <div className="space-y-6">

            {/* Billing Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Billing Summary</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between"><span>Invoices (Open)</span><strong>12</strong></div>
                <div className="flex justify-between"><span>Amount Due</span><strong>₹ 18,400</strong></div>
                <div className="flex justify-between"><span>Payments this month</span><strong>₹ 1,25,000</strong></div>
                <div className="flex justify-between"><span>Refunds</span><strong>₹ 0</strong></div>
              </div>
            </div>

            <ActivityList items={activities} />

          </div>
        </div>

        {/* RECENT SCHOOLS TABLE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border mt-6">
          <h3 className="text-lg font-semibold mb-4">Recent Schools</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3">School</th>
                  <th>City</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Next Renewal</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-3">Delhi Public School</td>
                  <td>Delhi</td>
                  <td>Premium</td>
                  <td><span className="px-3 py-1 rounded-full bg-green-50 text-green-700">Active</span></td>
                  <td>2026-01-10</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Modern Academy</td>
                  <td>Lucknow</td>
                  <td>Standard</td>
                  <td><span className="px-3 py-1 rounded-full bg-green-50 text-green-700">Active</span></td>
                  <td>2026-03-01</td>
                </tr>

                <tr>
                  <td className="py-3">Little Flower School</td>
                  <td>Kolkata</td>
                  <td>Trial</td>
                  <td><span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700">Pending</span></td>
                  <td>—</td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
