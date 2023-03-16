import { useState } from "react";
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

  const { search } = useLocation();

  const {
    data: gigs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGigsQuery();

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
            <input type="text" placeholder="min price" />
            <input type="text" placeholder="max price" />
            <button>Apply</button>
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
