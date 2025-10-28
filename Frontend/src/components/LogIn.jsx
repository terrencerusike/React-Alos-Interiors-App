import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LoginSignup.css";

function LoginSignupform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  //SIGNUP FORM WITH AXIOS
  const logIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
       email,
        password,
      });

      if(!response){
        throw new Error("Could not get response from server");
      }


     localStorage.setItem('token', response.data.token);


      toast.success("Login successful!");
      navigate("/cart");
    } catch (error) {
      toast.error("Login failed. Try again.");
      console.error(error);
    }
  };

  return (
   <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
      <form onSubmit={logIn}>
        <div className="loginsignup-fields">
            
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
        Dont have an account? <Link to="/signup">Login</Link>
      </p>
    </div>
    </div>
  );
}

export default LoginSignupform;
