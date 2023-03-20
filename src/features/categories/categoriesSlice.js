import { apiSlice } from "../api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApiSlice;
