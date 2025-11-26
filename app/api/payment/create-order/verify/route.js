import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
  const { amount, invoiceId, schoolName } = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: invoiceId,
    notes: { school: schoolName },
  });

  return NextResponse.json(order);
}
