import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const vendorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Vendor Dashboard
    dashboard: build.query({
      query: () => ({
        url: "/vendor/dashboard",
        method: "GET",
      }),
      providesTags: [tagTypes.vendor],
    }),

    // Update vendor profile
    updateVendorProfile: build.mutation({
      query: (formData) => ({
        url: "/vendor/profile/update",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [tagTypes.vendor, tagTypes.users],
    }),

    // Update vendor address
    updateVendorAddress: build.mutation({
      query: (data) => ({
        url: "/vendor/address/update",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vendor],
    }),

    // Add cleaner
    addCleaner: build.mutation({
      query: (formData) => ({
        url: "/vendor/cleaners",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [tagTypes.cleaners],
    }),

    // Get cleaners
    getCleaners: build.query({
      query: (params?: Record<string, any>) => ({
        url: "/vendor/cleaners",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.cleaners],
    }),

    // Get single cleaner
    getCleaner: build.query({
      query: (id: number | string) => ({
        url: `/vendor/cleaners/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.cleaners],
    }),

    updateCleaner: build.mutation({
      query: ({ id, formData }) => ({
        url: `/vendor/cleaners/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [tagTypes.cleaners],
    }),

    deleteCleaner: build.mutation({
      query: (id: number | string) => ({
        url: `/vendor/cleaners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.cleaners],
    }),

    // Set booking target
    setBookingTarget: build.mutation({
      query: (data) => ({
        url: "/vendor/booking/targets",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vendor],
    }),

    // Get revenue targets
    getRevenueTargets: build.query({
      query: () => ({
        url: "/vendor/revenue/targets",
        method: "GET",
      }),
      providesTags: [tagTypes.vendor],
    }),

    // Get targets
    getTargets: build.query({
      query: () => ({
        url: "/vendor/targets",
        method: "GET",
      }),
      providesTags: [tagTypes.vendor],
    }),

    // Get total earnings
    getTotalEarnings: build.query({
      query: () => ({
        url: "/vendor/total",
        method: "GET",
      }),
      providesTags: [tagTypes.vendor],
    }),

    // Get transaction history
    getTransactionHistory: build.query({
      query: () => ({
        url: "/vendor/transaction/history",
        method: "GET",
      }),
      providesTags: [tagTypes.transactions],
    }),

    // Create custom service pricing
    createCustomPrice: build.mutation({
      query: (data) => ({
        url: "/vendor/create/custom-service",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.services],
    }),

    // Inventory endpoints
    getInventory: build.query({
      query: (params?: Record<string, any>) => ({
        url: "/vendor/inventory",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.inventory],
    }),

    getInventoryItem: build.query({
      query: (id: number | string) => ({
        url: `/vendor/inventory/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.inventory],
    }),

    addInventory: build.mutation({
      query: (formData) => ({
        url: "/vendor/inventory",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [tagTypes.inventory],
    }),

    updateInventory: build.mutation({
      query: ({ id, formData }) => ({
        url: `/vendor/inventory/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [tagTypes.inventory],
    }),

    deleteInventory: build.mutation({
      query: (id: number | string) => ({
        url: `/vendor/inventory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.inventory],
    }),
  }),
});

export const {
  useDashboardQuery,
  useUpdateVendorProfileMutation,
  useUpdateVendorAddressMutation,
  useAddCleanerMutation,
  useGetCleanersQuery,
  useGetCleanerQuery,
  useUpdateCleanerMutation,
  useDeleteCleanerMutation,
  useSetBookingTargetMutation,
  useGetRevenueTargetsQuery,
  useGetTargetsQuery,
  useGetTotalEarningsQuery,
  useGetTransactionHistoryQuery,
  useCreateCustomPriceMutation,
  useGetInventoryQuery,
  useGetInventoryItemQuery,
  useAddInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} = vendorApi;
