import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <img src={product.image} alt={product.title} width="100" />

      <h4>{product.title}</h4>
      <p>₹{product.price}</p>

      <button onClick={() => {
        console.log("Adding:", product);
        addToCart(product);
      }}>
        Add to Cart
      </button>

      <button onClick={() => addToWishlist(product)}>
        ❤️ Wishlist
      </button>

      <button
        onClick={() => navigate(`/products/${product.id}`)}
        style={{
          padding: "8px 12px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        View Details
      </button>
    </div>
  ); 
}

export default ProductCard;