import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartTooltipContent from "../ui/chart-tooltip";

const CommitActivityChart = ({ repository }) => {
  const [commitData, setCommitData] = useState([]);

  useEffect(() => {
    const data = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(d.getMonth() - i);
      data.push({
        month: d.toLocaleDateString("en-US", { month: "short" }),
        commits: Math.floor(Math.random() * 100) + 20,
      });
    }
    setCommitData(data);
  }, [repository]);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={commitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload ? (
                <ChartTooltipContent
                  active={active}
                  payload={payload.map((p) => ({
                    name: "Commits",
                    value: p.value,
                    color: p.color || "#4f46e5",
                    payload: p.payload,
                  }))}
                  label={label}
                />
              ) : null
            }
          />
          <Line
            type="monotone"
            dataKey="commits"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitActivityChart;
