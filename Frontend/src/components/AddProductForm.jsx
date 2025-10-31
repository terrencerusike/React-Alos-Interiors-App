import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./LoginSignup.css";

function AddProduct() {
  const [productname, setProductname] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:2000';

  useEffect(() => {
    async function fetchCategories() {
      try {
      const response = await axios.get(`${API_BASE_URL}/categories`); 
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      } finally {
        setLoadingCategories(false);
      }
    }

    fetchCategories();
  }, [API_BASE_URL]);

const productFn = async (e) => {
  e.preventDefault();

  if (!productname || !description || !price || !categoryId) {
    toast.error("Please fill all fields and select a category");
    return;
  }

  const formData = new FormData();
  formData.append('productname', productname);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('category', categoryId);
  if (image) formData.append('image', image);

  try {
    const response = await axios.post(`${API_BASE_URL}/productpost`, formData);
    toast.success("Product submitted successfully!");
    // Reset form after successful submission
    setProductname('');
    setDescription('');
    setPrice('');
    setImage(null);
    setCategoryId('');
  } catch (err) {
    console.error("Error submitting product:", err);
    console.error("Error response:", err.response?.data);
    toast.error(err.response?.data?.message || "Failed to submit product");
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
          required
        >
          <option value="">Select a category</option>
          {loadingCategories ? (
            <option disabled>Loading categories...</option>
          ) : (
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
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