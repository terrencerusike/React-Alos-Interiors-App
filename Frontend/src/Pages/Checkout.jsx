import React from "react";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import CartItems from "../components/CartItems";


function Checkout({ cart, addToCart }) {
  return (
    <div>
      <SecondNavbar />
      <CartItems cart={cart} addToCart={addToCart}/>
      <Footer />
    </div>
  );
}

export default Checkout;
