import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all categories
    getCategories: build.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
} = categoryApi;