"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiDownloadCloud } from "react-icons/fi";

export default function InvoiceViewPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch invoice from Firestore API (you already have invoiceService)
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/invoices/get?id=${id}`);
      const data = await res.json();
      setInvoice(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  // Download PDF
  function downloadInvoice() {
    window.open(`/api/invoices/${id}/pdf`, "_blank");
  }

  // Razorpay Payment
  async function payNow() {
    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      body: JSON.stringify({
        invoiceId: id,
        amount: invoice.amount,
        schoolName: invoice.schoolName,
      }),
    });

    const data = await res.json();
    const order = data.order;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "WeSync Billing",
      description: `Invoice Payment - ${id}`,
      order_id: order.id,
      handler: function (response) {
        alert("Payment successful! Refresh page to update invoice status.");
      },
      theme: {
        color: "#2563eb",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading invoice...</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-6">
        <p>Invoice not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-sm border p-8 rounded-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Invoice #{id}</h1>

          <button
            onClick={downloadInvoice}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <FiDownloadCloud /> Download PDF
          </button>
        </div>

        {/* STATUS */}
        <div className="mb-6">
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              invoice.status === "paid"
                ? "bg-green-100 text-green-700"
                : invoice.status === "unpaid"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {invoice.status.toUpperCase()}
          </span>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-6 text-gray-700 mb-8">
          <div>
            <p className="font-medium">School:</p>
            <p>{invoice.schoolName}</p>
          </div>

          <div>
            <p className="font-medium">Email:</p>
            <p>{invoice.schoolEmail}</p>
          </div>

          <div>
            <p className="font-medium">Amount:</p>
            <p className="font-semibold">₹ {invoice.amount}</p>
          </div>

          <div>
            <p className="font-medium">Due Date:</p>
            <p>{invoice.dueDate || "—"}</p>
          </div>

          <div>
            <p className="font-medium">Created:</p>
            <p>{invoice.date}</p>
          </div>

          <div>
            <p className="font-medium">Payment ID:</p>
            <p>{invoice.paymentId || "—"}</p>
          </div>
        </div>

        {/* Pay Button */}
        {invoice?.status !== "paid" && (
          <button
            onClick={payNow}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700"
          >
            Pay Now
          </button>
        )}

        {invoice?.status === "paid" && (
          <div className="w-full py-3 rounded-lg bg-green-600 text-white text-center font-semibold text-lg">
            Paid Successfully
          </div>
        )}

      </div>
    </div>
  );
}
