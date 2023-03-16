import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import avatarPlaceholder from "../../assets/avatar-default.jpg";
import "./ReviewCard.scss";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="user">
        <img
          className="profile"
          src={review.img || avatarPlaceholder}
          alt="avatar"
        />
        <div className="info">
          <span>{review.username}</span>
          <div className="country">
            <img
              className="flag"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png"
              alt="flag"
            />
            <span>United States</span>
          </div>
        </div>
      </div>
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <FontAwesomeIcon icon={faStar} key={i} />
          ))}
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <FontAwesomeIcon icon={faThumbsUp} />
        <span>Yes</span>
        <FontAwesomeIcon icon={faThumbsDown} />
        <span>No</span>
      </div>
    </div>
  );
};
export default ReviewCard;
