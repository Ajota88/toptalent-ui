import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../../features/categories/categoriesSlice";
import {
  updatePriceFilter,
  updateCategoryFilter,
  clearFilters,
} from "../../features/filters/filtersSlice";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { useGetGigsQuery } from "../../features/gigs/gigsSlice";
import GigCard from "../../components/gigCard/GigCard";
import Select from "react-select";
//import { gigs } from "../../mockData";
import "./Gigs.scss";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const filters = useSelector((state) => state.filters);
  const [selectdOption, setSelectdOption] = useState("");

  const dispatch = useDispatch();

  const { search } = useLocation();

  const { data: categories } = useGetCategoriesQuery();

  const options = categories?.map((cat) => ({
    value: cat.id,
    label: cat.name.toUpperCase(),
  }));

  options?.unshift({ value: "", label: "ALL" });

  const applyPriceFilter = () => {
    dispatch(updatePriceFilter({ minPrice, maxPrice }));
  };

  const {
    data: gigs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGigsQuery({
    minPrice: filters?.minPrice,
    maxPrice: filters?.maxPrice,
    search: filters?.search,
    cat: filters?.cat,
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const handleSelected = (selected) => {
    setSelectdOption(selected.value);
  };

  useEffect(() => {
    dispatch(updateCategoryFilter(selectdOption));
  }, [selectdOption]);

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Fiverr {">"} Graphics & Designs</span>
        <h2>AI Artists</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, est?
        </p>
        <div className="menu">
          <div className="left">
            <button onClick={handleClearFilters}>Clear Filters</button>
            <Select
              options={options}
              defaultValue={options?.[0]}
              onChange={handleSelected}
            />
            <div className="price-filter">
              <span>Budget</span>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="min price"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="max price"
              />
              <button onClick={applyPriceFilter}>Apply</button>
            </div>
          </div>
          <div className="right">
            <span className="sort-by">Sort By</span>
            <span className="sort-type">
              {sort === "sales" ? " Best Selling" : "Newest"}
            </span>
            <FontAwesomeIcon
              icon={faCaretDown}
              onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
              <div className="right-menu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : isError ? (
          <h2>Something went wrong</h2>
        ) : (
          <div className="cards">
            {gigs?.map((gig) => (
              <GigCard key={gig.id} item={gig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Gigs;
