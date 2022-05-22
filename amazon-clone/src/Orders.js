import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import OrderItem from "./OrderItem";
import "./Orders.css";

function Orders() {
  const [{ cart, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid) // get current user collection
        .collection("orders") // access their orders
        .orderBy("created", "desc") // most recent first
        .onSnapshot((snapshot) =>
          setOrders(
            // display order history
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__orderHistory">
        {orders?.map((order) => (
          <OrderItem order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
