"use client";
export default function KpiCard({ title, value, subtitle, growth }) {
  return (
    <div className="p-4 rounded-2xl bg-white shadow-sm border flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">{subtitle}</p>
          {growth && <span className="text-sm text-green-600 font-semibold">{growth}</span>}
        </div>
      </div>
    </div>
  );
}
