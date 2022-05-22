import React from "react";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import "./OrderItem.css";
import CurrencyFormat from "react-currency-format";

function OrderItem({ order }) {
  return (
    <div className="orderItem">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mm")}</p>
      <p className="orderItem__id">
        <small>{order.id}</small>
      </p>
      {order.data.cart?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}

      <CurrencyFormat
        renderText={(value) => (
          <h3 className="orderItem__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default OrderItem;
