import React from "react";
import { useSelector } from "react-redux";
import { useGetUserOrdersQuery } from "../../features/orders/ordersSlice";
import { useNavigate } from "react-router-dom";
import coverPlaceholder from "../../assets/No_Image_Available.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary, CloudConfig, CloudinaryImage } from "@cloudinary/url-gen";
import "./Orders.scss";

const Orders = () => {
  const { data: orders, isLoading, isError } = useGetUserOrdersQuery();

  return (
    <div className="orders">
      {isLoading ? (
        <h2>Loaing...</h2>
      ) : isError ? (
        <h2>Something went wrong</h2>
      ) : orders.length === 0 ? (
        <h2>You don't have any orders</h2>
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
            </tr>

            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <img
                    className="image"
                    src={order.img || coverPlaceholder}
                    alt=""
                  />
                </td>
                <td>{order.title || "placeholder title"}</td>
                <td>{order.price}</td>
                <td>
                  <FontAwesomeIcon icon={faMessage} />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
