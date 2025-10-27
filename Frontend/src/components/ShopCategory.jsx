import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dropdown_icon from "./Assets/dropdown_icon.png";
import "./ShopCategory.css";
import Item from "./Item";


function ShopCategory(props) {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:2000/productget");
        console.log(response)

        
        // Filter products by category
        const filtered = response.data.filter(
          (prod) => prod.category === categoryName
        );
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryName]);

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
          products.map((prod) => {
            const imageUrl = prod.imageUrl
              ? `http://localhost:2000/${prod.imageUrl.replace(/\\/g, "/")}`
              : "http://localhost:3000/static/media/banner_mens.e4aa52c32b71b7cfa22d.webp"; 
            return (
              <Item
                key={prod._id}
                id={prod._id}
                name={prod.productname}
                image={imageUrl}
                new_price={prod.price}
              />
            );
          })
        )}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
}

export default ShopCategory;
