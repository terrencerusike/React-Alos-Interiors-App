import React, { useState } from 'react';
import axios from 'axios';
import "./LoginSignup.css";

function Catadd() {
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", category);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:2000/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Success:", response.data);

      // Reset form fields
      setCategory('');
      setImage('');


    } catch (err) {
      console.error("Error uploading:", err);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Add Category </h1>
      <form onSubmit={handleSubmit}>
         <div className="loginsignup-fields">
        <input
          type="text"
          name="name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Add Category"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
</div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Catadd;