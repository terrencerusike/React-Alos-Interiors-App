import React, { useState } from "react";
import { useCart } from "./ShopContextShopContext";
import CartItems from "./CartItems/CartItems";
import "./Cart.css";
import OrderForm from "./OrderForm";

const Cart = () => {
  const { getTotalCartAmount, cartItems } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);

  return (
    <div className="cart">
      <CartItems />
      <div className="cart-bottom">
        <div className="cart-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cart-total-item">
              <p>Subtotal</p>
              <p>R{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-total-item">
              <h3>Total</h3>
              <h3>R{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button
            className="checkout-button"
            onClick={() => setShowOrderForm(true)}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

      {showOrderForm && (
        <OrderForm
          cartItems={cartItems}
          totalAmount={getTotalCartAmount()}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </div>
  );
};

export default Cart;
