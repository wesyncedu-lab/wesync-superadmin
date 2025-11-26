import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    await sendPasswordResetEmail(auth, email);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
