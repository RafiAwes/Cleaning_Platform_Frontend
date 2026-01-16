"use client";
import { VenStatisticsCh } from "@/components/common/chart/statistics-chart";
import Avatars from "@/components/reusable/avater";
import { SingleCalendar } from "@/components/reusable/date-box";
import IconBox from "@/components/reusable/Icon-box";
import ProgressChart from "@/components/reusable/progress-chart";
import { Button, ScrollArea } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { useDashboardQuery } from "@/redux/api/vendorApi";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const formatCurrency = (amount?: number) => {
  if (amount === undefined || amount === null || Number.isNaN(amount)) {
    return "$0.00";
  }
  return `$${Number(amount).toFixed(2)}`;
};

export default function VendorPage() {
  const { data, isLoading, isError } = useDashboardQuery(undefined);

  const dashboard = data?.data;
  const summary = dashboard?.summary || {};
  const recentBookings = dashboard?.recent_bookings || [];
  const weeklyBookings = dashboard?.weekly_bookings || [];

  const stashItems = useMemo(
    () => [
      {
        icon: "package_cc",
        label: "Total packages",
        value: summary.total_packages ?? 0,
        btnLabel: "Manage",
        href: "/vendor/packages",
      },
      {
        icon: "bookings_cc",
        label: "Total bookings",
        value: summary.total_bookings ?? 0,
        btnLabel: "View",
        href: "/vendor/bookings",
      },
      {
        icon: "target_booking",
        label: "Target bookings",
        value: summary.target_bookings ?? 0,
        btnLabel: "Set new",
        href: "/vendor/set-new",
        progress: summary.target_bookings_progress ?? 0,
      },
      {
        icon: "earn_cc",
        label: "Total earnings",
        value: formatCurrency(summary.total_earnings),
        btnLabel: "View",
      },
      {
        icon: "target_revenue",
        label: "Target revenue",
        value: formatCurrency(summary.revenue_target),
        btnLabel: "Set new",
        href: "/vendor/set-new",
        progress: summary.revenue_target_progress ?? 0,
      },
    ],
    [summary]
  );

  return (
    <div className="container pt-10">
      <ul className="flex items-center flex-wrap space-y-2 lg:space-y-0 justify-between">
        <li className="text-xl font-bold">Overview</li>
        <li>
          <div className="flex flex-wrap items-center space-x-5 space-y-2 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-medium">From:</h2>
              <SingleCalendar
                className="h-10"
                onChange={(e: any) => console.log(e)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-medium">To:</h2>
              <SingleCalendar
                className="h-10"
                onChange={(e: any) => console.log(e)}
              />
            </div>
            <IconBox className="rounded-md size-10 bg-primary">
              <FavIcon className="size-5" name="date_cc" />
            </IconBox>
          </div>
        </li>
      </ul>
      <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {stashItems.map((item, index) => (
          <StashCard key={index} {...item} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        <div className="col-span-1 lg:col-span-2">
          <h2 className="text-xl font-bold mb-3">Recent activities</h2>
          <div className="bg-secondary p-4 rounded-xl">
            <ScrollArea className="h-[420px]">
              <div className="space-y-3 mr-5">
                {isLoading ? (
                  <div className="text-center text-gray-500 py-10">Loading dashboard...</div>
                ) : isError ? (
                  <div className="text-center text-red-500 py-10">Failed to load dashboard data.</div>
                ) : recentBookings.length > 0 ? (
                  recentBookings.map((item: any, index: number) => (
                    <div
                      key={item.id || index}
                      className="border space-y-4 lg:space-y-0 p-2 flex flex-col lg:flex-row lg:items-center justify-between rounded-xl"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center space-x-4">
                        <IconBox>
                          <FavIcon className="size-5" name="bookings_cc" />
                        </IconBox>
                        <div className="ml-2">
                          <p>{item.title || "Booking"}</p>
                          <p className="text-xl font-semibold">{formatCurrency(item.total_price)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Avatars
                          src={item.customer?.profile_picture || ""}
                          fallback={item.customer?.name || "Customer"}
                          alt={item.customer?.name || "Customer"}
                        />
                        <div className="leading-5 mb-1">
                          <p className="font-medium">{item.customer?.name || "N/A"}</p>
                          <p>{item.customer?.email || "N/A"}</p>
                        </div>
                      </div>
                      <ArrowRight className="hidden lg:block" />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-10">No recent bookings yet.</div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3">Event posting preferences</h2>
          <VenStatisticsCh data={weeklyBookings} />
        </div>
      </div>
    </div>
  );
}

//  ============== StashCard =============
function StashCard({ icon, label, href, value, btnLabel, progress }: any) {
  const displayValue = typeof value === "number" ? value : value ?? 0;
  return (
    <div className="bg-secondary rounded-xl  transition-shadow p-4 relative">
      {href && (
        <Link href={href || "/vendor"}>
          <Button
            variant="outline"
            size="sm"
            className="absolute right-4 hover:text-primary top-4 text-primary bg-transparent border-primary"
          >
            {btnLabel}
          </Button>
        </Link>
      )}
      <IconBox className="size-13 mx-0">
        <FavIcon className="size-7" name={icon} />
      </IconBox>
      <p className="text-black">{label}</p>
      <h1 className="text-2xl lg:text-[28px] font-bold">{displayValue}</h1>
      {progress && (
        <div className="absolute bottom-2 right-4">
          <ProgressChart stroke="#D9D9D9" progress={progress} />
        </div>
      )}
    </div>
  );
}
