import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Services.scss";

const Services = () => {
  return (
    <div className="services">
      <div className="container">
        <div className="left">
          <h2>A Whole World of Freelance At Your Hands</h2>
          <div className="service">
            <div className="title">
              <FontAwesomeIcon icon={faCheck} />
              <h3>Lorem ipsum dolor sit amet.</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              eum.
            </p>
          </div>
          <div className="service">
            <div className="title">
              <FontAwesomeIcon icon={faCheck} />
              <h3>Lorem ipsum dolor sit amet.</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              eum.
            </p>
          </div>
          <div className="service">
            <div className="title">
              <FontAwesomeIcon icon={faCheck} />
              <h3>Lorem ipsum dolor sit amet.</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              eum.
            </p>
          </div>
          <div className="service">
            <div className="title">
              <FontAwesomeIcon icon={faCheck} />
              <h3>Lorem ipsum dolor sit amet.</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              eum.
            </p>
          </div>
        </div>
        <div className="right">
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="handshake"
          />
        </div>
      </div>
    </div>
  );
};
export default Services;
