import React from "react";
import "./Footer.css";
import logo from "./Assets/logo.jpg";
import { Link } from "react-router-dom";
import instagram_icon from "./Assets/instagram_icon.png";
import pintester_icon from "./Assets/pintester_icon.png";
import whatsapp_icon from "./Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <Link to="/">
          {" "}
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <ul className="footer-links">
        <li>
          <Link to="/Shop">Products</Link>
        </li>
        <li>
          <Link to="/#about">About</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pintester_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
