import { cn } from "@/lib";

interface ProgressChartProps {
  className?: string;
  progress: number;
  activeStroke?: string;
  stroke?: string;
  textStyle?: string;
}

export default function ProgressChart({
  className,
  progress,
  activeStroke = "#01aef0",
  stroke = "currentColor",
  textStyle,
}: ProgressChartProps) {
  return (
    <div className={cn("relative w-16  h-16", className)}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={stroke}
          strokeWidth="12"
          fill="none"
          className="text-muted"
        />

        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={activeStroke}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${(progress / 100) * 251.2} 251.2`}
          className={`transition-all duration-300`}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50px 50px",
          }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("text-sm font-semibold text-primary", textStyle)}>
          {progress}%
        </span>
      </div>
    </div>
  );
}
