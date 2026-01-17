"use client";

import React, { useMemo, useState } from "react";
import assets from "@/assets";
import BookingCalendar from "@/components/common/home/bookingCalendar";
import { Button } from "@/components/ui";
import { CheckIcon, DeleteIcon } from "@/icon";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { useGetServiceByIdQuery, useGetAvailabilityDatesQuery } from "@/redux/api/servicesApi";
import { Skeleton } from "@/components/ui/skeleton";

const BookingSchedule = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageId = searchParams.get("packageId");

  const { data: packageData, isLoading: isPackageLoading } = useGetServiceByIdQuery(
    packageId ?? "",
    { skip: !packageId }
  );

  const { data: availabilityData, isLoading: isAvailabilityLoading } =
    useGetAvailabilityDatesQuery(packageId ?? "", { skip: !packageId });

  const [addOns, setAddOns] = useState<{ id: number; title: string; price: number }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  React.useEffect(() => {
    if (packageData?.addons) {
      setAddOns(
        packageData.addons.map((addon: any) => ({
          id: addon.id,
          title: addon.title,
          price: parseFloat(addon.pivot?.price ?? "0"),
        }))
      );
    }
  }, [packageData]);

  const availableDates = useMemo(() => {
    if (!availabilityData) return [];
    
    const candidates = [
      availabilityData?.available_dates,
      availabilityData?.dates,
      availabilityData?.data?.available_dates,
      availabilityData?.data,
    ];
    
    const dates = candidates.find((value) => Array.isArray(value)) as string[] | undefined;
    return dates || [];
  }, [availabilityData]);

  React.useEffect(() => {
    // Only set initial date when data first loads, not on every selectedDate change
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [availabilityData]);

  const packagePrice = useMemo(() => {
    if (!packageData?.price) return 0;
    return parseFloat(packageData.price);
  }, [packageData]);

  const subtotal = useMemo(
    () => packagePrice + addOns.reduce((sum, addon) => sum + addon.price, 0),
    [packagePrice, addOns]
  );

  const removeAddOn = (id: number) => {
    setAddOns((prev) => prev.filter((addon) => addon.id !== id));
  };

  const formatDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  };

  const selectedDateLabel = selectedDate ? formatDateLabel(selectedDate) : "Select a date";
  const vendorRating = packageData?.rating != null ? Number(packageData.rating).toFixed(1) : "-";

  const isLoading = isPackageLoading || isAvailabilityLoading;
  const hasError = !isLoading && (!packageId || !packageData);

  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className=" bg-white py-8 ">
        <div className="container px-4">
          <h1 className="text-[28px] font-semibold text-center mb-4">
            Schedule booking
          </h1>
          {hasError && (
            <p className="text-center text-sm text-red-600">Unable to load booking details. Please return to services and try again.</p>
          )}
          {isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <Skeleton className="h-[420px] w-full" />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <Skeleton className="h-[520px] w-full" />
              </div>
            </div>
          )}

          {!isLoading && packageData && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Debug Info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="lg:col-span-12 bg-blue-50 border border-blue-200 rounded p-3 text-xs">
                  <p><strong>Debug:</strong> Available dates: {availableDates.length} | Selected: {selectedDate || 'None'}</p>
                </div>
              )}
              <div className="lg:col-span-7">
                {/* booking calendar */}
                <div className=" h-full">
                  <BookingCalendar
                    availableDates={availableDates}
                    selectedDate={selectedDate}
                    onSelect={setSelectedDate}
                  />
                </div>
              </div>

              {/* Right Column - Order Details */}
              <div className="lg:col-span-5 h-full ">
                <div className="border border-gray-200 rounded-lg top-8 h-full flex flex-col justify-between">
                  <h2 className="text-base font-semibold border-b border-gray-200 p-4">
                    Order details
                  </h2>

                  {/* Package */}
                  <div className="space-y-4 p-4 ">
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Package</h3>
                      <div className="flex gap-3">
                        <Image
                          src={packageData.image || assets.userPhoto1}
                          alt={packageData.title}
                          width={40}
                          height={40}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-xs text-gray-600 mb-1">
                            {packageData.title}
                          </p>
                          <p className="text-base font-semibold">${packagePrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="">
                      <h3 className="text-sm font-semibold mb-2">Date</h3>
                      <p className="text-xs text-gray-600">{selectedDateLabel}</p>
                    </div>

                    {/* Add-ons */}
                    <div className="">
                      <h3 className="text-sm font-semibold pb-2">Add-ons</h3>
                      <div className="space-y-2">
                        {addOns.length === 0 && (
                          <p className="text-xs text-gray-500">No add-ons selected</p>
                        )}
                        {addOns.map((addon) => (
                          <div key={addon.id} className=" flex items-center justify-between">
                            <div className="bg-secondary p-2 rounded-lg flex items-center gap-2 px-4">
                              <span className="text-xs text-gray-700">
                                {addon.title}
                              </span>

                              <span className="text-xs font-medium">
                                <ul className="list-disc list-inside">
                                  <li>${addon.price.toFixed(2)}</li>
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
                          src={packageData.vendor?.avatar ?? assets.userPhoto1}
                          alt={packageData.vendor?.name ?? "Vendor"}
                          width={40}
                          height={40}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{packageData.vendor?.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{vendorRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal and Button */}
                  <div className=" pt-4 px-4 border-t border-gray-200 my-6">
                    <div className=" flex items-center justify-between  ">
                      <span className="font-semibold text-gray-900">
                        Subtotal: ${subtotal.toFixed(2)}
                      </span>
                      <Button 
                        className="" 
                        size="lg" 
                        icon={true} 
                        disabled={!selectedDate}
                        onClick={() => {
                          if (selectedDate) {
                            // Store booking data in sessionStorage
                            sessionStorage.setItem("bookingData", JSON.stringify({
                              packageId,
                              selectedDate,
                              addOns: addOns,
                              subtotal
                            }));
                            // Redirect to payment page
                            router.push("/booking-payment");
                          }
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BookingSchedule;
