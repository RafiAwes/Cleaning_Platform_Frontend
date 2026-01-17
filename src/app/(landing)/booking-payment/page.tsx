"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { useGetServiceByIdQuery, useCreateBookingMutation } from "@/redux/api/servicesApi";
import { useAppSelector } from "@/redux/hooks";
import assets from "@/assets";
import { Skeleton } from "@/components/ui/skeleton";

interface BookingData {
  packageId: string | null;
  selectedDate: string | null;
  addOns: Array<{ id: number; title: string; price: number }>;
  subtotal: number;
}

interface BillingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

const BookingPayment = () => {
  const router = useRouter();
  const authUser = useAppSelector((state) => state.auth.user);

  // RTK Query mutation hook
  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

  // Get booking data from sessionStorage or URL params
  const [bookingData, setBookingData] = useState<BookingData>({
    packageId: null,
    selectedDate: null,
    addOns: [],
    subtotal: 0,
  });

  const [billingDetails, setBillingDetails] = useState<BillingFormData>({
    firstName: "",
    lastName: "",
    email: authUser?.email || "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch package data
  const { data: packageData, isLoading } = useGetServiceByIdQuery(
    bookingData.packageId || "",
    { skip: !bookingData.packageId }
  );

  // Load booking data from session/localStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("bookingData");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setBookingData(data);
      } catch (e) {
        setError("Failed to load booking data. Please go back and try again.");
      }
    } else {
      setError("No booking data found. Please go back and select a date first.");
    }
  }, []);

  // Update email when authUser changes
  useEffect(() => {
    if (authUser?.email) {
      setBillingDetails((prev) => ({
        ...prev,
        email: authUser.email,
      }));
    }
  }, [authUser?.email]);

  const handleInputChange = (field: keyof BillingFormData, value: string) => {
    setBillingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!billingDetails.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!billingDetails.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!billingDetails.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!billingDetails.phone.trim()) {
      setError("Phone is required");
      return false;
    }
    if (!billingDetails.address.trim()) {
      setError("Address is required");
      return false;
    }
    if (!billingDetails.city.trim()) {
      setError("City is required");
      return false;
    }
    if (!billingDetails.zipCode.trim()) {
      setError("Zip code is required");
      return false;
    }
    setError(null);
    return true;
  };

  const handleOrderSubmit = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Prepare booking data
      const orderData = {
        package_id: bookingData.packageId,
        booking_date_time: bookingData.selectedDate,
        addons: bookingData.addOns.map((addon) => ({
          id: addon.id,
          quantity: 1,
        })),
        address: billingDetails.address,
        city: billingDetails.city,
        postal_code: billingDetails.zipCode,
        country: billingDetails.country,
        total_price: bookingData.subtotal,
      };

      console.log('Submitting booking data:', orderData);

      // Create booking using RTK Query mutation
      const result = await createBooking(orderData).unwrap();

      console.log('Booking created successfully:', result);

      // Clear session data
      sessionStorage.removeItem("bookingData");

      // Show success message with booking ID
      setOrderSuccess(true);
      const bookingId = result.booking_id || result.booking?.id;
      setSuccessMessage(
        bookingId 
          ? `Order placed successfully! Your booking ID is #${bookingId}.` 
          : (result.message || "Order placed successfully!")
      );

      // Redirect to confirmation after 3 seconds
      setTimeout(() => {
        router.push(`/bookings`);
      }, 3000);
    } catch (err: any) {
      console.error('Booking creation error:', err);
      console.error('Error details:', {
        status: err?.status,
        data: err?.data,
        error: err?.error,
        message: err?.message
      });
      
      // RTK Query errors have a specific structure
      let errorMessage = "An error occurred. Please try again.";
      
      if (err?.data) {
        // Backend returned an error response
        errorMessage = err.data.message || err.data.error || JSON.stringify(err.data);
      } else if (err?.error) {
        // Network or other error
        errorMessage = typeof err.error === 'string' ? err.error : err.error.message || "Network error occurred";
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setError(errorMessage);
      setIsProcessing(false);
    }
  };

  if (error && !bookingData.packageId) {
    return (
      <ProtectedRoute allowedRoles={["customer"]}>
        <div className="bg-white py-8">
          <div className="container px-4">
            <div className="max-w-md mx-auto text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Link href="/services">
                <Button size="lg">Back to Services</Button>
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (orderSuccess) {
    return (
      <ProtectedRoute allowedRoles={["customer"]}>
        <div className="bg-white py-12">
          <div className="container px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <p className="text-sm text-gray-500">Redirecting to your bookings...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className="bg-white py-8">
        <div className="container px-4">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => router.back()}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-[28px] font-semibold">Billing & Payment</h1>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <Skeleton className="h-96 w-full" />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <Skeleton className="h-96 w-full" />
              </div>
            </div>
          )}

          {!isLoading && packageData && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Billing Form */}
              <div className="lg:col-span-7">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded p-4 mb-4 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={billingDetails.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={billingDetails.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={billingDetails.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={billingDetails.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Address Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={billingDetails.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123 Main St"
                    />
                  </div>

                  {/* City, Zip, Country */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={billingDetails.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        value={billingDetails.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={billingDetails.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <div className="space-y-3 mb-6">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="ml-3">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="ml-3">PayPal</span>
                    </label>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-700 mb-6">
                      Payment will be processed through our secure payment gateway.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-5">
                <div className="border border-gray-200 rounded-lg p-6 sticky top-8">
                  <h2 className="text-xl font-semibold border-b border-gray-200 pb-4 mb-4">
                    Order Summary
                  </h2>

                  {/* Package Info */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3">Service</h3>
                    <div className="flex gap-3">
                      <Image
                        src={packageData.image || assets.userPhoto1}
                        alt={packageData.title}
                        width={50}
                        height={50}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{packageData.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {packageData.description?.slice(0, 50)}...
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Selected Date */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2">Date</h3>
                    <p className="text-sm text-gray-600">
                      {bookingData.selectedDate
                        ? new Date(bookingData.selectedDate).toLocaleDateString(
                            undefined,
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "Not selected"}
                    </p>
                  </div>

                  {/* Add-ons */}
                  {bookingData.addOns.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <h3 className="text-sm font-semibold mb-3">Add-ons</h3>
                      <div className="space-y-2">
                        {bookingData.addOns.map((addon) => (
                          <div
                            key={addon.id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">{addon.title}</span>
                            <span className="font-medium">
                              ${addon.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Price</span>
                      <span>${parseFloat(packageData.price).toFixed(2)}</span>
                    </div>
                    {bookingData.addOns.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Add-ons</span>
                        <span>
                          $
                          {bookingData.addOns
                            .reduce((sum, a) => sum + a.price, 0)
                            .toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${bookingData.subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Order Button */}
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleOrderSubmit}
                    disabled={isProcessing || isCreatingBooking}
                  >
                    {(isProcessing || isCreatingBooking) ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BookingPayment;
