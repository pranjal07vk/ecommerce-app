import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "10px" }}>
      <button onClick={() => navigate("/products")} style={{ marginBottom: "20px" }}>
        ← Back to Products
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ maxWidth: "300px", width: "100%", objectFit: "contain" }} 
        />
        <div style={{ flex: 1 }}>
          <h2>{product.title}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Rating:</strong> {product.rating?.rate} ({product.rating?.count} reviews)</p>
          <p>{product.description}</p>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => addToCart(product)}
              style={{ padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(product)}
              style={{ padding: "10px 20px", backgroundColor: "orange", color: "white", border: "none", borderRadius: "5px" }}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;