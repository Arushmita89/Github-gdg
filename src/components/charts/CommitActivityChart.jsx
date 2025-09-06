import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltipContent } from './ui/chart-tooltip';

const CommitActivityChart = ({ repository }) => {
  const [commitData, setCommitData] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateMockCommitData = () => {
    const data = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);

      data.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        commits: Math.floor(Math.random() * 100) + 20,
        date: date.toISOString(),
      });
    }

    return data;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCommitData(generateMockCommitData());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [repository]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={commitData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload?.map(p => ({
                  dataKey: p.dataKey?.toString() || '',
                  name: 'Commits',
                  value: `${p.value} commits`,
                  color: p.color || '',
                  payload: p.payload
                }))}
                label={label?.toString()}
              />
            )}
          />
          <Line
            type="monotone"
            dataKey="commits"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { CommitActivityChart };
