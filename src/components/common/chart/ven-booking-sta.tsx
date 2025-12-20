"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export default function VendorBookingChart({ className }: any) {
  const chartData = [
    { day: "01", bookings: 200 },
    { day: "02", bookings: 500 },
    { day: "03", bookings: 350 },
    { day: "04", bookings: 980 },
    { day: "05", bookings: 600 },
    { day: "06", bookings: 620 },
    { day: "07", bookings: 150 },
    { day: "08", bookings: 120 },
    { day: "09", bookings: 150 },
    { day: "10", bookings: 800 },
    { day: "11", bookings: 820 },
    { day: "12", bookings: 500 },
    { day: "13", bookings: 480 },
    { day: "14", bookings: 100 },
    { day: "15", bookings: 970 },
    { day: "16", bookings: 420 },
    { day: "17", bookings: 50 },
    { day: "18", bookings: 900 },
    { day: "19", bookings: 920 },
    { day: "20", bookings: 780 },
    { day: "21", bookings: 880 },
    { day: "22", bookings: 300 },
    { day: "23", bookings: 750 },
    { day: "24", bookings: 200 },
    { day: "25", bookings: 630 },
    { day: "26", bookings: 850 },
    { day: "27", bookings: 430 },
    { day: "28", bookings: 860 },
    { day: "29", bookings: 870 },
    { day: "30", bookings: 320 },
  ];

  const chartConfig = {
    bookings: {
      label: "Bookings",
      color: "#5CC8F0",
    },
  };

  return (
    <div className="bg-white p-3 border rounded-xl w-full">
      <ChartContainer
        config={chartConfig}
        className={cn("w-full h-[350px]", className)}
      >
        {/* Scrollable Wrapper */}
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          {/* Minimum width ensures scroll on small screens */}
          <div
            className={cn("min-w-[700px] sm:min-w-full h-[350px]", className)}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#E5E5E5"
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                  fontSize={12}
                  tick={{ fill: "#999" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  domain={[0, 1000]}
                  fontSize={12}
                  tick={{ fill: "#999" }}
                />
                <Bar
                  dataKey="bookings"
                  fill={chartConfig.bookings.color}
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ChartContainer>
    </div>
  );
}
