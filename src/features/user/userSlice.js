import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "../auth/authSlice";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        return (state = { ...payload });
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.getUserLogged.matchFulfilled,
      (state, { payload }) => {
        return (state = { ...payload });
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.logout.matchFulfilled,
      (state) => {
        return (state = null);
      }
    );
  },
});

export default userSlice.reducer;
