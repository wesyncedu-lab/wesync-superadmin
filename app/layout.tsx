import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeSync Super Admin",
  description: "Super Admin Panel for WeSync",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Razorpay Checkout Script */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </head>

      <body className="bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
