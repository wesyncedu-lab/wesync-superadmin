"use client";
import Image from "next/image";
import { useState } from "react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
    }, 900);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#e3eeff] to-[#f6f9ff]">

      {/* Apple-style light blur background */}
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>

      {/* Spotlight effect */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white opacity-40 rounded-full blur-[120px]"></div>

      <div className="relative w-full max-w-md p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] 
        bg-white/30 backdrop-blur-xl border border-white/40">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image 
            src="/logo.png" 
            width={90} 
            height={90} 
            alt="Logo"
            className="drop-shadow-md"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-1">
          WeSync Super Admin
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Sign in to continue
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          
          <input
            type="text"
            placeholder="Email / Username"
            className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 text-gray-700 shadow-sm 
                       focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 text-gray-700 shadow-sm 
                       focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
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

        <p className="text-center text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} WeSync — All Rights Reserved
        </p>
      </div>
    </div>
  );
}
