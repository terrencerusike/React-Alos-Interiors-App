import React, { useEffect } from "react";
import ProductDisplay from "../components/ProductDisplay";
import SecondNavbar from "../components/SecondNavbar";
import DescriptionBox from "../components/DescriptionBox";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

function Singlepage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <SecondNavbar />
      <ProductDisplay />
      <DescriptionBox />
      
      <Footer />
    </div>
  );
}

export default Singlepage;
