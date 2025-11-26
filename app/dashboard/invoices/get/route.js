import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Invoice ID missing" },
        { status: 400 }
      );
    }

    const snap = await getDoc(doc(db, "invoices", id));

    if (!snap.exists()) {
      return NextResponse.json(
        { success: false, error: "Invoice not found" },
        { status: 404 }
      );
    }

    const invoice = snap.data();

    return NextResponse.json({
      success: true,
      id,
      ...invoice,
    });

  } catch (error) {
    console.error("Invoice Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
