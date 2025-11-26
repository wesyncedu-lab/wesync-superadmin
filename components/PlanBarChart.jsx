"use client";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PlanBarChart({ labels = [], data = [] }) {
  const cfg = {
    labels,
    datasets: [
      {
        label: "Schools",
        data,
        backgroundColor: ["#A5F3FC", "#93C5FD", "#60A5FA", "#2563EB"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
    scales: { x: { grid: { display: false } }, y: { beginAtZero: true } },
  };

  return (
    <div style={{ height: 260 }}>
      <Bar data={cfg} options={options} />
    </div>
  );
}
