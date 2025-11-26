"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiLayers, FiLogOut, FiSettings, FiUsers } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    { title: "Dashboard", href: "/dashboard", icon: <FiHome /> },
    { title: "Schools", href: "/dashboard/schools", icon: <FiUsers /> },
    { title: "Plans", href: "/dashboard/plans", icon: <FiLayers /> },
    { title: "Settings", href: "/dashboard/settings", icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-72 bg-white shadow-xl border-r p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">WeSync</h1>

        {menu.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-sm font-semibold ${
              pathname === m.href
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {m.icon} {m.title}
          </Link>
        ))}

        <button className="mt-auto flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg">
          <FiLogOut /> Logout
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
