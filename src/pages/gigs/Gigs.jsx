import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePriceFilter } from "../../features/filters/filtersSlice";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { useGetGigsQuery } from "../../features/gigs/gigsSlice";
import GigCard from "../../components/gigCard/GigCard";
//import { gigs } from "../../mockData";
import "./Gigs.scss";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const filters = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const { search } = useLocation();

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
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
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
