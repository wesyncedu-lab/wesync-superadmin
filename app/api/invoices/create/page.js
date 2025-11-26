"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiDownloadCloud, FiEye, FiSearch } from "react-icons/fi";

export default function InvoiceHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // MOCK DATA (Replace later with Firestore)
  useEffect(() => {
    setTimeout(() => {
      setInvoices([
        {
          id: "INV-1024",
          school: "Delhi Public School",
          email: "contact@dps.edu",
          date: "2025-01-14",
          amount: 999,
          status: "paid",
        },
        {
          id: "INV-1023",
          school: "Modern Academy",
          email: "admin@modern.edu",
          date: "2025-01-11",
          amount: 499,
          status: "pending",
        },
        {
          id: "INV-1022",
          school: "Little Flower School",
          email: "support@lfs.edu",
          date: "2024-12-22",
          amount: 1999,
          status: "overdue",
        },
      ]);
      setLoading(false);
    }, 300);
  }, []);

  function statusBadge(status) {
    const styles = {
      paid: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      overdue: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-3 py-1 text-sm rounded-full ${styles[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  }

  const filteredInvoices = invoices.filter((i) => {
    const matchFilter = filter === "all" ? true : i.status === filter;
    const matchSearch =
      i.school.toLowerCase().includes(search.toLowerCase()) ||
      i.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Invoices</h1>
            <p className="text-gray-500 text-sm mt-1">
              Complete billing history with filters & search
            </p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-72">
            <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search invoices..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border rounded-lg bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm border-b">
              <tr>
                <th className="py-3 px-5">Invoice ID</th>
                <th className="px-5">School</th>
                <th className="px-5">Date</th>
                <th className="px-5">Amount</th>
                <th className="px-5">Status</th>
                <th className="px-5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-400">
                    Loading invoices…
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-400">
                    No invoices found
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-5 font-medium">{inv.id}</td>
                    <td className="px-5">{inv.school}</td>
                    <td className="px-5">{format(new Date(inv.date), "dd MMM yyyy")}</td>
                    <td className="px-5 font-semibold">₹ {inv.amount}</td>
                    <td className="px-5">{statusBadge(inv.status)}</td>

                    <td className="px-5">
                      <div className="flex items-center gap-4 justify-center">

                        {/* View Button */}
                        <Link href={`/dashboard/invoices/${inv.id}`} className="text-blue-600 hover:underline flex items-center gap-1">
                          <FiEye size={16} /> View
                        </Link>

                        {/* Download PDF */}
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

/* PDF DOWNLOAD HANDLER (Connect with API later) */
async function downloadInvoice(invoiceId) {
  alert("PDF Download coming soon: " + invoiceId);
}
