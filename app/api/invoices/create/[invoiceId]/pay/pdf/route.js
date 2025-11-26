import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET(req, { params }) {
  try {
    const id = params.invoiceId;

    // 1. FETCH INVOICE DATA
    const snap = await getDoc(doc(db, "invoices", id));
    if (!snap.exists()) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const invoice = snap.data();

    // 2. CREATE PDF STREAM
    const pdfDoc = new PDFDocument({ margin: 40 });
    let chunks = [];
    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.on("end", () => {});

    // 3. BUILD PDF CONTENT
    pdfDoc.fontSize(24).text("INVOICE", { align: "center" });
    pdfDoc.moveDown();

    pdfDoc.fontSize(14).text(`Invoice ID: ${id}`);
    pdfDoc.text(`School: ${invoice.schoolName}`);
    pdfDoc.text(`Email: ${invoice.schoolEmail}`);
    pdfDoc.text(`Date: ${invoice.date}`);
    pdfDoc.moveDown();

    pdfDoc.fontSize(16).text("Billing Details", { underline: true });
    pdfDoc.moveDown(0.5);

    pdfDoc.fontSize(14).text(`Plan: ${invoice.plan}`);
    pdfDoc.text(`Amount: ₹ ${invoice.amount}`);
    pdfDoc.text(`Status: ${invoice.status.toUpperCase()}`);
    pdfDoc.moveDown();

    // FOOTER
    pdfDoc.moveDown(2);
    pdfDoc.fontSize(12).fillColor("gray");
    pdfDoc.text("Thanks for choosing WeSync!", { align: "center" });

    pdfDoc.end();

    // 4. RETURN PDF FILE
    return new NextResponse(Buffer.concat(chunks), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${id}.pdf"`,
      },
    });
  } catch (err) {
    console.log("PDF Error → ", err);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
