import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary, CloudConfig, CloudinaryImage } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import coverPlaceholder from "../../assets/No_Image_Available.jpg";
import avatarPlaceholder from "../../assets/avatar-default.jpg";
import "./GigCard.scss";

const GigCard = ({ item }) => {
  // Create a Cloudinary instance and set your cloud name.
  let cloudConfig = new CloudConfig({ cloudName: "dk3psx2kr" });
  const myImage = new CloudinaryImage(item?.img, cloudConfig);
  myImage.resize(
    thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face()))
  );

  const myCover = new CloudinaryImage(item?.cover, cloudConfig);

  /////////////////////////////////////////////////////////////

  return (
    <div className="gig-card">
      <Link to={`/gigs/${item.id}`}>
        {!item?.cover ? (
          <img src={coverPlaceholder} alt="" />
        ) : (
          <AdvancedImage cldImg={myCover} />
        )}
        <div className="info">
          <div className="user">
            {!item?.img ? (
              <img src={avatarPlaceholder} alt="" />
            ) : (
              <AdvancedImage cldImg={myImage} />
            )}
            <span>{item.username}</span>
          </div>
          <p>{item.title}</p>
          <div className="star">
            <FontAwesomeIcon icon={faStar} />
            <span>
              {!item.totalReviews
                ? "No reviews"
                : Math.round(item.totalStars / item.totalReviews) || 5}
            </span>
          </div>
        </div>
        <hr />
        <div className="details">
          <FontAwesomeIcon icon={faHeart} />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price || 50}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default GigCard;
