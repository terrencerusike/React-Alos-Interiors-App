import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LoginSignup.css";

function LoginSignupform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();


   //SIGNUP FORM WITH AXIOS
  const handleFn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        name,
        email,
        password,
      });

      console.log(response.data);

      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Signup failed. Try again.");
      console.error(error);
    }
  };

  return (
   <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
      <form onSubmit={handleFn}>
        <div className="loginsignup-fields">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
    
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    </div>
  );
}

export default LoginSignupform;
