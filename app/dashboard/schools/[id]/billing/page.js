// app/dashboard/schools/[id]/billing/page.js
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiCreditCard, FiDownload } from "react-icons/fi";

/**
 * Billing page (client-side) — fetches from server API routes
 *
 * NOTE: Change LOGO_URL to your public path if you move the logo to /public.
 * The uploaded file path (system) is used here and will be converted by the dev infra.
 */
const LOGO_URL = "sandbox:/mnt/data/22a648fe-9de3-4059-b476-7170da1a0bbd.png";

export default function SchoolBillingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [overview, setOverview] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadData() {
    setLoading(true);
    try {
      // fetch invoices for school
      const invRes = await fetch(`/api/invoices/school/${id}`);
      const invJson = await invRes.json();

      // for demo: create overview from fetched data
      setInvoices(invJson.invoices || []);

      // fetch payments (payments are stored inside invoice doc in this design;
      // for separate collection create /api/payments endpoints)
      const paid = (invJson.invoices || [])
        .filter((i) => i.status === "Paid")
        .map((i) => ({ id: `PAY-${i.id}`, date: i.paidOn || i.paidAt, amount: i.amount, method: i.paymentMethod || "N/A", note: i.note || "" }));

      setPayments(paid);

      // overview: use invoice/plan metadata stored on school's doc (optional)
      // fallback demo:
      setOverview({
        plan: invJson.schoolInfo?.plan || "Standard",
        price: invJson.schoolInfo?.price || "₹999 / month",
        nextRenewal: invJson.schoolInfo?.nextRenewal || "2025-02-10",
        status: invJson.schoolInfo?.status || "Active",
        gateway: invJson.schoolInfo?.gateway || "Razorpay (not configured)",
      });
    } catch (err) {
      console.error("Load billing error", err);
      alert("Failed to load billing data. See console.");
    } finally {
      setLoading(false);
    }
  }

  const totalDue = useMemo(
    () =>
      invoices
        .filter((inv) => inv.status !== "Paid")
        .reduce((s, inv) => s + (inv.amount || 0), 0),
    [invoices]
  );

  const handleDownloadInvoice = (inv) => {
    // Create printable HTML: uses LOGO_URL as <img src>
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Invoice ${inv.id}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 30px; color: #111827; }
            .header { display:flex; align-items:center; gap:20px; }
            .logo img { max-width:140px; max-height:70px; object-fit:contain; }
            .meta { margin-left:auto; text-align:right; }
            .card { margin-top:20px; border:1px solid #E5E7EB; padding:20px; border-radius:8px; }
            .table { width:100%; margin-top:10px; border-collapse:collapse; }
            .table th, .table td { padding:10px 8px; border-bottom:1px solid #F3F4F6; text-align:left; }
            .right { text-align:right; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo"><img src="${LOGO_URL}" alt="logo" /></div>
            <div class="meta">
              <div><strong>Invoice</strong></div>
              <div>ID: ${inv.id}</div>
              <div>Issued: ${inv.issuedOn}</div>
            </div>
          </div>

          <div class="card">
            <h3>Bill To</h3>
            <div>School ID: ${id}</div>
            <div>Month: ${inv.month}</div>

            <table class="table">
              <thead><tr><th>Description</th><th class="right">Amount</th></tr></thead>
              <tbody>
                <tr><td>Subscription — ${overview?.plan || "Plan"}</td><td class="right">₹${inv.amount}</td></tr>
                <tr><td><strong>Total</strong></td><td class="right"><strong>₹${inv.amount}</strong></td></tr>
              </tbody>
            </table>

            <div style="margin-top:18px; font-size:12px; color:#6B7280">
              This is a system generated invoice. For questions contact support.
            </div>
          </div>

          <script>
            setTimeout(() => { window.print(); }, 350);
          </script>
        </body>
      </html>
    `;

    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) {
      alert("Popup blocked. Allow popups to download invoice.");
      return;
    }
    win.document.write(html);
    win.document.close();
  };

  const handlePayNow = async (invoiceId) => {
    if (!confirm("Simulate payment for invoice " + invoiceId + "?")) return;
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: "Manual", note: "Simulated by SuperAdmin" }),
      });
      const json = await res.json();
      if (json.success) {
        alert("Marked Paid");
        loadData();
      } else {
        alert("Failed: " + (json.error || "unknown"));
      }
    } catch (e) {
      console.error(e);
      alert("Payment simulation failed");
    }
  };

  const handleGenerateInvoice = async () => {
    const month = prompt("Invoice month (e.g. Mar 2025):");
    if (!month) return;
    const amountStr = prompt("Amount (number only):", "999");
    const amount = Number(amountStr || 0);
    if (!amount) return alert("Invalid amount");
    try {
      const res = await fetch(`/api/invoices/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId: id,
          month,
          amount,
          note: "Created by SuperAdmin",
        }),
      });
      const json = await res.json();
      if (json.success) {
        alert("Invoice created: " + json.invoiceId);
        loadData();
      } else {
        alert("Create failed: " + (json.error || "unknown"));
      }
    } catch (e) {
      console.error(e);
      alert("Create invoice failed");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push(`/dashboard/schools/${id}`)} className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
            <FiChevronLeft />
          </button>
          <h1 className="text-2xl font-bold">Billing & Invoices — School {id}</h1>
        </div>

        <div className="text-sm text-gray-600">Payment Gateway: {overview?.gateway || "—"}</div>
      </div>

      {/* Billing Overview */}
      <div className="bg-white p-6 rounded-xl shadow border flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Current Plan</div>
          <div className="text-lg font-bold">{overview?.plan} • {overview?.price}</div>
          <div className="text-sm text-gray-500 mt-1">Next Renewal: {overview?.nextRenewal}</div>
        </div>

        <div className="text-right">
          <div className={`inline-block px-3 py-1 rounded-full ${overview?.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {overview?.status}
          </div>
          <div className="mt-3 text-sm text-gray-500">Outstanding: <strong>₹{totalDue}</strong></div>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Invoices</h2>

          <div className="flex items-center gap-3">
            <button onClick={handleGenerateInvoice} className="px-3 py-1 bg-blue-600 text-white rounded-md">Generate Invoice</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="p-3 text-left">Invoice</th>
                <th className="p-3 text-left">Month</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Issued</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{inv.id}</td>
                  <td className="p-3">{inv.month}</td>
                  <td className="p-3">₹{inv.amount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${inv.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {inv.status}
                    </span>
                    {inv.paidOn && <div className="text-xs text-gray-400 mt-1">Paid: {inv.paidOn}</div>}
                  </td>
                  <td className="p-3">{inv.issuedOn}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {inv.status !== "Paid" && (
                        <button onClick={() => handlePayNow(inv.id)} className="px-3 py-1 bg-green-600 text-white rounded-md flex items-center gap-2">
                          <FiCreditCard /> Pay Now
                        </button>
                      )}

                      <button onClick={() => handleDownloadInvoice(inv)} className="px-3 py-1 border rounded-md flex items-center gap-2">
                        <FiDownload /> Download
                      </button>

                      {inv.status !== "Paid" && (
                        <button onClick={() => handlePayNow(inv.id)} className="px-3 py-1 border rounded-md text-sm">
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && <tr><td className="p-3" colSpan={6}>No invoices found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payments history */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h3 className="font-semibold mb-4">Payment History</h3>

        <div className="space-y-3">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.method} • ₹{p.amount}</div>
                <div className="text-xs text-gray-500">{p.date} — {p.note}</div>
              </div>
              <div className="text-sm text-gray-500">{p.id}</div>
            </div>
          ))}
          {payments.length === 0 && <div className="text-sm text-gray-500">No payments yet.</div>}
        </div>
      </div>
    </div>
  );
}
