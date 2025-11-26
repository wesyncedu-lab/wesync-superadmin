"use client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function PlanBarChart({ labels, data }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Plan Distribution</h2>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Schools",
              data,
              backgroundColor: "#10b981",
              borderRadius: 8,
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

