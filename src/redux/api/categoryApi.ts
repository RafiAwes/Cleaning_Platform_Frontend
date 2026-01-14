import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: [tagTypes.categories],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;