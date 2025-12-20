"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { cn, helpers } from "@/lib";
import { CalendarDays } from "lucide-react";

export function SingleCalendar({ onChange, className }: any) {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    setStartDate(selectedDate);
    setOpen(false); // Close popover after selecting

    // Pass selected date to parent
    onChange?.(selectedDate);
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            className={cn(
              "bg-white justify-between text-figma-gray px-2! min-w-[200px] font-normal border",
              className
            )}
          >
            <span className="flex items-center space-x-3">
              <CalendarDays className="text-black size-5" />
              <span className="ml-px">
                {startDate ? helpers.formatDate(startDate) : "-Select Date-"}
              </span>
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto overflow-hidden bg-secondary p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={startDate}
            // className="in-data-[slot=popover-content]:bg-background text-white"
            // classNames={{
            //   button_previous:
            //     "cursor-pointer size-8 grid place-items-center rounded-md bg-[#575757]/20 text-white",
            //   button_next:
            //     "cursor-pointer size-8 grid place-items-center rounded-md bg-[#575757]/20 text-white",
            // }}
            onSelect={handleSelectDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
