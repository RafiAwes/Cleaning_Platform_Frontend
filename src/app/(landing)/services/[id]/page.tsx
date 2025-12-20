"use client";
import React, { useState } from "react";
import { Plus, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { ArrowBlackRightIcon, MessageIcon } from "@/icon";
import PackageDetailsVendor from "@/components/common/packageDetails/package-details-vendor";
import PackageDetailsVendorReview from "@/components/common/packageDetails/package-details-vendor-review";
import PackageDetailsRecoded from "@/components/common/packageDetails/package-details-recomended";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import assets from "@/assets";

interface AddOn {
  id: number;
  label: string;
  price: number;
  count: number;
}

export default function PackageDetails() {
  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: 1, label: "Add-on number 1", price: 50, count: 0 },
    { id: 2, label: "Add-on number 2", price: 50, count: 0 },
    { id: 3, label: "Add-on number 3", price: 50, count: 0 },
    { id: 4, label: "Add-on number 4", price: 50, count: 0 },
    { id: 5, label: "Add-on number 5", price: 50, count: 0 },
    { id: 6, label: "Add-on number 6", price: 50, count: 0 },
    { id: 7, label: "Add-on number 7", price: 50, count: 0 },
    { id: 8, label: "Add-on number 8", price: 50, count: 0 },
  ]);

  const basePrice = 250;

  const incrementAddOn = (id: number) => {
    setAddOns(
      addOns.map((addon) =>
        addon.id === id ? { ...addon, count: addon.count + 1 } : addon
      )
    );
  };

  const decrementAddOn = (id: number) => {
    setAddOns(
      addOns.map((addon) =>
        addon.id === id && addon.count > 0
          ? { ...addon, count: addon.count - 1 }
          : addon
      )
    );
  };

  const calculateSubtotal = () => {
    const addOnsTotal = addOns.reduce(
      (sum, addon) => sum + addon.price * addon.count,
      0
    );
    return basePrice + addOnsTotal;
  };
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-white pt-6">
      <div className="container px-4">
        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Section */}
          <div className="space-y-6 lg:col-span-5">
            {/* Image */}
            <div className="relative h-64 xl:h-80 bg-gray-800 rounded-2xl overflow-hidden">
              <Image
                src={assets.service1}
                alt={"photo"}
                fill
                className="object-cover rounded-[16px] transition duration-300"
              />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-[#000000] font-bold text-[16px] xl:text-[28px]">
                House cleaning service for residential areas in New York City.
              </h1>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src={assets.userPhoto1}
                    alt={"photo"}
                    width={40}
                    height={40}
                    className="rounded-full w-[40px] h-[40px]"
                  />
                </div>
                <div>
                  <h1 className="text-[#000000]  text-[16px]">John Doe</h1>

                  <div className="flex items-center gap-1">
                    {[...Array(1)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 fill-yellow-400 text-yellow-400 
                                                    }`}
                      />
                    ))}
                    4.7
                  </div>
                </div>
              </div>

              <Button
                className=" bg-secondary  text-black font-bold"
                size={"lg"}
                icon={false}
              >
                <MessageIcon />
                Message
              </Button>
            </div>

            {/* Vendor Info */}
            <div className="bg-white rounded-2xl ">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  About vendor
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Senectus a condimentum
                  dapibus aliquet gravida placerat molestie dui non lorem.
                  Suscipit eu sed tortor egestas elit tristique felis arcu in
                  facilisis. Sagittis lectus aliquet urna velit velit vulputate
                  vitae pellentesque aliquam. Ornare in donec facilisis sit dui.
                  Etumod elementum potentique molestie feugiat enim maecenas ac
                  morbi. Sodales aliquet eu purus ac dui scelerisque.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-7">
            <div className="border border-gray-200 rounded-xl">
              <h2 className="text-sm font-semibold text-gray-900 mb-3 border-b-2 p-4">
                Package details
              </h2>
              <div className="px-4">
                <div className="text-xl font-bold text-gray-900 py-4">
                  ${basePrice}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 py-2">
                    About this package
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur. Senectus a
                    condimentum dapibus aliquet gravida placerat molestie dui
                    non lorem. Suscipit eu sed tortor egestas elit tristique
                    felis arcu in facilisis. Sagittis lectus aliquet urna velit
                    velit vulputate vitae pellentesque aliquam. Ornare in donec
                    facilisis sit dui. Etumod elementum potentigue molestie
                    feugiat enim maecenas ac morbi. Sodales aliquet eu purus ac
                    dui scelerisque.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 pt-6">
                    Service included
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      Yard cleaning
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      4 room cleaning
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      2 bathroom cleaning
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      Window cleaning
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 pt-6 pb-4">
                    Available add-ons with this package
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {addOns.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between p-3 bg-secondary rounded-[16px]"
                      >
                        <div className="flex-1 ">
                          <div className="text-xs text-gray-900 mb-1 flex justify-evenly items-center gap-5">
                            {addon.label}

                            <ul className="list-disc list-inside">
                              <li className="font-bold">${addon.price}</li>
                            </ul>
                            <button
                              onClick={() => incrementAddOn(addon.id)}
                              className="w-6 h-6 flex items-center justify-center "
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 my-6">
                  <div className="flex items-center justify-between  ">
                    <span className="font-semibold text-gray-900">
                      Subtotal: ${calculateSubtotal()}
                    </span>
                    <Link
                      href={user.role == "user" ? "/booking-schedule" : "/auth"}
                    >
                      <Button className="" size="lg" icon={true}>
                        Continue
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple component here */}
        <div className="mb-10">
          <div className="mt-8">
            <PackageDetailsVendor />
          </div>

          <div className="mt-8">
            <PackageDetailsVendorReview />
          </div>

          <div className="mt-8">
            <PackageDetailsRecoded />
          </div>
        </div>
      </div>
    </div>
  );
}
