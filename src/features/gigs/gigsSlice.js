import { apiSlice } from "../api/apiSlice";

export const gigsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGigs: builder.query({
      query: () => ({
        url: "/gigs",
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "Gig", id: "  GIGLIST" },

        ...result.map((gig) => ({ type: "Gig", id: gig.id })),
      ],
    }),
  }),
});

export const { useGetGigsQuery } = gigsApiSlice;
