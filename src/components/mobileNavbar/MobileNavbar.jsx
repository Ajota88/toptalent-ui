import { useState } from "react";
import { useLogoutMutation } from "../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import defaultAvatar from "../../assets/avatar-default.jpg";
import "./MobileNavbar.scss";

const customStyles = {
  content: {
    top: "0",
    left: "0",
    right: "auto",
    bottom: "auto",
    height: "100%",
    width: "50vw",
  },
};

Modal.setAppElement("#root");

const MobileNavbar = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const [logout, result] = useLogoutMutation();

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dk3psx2kr",
    },
  });

  const myImage = cld.image(user?.img);
  myImage.resize(
    thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face()))
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleLogout = () => {
    logout();
    navigate("/");
    closeModal();
  };

  return (
    <nav className="mobile-navbar">
      <div className="container">
        <div className="mobile-menu-toggle">
          <FontAwesomeIcon icon={faBars} onClick={openModal} />
        </div>
        <div className="logo">
          <Link to="/">
            <h1>TopTotal</h1>
          </Link>
        </div>
        {!user ? (
          <button>Join</button>
        ) : (
          <div className="user-info">
            {!user?.img ? (
              <img src={defaultAvatar} alt="avatar" />
            ) : (
              <AdvancedImage cldImg={myImage} />
            )}
            <span>{user?.username}</span>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="mobile menu"
        closeTimeoutMS={200}
        className="Menu"
        overlayClassName="MenuOverlay"
      >
        <Link to="/register" onClick={closeModal}>
          {!user && <button>Join TopTotal</button>}
        </Link>
        <h3>Browse Categories</h3>
        <div className="categories">
          <Link to="/" onClick={closeModal}>
            Graphics & Design
          </Link>
          <Link to="/" onClick={closeModal}>
            Video & Animation
          </Link>
          <Link to="/" onClick={closeModal}>
            Writing & Translation
          </Link>
          <Link to="/" onClick={closeModal}>
            AI Services
          </Link>
          <Link to="/" onClick={closeModal}>
            Digital Marketing
          </Link>
          <Link to="/" onClick={closeModal}>
            Music & Audio
          </Link>
        </div>
        {user && (
          <>
            <Link to="/mygigs" onClick={closeModal}>
              <h3>My gigs</h3>
            </Link>
            <Link to="/orders" onClick={closeModal}>
              <h3>My orders</h3>
            </Link>
            <button onClick={handleLogout}>LogOut</button>
          </>
        )}
      </Modal>
    </nav>
  );
};
export default MobileNavbar;
