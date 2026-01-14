import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const documentApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    uploadDocuments: build.mutation({
      query: (data) => ({
        url: "/vendor/upload-business-documents",
        method: "POST",
        data,
        ContentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.documents],
    }),
  }),
});

export const { useUploadDocumentsMutation } = documentApi;