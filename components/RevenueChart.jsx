"use client";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function RevenueChart({ labels = [], data = [] }) {
  const cfg = {
    labels,
    datasets: [
      {
        label: "Revenue (₹)",
        data,
        borderColor: "#2563EB",
        backgroundColor: "rgba(37,99,235,0.12)",
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#2563EB"
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
    scales: {
      y: { ticks: { callback: (v) => `₹ ${v}` } }
    }
  };

  return (
    <div className="w-full" style={{ height: 300 }}>
      <Line data={cfg} options={options} />
    </div>
  );
}
