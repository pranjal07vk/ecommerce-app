import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

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
    </div>
  ); 
}

export default ProductCard;