import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const addonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all addons - accessible to all authenticated users
    getAddons: build.query({
      query: () => ({
        url: "/addons",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        // The backend returns data in 'addons' property
        return response.addons || [];
      },
      providesTags: [tagTypes.addons],
    }),

    // Create addon - admin only
    createAddon: build.mutation({
      query: (data) => ({
        url: "/admin/addons",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.addons],
    }),

    // Update addon - admin only
    updateAddon: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/admin/addons/${id}`,
        method: "PUT",
        data: patch,
      }),
      invalidatesTags: [tagTypes.addons],
    }),

    // Delete addon - admin only
    deleteAddon: build.mutation({
      query: (id) => ({
        url: `/admin/addons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.addons],
    }),
  }),
});

export const {
  useGetAddonsQuery,
  useCreateAddonMutation,
  useUpdateAddonMutation,
  useDeleteAddonMutation,
} = addonApi;

