"use client";
import { db } from "@/common/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SchoolsPage() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "schools"));
      const arr = [];
      snap.forEach((d) => arr.push({ id: d.id, ...d.data().info }));
      setSchools(arr);
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Schools</h1>

      <Link
        href="/dashboard/schools/new"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        + Add School
      </Link>

      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">School Name</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.city}</td>
                <td className="p-3">{s.plan}</td>
                <td className="p-3">
                  <Link
                    href={`/dashboard/schools/${s.id}`}
                    className="text-blue-600 underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
