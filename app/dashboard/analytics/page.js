"use client";

import { useEffect, useMemo, useState } from "react";
import {
    FiActivity,
    FiBarChart2,
    FiClock,
    FiDownload,
    FiTrendingUp,
} from "react-icons/fi";

/**
 * Super Admin -> Analytics Page
 * - Lightweight SVG charts (line, bars, donut)
 * - Simulated live updates with setInterval (replace with real data fetch)
 * - Export CSV button
 *
 * Drop this into: app/dashboard/analytics/page.js
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatCurrency(n) {
  return `₹${n.toLocaleString()}`;
}

/* ------------------ SVG Chart Helpers ------------------ */

function LineChart({ data = [], width = 600, height = 140 }) {
  if (!data.length) return null;
  const max = Math.max(...data) || 1;
  const min = Math.min(...data);
  const padding = 8;
  const stepX = (width - padding * 2) / (data.length - 1 || 1);

  const points = data
    .map((val, i) => {
      const x = padding + i * stepX;
      const y =
        padding + (1 - (val - min) / Math.max(max - min, 1)) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = `M${padding},${height - padding} L${points} L${width - padding},${height -
    padding} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <path d={areaPath} fill="url(#grad)" stroke="transparent" />
      <polyline
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
      {data.map((v, i) => {
        const x = padding + i * stepX;
        const y =
          padding + (1 - (v - min) / Math.max(max - min, 1)) * (height - padding * 2);
        return <circle key={i} cx={x} cy={y} r="2.6" fill="#2563eb" />;
      })}
    </svg>
  );
}

function BarChart({ labels = [], values = [], height = 120 }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex gap-2 items-end h-32">
      {values.map((v, i) => {
        const h = (v / max) * height;
        return (
          <div key={i} className="flex-1 text-center">
            <div
              title={`${labels[i] || i}: ${v}`}
              className="mx-auto w-10 rounded-t-lg"
              style={{
                height: `${Math.max(6, h)}px`,
                background:
                  "linear-gradient(180deg, rgba(34,197,94,1) 0%, rgba(34,137,235,1) 100%)",
              }}
            />
            <div className="mt-2 text-xs text-gray-600">{labels[i]}</div>
          </div>
        );
      })}
    </div>
  );
}

function Donut({ segments = [], size = 120, stroke = 18 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {segments.map((seg, i) => {
          const len = (seg.value / total) * circumference;
          const dashArray = `${len} ${circumference - len}`;
          const el = (
            <g key={i} transform={`rotate(${(-offset / circumference) * 360})`}>
              <circle
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={stroke}
                strokeDasharray={dashArray}
                strokeDashoffset={0}
                strokeLinecap="butt"
                transform={`rotate(-90)`}
              />
            </g>
          );
          offset += len;
          return el;
        })}
        <circle r={radius - stroke - 4} fill="#fff" />
        <text x="0" y="4" textAnchor="middle" className="font-semibold" style={{ fontSize: 14 }}>
          {Math.round(segments.reduce((s, x) => s + x.value, 0))}
        </text>
      </g>
    </svg>
  );
}

/* ------------------ Page Component ------------------ */

export default function AnalyticsPage() {
  // Simulated metrics (replace with Firestore reads)
  const [liveUsers, setLiveUsers] = useState(120 + getRandomInt(-10, 10));
  const [dailyActive, setDailyActive] = useState(
    Array.from({ length: 12 }, () => getRandomInt(40, 180))
  );
  const [revenueSeries, setRevenueSeries] = useState(
    Array.from({ length: 12 }, (_, i) => 20000 + i * 2000 + getRandomInt(-4000, 4000))
  );
  const [moduleUsage, setModuleUsage] = useState({
    Attendance: 72,
    Homework: 63,
    Fees: 84,
    "Bus Tracking": 41,
    "Notice Board": 55,
  });

  // simulated live updates every 3s
  useEffect(() => {
    const t = setInterval(() => {
      setLiveUsers((u) => Math.max(4, u + getRandomInt(-6, 6)));
      setDailyActive((s) => {
        const next = [...s.slice(1), getRandomInt(40, 180)];
        return next;
      });
      setRevenueSeries((s) => {
        const next = [...s.slice(1), Math.max(1000, s[s.length - 1] + getRandomInt(-3000, 5000))];
        return next;
      });
      setModuleUsage((m) => {
        const keys = Object.keys(m);
        const idx = getRandomInt(0, keys.length - 1);
        const k = keys[idx];
        return { ...m, [k]: Math.max(5, Math.min(100, m[k] + getRandomInt(-4, 6))) };
      });
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const months = useMemo(
    () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    []
  );

  // donut segments
  const moduleSegments = useMemo(() => {
    const colors = ["#10B981", "#60A5FA", "#F59E0B", "#EF4444", "#A78BFA"];
    return Object.entries(moduleUsage).map(([k, v], i) => ({
      label: k,
      value: v,
      color: colors[i % colors.length],
    }));
  }, [moduleUsage]);

  // CSV export for the simple data
  const exportCSV = () => {
    const header = ["metric", ...months.slice(-12)];
    const activeRow = ["daily_active", ...dailyActive];
    const revenueRow = ["revenue", ...revenueSeries.map((r) => Math.round(r))];
    const rows = [header, activeRow, revenueRow];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // small stats
  const totalRevenue = revenueSeries.reduce((s, n) => s + n, 0);
  const avgActive = Math.round(dailyActive.reduce((s, n) => s + n, 0) / dailyActive.length);

  return (
    <div className="space-y-8 p-8">
      {/* header with optional uploaded image */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl shadow">
            <FiBarChart2 className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Platform Analytics</h1>
            <p className="text-sm text-gray-500">Overview of usage, revenue and module adoption</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2 hover:bg-gray-200"
          >
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow flex flex-col">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-md">
              <FiActivity className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Live Users</p>
              <p className="text-2xl font-bold">{liveUsers}</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">Realtime approx</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex flex-col">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-md">
              <FiTrendingUp className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Daily Active</p>
              <p className="text-2xl font-bold">{avgActive}</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">Last 12 intervals</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex flex-col">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-md">
              <FiClock className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue (12 periods)</p>
              <p className="text-2xl font-bold">{formatCurrency(Math.round(totalRevenue))}</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">Demo numbers</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex flex-col">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-md">
              <FiTrendingUp className="text-yellow-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Schools</p>
              <p className="text-2xl font-bold"> {Object.keys(moduleUsage).length * 5} </p>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">Estimated</div>
        </div>
      </div>

      {/* charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="col-span-2 bg-white p-5 rounded-xl shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Daily Active Users</h3>
            <div className="text-xs text-gray-500">Last {dailyActive.length} intervals</div>
          </div>
          <div style={{ height: 140 }}>
            <LineChart data={dailyActive} width={700} height={140} />
          </div>

          <div className="mt-4">
            <h4 className="text-sm text-gray-500">Revenue Trend</h4>
            <BarChart
              labels={months.slice(-6)}
              values={revenueSeries.slice(-6).map((r) => Math.round(r / 1000))}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Module Usage</h3>
            <div className="text-xs text-gray-500">Adoption %</div>
          </div>

          <div className="flex items-center gap-4">
            <Donut segments={moduleSegments} size={140} stroke={18} />
            <div className="flex-1">
              {moduleSegments.map((m, i) => (
                <div key={i} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span style={{ width: 12, height: 12, background: m.color, display: "inline-block", borderRadius: 4 }} />
                    <div>
                      <div className="text-sm font-medium">{m.label}</div>
                      <div className="text-xs text-gray-500">{m.value}% adoption</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{m.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Top schools list */}
      <div className="bg-white p-5 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Top Performing Schools (by usage)</h3>
          <div className="text-xs text-gray-500">Last 30 days</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* demo cards */}
          <TopSchoolCard name="Delhi Public School" city="Delhi" score={92} usage={1250} />
          <TopSchoolCard name="Modern Academy" city="Lucknow" score={88} usage={1050} />
          <TopSchoolCard name="Green Valley" city="Delhi" score={85} usage={980} />
        </div>
      </div>

      {/* Optional demo image you uploaded earlier */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
        <img src="sandbox:/mnt/data/22a648fe-9de3-4059-b476-7170da1a0bbd.png" alt="screenshot" className="w-40 rounded-md border" />
        <div>
          <div className="text-sm text-gray-600">Uploaded screenshot</div>
          <div className="text-sm text-gray-700">Use this area for a report screenshot, company logo, or export preview.</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Small components ---------------- */

function TopSchoolCard({ name, city, score, usage }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{city}</div>
          <div className="font-semibold">{name}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Score</div>
          <div className="text-lg font-bold">{score}%</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-600">Usage: {usage} actions</div>
    </div>
  );
}
