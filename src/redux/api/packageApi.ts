import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const packageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Package
    createPackage: build.mutation({
      query: (data) => {
        // Create FormData to handle file upload
        const formData = new FormData();
        
        // Append all data fields to FormData
        Object.keys(data).forEach(key => {
          if (data[key] !== null && data[key] !== undefined) {
            if (key === 'image' && data[key] instanceof File) {
              formData.append('image', data[key]);
            } else if (key === 'services' || key === 'addons') {
              // For arrays, serialize them appropriately
              formData.append(key, JSON.stringify(data[key]));
            } else {
              formData.append(key, data[key]);
            }
          }
        });
        
        return {
          url: "/vendor/package/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [tagTypes.packages],
    }),

    // Get Vendor Packages
    getVendorPackages: build.query({
      query: () => ({
        url: "/vendor/packages",
        method: "GET",
      }),
      providesTags: [tagTypes.packages],
    }),

    // Update Package
    updatePackage: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/vendor/package/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: [tagTypes.packages],
    }),

    // Delete Package
    deletePackage: build.mutation({
      query: (id) => ({
        url: `/vendor/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.packages],
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useGetVendorPackagesQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;