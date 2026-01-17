"use client";
import React, { useState } from "react";
import { Plus, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { ArrowBlackRightIcon, MessageIcon } from "@/icon";
import PackageDetailsVendor from "@/components/common/packageDetails/package-details-vendor";
import PackageDetailsVendorReview from "@/components/common/packageDetails/package-details-vendor-review";
import PackageDetailsRecoded from "@/components/common/packageDetails/package-details-recomended";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import assets from "@/assets";
import { useGetServiceByIdQuery } from "@/redux/api/servicesApi";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface AddOn {
  id: number;
  title: string;
  price: number;
  count: number;
}

interface PackageService {
  id: number;
  title: string;
  description: string | null;
  price: string;
}

interface PackageAddon {
  id: number;
  title: string;
  pivot: {
    price: string;
  };
}

interface Package {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  rating: number | null;
  vendor: {
    id: number;
    name: string;
    email: string;
  };
  services: PackageService[];
  addons: PackageAddon[];
}

export default function PackageDetails() {
  const params = useParams();
  const packageId = params.id as string;
  const { data: packageData, isLoading } = useGetServiceByIdQuery(packageId);
  const package_info: Package | undefined = packageData;

  const [addOns, setAddOns] = useState<AddOn[]>([]);

  React.useEffect(() => {
    if (package_info?.addons) {
      setAddOns(
        package_info.addons.map((addon) => ({
          id: addon.id,
          title: addon.title,
          price: parseFloat(addon.pivot.price),
          count: 0,
        }))
      );
    }
  }, [package_info]);

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
    if (!package_info) return 0;
    const basePrice = parseFloat(package_info.price);
    const addOnsTotal = addOns.reduce(
      (sum, addon) => sum + addon.price * addon.count,
      0
    );
    return basePrice + addOnsTotal;
  };

  const { user } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-6">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="space-y-6 lg:col-span-5">
              <Skeleton className="h-80 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
            <div className="lg:col-span-7">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!package_info) {
    return (
      <div className="min-h-screen bg-white pt-6">
        <div className="container px-4">
          <p className="text-center text-gray-500">Package not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-6">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Section */}
          <div className="space-y-6 lg:col-span-5">
            {/* Image */}
            <div className="relative h-64 xl:h-80 bg-gray-800 rounded-2xl overflow-hidden">
              <Image
                src={package_info.image}
                alt={package_info.title}
                fill
                className="object-cover rounded-[16px] transition duration-300"
              />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-[#000000] font-bold text-[16px] xl:text-[28px]">
                {package_info.title}
              </h1>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src={assets.userPhoto1}
                    alt={package_info.vendor.name}
                    width={40}
                    height={40}
                    className="rounded-full w-[40px] h-[40px]"
                  />
                </div>
                <div>
                  <h1 className="text-[#000000] text-[16px]">
                    {package_info.vendor.name}
                  </h1>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(package_info.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-xs">
                      {package_info.rating?.toFixed(1) || "0.0"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="bg-secondary text-black font-bold"
                size={"lg"}
                icon={false}
              >
                <MessageIcon />
                Message
              </Button>
            </div>

            {/* Vendor Info */}
            <div className="bg-white rounded-2xl p-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  About vendor
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {package_info.vendor.name} is a professional cleaning service
                  provider offering quality cleaning solutions.
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
                  ${package_info.price}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 py-2">
                    About this package
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {package_info.description}
                  </p>
                </div>

                {package_info.services.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 pt-6">
                      Service included
                    </h3>
                    <ul className="space-y-2">
                      {package_info.services.map((service) => (
                        <li
                          key={service.id}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          {service.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {addOns.length > 0 && (
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
                          <div className="flex-1">
                            <div className="text-xs text-gray-900 mb-1 flex justify-between items-center gap-2">
                              <span>{addon.title}</span>
                              <span className="font-bold">${addon.price}</span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => decrementAddOn(addon.id)}
                                  className="w-5 h-5 flex items-center justify-center text-gray-600"
                                  disabled={addon.count === 0}
                                >
                                  −
                                </button>
                                <span className="w-5 text-center text-xs">
                                  {addon.count}
                                </span>
                                <button
                                  onClick={() => incrementAddOn(addon.id)}
                                  className="w-5 h-5 flex items-center justify-center"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 my-6">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      Subtotal: ${calculateSubtotal().toFixed(2)}
                    </span>
                    <Link
                      href={user?.role === "customer" ? "/booking-schedule" : "/auth/login"}
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
            <PackageDetailsVendor vendorId={package_info.vendor.id} packageId={package_info.id} />
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
