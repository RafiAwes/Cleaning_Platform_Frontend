"use client";
import { VenStatisticsCh } from "@/components/common/chart/statistics-chart";
import Avatars from "@/components/reusable/avater";
import { SingleCalendar } from "@/components/reusable/date-box";
import IconBox from "@/components/reusable/Icon-box";
import ProgressChart from "@/components/reusable/progress-chart";
import { Button, ScrollArea } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const stashItem = [
  {
    icon: "package_cc",
    label: "Total packages",
    value: "4",
    btnLabel: "Manage",
    href: "/vendor/packages",
  },
  {
    icon: "bookings_cc",
    label: "Total Bookings",
    value: "12",
    btnLabel: "View",
    href: "/vendor/bookings",
  },
  {
    icon: "target_booking",
    label: "Target bookings",
    value: "20",
    btnLabel: "Set new",
    href: "/vendor/set-new",
    progress: 20,
  },
  {
    icon: "earn_cc",
    label: "Total earnings",
    value: "$600",
    btnLabel: "View",
  },
  {
    icon: "target_revenue",
    label: "Target revenue",
    value: "$6000",
    btnLabel: "Set new",
    href: "/vendor/set-new",
    progress: 60,
  },
];

const servicesData = [
  {
    id: 1,
    description:
      "House cleaning service for residential areas in New York City.",
    price: "$250",
    provider: {
      name: "John Doe",
      email: "example@gmail.com",
      avatar: "/profile-avatar.png",
    },
  },
  {
    id: 2,
    description:
      "House cleaning service for residential areas in New York City.",
    price: "$250",
    provider: {
      name: "John Doe",
      email: "example@gmail.com",
      avatar: "/profile-avatar.png",
    },
  },
  {
    id: 3,
    description:
      "House cleaning service for residential areas in New York City.",
    price: "$250",
    provider: {
      name: "John Doe",
      email: "example@gmail.com",
      avatar: "/profile-avatar.png",
    },
  },
  {
    id: 4,
    description:
      "House cleaning service for residential areas in New York City.",
    price: "$250",
    provider: {
      name: "John Doe",
      email: "example@gmail.com",
      avatar: "/profile-avatar.png",
    },
  },
  {
    id: 5,
    description:
      "House cleaning service for residential areas in New York City.",
    price: "$250",
    provider: {
      name: "John Doe",
      email: "example@gmail.com",
      avatar: "/profile-avatar.png",
    },
  },
  {
    id: 5,
    description:
      "House cleaning service for residential areas in New York City.",
    price: "$250",
    provider: {
      name: "John Doe",
      email: "example@gmail.com",
      avatar: "/profile-avatar.png",
    },
  },
  {
    id: 5,
    description:
      "House cleaning service for residential areas in New York City.",
    price: "$250",
    provider: {
      name: "John Doe",
      email: "example@gmail.com",
      avatar: "/profile-avatar.png",
    },
  },
  {
    id: 5,
    description:
      "House cleaning service for residential areas in New York City.",
    price: "$250",
    provider: {
      name: "John Doe",
      email: "example@gmail.com",
      avatar: "/profile-avatar.png",
    },
  },
];

export default function VendorPage() {
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
        {stashItem.map((item, index) => (
          <StashCard key={index} {...item} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        <div className="col-span-1 lg:col-span-2">
          <h2 className="text-xl font-bold mb-3">Recent activities</h2>
          <div className="bg-secondary p-4 rounded-xl">
            <ScrollArea className="h-[420px]">
              <div className="space-y-3 mr-5">
                {servicesData.map((item, index) => (
                  <div
                    key={index}
                    className="border space-y-4 lg:space-y-0 p-2 flex flex-col lg:flex-row lg:items-center justify-between rounded-xl"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center space-x-4">
                      <IconBox>
                        <FavIcon className="size-5" name="bookings_cc" />
                      </IconBox>
                      <div className="ml-2">
                        <p>{item.description}</p>
                        <p className="text-xl font-semibold">{item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatars src="" fallback="JD" alt={item.provider.name} />
                      <div className="leading-5 mb-1">
                        <p className="font-medium">{item.provider.name}</p>
                        <p>{item.provider.email}</p>
                      </div>
                    </div>
                    <ArrowRight className="hidden lg:block" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3">Event posting preferences</h2>
          <VenStatisticsCh />
        </div>
      </div>
    </div>
  );
}

//  ============== StashCard =============
function StashCard({ icon, label, href, value, btnLabel, progress }: any) {
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
      <h1 className="text-2xl lg:text-[28px] font-bold">{value}</h1>
      {progress && (
        <div className="absolute bottom-2 right-4">
          <ProgressChart stroke="#D9D9D9" progress={progress} />
        </div>
      )}
    </div>
  );
}
