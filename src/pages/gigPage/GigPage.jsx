import { useGetGigByIdQuery } from "../../features/gigs/gigsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClock,
  faRecycle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary, CloudConfig, CloudinaryImage } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import Reviews from "../../components/reviews/Reviews";
import coverPlaceholder from "../../assets/No_Image_Available.jpg";
import avatarPlaceholder from "../../assets/avatar-default.jpg";
import "./GigPage.scss";

const Gig = () => {
  const { id } = useParams();

  const {
    data: gig,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGigByIdQuery(id);

  // Create a Cloudinary instance and set your cloud name.
  let cloudConfig = new CloudConfig({ cloudName: "dk3psx2kr" });

  const myImage = new CloudinaryImage(gig?.img, cloudConfig);
  myImage.resize(
    thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face()))
  );

  const myCover = new CloudinaryImage(gig?.cover, cloudConfig);

  return (
    <div className="gig">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Something went wrong</h2>
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">Fiverr {">"} Graphics & Designs</span>
            <h1>{gig.title}</h1>
            <div className="user-main">
              {!gig?.img ? (
                <img src={avatarPlaceholder} alt="" />
              ) : (
                <AdvancedImage cldImg={myImage} />
              )}
              <span>{gig.username}</span>
              <div className="stars">
                {!gig.totalReviews ? (
                  <p>No Reviews</p>
                ) : (
                  Array(Math.round(gig.totalStars / gig.totalReviews))
                    .fill()
                    .map((item, i) => <FontAwesomeIcon icon={faStar} key={i} />)
                )}
                {gig.totalReviews > 0 && <span>3</span>}
              </div>
            </div>
            {!gig?.cover ? (
              <img src={coverPlaceholder} alt="" />
            ) : (
              <AdvancedImage cldImg={myCover} />
            )}
            <h2>About this gig</h2>
            <p>{gig.desc}</p>
            <div className="seller">
              <h2>About the Seller</h2>
              <div className="user-secondary">
                {!gig?.img ? (
                  <img src={avatarPlaceholder} alt="" />
                ) : (
                  <AdvancedImage cldImg={myImage} />
                )}
                <div className="info">
                  <span>{gig.username}</span>
                  <div className="stars">
                    {!gig.totalReviews ? (
                      <p>No Reviews</p>
                    ) : (
                      Array(Math.round(gig.totalStars / gig.totalReviews))
                        .fill()
                        .map((item, i) => (
                          <FontAwesomeIcon icon={faStar} key={i} />
                        ))
                    )}
                    {gig.totalReviews > 0 && <span>3</span>}
                  </div>
                  <button>Contact me</button>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
              </div>
              <hr />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
                repudiandae quam nesciunt laboriosam recusandae exercitationem
                ut doloremque amet illo alias?
              </p>
            </div>
            {/* -------------Reviews-------------------------- */}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>1 AI generated image</h3>
              <h2>{gig.price}</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, deleniti.
            </p>
            <div className="details">
              <div className="item">
                <FontAwesomeIcon icon={faClock} />
                <span>2 days delivery</span>
              </div>
              <div className="item">
                <FontAwesomeIcon icon={faRecycle} />
                <span>3 Revisions</span>
              </div>
            </div>
            <div className="features">
              <div className="item">
                <FontAwesomeIcon icon={faCheck} />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="item">
                <FontAwesomeIcon icon={faCheck} />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="item">
                <FontAwesomeIcon icon={faCheck} />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <Link to={`/payment/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Gig;
