import React, { useState, useEffect } from "react";
import loogo from "./Assets/loogo.png";
import cart_icon from "./Assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useProducts } from "./ShopContextShopContext";

function SecondNavbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const { cart, categories } = useProducts();

  const getTotalCartItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest(".mobile_menu") &&
        !event.target.closest(".mobile_nav")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close mobile menu if open
  };

  const goToContactPage = () => navigate("/contact");

  const handleCategoryClick = (categoryName) => {
    navigate(`/Shop/category/${categoryName}`);
    setIsServicesOpen(false);
    setIsOpen(false);
  };

  return (
    <div
      
    >
      {/* Top Nav */}
      <nav>
        <div className="nav_container">
          <div className="nav_left">
            <Link to="/">
              <img src={loogo} alt="logo" />
            </Link>
          </div>

          <div className="nav_right">
            {/* Desktop Menu */}
            <ul className="nav_link_desktop">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <a href="#about" onClick={scrollToAbout}>
                  ABOUT
                </a>
              </li>
              <li
                className="services_item"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link to="#">PRODUCTS </Link>{" "}
                <span className="arrow">▼</span>
                {isServicesOpen && (
                  <ul className="services_dropdown">
                    {categories &&
                      categories.map((category) => (
                        <li
                          key={category._id}
                          onClick={() => handleCategoryClick(category.name)}
                        >
                          {category.name}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            </ul>

            <ul className="nav_link_desktop_right">
              <li className="nav_link_desktop_right_login">
                <Link to="/Signup">Login</Link>
              </li>
              <li
                style={{
                  border: "1px solid #1473e2",
                  padding: "8px 23px",
                  borderRadius: "5px",
                }}
              >
                <Link to="/Contact">Contact</Link>
              </li>
              <li className="nav-cart">
                <Link to="/Cart">
                  <img src={cart_icon} alt="cart" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
              </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="mobile_menu" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "✕" : "☰"}
            </div>

            {/* Mobile Menu */}
            <div className={`mobile_nav ${isOpen ? "active" : ""}`}>
              <ul>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#about" onClick={scrollToAbout}>
                    About
                  </a>
                </li>
                <li
                  className="mobile_services_item"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Products <span className="arrow">▼</span>
                  <ul
                    className={`mobile_services_dropdown ${
                      isServicesOpen ? "active" : ""
                    }`}
                  >
                    {categories &&
                      categories.map((category) => (
                        <li
                          key={category._id}
                          onClick={() => handleCategoryClick(category.name)}
                        >
                          {category.name}
                        </li>
                      ))}
                  </ul>
                </li>
                <li>
                  <Link to="/Signup" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/Contact" onClick={() => setIsOpen(false)}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/Cart" onClick={() => setIsOpen(false)}>
                    Cart ({getTotalCartItems()})
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SecondNavbar;
