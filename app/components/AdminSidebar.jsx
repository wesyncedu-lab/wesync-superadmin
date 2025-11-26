"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiFileText,
  FiHome,
  FiLayers,
  FiLogOut,
  FiSettings,
  FiUsers
} from "react-icons/fi";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard" },
    { name: "Schools", icon: <FiUsers />, href: "/dashboard/schools" },
    { name: "Plans", icon: <FiLayers />, href: "/dashboard/plans" },
    { name: "Invoices", icon: <FiFileText />, href: "/dashboard/invoices" },
    { name: "Settings", icon: <FiSettings />, href: "/dashboard/settings" },
  ];

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-5 flex flex-col fixed h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <img src="/logo.png" className="w-10 h-10" alt="logo" />
        <h1 className="text-2xl font-bold text-blue-600">WeSync</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
              ${
                isActive(item.href)
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <Link
        href="/logout"
        className="flex items-center gap-3 px-4 py-3 mt-4 rounded-lg text-red-600 font-medium hover:bg-red-50 transition"
      >
        <FiLogOut size={18} />
        Logout
      </Link>
    </aside>
  );
}
