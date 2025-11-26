// app/api/invoices/create/route.js
import { db } from "@/common/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { schoolId, month, amount, note } = body;
    if (!schoolId || !month || !amount) {
      return new Response(JSON.stringify({ success: false, error: "Missing fields" }), { status: 400 });
    }

    const invoiceRef = await addDoc(collection(db, "invoices"), {
      schoolId,
      month,
      amount,
      status: "Pending",
      issuedOn: new Date().toISOString().slice(0, 10),
      createdAt: serverTimestamp(),
      note: note || "",
    });

    return new Response(JSON.stringify({ success: true, invoiceId: invoiceRef.id }), { status: 200 });
  } catch (error) {
    console.error("Create invoice error", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
