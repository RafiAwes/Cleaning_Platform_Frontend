import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Customer Dashboard
    dashboard: build.query({
      query: () => ({
        url: "/customer/dashboard",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),

    // Update customer profile
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/customer/profile/update",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useDashboardQuery: useCustomerDashboardQuery,
  useUpdateProfileMutation: useUpdateCustomerProfileMutation,
} = customerApi;
