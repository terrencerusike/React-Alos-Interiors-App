import dropdown_icon from "./Assets/dropdown_icon.png";
import { useProducts } from "./ShopContextShopContext";
import React, { useState } from "react";
import "./ShopCategory.css";
import Item from "./Item";


function AllProducts(props) {
    const { products} = useProducts();
    const [loading, useloading] = useState(false);
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    // Helper function to get correct image URL
    const getImageUrl = (imageUrl) => {
      if (!imageUrl) return "http://localhost:3000/static/media/banner_mens.e4aa52c32b71b7cfa22d.webp";
      // If already full URL (Cloudinary), use as-is
      if (imageUrl.startsWith('http')) return imageUrl;
      // Otherwise, construct with API base URL (for old uploads)
      return `${API_BASE_URL}/${imageUrl.replace(/\\/g, "/")}`;
    };


  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{products.length}</span> out of {products.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products in this category</p>
        ) : (
          products.map((prod) => (
            <Item
              key={prod._id}
              id={prod._id}
              name={prod.productname}
              image={getImageUrl(prod.imageUrl)}
              new_price={prod.price}
            />
          ))
        )}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
}

export default AllProducts;
