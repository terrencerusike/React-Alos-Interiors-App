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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:2000/categories'); 
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      } finally {
        setLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);

const productFn = async (e) => {
  e.preventDefault();

  if (!productname || !description || !price) {
    toast.error("Please fill all fields");
    return;
  }

  const formData = new FormData();
  formData.append('productname', productname);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('category', categoryId);
  if (image) formData.append('image', image);

  try {
    const response = await axios.post('http://localhost:2000/productpost', formData);
    toast.success("Product submitted successfully!");
  } catch (err) {
    console.error("Error submitting product:", err);
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
              <option key={cat.id} value={cat.id}>
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