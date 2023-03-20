import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    getUserLogged: builder.query({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "User", id: "USER_INFO" }],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users",
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: [{ type: "User", id: "USER_INFO" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserLoggedQuery,
  useLogoutMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
} = authApiSlice;
