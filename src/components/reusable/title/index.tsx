import { CustomerIcon } from "@/icon";
import { cn } from "@/lib";

interface titleProps {
  text: string;
  svg?: React.ReactNode;
  className?: string;
  iconStyle?: string;
}

function SubTitle({ text, svg = true, className, iconStyle }: titleProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center text-base text-[#000000] font-bold text-[28px]",
        className
      )}
    >
      {text}
      {svg && (
        <span className="flex items-center">
          <CustomerIcon className={iconStyle} />
        </span>
      )}
    </div>
  );
}

export default SubTitle;
