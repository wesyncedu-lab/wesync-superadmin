import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { schoolName, amount, email } = await req.json();

    // 1. Email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Email HTML Template
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
        <h2 style="color: #2563eb;">Payment Successful 🎉</h2>
        <p>Hello <strong>${schoolName}</strong>,</p>
        <p>We have received your payment successfully.</p>
        
        <div style="margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 8px;">
          <p><strong>Amount:</strong> ₹${amount}</p>
          <p><strong>Status:</strong> Paid</p>
        </div>

        <p>Thank you for using <strong>WeSync</strong>.  
        If you need help, reply to this email.</p>

        <p style="margin-top: 30px; color: #64748b;">
          — Team WeSync
        </p>
      </div>
    `;

    // 3. Send Email
    await transporter.sendMail({
      from: `"WeSync Billing" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Payment Confirmation – WeSync",
      html: htmlTemplate,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email Sent" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
