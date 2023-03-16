import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaintBrush,
  faAd,
  faPenToSquare,
  faVideoCamera,
  faMusic,
  faBusinessTime,
  faMugHot,
  faChartBar,
  faComputer,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import "./ExploreCategories.scss";

const ExploreCategories = () => {
  return (
    <div className="explore">
      <div className="container">
        <h1>Explore the marketplace</h1>
        <div className="items">
          <div className="item">
            <FontAwesomeIcon icon={faPaintBrush} />
            <div className="line"></div>
            <span>Graphics & Design</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faAd} />
            <div className="line"></div>

            <span>Digital Marketing</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faPenToSquare} />
            <div className="line"></div>
            <span>Writing & Translation</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faVideoCamera} />
            <div className="line"></div>
            <span>Video & Animation</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faMusic} />
            <div className="line"></div>
            <span>Music & Audio</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faComputer} />
            <div className="line"></div>
            <span>Programming & Tech</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faBusinessTime} />
            <div className="line"></div>
            <span>Business</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faMugHot} />
            <div className="line"></div>
            <span>Lifestyle</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faChartBar} />
            <div className="line"></div>
            <span>Data</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faCamera} />
            <div className="line"></div>
            <span>Photography</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExploreCategories;
