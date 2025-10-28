import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
  const API_BASE_URL = process.env.REACT_APP_API_URL;
});



  // Fetch products & categories from Mongo
  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
       
          axios.get(`${API_BASE_URL}/productget`),
          axios.get(`${API_BASE_URL}/categories`) 
        ]);

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products or categories");
        toast.error("Failed to load products or categories");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  //

  useEffect(() => {
  const fetchCartFromBackend = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) return; 
    try {
      const res = await axios.get(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

     
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart from backend:", err);
    }
  };

  fetchCartFromBackend();
}, []);


  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  ////
  function addToCart(product) {
    setCart(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.productname} added to cart`);
  }

  function removeFromCart(_id) {
    setCart(prev => prev.filter(item => item._id !== _id));
    toast.info("Item removed from cart");
  }

async function deleteBn(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/product/${id}`);

    if (response.status === 200) {
      setProducts(prev => prev.filter(p => p._id !== id));

      toast.success("Product deleted successfully");
    }
  } catch (err) {
    console.error(err);
    toast.error("Can't find product or delete failed");
  }
}


async function getProductsByCategory(categoryName, setProducts) {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/category/${categoryName}`);
    setProducts(response.data);
  } catch (err) {
    console.error(err);
  }
}


  const getTotalCartItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);




  
  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        cart,
        addToCart,
        removeFromCart,
        getTotalCartItems,
        deleteBn,
        getProductsByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// HOOKS
export function useProducts() {
  return useContext(ProductContext);
}

export function useCart() {
  const { cart, addToCart, removeFromCart, getTotalCartItems,deleteBn, getProductsByCategory } =
    useContext(ProductContext);
  return { cart, addToCart, removeFromCart, getTotalCartItems, deleteBn, getProductsByCategory };
}
