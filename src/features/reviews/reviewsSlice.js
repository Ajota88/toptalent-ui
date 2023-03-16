import { apiSlice } from "../api/apiSlice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGigReviews: builder.query({
      query: (gigId) => ({
        url: `/reviews/${gigId}`,
      }),
      providesTags: (result, error, arg) => [
        { type: "Review", id: "REVIEW_LIST" },
        ...result.map((review) => ({ type: "Review", id: review.id })),
      ],
    }),
  }),
});

export const { useGetGigReviewsQuery } = reviewsApiSlice;
