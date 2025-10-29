import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginSignup.css";

function AddProduct() {
  const [productname, setProductname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err.response || err);
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, [API_BASE_URL]);

  // Handle form submission
  const productFn = async (e) => {
    e.preventDefault();



    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", categoryId);
    formData.append("image", image);

    try {
    const pro =  await axios.post(`${API_BASE_URL}/productpost`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product submitted successfully!");

       console.log(pro);

      // Reset form
      setProductname("");
      setDescription("");
      setPrice("");
      setCategoryId("");
      setImage(null);
    } catch (err) {
      console.error("Error submitting product:", err.response || err);
      toast.error("Failed to submit product");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Add Product</h1>
        <form onSubmit={productFn}>
          <div className="loginsignup-fields">
            <input
              type="text"
              name="productname"
              value={productname}
              placeholder="Add product name"
              onChange={(e) => setProductname(e.target.value)}
            />

            <input
              type="text"
              name="description"
              value={description}
              placeholder="Product description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              name="price"
              value={price}
              placeholder="Add Price"
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <label htmlFor="category">Select Category:</label>
          <select
            name="category"
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {loadingCategories ? (
              <option>Loading categories...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat._id || cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            )}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
