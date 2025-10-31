import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginSignup.css";

function AddProduct() {
  const [productname, setProductname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:2000";

  // Fetch categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, [API_BASE_URL]);

  // Handle form submission
const productFn = async (e) => {
  e.preventDefault();

  if (!productname || !description || !price || !category || !image) {
    toast.error("Please fill all fields and select an image");
    return;
  }

  const formData = new FormData();
  formData.append("productname", productname);
  formData.append("description", description);
  formData.append("price", price); 
  formData.append("category", category);
  formData.append("image", image);

  try {
    const res = await axios.post(`${API_BASE_URL}/productpost`, formData);
    toast.success("Product submitted successfully!");
    console.log(res.data);

    // Reset form
    setProductname("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage(null);
    
  } catch (err) {
    console.error(err.response || err);
    toast.error("Failed to submit product");
  }
};

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Add Product</h1>
       <form id="product-form" onSubmit={productFn} encType="multipart/form-data">
          <input
            type="text"
            name="productname"
            value={productname}
            placeholder="Product name"
            onChange={(e) => setProductname(e.target.value)}
            required
          />
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            name="price"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
