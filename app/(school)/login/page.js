"use client";

import { getSchoolBySubdomain } from "@/lib/getSchoolBySubdomain";
import { getSubdomain } from "@/lib/getSubdomain";
import { useEffect, useState } from "react";

export default function SchoolLogin() {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function loadSchool() {
      const sub = getSubdomain();
      if (!sub) {
        setLoading(false);
        return;
      }

      const data = await getSchoolBySubdomain(sub);
      setSchool(data);
      setLoading(false);
    }

    loadSchool();
  }, []);

  function handleLogin(e) {
    e.preventDefault();

    alert("Login logic yaha aayega school ke hisab se");
    // NOTE:
    // Validate users collection: users where schoolId == current school
    // Then login and redirect to /dashboard
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading school…
      </div>
    );
  }

  if (!school) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500 text-lg">
        Invalid School Subdomain
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e3eeff] to-[#f6f9ff] relative overflow-hidden">

      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white opacity-40 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-md p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        bg-white/30 backdrop-blur-xl border border-white/40">

        {/* School Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={school.logo || "/default-school-logo.png"}
            alt="School Logo"
            className="w-20 h-20 object-contain drop-shadow-md"
          />
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-1">
          {school.name}
        </h2>

        <p className="text-center text-gray-500 mb-8">
          School Admin Login
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}
