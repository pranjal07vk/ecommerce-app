import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { getProductById } from "../../services/api";
import { formatCurrency } from "../../utils/helpers"; 

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="container">
      <div className="nav-header flex items-center justify-between">
        <button className="btn btn-secondary" onClick={() => navigate("/products")}>
          ← Back to Products
        </button>
      </div>

      <div className="card max-w-4xl mx-auto flex flex-wrap gap-6 items-center">
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ maxWidth: "350px", width: "100%", objectFit: "contain", margin: "0 auto" }} 
        />
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h2 className="text-4xl mb-2">{product.title}</h2>
          <p className="text-muted mb-4"><strong>Category:</strong> {product.category}</p>
          <p className="text-3xl font-bold mb-4">{formatCurrency(product.price)}</p>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="font-semibold">Rating:</span>
            <span className="text-muted">{product.rating?.rate} ({product.rating?.count} reviews)</span>
          </div>

          <p className="text-lg mb-6 leading-relaxed text-muted">{product.description}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => addToCart(product)}
              className="btn btn-success text-lg px-8 py-3"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(product)}
              className="btn btn-primary text-lg px-8 py-3"
            >
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;