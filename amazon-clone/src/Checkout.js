import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div className="checkout__adSpace">
          <img
            className="checkout_ad"
            src="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/guides/414x125_Custom_image._TTW_.jpg"
            alt=""
          />
        </div>

        <div>
          <h3>Hello {user ? user.email : "Guest"},</h3>
          <h2 className="checkout__title"> Your Shopping Cart</h2>

          {cart.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
