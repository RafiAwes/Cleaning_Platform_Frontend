import { baseApi } from "./baseApi";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllServices: build.query({
      query: (params?: Record<string, any>) => ({
        url: "/packages",
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => {
        // The API returns { success, data: { data: [...], ... } }
        // We want to return just { data: [...], ... } format
        return response?.data || {};
      },
    }),

    getServiceById: build.query({
      query: (id: number | string) => ({
        url: `/packages/${id}`,
        method: "GET",
      }), transformResponse: (response: any) => { return response?.data || {}; },
    }),

    getVendorPackages: build.query({
      query: ({ vendorId, excludeId, limit = 4 }: any) => ({
        url: `/packages/vendor/${vendorId}`,
        method: "GET",
        params: {
          exclude_id: excludeId,
          per_page: limit,
        },
      }),
      transformResponse: (response: any) => {
        return response?.data || {};
      },
    }),

    getRandomPackages: build.query({
      query: ({ limit = 5, excludeId }: any) => ({
        url: `/packages-random/suggestions`,
        method: "GET",
        params: {
          limit,
          exclude_id: excludeId,
        },
      }),
      transformResponse: (response: any) => {
        return response?.data || {};
      },
    }),

    getAvailabilityDates: build.query({
      query: (packageId: number | string) => ({
        url: `/availability-date/${packageId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data || response,
    }),

    createBooking: build.mutation({
      query: (bookingData) => ({
        url: "/customer/create/bookings",
        method: "POST",
        body: bookingData,
      }),
    }),

    getCustomerBookings: build.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      transformResponse: (response: any) => response?.bookings || [],
    }),
  }),
});

export const { 
  useGetAllServicesQuery, 
  useGetServiceByIdQuery,
  useGetVendorPackagesQuery,
  useGetRandomPackagesQuery,
  useGetAvailabilityDatesQuery,
  useCreateBookingMutation,
  useGetCustomerBookingsQuery
} = servicesApi;
