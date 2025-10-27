import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CatalogSection.css";

function CatalogSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/categories");
      setCategories(response.data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="catalog-section">
      <div className="grid">
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category, index) => (
            <div key={category._id} className={`item item${index + 1}`}>
              <Link to={`/Shop/category/${category.name}`}>
                <p>{category.name}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CatalogSection;
