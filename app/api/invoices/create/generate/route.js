import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function POST(req) {
  try {
    const { invoiceId, schoolName, amount, date, items } = await req.json();

    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize();

    let y = height - 60;

    // HEADER
    page.drawText("WeSync — Invoice", {
      x: 50,
      y,
      size: 26,
      font,
      color: rgb(0.2, 0.4, 1),
    });

    y -= 40;

    // Invoice info
    page.drawText(`Invoice ID: ${invoiceId}`, { x: 50, y, size: 12, font });
    y -= 20;

    page.drawText(`School: ${schoolName}`, { x: 50, y, size: 12, font });
    y -= 20;

    page.drawText(`Date: ${date}`, { x: 50, y, size: 12, font });
    y -= 30;

    // Table Header
    page.drawText("Item", { x: 50, y, size: 14, font });
    page.drawText("Amount", { x: 400, y, size: 14, font });
    y -= 20;

    // Table Rows
    items.forEach((item) => {
      page.drawText(item.title, { x: 50, y, size: 12, font });
      page.drawText(`₹ ${item.amount}`, { x: 400, y, size: 12, font });
      y -= 20;
    });

    y -= 30;

    // TOTAL
    page.drawText("Total:", { x: 50, y, size: 14, font });
    page.drawText(`₹ ${amount}`, { x: 400, y, size: 14, font });

    // Footer
    page.drawText("Thank you for using WeSync!", {
      x: 50,
      y: 50,
      size: 12,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${invoiceId}.pdf"`,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
