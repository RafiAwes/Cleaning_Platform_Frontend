"use client";

import assets from "@/assets";
import { Button } from "@/components/ui";
import { CheckIcon, DeleteIcon } from "@/icon";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AddOn {
  id: number;
  label: string;
  price: number;
}
const PendingPackageHistory = () => {
  const router = useRouter();
  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: 1, label: "Add-on number 1", price: 50 },
    { id: 2, label: "Add-on number 2", price: 50 },
  ]);

  const packagePrice = 250;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Booking details</h1>

      <div className="bg-secondary p-4  rounded-figma-sm">
        <div className="space-y-4 p-4 ">
          <div>
            <h3 className="text-sm font-semibold mb-3">Package</h3>

            <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between">
              <div className="flex gap-3">
                <Image
                  src={assets.bookingDetailsPhoto}
                  alt="House"
                  width={40}
                  height={40}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1">
                    House cleaning service for residential areas in New York
                    City.
                  </p>
                  <p className="text-base font-semibold">${packagePrice}</p>
                </div>
              </div>
              <div>
                <ul className="list-disc list-inside">
                  <li
                    className={` text-white font-medium text-center text-sm px-4  p-2 rounded-figma-sm bg-[#2A7FFF]`}
                  >
                    Pending
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Date */}
          <div className="">
            <h3 className="text-sm font-semibold mb-2">Date</h3>
            <p className="text-xs text-gray-600">17th November, 2025</p>
          </div>
          {/* Add-ons */}
          <div className="">
            <h3 className="text-sm font-semibold pb-2">Add-ons</h3>
            <div className="space-y-2">
              {addOns.map((addon) => (
                <div
                  key={addon.id}
                  className=" flex items-center justify-between"
                >
                  <div className="border p-2 rounded-lg flex items-center gap-2 px-4">
                    <span className="text-xs text-gray-700">{addon.label}</span>

                    <span className="text-xs font-medium">
                      <ul className="list-disc list-inside">
                        <li>${addon.price}</li>
                      </ul>
                    </span>
                    <CheckIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Vendor */}
          <div className="mb-6 pb-6 ">
            <h3 className="text-sm font-semibold mb-3">Vendor</h3>
            <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={assets.userPhoto1}
                  alt="Vendor"
                  width={40}
                  height={40}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">4.5</span>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  onClick={() => router.push("/vendor-profile")}
                  className="bg-transparent text-black border"
                >
                  See profile
                </Button>
              </div>
            </div>
          </div>
          <Button className="w-full bg-[#FF5445]">X Cancel order</Button>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <h2>Before canceling any order please read our</h2>
            <span className="text-[#FF5445] font-semibold underline underline-offset-2 pl-2">
              {" "}
              Cancelation policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPackageHistory;
