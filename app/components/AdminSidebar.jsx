"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiLayers, FiLogOut, FiSettings, FiUsers } from "react-icons/fi";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard" },
    { name: "Schools", icon: <FiUsers />, href: "/dashboard/schools" },
    { name: "Plans", icon: <FiLayers />, href: "/dashboard/plans" },
    { name: "Settings", icon: <FiSettings />, href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-5 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">WeSync</h1>

      <nav className="flex-1 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
              ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <button className="flex items-center gap-3 px-4 py-3 mt-4 rounded-lg text-gray-600 hover:bg-gray-100">
        <FiLogOut /> Logout
      </button>
    </aside>
  );
}
