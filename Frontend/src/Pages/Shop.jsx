import React from "react";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import ShopCategory from "../components/ShopCategory";
import banner from "../components/Assets/banner_new_arrivals.webp";



function Shop() {
  return (
    <div>
      <SecondNavbar />
      <ShopCategory  banner={banner} />
      <Footer />
    </div>
  );
}

export default Shop;
