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
          <div className="space-y-6 lg:col-span-5">
            <div className="relative h-64 xl:h-80 bg-gray-800 rounded-2xl overflow-hidden">
              <Image
                src={package_info.image}
                alt={package_info.title}
                fill
                className="object-cover rounded-2xl transition duration-300"
              />
            </div>

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

              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <MessageIcon />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              {package_info.description}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {package_info.services.length > 0 && (
              <div className="bg-secondary p-6 rounded-2xl space-y-4">
                <h2 className="text-[#000000] font-bold text-xl">Services</h2>
                <div className="space-y-2">
                  {package_info.services.map((service) => (
                    <div key={service.id} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{service.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {addOns.length > 0 && (
              <div className="bg-secondary p-6 rounded-2xl space-y-4">
                <h2 className="text-[#000000] font-bold text-xl">Add-ons</h2>
                <div className="space-y-3">
                  {addOns.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{addon.title}</p>
                        <p className="text-sm text-gray-600">${addon.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrementAddOn(addon.id)}
                          className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{addon.count}</span>
                        <button
                          onClick={() => incrementAddOn(addon.id)}
                          className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-secondary p-6 rounded-2xl space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>${package_info.price}</span>
                </div>
                {addOns.filter((a) => a.count > 0).length > 0 && (
                  <div className="flex justify-between">
                    <span>Add-ons:</span>
                    <span>
                      ${addOns
                        .reduce((sum, addon) => sum + addon.price * addon.count, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
              </div>

              <Link href={user ? "/booking-schedule" : "/auth/login"}>
                <Button className="w-full bg-primary text-white">
                  Book Now
                  <ArrowBlackRightIcon className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <PackageDetailsVendor />
          </div>

          <div className="lg:col-span-7">
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
