import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import ChartTooltipContent from "../ui/chart-tooltip";

const CommitActivityChart = ({ commitData = [], loading }) => {
  if (loading) {
    return (
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Commit Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center text-gray-500">
          Loading commit activity…
        </CardContent>
      </Card>
    );
  }

  if (!commitData.length) {
    return (
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Commit Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center text-gray-500">
          No commit data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1 h-full w-full">
      <CardContent className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={commitData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload ? (
                  <ChartTooltipContent
                    active={active}
                    payload={payload.map((p) => ({ ...p, name: "Commits" }))}
                    label={payload[0]?.payload.dateRange || label}
                    className="bg-gray-900 text-white border-gray-700"
                  />
                ) : null
              }
            />
            <Line
              type="monotone"
              dataKey="commits"
              stroke="#4f46e5"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#4f46e5" }}
              activeDot={{ r: 6, stroke: "#1d4ed8", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

  );
};

export default CommitActivityChart;
