import React, { use } from "react";
import "./IntroSection_products.css";
import { Link } from "react-router-dom";
import { useProducts } from "./ShopContextShopContext";

function IntroSection_products() {
  const { products } = useProducts();
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const featuredProducts = products.slice(0, 4);

  // Helper function to get correct image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "fallback.png";
    // If already full URL (Cloudinary), use as-is
    if (imageUrl.startsWith('http')) return imageUrl;
    // Otherwise, construct with API base URL (for old uploads)
    return `${API_BASE_URL}/${imageUrl.replace(/\\/g, "/")}`;
  };

  return (
    <div>
      <div className="intro-section-products">
        <div className="all-intro-section-products">
          <div className="intro-section-products-header">
            <h1>
              Popular{" "}
              <span>
                <u style={{ color: "rgb(255, 149, 0)" }}>Collection</u>
              </span>
            </h1>
            <p className="intro-section-products-header-p">
              a curated selection of customer favorites and best-selling
              furniture pieces that combine style, comfort, and quality. From
              timeless classics to modern must-haves, these designs are loved by
              our shoppers for their beauty, functionality, and lasting appeal.
            </p>
          </div>
        </div>
        <div className="intro-section-products-right">
          {featuredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="intro-section-products-right-item">
                <span>SAVE 20%</span>
                <img
                  src={getImageUrl(product.imageUrl)}
                  alt={product.productname}
                />
                <p className="title">{product.productname}</p>
                <p className="price">R{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link to="#" className="intro-section-text">
          View All &gt;
        </Link>
      </div>
    </div>
  );
}

export default IntroSection_products;
