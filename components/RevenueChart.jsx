"use client";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

export default function RevenueChart({ labels, data }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Revenue",
              data,
              borderWidth: 3,
              tension: 0.4,
              borderColor: "#2563eb",
              pointRadius: 0,
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "#f1f1f1" } },
          },
        }}
      />
    </div>
  );
}

