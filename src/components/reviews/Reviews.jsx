import React, { useState } from "react";
import { useGetGigReviewsQuery } from "../../features/reviews/reviewsSlice";
import ReviewCard from "../reviewCard/ReviewCard";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
  const [desc, setDesc] = useState("");
  const [star, setStar] = useState(1);

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useGetGigReviewsQuery(gigId);

  const reviewInfo = isLoading ? (
    <h2>Loading...</h2>
  ) : isError ? (
    <h2>Something went wrong</h2>
  ) : reviews.length === 0 ? (
    <h2>There are no reviews</h2>
  ) : (
    reviews?.map((review) => (
      <React.Fragment key={review.id}>
        <ReviewCard review={review} />
        <hr />
      </React.Fragment>
    ))
  );

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {reviewInfo}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm">
          <input
            type="text"
            value={desc}
            placeholder="write your opinion"
            onChange={(e) => setDesc(e.target.value)}
          />
          <select
            name=""
            id=""
            value={star}
            onChange={(e) => setStar(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};
export default Reviews;
