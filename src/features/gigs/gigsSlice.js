import { apiSlice } from "../api/apiSlice";

export const gigsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGigs: builder.query({
      query: () => ({
        url: "/gigs",
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "Gig", id: "GIG_LIST" },

        ...result.map((gig) => ({ type: "Gig", id: gig.id })),
      ],
    }),
    getGigById: builder.query({
      query: (id) => ({
        url: `/gigs/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Gig", id: result.id }],
    }),
  }),
});

export const { useGetGigsQuery, useGetGigByIdQuery } = gigsApiSlice;
