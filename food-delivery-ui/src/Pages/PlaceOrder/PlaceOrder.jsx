import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Store/Contexts/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  let subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;  
  const total = subtotal + deliveryFee;

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name: " />
          <input type="text" placeholder="Last name: " />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />

        <div className="multi-fields">
          <input type="text" placeholder="City: " />
          <input type="text" placeholder="State: " />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip code: " />
          <input type="text" placeholder="Country: " />
        </div>
        <input type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
