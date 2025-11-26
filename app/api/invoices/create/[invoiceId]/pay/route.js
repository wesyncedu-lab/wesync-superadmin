// app/api/invoices/[invoiceId]/pay/route.js
import { db } from "@/common/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(req, { params }) {
  try {
    const { invoiceId } = params;
    const body = await req.json();
    const { method, note } = body || {};

    if (!invoiceId) return new Response(JSON.stringify({ success: false, error: "Missing invoiceId" }), { status: 400 });

    const invoiceDoc = doc(db, "invoices", invoiceId);
    await updateDoc(invoiceDoc, {
      status: "Paid",
      paidOn: new Date().toISOString().slice(0, 10),
      paymentMethod: method || "Manual",
      note: note || "",
    });

    // Optionally create a payments record in payments collection (not required)
    // await addDoc(collection(db, "payments"), { invoiceId, schoolId, amount, method, timestamp: serverTimestamp() });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Mark paid error", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
