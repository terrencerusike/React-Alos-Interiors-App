import React, { useState, useEffect } from "react";
import loogo from "./Assets/loogo.png";
import Rectangle_right from "./Assets/Rectangle_right.png";
import Rectangle_left from "./Assets/Rectangle_left.png";
import Background from "./Assets/Background.png";
import cart_icon from "./Assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useProducts } from "./ShopContextShopContext";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const { cart, categories } = useProducts();

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
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
  };

  const goToContactPage = () => {
    navigate("/contact");
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/Shop/category/${encodeURIComponent(categoryName)}`);
    setIsServicesOpen(false);
    setIsOpen(false);
  };

  return (
    <div
      className="navbar-container"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
                <Link to="#">PRODUCTS </Link> <span className="arrow">▼</span>
                {isServicesOpen && (
                  <ul className="services_dropdown">
                    {categories &&
                      categories.map((category) => (
                        <li
                          key={category._id}
                          onClick={() =>
                            handleCategoryClick(category.name)
                          }
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
                  <a
                    href="#about"
                    onClick={(e) => {
                      scrollToAbout(e);
                      setIsOpen(false);
                    }}
                  >
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
                          onClick={() =>
                            handleCategoryClick(category.name)
                          }
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

      {/* Banner Section */}
      <div className="nav_bottom">
        <div className="nav_bottom_left">
          <div className="bread_crumb">
            <Link to="#">☰ {">"} Our Products</Link>
          </div>
          <h1 className="nav_bottom_left_h1">
            Your choice is our
            <br /> first and foremost <br />
            <span>
              <u style={{ color: "#ff9500" }}>Priority</u>
            </span>
          </h1>
          <h3>The Real Creative Potential</h3>
          <p>
            Unleash the real creative potential of your space with furniture
            <br />
            that blends style, function, and innovation. We help
            <br />
            you bring your vision to life.
          </p>
          <button className="get-started-btn" onClick={goToContactPage}>
            Get Started
          </button>
        </div>
        <div className="nav_bottom_right">
          <img src={Rectangle_right} className="img_right" alt="" />
          <img src={Rectangle_left} className="img_left" alt="" />
        </div>
      </div>

      {/* Marquee Bar */}
      <div className="marquee-bar">
        <div className="marquee-track">
          <div className="marquee-content">
            <span className="icon">🔒</span> SAFE SHOPPING - 100% SAFE AND
            SECURE ONLINE PAYMENTS
            <span className="icon">🚚</span> FREE DELIVERY ON ALL ONLINE ORDERS
            OVER R3999
          </div>
          <div className="marquee-content">
            <span className="icon">🔒</span> SAFE SHOPPING - 100% SAFE AND
            SECURE ONLINE PAYMENTS
            <span className="icon">🚚</span> FREE DELIVERY ON ALL ONLINE ORDERS
            OVER R3999
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
