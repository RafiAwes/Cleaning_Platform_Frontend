"use client";

import assets from "@/assets";
import BookingCalendar from "@/components/common/home/bookingCalendar";
import { Button } from "@/components/ui";
import { CheckIcon, DeleteIcon } from "@/icon";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface AddOn {
  id: number;
  label: string;
  price: number;
}

const intState = {
  isDReq: false,
  isFedb: false,
};

const BookingSchedule = () => {
  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: 1, label: "Add-on number 1", price: 50 },
    { id: 2, label: "Add-on number 2", price: 50 },
  ]);

  const packagePrice = 250;
  const subtotal =
    packagePrice + addOns.reduce((sum, addon) => sum + addon.price, 0);

  const removeAddOn = (id: number) => {
    setAddOns(addOns.filter((addon) => addon.id !== id));
  };

  return (
    <div className=" bg-white py-8 ">
      <div className="container px-4">
        <h1 className="text-[28px] font-semibold text-center mb-4">
          Schedule booking
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            {/* booking cleander  */}
            <BookingCalendar />
          </div>

          {/* Right Column - Order Details */}
          <div className="lg:col-span-5">
            <div className="border border-gray-200 rounded-lg   top-8">
              <h2 className="text-base font-semibold border-b border-gray-200 p-4">
                Order details
              </h2>

              {/* Package */}
              <div className="space-y-4 p-4 ">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Package</h3>
                  <div className="flex gap-3">
                    <Image
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop"
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
                        <div className="bg-secondary p-2 rounded-lg flex items-center gap-2 px-4">
                          <span className="text-xs text-gray-700">
                            {addon.label}
                          </span>

                          <span className="text-xs font-medium">
                            <ul className="list-disc list-inside">
                              <li>${addon.price}</li>
                            </ul>
                          </span>
                          <CheckIcon />
                        </div>

                        <button onClick={() => removeAddOn(addon.id)}>
                          <DeleteIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vendor */}
                <div className="mb-6 pb-6 ">
                  <h3 className="text-sm font-semibold mb-3">Vendor</h3>
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
                </div>
              </div>

              {/* Subtotal and Button */}
              <div className="pt-4 px-4 border-t border-gray-200 my-6">
                <div className="flex items-center justify-between  ">
                  <span className="font-semibold text-gray-900">
                    Subtotal: $245
                  </span>
                  <Link href={"/booking-payment"}>
                    <Button className="" size="lg" icon={true}>
                      Next
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSchedule;
