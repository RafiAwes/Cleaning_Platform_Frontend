"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "01", value: 110 },
  { day: "02", value: 230 },
  { day: "03", value: 360 },
  { day: "04", value: 365 },
  { day: "05", value: 450 },
  { day: "06", value: 490 },
  { day: "07", value: 600 },
  { day: "08", value: 550 },
  { day: "09", value: 530 },
  { day: "10", value: 470 },
  { day: "11", value: 410 },
  { day: "12", value: 350 },
  { day: "13", value: 290 },
  { day: "14", value: 230 },
  { day: "15", value: 250 },
  { day: "16", value: 390 },
  { day: "17", value: 410 },
  { day: "18", value: 430 },
  { day: "19", value: 530 },
  { day: "20", value: 535 },
  { day: "21", value: 550 },
  { day: "22", value: 600 },
  { day: "23", value: 580 },
  { day: "24", value: 570 },
  { day: "25", value: 560 },
  { day: "26", value: 530 },
  { day: "27", value: 530 },
  { day: "28", value: 460 },
  { day: "29", value: 420 },
  { day: "30", value: 410 },
];

export function BookingStatistics() {
  return (
    <div className="bg-white p-3 border rounded-xl w-full">
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={true}
              horizontal={true}
              strokeDasharray="4 4"
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              ticks={[0, 140, 280, 420, 560, 700]}
              domain={[0, 700]}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              cursor={{
                stroke: "#8b5cf6",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              dot={{
                r: 3.5,
                fill: "#ffffff",
                stroke: "#8b5cf6",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "#8b5cf6",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center items-center mt-4 gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-violet-500 bg-white" />
          <span className="text-xs text-gray-500 font-medium">2020</span>
        </div>
      </div>
    </div>
  );
}
