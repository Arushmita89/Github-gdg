import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const ChartTooltipContent = ({ active, payload }) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white border p-2 rounded shadow-sm">
      {payload.map((p, index) => (
        <p key={index} style={{ color: p.color || "black" }}>
          {p.name}: {p.payload ? `${p.payload.percentage}% (${(p.payload.value / 1024).toFixed(1)}KB)` : p.value}
        </p>
      ))}
    </div>
  );
};
const COLORS = [
  "#6366F1","#EC4899","#22C55E","#FACC15","#EF4444","#64748B","#9CA3AF",
];

const LanguageChart = ({ languages }) => {
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  const data = Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      value: bytes,
      percentage: ((bytes / totalBytes) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 7); 

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No language data available</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#ffffff"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={({ active, payload }) => <ChartTooltipContent active={active} payload={payload} />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: entry.color }}>
                {value} ({entry.payload?.percentage}%)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LanguageChart;
