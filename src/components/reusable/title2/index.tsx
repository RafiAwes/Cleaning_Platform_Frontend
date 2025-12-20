import { ClserviceIcon, CustomerIcon } from "@/icon";
import { cn } from "@/lib";

interface titleProps {
  text: string;
  svg?: React.ReactNode;
  className?: string;
  iconStyle?: string;
}

function SubTitle2({ text, svg = true, className, iconStyle }: titleProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-[20px] xl:text-[36px] text-center font-bold text-primary",
        className
      )}
    >
      {text}
      {svg && (
        <span className="flex items-center">
          <ClserviceIcon className={iconStyle} />
        </span>
      )}
    </div>
  );
}

export default SubTitle2;
