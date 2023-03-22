import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authSlice";
import { updateSearchFilter } from "../../features/filters/filtersSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import defaultAvatar from "../../assets/avatar-default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const user = useSelector((state) => state.user);
  const { search } = useSelector((state) => state.filters);
  const [logout, result] = useLogoutMutation();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = () => {
    dispatch(updateSearchFilter(input));
    navigate("/gigs");
  };

  useEffect(() => {
    setInput(search);
  }, [search]);

  //mock user
  /* const user = {
    id: 1,
    username: "Alberto",
    isSeller: true,
    img: "",
  };
 */

  //Detecting scroll
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  ///////////////////////////////////////////

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dk3psx2kr",
    },
  });

  const myImage = cld.image(user?.img);
  myImage.resize(
    thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face()))
  );

  /////////////////////////////////////////////////////////////

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="text">TopTalent</span>
          </Link>
        </div>
        {(active || pathname !== "/") && (
          <div className="search">
            <div className="search-input">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </div>
            <button onClick={handleSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        )}
        <div className="links">
          <Link to="/gigs">
            <span>Explore</span>
          </Link>
          {!user ? (
            <Link to="/login">
              <span>Sign in</span>
            </Link>
          ) : null}
          {user && !user?.isSeller && (
            <Link to="/myprofile">
              <span>Become a Seller</span>
            </Link>
          )}
          {user ? (
            <div className="user" onClick={() => setOpen((prev) => !prev)}>
              <div className="info">
                {!user?.img ? (
                  <img src={defaultAvatar} alt="avatar" />
                ) : (
                  <AdvancedImage cldImg={myImage} />
                )}
                <span>{user?.username}</span>
              </div>
              {open && (
                <div className="options">
                  {user?.isSeller && (
                    <>
                      <Link to="/mygigs">
                        <span>Gigs</span>
                      </Link>
                      <Link to="/add">
                        <span>Add New Gig</span>
                      </Link>
                    </>
                  )}
                  <Link to="/myprofile">
                    <span>My Profile</span>
                  </Link>
                  <Link to="/orders">
                    <span>Orders</span>
                  </Link>
                  <Link to="/messages">
                    <span>Messages</span>
                  </Link>
                  <span onClick={handleLogout}>Log out</span>
                </div>
              )}
            </div>
          ) : (
            <Link to="/register">
              <button>Join</button>
            </Link>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link to="/">Graphics & Design</Link>
            <Link to="/">Video & Animation</Link>
            <Link to="/">Writing & Translation</Link>
            <Link to="/">AI Services</Link>
            <Link to="/">Digital Marketing</Link>
            <Link to="/">Music & Audio</Link>
          </div>
        </>
      )}
    </div>
  );
};
export default Navbar;
