"use client";

import { useEffect, useMemo, useState } from "react";

type BookingCalendarProps = {
  availableDates?: string[];
  selectedDate?: string | null;
  onSelect?: (date: string) => void;
};

export default function BookingCalendar({ availableDates = [], selectedDate, onSelect }: BookingCalendarProps) {
  const parsedAvailableDates = useMemo(() => {
    return new Set(
      (availableDates || [])
        .map((date) => new Date(date))
        .filter((d) => !isNaN(d.getTime()))
        .map((d) => d.toDateString())
    );
  }, [availableDates]);

  const initialMonth = useMemo(() => {
    const firstAvailable = (availableDates || []).find((d) => !isNaN(new Date(d).getTime()));
    return firstAvailable ? new Date(firstAvailable) : new Date();
  }, [availableDates]);

  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  useEffect(() => {
    setCurrentMonth(initialMonth);
  }, [initialMonth]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // If we have availability data, check if date is available
    if (parsedAvailableDates.size > 0 && !parsedAvailableDates.has(date.toDateString())) {
      return;
    }
    onSelect?.(date.toISOString());
  };

  const renderCalendarDays = () => {
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="aspect-square border rounded-lg bg-gray-50"
        ></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      // Date is available if: we have no availability data (show all), OR the date is in available dates
      const isAvailable = parsedAvailableDates.size === 0 || parsedAvailableDates.has(date.toDateString());
      const isSelected = selectedDate ? new Date(selectedDate).toDateString() === date.toDateString() : false;

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
            aspect-square border rounded-lg text-xs sm:text-sm font-medium
            transition-all duration-200 
            ${isSelected ? "bg-primary text-white " : ""}
            ${!isSelected && isAvailable ? "bg-[#ECECEC]" : ""}
            ${!isAvailable ? "text-gray-400 cursor-not-allowed" : "text-gray-700"}
          `}
          disabled={!isAvailable}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="p-4 sm:p-6 bg-secondary rounded-lg xl:min-h-[650px]">
      {/* Header */}
      <div className="mb-4">
        {/* Month Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-8">
          <label className="text-[20px] font-medium">Select date</label>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousMonth}
              className="p-1 rounded transition-colors"
              aria-label="Previous month"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1  rounded transition-colors"
              aria-label="Next month"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-lg overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-600 py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
      </div>
    </div>
  );
}
