import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Admin Dashboard
    adminDashboard: build.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    // Get pending vendors
    getPendingVendors: build.query({
      query: () => ({
        url: "/admin/vendors/pending",
        method: "GET",
      }),
      providesTags: [tagTypes.vendor],
    }),

    // Approve vendor
    approveVendor: build.mutation({
      query: (vendorId: string) => ({
        url: `/admin/vendors/${vendorId}/approve`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.vendor],
    }),

    // Reject vendor
    rejectVendor: build.mutation({
      query: (vendorId: string) => ({
        url: `/admin/vendors/${vendorId}/reject`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.vendor],
    }),

    // Get all vendors
    getAllVendors: build.query({
      query: () => ({
        url: "/admin/vendors",
        method: "GET",
      }),
      providesTags: [tagTypes.vendor],
    }),

    // Get all customers
    getAllCustomers: build.query({
      query: () => ({
        url: "/admin/customers",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),

    // Category management (already in categoryApi but adding admin-specific endpoints)
    createCategory: build.mutation({
      query: (data) => ({
        url: "/admin/add/category",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.categories],
    }),

    editCategory: build.mutation({
      query: ({ category_id, ...data }) => ({
        url: `/admin/edit/category/${category_id}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.categories],
    }),

    deleteCategory: build.mutation({
      query: (category_id: string) => ({
        url: `/admin/delete/category/${category_id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.categories],
    }),

    // Page content management
    addPageContent: build.mutation({
      query: (data) => ({
        url: "/admin/add/page/content",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.pages],
    }),

    addFaqContent: build.mutation({
      query: (data) => ({
        url: "/admin/add/faq/content",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.pages],
    }),

    // Blog management
    createBlog: build.mutation({
      query: (data) => ({
        url: "/admin/blog",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blogs],
    }),

    updateBlog: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/blog/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.blogs],
    }),

    deleteBlog: build.mutation({
      query: (id: string) => ({
        url: `/admin/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
  }),
});

export const {
  useAdminDashboardQuery,
  useGetPendingVendorsQuery,
  useApproveVendorMutation,
  useRejectVendorMutation,
  useGetAllVendorsQuery,
  useGetAllCustomersQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useAddPageContentMutation,
  useAddFaqContentMutation,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = adminApi;
