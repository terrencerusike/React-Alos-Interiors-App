/* eslint-disable */

import React from "react";
import { Link } from "react-router-dom";

import "./RecentProducts.css";

function RecentProducts({ currentProductId }) {


  // Get 4 random products excluding the current product
  const recentProducts = products
    .filter((product) => product.id !== currentProductId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="recent-products">
      <h2>Other Products You May Like</h2>
      <div className="recent-products-grid">
        {recentProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="recent-product-item">
              <span>SAVE 20%</span>
              <img src={product.image} alt={product.name} />
              <p className="title">{product.name}</p>
              <p className="price">R{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentProducts;
