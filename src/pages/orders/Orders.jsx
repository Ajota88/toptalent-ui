import React from "react";
import { useGetUserOrdersQuery } from "../../features/orders/ordersSlice";
import { useNavigate } from "react-router-dom";
import ItemList from "../../components/itemList/ItemList";
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
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            {orders.map((order) => (
              <ItemList key={order.id} item={order} />
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
