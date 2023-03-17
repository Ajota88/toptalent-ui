import { apiSlice } from "../api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: () => ({
        url: `/orders`,
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "UserOrders", id: "USER_ORDER_LIST" },

            ...result?.map((order) => ({ type: "UserOrders", id: order?.id })),
          ];
        } else {
          return [{ type: "UserOrders", id: "USER_ORDER_LIST" }];
        }
      },
    }),
  }),
});

export const { useGetUserOrdersQuery } = ordersApiSlice;
