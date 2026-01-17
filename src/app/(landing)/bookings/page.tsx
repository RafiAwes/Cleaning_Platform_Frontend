"use client";

import { useGetCustomerBookingsQuery } from "@/redux/api/servicesApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/protectedRoute";
import { CalendarDays, MapPin, Package } from "lucide-react";
import { format } from "date-fns";

const BookingsPage = () => {
  const { data: bookings, isLoading, error } = useGetCustomerBookingsQuery({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className="bg-white py-8 min-h-screen">
        <div className="container px-4">
          <h1 className="text-[28px] font-semibold mb-6">My Bookings</h1>

          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load bookings. Please try again.</p>
            </div>
          )}

          {!isLoading && !error && bookings && bookings.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No bookings yet</p>
              <p className="text-gray-500 mt-2">Start by browsing our services!</p>
            </div>
          )}

          {!isLoading && !error && bookings && bookings.length > 0 && (
            <div className="space-y-4">
              {bookings.map((booking: any) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {booking.package?.name || "Service Booking"}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          Booking ID: #{booking.id}
                        </p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Date */}
                      <div className="flex items-start gap-2">
                        <CalendarDays className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Scheduled Date</p>
                          <p className="text-sm text-gray-600">
                            {booking.booking_date_time
                              ? format(new Date(booking.booking_date_time), "PPP 'at' p")
                              : "Not scheduled"}
                          </p>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Service Location</p>
                          <p className="text-sm text-gray-600">{booking.address}</p>
                        </div>
                      </div>

                      {/* Add-ons */}
                      {booking.addons && booking.addons.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm font-medium mb-2">Add-ons:</p>
                          <div className="flex flex-wrap gap-2">
                            {booking.addons.map((addon: any) => (
                              <Badge key={addon.id} variant="outline">
                                {addon.title} - ${parseFloat(addon.pivot.price).toFixed(2)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Total Price */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total Price</span>
                          <span className="text-xl font-bold text-primary">
                            ${parseFloat(booking.total_price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BookingsPage;
