import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const pageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get page content (public)
    getPageContent: build.query({
      query: () => ({
        url: "/page/contents",
        method: "GET",
      }),
      providesTags: [tagTypes.pages],
    }),

    // Get FAQ content (public)
    getFaqContent: build.query({
      query: () => ({
        url: "/faq/contents",
        method: "GET",
      }),
      providesTags: [tagTypes.pages],
    }),
  }),
});

export const {
  useGetPageContentQuery,
  useGetFaqContentQuery,
} = pageApi;
