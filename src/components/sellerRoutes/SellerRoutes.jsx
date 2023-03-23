import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SellerRoutes = ({ children }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!user?.isSeller) {
      navigate("/myprofile");
    }
  }, [user]);

  return children;
};
export default SellerRoutes;
