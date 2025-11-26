import nodemailer from "nodemailer";

// --- Transporter Setup ---
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,     // your gmail
    pass: process.env.EMAIL_PASS,     // app password
  },
});

// --- Send Email Helper ---
export async function sendInvoiceEmail({ to, subject, html, pdfBuffer }) {
  return await transporter.sendMail({
    from: `"WeSync Billing" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
}
