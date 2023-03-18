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
    addGig: builder.mutation({
      query: (newGig) => ({
        url: "/gigs",
        method: "POST",
        body: newGig,
      }),
      invalidatesTags: [{ type: "Gig", id: "GIG_LIST" }],
    }),
    getUserGigs: builder.query({
      query: () => ({
        url: "/gigs/user",
      }),
      providesTags: (result, error, arg) => [
        { type: "Gig", id: "USER_GIGS_LIST" },
      ],
    }),
  }),
});

export const {
  useGetGigsQuery,
  useGetGigByIdQuery,
  useAddGigMutation,
  useGetUserGigsQuery,
} = gigsApiSlice;
