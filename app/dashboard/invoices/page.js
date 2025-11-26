"use client";

import { fetchInvoices } from "@/lib/invoiceService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiDownloadCloud, FiEye } from "react-icons/fi";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchInvoices();
      setInvoices(data || []);
      setLoading(false);
    }
    load();
  }, []);

  function downloadInvoice(id) {
    window.open(`/api/invoices/${id}/pdf`, "_blank");
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* PAGE HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold">Invoices</h1>
          <Link
            href="/dashboard/invoices/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Create Invoice
          </Link>
        </div>

        {/* INVOICE TABLE */}
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b text-gray-600">
              <tr>
                <th className="p-3 text-left">Invoice ID</th>
                <th className="p-3 text-left">School</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Due</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    Loading invoices…
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No invoices found
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">{inv.id}</td>
                    <td className="p-3">{inv.schoolName || inv.schoolId}</td>

                    <td className="p-3 font-semibold">₹ {inv.amount}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          inv.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : inv.status === "unpaid"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>

                    <td className="p-3">{inv.dueDate ?? "-"}</td>

                    {/* ACTION BUTTONS */}
                    <td className="p-3">
                      <div className="flex justify-center gap-4">

                        {/* VIEW */}
                        <Link
                          href={`/dashboard/invoices/${inv.id}`}
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <FiEye size={16} /> View
                        </Link>

                        {/* DOWNLOAD PDF */}
                        <button
                          onClick={() => downloadInvoice(inv.id)}
                          className="text-green-600 hover:underline flex items-center gap-1"
                        >
                          <FiDownloadCloud size={16} /> PDF
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
