"use client";

import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    // Clear session (if stored)
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");

    // redirect to login
    window.location.href = "/";
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-500">
      Logging out…
    </div>
  );
}
