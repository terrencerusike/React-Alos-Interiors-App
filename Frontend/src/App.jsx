import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./components/ShopContextShopContext";
import Frontpage from "./Pages/Frontpage";
import Singlepage from "./Pages/Singlepage";
import Checkout from "./Pages/Checkout";
import LoginSignup from "./Pages/LoginSignup";
import Loginpage from "./Pages/Loginpage";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import CartAddform from "./Pages/CatAddform";
import Contactus from "./Pages/Contactus";
import AppProduct from "./Pages/AddProductpage";
import AllProducts from "./Pages/AllProducts";
import Shop from "./Pages/Shop"; 
import PrivateRoute from "./components/PrivateRoute";
import banner from"./components/Assets/banner_new_arrivals.webp"




function App() {
   const [cart, setCart] = useState([]);

const addToCart = (product) => {
  setCart(prevCart => {
    const exists = prevCart.find(item => item._id === product._id);
    if (exists) {
      // Increase quantity
      return prevCart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Add new item with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};

  return (
    <ProductProvider>
      <Router>
        <ToastContainer />
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/product/:id" element={<Singlepage />} />
          <Route path="/signup/" element={<LoginSignup />} />
          <Route path="/cart/" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/addcategory/" element={ <CartAddform /> } />
           <Route path="/addproduct/" element={ <AppProduct/> } />
          <Route path="/Login/" element={<Loginpage />} />
          <Route path="/AllProducts/" element={<AllProducts />} />
          <Route
           path="/Shop/category/:categoryName"
            element={<Shop  />}
          />
          
          <Route path="/Contact/" element={<Contactus />}  />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
