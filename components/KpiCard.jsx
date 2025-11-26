export default function KpiCard({ title, value, subtitle, growth }) {
  return (
    <div className="p-5 bg-white rounded-2xl border shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all">
      <p className="text-gray-500 text-sm">{title}</p>

      <h3 className="text-2xl font-semibold mt-2">{value}</h3>

      <div className="flex justify-between items-center mt-3">
        <p className="text-gray-400 text-xs">{subtitle}</p>
        <span className={`text-xs font-semibold 
          ${growth.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
          {growth}
        </span>
      </div>
    </div>
  );
}
