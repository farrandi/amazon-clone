import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";
import { collection } from "firebase/firestore";

function Payment() {
  const navigate = useNavigate();
  const [{ cart, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(""); // initial: not processed
  const [succeeded, setSucceeded] = useState(false); // initial: payment not successful
  const [error, setError] = useState(null); // initial: no Error
  const [disabled, setDisabled] = useState(true); //initial: disabled
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate special stripe secret to allow customer charge
    const getClientSecet = async () => {
      const response = await axios({
        method: "post",
        // stripe expects it in cents (subunits)
        url: `/payments/create?total=${parseInt(getCartTotal(cart) * 100)}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecet();
  }, [cart]); //happens whenever cart changes

  // console.log("The secret is >>>", clientSecret);
  // console.log(user);

  const handleSubmit = async (e) => {
    // when payment (card details) are submitted -- use Stripe
    e.preventDefault();
    setProcessing(true); // if processing, button is disabled -- prevents multiple clicks

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      })
      .then(async ({ paymentIntent }) => {
        // firestore things
        console.log("here", paymentIntent);
        try {
          await db
            .collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              cart: cart,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
          console.log("passed");
        } catch (e) {
          console.log(e);
        }

        // change states
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        // empty the cart
        dispatch({
          type: "EMPTY_CART",
        });

        navigate("/orders", { replace: true });
      });
  };

  const handleChange = (e) => {
    // when card details are changed
    // display amu errors as customer types card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout"> {cart?.length} items</Link>)
        </h1>

        {/* Delivery Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>1234 Baker Street</p>
            <p>Vancouver, BC</p>
          </div>
        </div>

        {/* Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
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

        {/* Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Call on Stripe API */}
            <form>
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <CardElement onChange={handleChange} />

                <button
                  onClick={handleSubmit}
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* if error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
