"use client";

import { cn } from "@/lib";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sun", value: 99 },
  { day: "Mon", value: 10 },
  { day: "Tue", value: 73 },
  { day: "Wed", value: 82 },
  { day: "Thu", value: 64 },
  { day: "Fri", value: 74 },
  { day: "Sat", value: 18 },
];

export function VenStatisticsCh({ className }: any) {
  return (
    <div
      className={cn(
        "w-full max-w-[500px] bg-[#f5f5f7] min-h-[350px] rounded-2xl p-3  lg:p-6",
        className
      )}
    >
      <ResponsiveContainer width="100%" height={400}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#d1d1d6" />
          <PolarAngleAxis
            dataKey="day"
            tick={({ payload, x, y, textAnchor, ...rest }) => {
              const item = data.find((d) => d.day === payload.value);
              return (
                <g>
                  <text
                    {...rest}
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fill="#3c3c43"
                    fontSize={14}
                    fontWeight={400}
                  >
                    {payload.value}
                  </text>
                  <text
                    {...rest}
                    x={x}
                    y={y + 16}
                    textAnchor={textAnchor}
                    fill="#3c3c43"
                    fontSize={13}
                    fontWeight={500}
                  >
                    {item?.value}
                  </text>
                </g>
              );
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tickCount={6}
            tick={{ fill: "#8e8e93", fontSize: 11 }}
            axisLine={false}
          />
          <Radar
            name="Weekly Data"
            dataKey="value"
            stroke="#8b7cf7"
            fill="#9d8df8"
            fillOpacity={0.6}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
