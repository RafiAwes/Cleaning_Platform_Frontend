import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all blogs (public)
    getBlogs: build.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: [tagTypes.blogs],
    }),

    // Get single blog (public)
    getBlogById: build.query({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
} = blogApi;
