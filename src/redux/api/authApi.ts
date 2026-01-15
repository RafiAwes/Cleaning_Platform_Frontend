import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // User Registration
    register: build.mutation({
      query: (data) => ({
        url: "/register/",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    
    // User Login
    LoginIn: build.mutation({
      query: (data) => {
        return {
          url: "/login",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.users],
    }),
    
    // Email Verification
    sendVerificationCode: build.mutation({
      query: (data) => ({
        url: "/email/send-verification-code",
        method: "POST",
        data,
      }),
    }),
    
    verifyEmail: build.mutation({
      query: (data) => ({
        url: "/email/verify",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    // Logout
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    
    // Password Reset
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/password/email",
        method: "POST",
        data,
      }),
    }),
    
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/password/reset",
        method: "POST",
        data,
      }),
    }),
    
    // Vendor Document Upload
    uploadBusinessDocuments: build.mutation({
      query: (formData) => ({
        url: "/vendor/upload-business-documents",
        method: "POST",
        body: formData,
        // Indicate that this is FormData so the base query won't override Content-Type
      }),
      invalidatesTags: [tagTypes.users],
    }),
    
    // Get vendor document status
    getVendorDocumentStatus: build.query({
      query: () => ({
        url: "/vendor/document-status",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginInMutation,
  useSendVerificationCodeMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUploadBusinessDocumentsMutation,
  useGetVendorDocumentStatusQuery,
} = authApi;
