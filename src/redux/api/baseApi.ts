import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import axiosBaseQuery from "@/lib/axiosBaseQuery";

const apiBaseUrl =
  (process.env.NEXT_PUBLIC_API_URL as string) ||
  "http://127.0.0.1:8000/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
