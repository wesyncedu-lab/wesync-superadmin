import { db } from "@/lib/firebase";
import crypto from "crypto";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");
  const secret = process.env.RAZORPAY_KEY_SECRET;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json({ status: "Invalid signature" }, { status: 400 });
  }

  const data = JSON.parse(body);
  const payment = data.payload.payment.entity;

  // Extract invoiceId (receipt)
  const invoiceId = payment.notes?.invoice_id || payment.order_id;

  // Update Firestore invoice
  await updateDoc(doc(db, "invoices", invoiceId), {
    status: "paid",
    paymentId: payment.id,
    paidAt: new Date().toISOString(),
  });

  return NextResponse.json({ status: "Payment verified" });
}
