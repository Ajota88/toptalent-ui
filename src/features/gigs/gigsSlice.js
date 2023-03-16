import { apiSlice } from "../api/apiSlice";

export const gigsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGigs: builder.query({
      query: ({ minPrice, maxPrice }) => ({
        url: "/gigs",
        method: "GET",
        params: {
          minPrice,
          maxPrice,
        },
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Gig", id: "GIG_LIST" },

            ...result?.map((gig) => ({ type: "Gig", id: gig?.id })),
          ];
        } else {
          return [{ type: "Gig", id: "GIG_LIST" }];
        }
      },
    }),
    getGigById: builder.query({
      query: (id) => ({
        url: `/gigs/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Gig", id: result?.id }],
    }),
  }),
});

export const { useGetGigsQuery, useGetGigByIdQuery } = gigsApiSlice;
