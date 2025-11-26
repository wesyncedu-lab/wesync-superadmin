import { sendInvoiceEmail } from "@/lib/email";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      invoiceId,
      schoolEmail,
      schoolName,
      amount,
      date,
      items,
    } = data;

    // --- Create PDF ---
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 760;

    page.drawText("WeSync — Invoice", {
      x: 50,
      y,
      size: 26,
      font,
      color: rgb(0.2, 0.4, 1),
    });

    y -= 40;
    page.drawText(`Invoice ID: ${invoiceId}`, { x: 50, y, size: 12, font });
    y -= 20;
    page.drawText(`School: ${schoolName}`, { x: 50, y, size: 12, font });
    y -= 20;
    page.drawText(`Date: ${date}`, { x: 50, y, size: 12, font });

    y -= 40;
    page.drawText("Charges", { x: 50, y, size: 16, font });

    y -= 30;
    items.forEach((item) => {
      page.drawText(item.title, { x: 50, y, size: 12, font });
      page.drawText(`₹ ${item.amount}`, { x: 450, y, size: 12, font });
      y -= 20;
    });

    y -= 30;
    page.drawText("Total:", { x: 50, y, size: 14, font });
    page.drawText(`₹ ${amount}`, { x: 450, y, size: 14, font });

    const pdfBytes = await pdfDoc.save();

    // --- Email Content ---
    const html = `
      <h2>Invoice for ${schoolName}</h2>
      <p>Your payment has been successfully processed.</p>
      <p><strong>Invoice ID:</strong> ${invoiceId}</p>
      <p><strong>Amount:</strong> ₹ ${amount}</p>
      <br/>
      <p>The invoice PDF is attached with this email.</p>
      <br/>
      <p>Thank you,<br/>Team WeSync</p>
    `;

    // --- Send Email ---
    await sendInvoiceEmail({
      to: schoolEmail,
      subject: `Invoice — ${invoiceId}`,
      html,
      pdfBuffer: Buffer.from(pdfBytes),
    });

    return NextResponse.json({
      success: true,
      message: "Invoice email sent successfully!",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
