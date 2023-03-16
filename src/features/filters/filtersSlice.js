import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  cat: "",
  minPrice: 0,
  maxPrice: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updatePriceFilter: (state, action) => {
      const { minPrice, maxPrice } = action.payload;
      (state.minPrice = minPrice), (state.maxPrice = maxPrice);
    },
    clearFilters: (state, action) => {
      state = {
        search: "",
        cat: null,
        minPrice: 0,
        maxPrice: null,
      };
    },
  },
});

export const { updatePriceFilter, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
