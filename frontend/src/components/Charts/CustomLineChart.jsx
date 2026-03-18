import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-sky-200">
          <p className="text-xs font-semibold text-sky-600 mb-1">
            {payload[0].payload.category}
          </p>

          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              ₹{payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          {/* Sky Blue Gradient */}
          <defs>
            <linearGradient id="incomeGradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#e0f2fe" strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#475569" }}
            stroke="none"
          />

          <YAxis tick={{ fontSize: 12, fill: "#475569" }} stroke="none" />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#0ea5e9" // sky-500
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#38bdf8" }} // sky-400
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
