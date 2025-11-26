"use client";
import Image from "next/image";
import { useState } from "react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/dashboard";
    } else {
      alert("Invalid email or password");
    }

    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      alert("Enter email");
      return;
    }

    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: resetEmail }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Password reset email sent!");
      setShowReset(false);
    } else {
      alert("Failed to send reset email");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#e8f0ff] to-[#f8fbff]">

      {/* Faint blur overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Smooth spotlight */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white opacity-40 rounded-full blur-[120px]" />

      {/* Card */}
      <div className="relative w-full max-w-md p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        bg-white/30 backdrop-blur-xl border border-white/40">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            width={90}
            height={90}
            alt="WeSync Logo"
            className="drop-shadow-md"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-1">
          WeSync Admin Portal
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Sign in to continue
        </p>

        {/* LOGIN FORM */}
        {!showReset && (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 text-gray-700 shadow-sm 
                         focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 text-gray-700 shadow-sm 
                         focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg 
                         shadow-lg hover:bg-blue-700 transition disabled:opacity-40"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>
        )}

        {/* RESET PASSWORD FORM */}
        {showReset && (
          <div className="flex flex-col gap-5">

            <input
              type="email"
              placeholder="Enter your admin email"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 shadow-sm 
                         focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700"
            >
              Send Reset Email
            </button>

            <button
              onClick={() => setShowReset(false)}
              className="w-full py-2 text-blue-600 font-medium hover:underline"
            >
              Back to Login
            </button>
          </div>
        )}

        {/* RESET LINK */}
        {!showReset && (
          <p
            onClick={() => setShowReset(true)}
            className="text-center text-blue-600 mt-4 text-sm hover:underline cursor-pointer"
          >
            Forgot Password?
          </p>
        )}

        <p className="text-center text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} WeSync — All Rights Reserved
        </p>

      </div>
    </div>
  );
}
