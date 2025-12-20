"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FavIcon from "@/favicon/favicon";
import { useEffect, useRef, useState } from "react";

export default function SelectBox({
  options = [],
  defaultValue = "",
  className = "",
  triggerClassName = "",
  placeholder = "Select option",
  onChange,
  icon = false,
}: {
  options: { label: string; value: string }[];
  defaultValue?: string;
  className?: string;
  triggerClassName?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  icon?: boolean;
}) {
  // SelectContent is a DIV → use HTMLDivElement
  const contentRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.offsetWidth);
    }

    const onResize = () => {
      if (contentRef.current) {
        setWidth(contentRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger
        style={{ width: width ? `${width}px` : "auto" }}
        className={triggerClassName}
      >
        {icon && <FavIcon name="filter_cc" />}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent ref={contentRef} className={className}>
        {options.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
