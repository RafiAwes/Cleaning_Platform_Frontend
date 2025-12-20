import { cn } from "@/lib";
import { childrenProps } from "@/types";

interface IconBoxProps extends childrenProps {
  className?: string;
}

export default function IconBox({ children, className }: IconBoxProps) {
  return (
    <div
      className={cn(
        "size-11 grid bg-white mx-auto place-items-center rounded-full",
        className
      )}
    >
      {children}
    </div>
  );
}
