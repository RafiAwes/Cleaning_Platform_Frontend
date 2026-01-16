import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create a new booking
    createBooking: build.mutation({
      query: (data) => ({
        url: "/customer/create/bookings",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.bookings],
    }),

    // Get all bookings (customer, vendor, or admin based on role)
    getBookings: build.query({
      query: () => ({
        url: "/customer/bookings",
        method: "GET",
      }),
      providesTags: [tagTypes.bookings],
    }),

    // Get vendor bookings
    getVendorBookings: build.query({
      query: () => ({
        url: "/vendor/bookings",
        method: "GET",
      }),
      providesTags: [tagTypes.bookings],
    }),

    // Get booking details
    getBookingDetails: build.query({
      query: (bookingId: string) => ({
        url: `/vendor/booking-details/${bookingId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bookings],
    }),

    // Accept booking (vendor)
    acceptBooking: build.mutation({
      query: (bookingId: string) => ({
        url: `/vendor/booking/accept/${bookingId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.bookings],
    }),

    // Reject booking (vendor)
    rejectBooking: build.mutation({
      query: (bookingId: string) => ({
        url: `/vendor/booking/reject/${bookingId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.bookings],
    }),

    // Complete booking (vendor)
    completeBooking: build.mutation({
      query: (bookingId: string) => ({
        url: `/vendor/booking/complete/${bookingId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.bookings],
    }),

    // Cancel booking (customer or vendor)
    cancelBooking: build.mutation({
      query: (bookingId: string) => ({
        url: `/customer/cancel/bookings/${bookingId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.bookings],
    }),

    // Rate booking (customer)
    rateBooking: build.mutation({
      query: ({ bookingId, ...data }: { bookingId: string; rating: number; note?: string }) => ({
        url: `/customer/ratings`,
        method: "POST",
        data: { booking_id: bookingId, ...data },
      }),
      invalidatesTags: [tagTypes.bookings],
    }),

    // Get availability dates for a package
    getAvailabilityDate: build.query({
      query: (packageId: string) => ({
        url: `/availability-date/${packageId}`,
        method: "GET",
      }),
    }),

    // Add custom booking
    addCustomBooking: build.mutation({
      query: (data) => ({
        url: "/customer/add/custom/booking",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.bookings],
    }),

    // Get custom booking
    getCustomBooking: build.mutation({
      query: (data) => ({
        url: "/customer/get/custom/booking",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetVendorBookingsQuery,
  useGetBookingDetailsQuery,
  useAcceptBookingMutation,
  useRejectBookingMutation,
  useCompleteBookingMutation,
  useCancelBookingMutation,
  useRateBookingMutation,
  useGetAvailabilityDateQuery,
  useAddCustomBookingMutation,
  useGetCustomBookingMutation,
} = bookingApi;
