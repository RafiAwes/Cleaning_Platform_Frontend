import { cn } from "@/lib";

export default function Circle({ className }: any) {
  return <div className={cn("size-2 rounded-full bg-black", className)}></div>;
}
