"use client";
import SearchBox from "@/components/common/super-dash/reuse/search-box";
import { Pagination } from "@/components/reusable/pagination";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { VendorTable } from "@/components/reusable/vendor-table";
import { Button, ButtonGroup, TableCell, TableRow } from "@/components/ui";
import IconBox from "@/components/reusable/Icon-box";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reusable/avater";
import { useMemo, useState } from "react";
import FavIcon from "@/favicon/favicon";
import Link from "next/link";

const headersConfig: Record<string, string[]> = {
  New: ["Order details", "User details", "Order time", ""],
  Pending: [
    "Order details",
    "User details",
    "Order time",
    "Assigned stuff",
    "",
  ],
  Completed: ["Order details", "User details", "Delivered time", "Rating", ""],
};

const processItem = [
  { label: "New", color: "bg-[#01AEF0]" },
  { label: "Pending", color: "bg-[#8A38F5]" },
  { label: "Completed", color: "bg-[#2D9D1E]" },
];

const data = [
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
  },
];

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<string>("New");
  const headers = useMemo(() => headersConfig[activeTab], [activeTab]);

  const isLoading = false;

  return (
    <div className="container">
      <div className="flex items-center flex-wrap space-y-2 lg:space-y-0 justify-between mt-6">
        <SearchBox
          className="rounded-md"
          onChange={(v) => console.log(v)}
          leftBtn={true}
          rightBtn={false}
        />
        <ButtonGroup>
          {processItem.map((btn) => (
            <Button
              key={btn.label}
              className={`h-10 bg-transparent border text-black ${activeTab === btn.label ? `${btn.color} text-white hover:text-white` : ""}`}
              onClick={() => setActiveTab(btn.label)}
            >
              {btn.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <VendorTable
        headers={headers}
        pagination={
          <ul className="flex items-center flex-wrap justify-between py-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                500
              </sup>
              orders
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => console.log("")}
                {...dummyJson.meta}
              />
            </li>
          </ul>
        }
      >
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : data?.length > 0 ? (
          data?.map((item, index) => (
            <TableRow key={index} className="border">
              <TableCell>
                <div className="flex">
                  <IconBox className="m-0">
                    <FavIcon className="size-5" name="bookings_cc" />
                  </IconBox>
                  <div className="ml-2">
                    <p>{item.service}</p>
                    <p className="text-xl font-semibold">{item.price}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={""}
                    fallback={item.userName}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <div>
                    <h1 className="text-lg">{item.userName}</h1>
                    <h1 className="text-figma-gray">{item.userEmail}</h1>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <FavIcon name="calender_cc" />
                  <span className="text-figma-gray ml-1">{item.dateTime}</span>
                </div>
              </TableCell>
              {activeTab === "Pending" && (
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={""}
                      fallback={item.assigned.name}
                      alt="profile"
                      fallbackStyle="aStyle"
                    />
                    <div>
                      <h1 className="text-lg">{item.assigned.name}</h1>
                      <h1 className="text-figma-gray">{item.assigned.phone}</h1>
                    </div>
                  </div>
                </TableCell>
              )}
              {activeTab === "Completed" && (
                <TableCell className="relative">
                  <h1 className="border flex w-fit py-1  space-x-2 px-3 rounded-md">
                    <FavIcon name="rating_value" />
                    <span> 5.6</span>
                  </h1>
                </TableCell>
              )}

              <TableCell>
                <Link href="/vendor/bookings/873284">
                  <FavIcon name="arrow_right_cc" />
                </Link>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No Order are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </VendorTable>
    </div>
  );
}
