import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserGigsQuery } from "../../features/gigs/gigsSlice";
import ItemList from "../../components/itemList/ItemList";
import "./MyGigs.scss";

const MyGigs = () => {
  const { data: myGigs, isLoading, isError } = useGetUserGigsQuery();
  const user = useSelector((state) => state.user);

  return (
    <div className="mygigs">
      <div className="container">
        {isLoading ? (
          "loading"
        ) : isError ? (
          "error"
        ) : (
          <div className="container">
            <div className="title">
              <h1>Gigs</h1>
              {user.isSeller && <Link to="/add">Add New Gig</Link>}
            </div>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th>Action</th>
                </tr>
              </thead>
              {myGigs?.map((gig) => (
                <ItemList key={gig.id} item={gig} listof="user gigs" />
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default MyGigs;
