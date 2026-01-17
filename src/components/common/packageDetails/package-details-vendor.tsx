"use client";
import React from "react";
import assets from "@/assets";
import { Button } from "@/components/ui";
import { ArrowBlackRightIcon } from "@/icon";
import { Star } from "lucide-react";
import Image from "next/image";
import { useGetVendorPackagesQuery } from "@/redux/api/servicesApi";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Package {
  id: number;
  title: string;
  price: string;
  image: string;
  rating: number | null;
  vendor: {
    id: number;
    name: string;
    email: string;
  };
}

const PackageDetailsVendor = ({ vendorId, packageId }: { vendorId?: number; packageId?: string | number }) => {
  // Use props if provided, otherwise get from URL
  const params = useParams();
  const currentPackageId = packageId || (params.id as string);

  const { data: vendorPackages, isLoading } = useGetVendorPackagesQuery(
    { vendorId: vendorId || 4, excludeId: parseInt(String(currentPackageId)), limit: 4 },
    { skip: !vendorId && !currentPackageId }
  );

  const packages: Package[] = vendorPackages?.data || [];

  if (isLoading) {
    return (
      <div>
        <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px] py-4">
          More packages from this vendor
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-secondary rounded-[16px] overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <div>
      <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px] py-4">
        More packages from this vendor
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {packages.map((service) => (
          <Link key={service.id} href={`/services/${service.id}`}>
            <div className="bg-secondary rounded-[16px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              {/* Service Image */}
              <div className="relative w-full h-64 bg-muted overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-[16px] transition duration-300 hover:scale-105"
                />
              </div>

              {/* Service Info */}
              <div className="p-4">
                {/* Title and Price */}
                <div className="flex justify-between">
                  <p className="max-w-[80%] text-sm">{service.title}</p>
                  <span className="text-[#000000] font-bold text-[16px] xl:text-[20px]">
                    ${service.price}
                  </span>
                </div>

                {/* Vendor Info */}
                <div className="flex items-center justify-between mt-4 pt-4">
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={assets.userPhoto1}
                        alt={service.vendor.name}
                        width={40}
                        height={40}
                        className="rounded-full w-[40px] h-[40px]"
                      />
                    </div>
                    <div>
                      <h1 className="text-[#000000] text-[14px]">{service.vendor.name}</h1>

                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(service.rating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                        <span className="text-xs">{service.rating?.toFixed(1) || "0"}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="bg-white text-black font-bold"
                    size={"sm"}
                    icon={false}
                  >
                    Order
                    <ArrowBlackRightIcon className="text-black w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PackageDetailsVendor;
