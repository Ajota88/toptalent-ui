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
    updateSearchFilter: (state, action) => {
      state.search = action.payload;
    },
    updateCategoryFilter: (state, action) => {
      state.cat = action.payload;
    },
    clearFilters: (state, action) => {
      return (state = {
        search: "",
        cat: "",
        minPrice: 0,
        maxPrice: "",
      });
    },
  },
});

export const {
  updatePriceFilter,
  clearFilters,
  updateSearchFilter,
  updateCategoryFilter,
} = filtersSlice.actions;
export default filtersSlice.reducer;
