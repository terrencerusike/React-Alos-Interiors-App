import { useParams } from "react-router-dom";
import "./ProductDisplay.css";
import star_icon from "./Assets/star_icon.png";
import star_dull_icon from "./Assets/star_dull_icon.png";
import mastercard from "./Assets/mastercard.png";
import ozow from "./Assets/ozow.png";
import { useProducts } from "./ShopContextShopContext";


const ProductDisplay = () => {
const { addToCart, deleteBn } = useProducts();
const { products, loading, error } = useProducts();
const { id } = useParams();




  // Find the product by ID
  const product = products.find((p) => p._id === id);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Product not found</p>;

 // Build images array, always with full URLs
const images = product.images && product.images.length > 0
  ? product.images.map(img => `http://localhost:2000/${img.replace(/\\/g, "/")}`)
  : [`http://localhost:2000/${(product.imageUrl || "fallback.png").replace(/\\/g, "/")}`];

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {images.map((img, index) => (
            <img key={index} src={img} alt={product.productname} />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={images[0]} alt={product.productname} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.productname}</h1>
        <div className="productdisplay-right-stars">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={star_icon} alt="star" />
          ))}
          <img src={star_dull_icon} alt="star" />
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            R{product.pricewas || Number(product.price) + 20}
          </div>
          <div className="productdisplay-right-price-new">R{product.price}</div>
        </div>

        <div className="productdisplay-right-description">{product.description}</div>

        <div className="productdisplay-right-category">
          Category: {product.category || "Uncategorized"}
        </div>

        <div className="productdisplay-right-size">
          <h1>Safe & Secure Checkout</h1>
          <div className="productdisplay-right-sizes">
            <img src={ozow} alt="ozow" />
            <img src={mastercard} alt="mastercard" />
           
            
          </div>
        </div>

        <button onClick={() => addToCart(product)}>Add to cart</button>

        <button onClick={() => {
  if(window.confirm("Are you sure you want to delete this product?")) {
    deleteBn(product._id);
  }
}}>
  Delete
</button>
      </div>
    </div>
  );
};

export default ProductDisplay;
