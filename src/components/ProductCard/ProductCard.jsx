import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="text-center mb-4">
        <img src={product.image} alt={product.title} style={{ height: "150px", objectFit: "contain", margin: "0 auto" }} />
      </div>

      <h4 className="text-xl mb-2" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.title}</h4>
      <p className="text-2xl font-bold mb-4">{formatCurrency(product.price)}</p>

      <div className="flex flex-col gap-2 mt-auto">
        <button className="btn btn-primary" onClick={() => {
          console.log("Adding:", product);
          addToCart(product);
        }}>
          Add to Cart
        </button>

        <button className="btn btn-secondary" onClick={() => addToWishlist(product)}>
          ❤️ Wishlist
        </button>

        <button
          className="btn btn-success"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  ); 
}

export default ProductCard;