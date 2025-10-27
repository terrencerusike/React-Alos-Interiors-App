import dropdown_icon from "./Assets/dropdown_icon.png";
import { useProducts } from "./ShopContextShopContext";
import "./ShopCategory.css";


function AllProducts(props) {
    const { products} = useProducts();
    const [loading, useloading] = useState(false)

    


  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{products.length}</span> out of {products.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products in this category</p>
        ) : (
          products.map((prod) => {
            const imageUrl = prod.imageUrl
              ? `http://localhost:2000/${prod.imageUrl.replace(/\\/g, "/")}`
              : "http://localhost:3000/static/media/banner_mens.e4aa52c32b71b7cfa22d.webp"; 
            return (
              <Item
                key={prod._id}
                id={prod._id}
                name={prod.productname}
                image={imageUrl}
                new_price={prod.price}
              />
            );
          })
        )}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
}

export default AllProducts;
