"use client";

export default function ActivityList({ items = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.id} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-600">
              🔔
            </div>
            <div className="flex-1 text-sm">
              <div className="text-gray-800">{it.text}</div>
              <div className="text-xs text-gray-400 mt-1">{it.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
