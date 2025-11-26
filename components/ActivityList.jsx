export default function ActivityList({ items }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col bg-gray-50 p-3 rounded-xl border">
            <p className="text-gray-700">{item.text}</p>
            <span className="text-xs text-gray-500 mt-1">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
