import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      
      {/* Hero Section */}
      <h1>Welcome to My Store 🛍️</h1>
      <p>Find the best products at the best prices</p>

      <button
        onClick={() => navigate("/products")}
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Explore Products
      </button>

      {/* Navigation Section */}
      <div style={{ marginTop: "30px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => navigate("/cart")}>Go to Cart</button>
        <button onClick={() => navigate("/wishlist")}>Go to Wishlist</button>
      </div>

      {/* Categories */}
      <div style={{ marginTop: "40px" }}>
        <h2>Shop by Category</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
          <button onClick={() => navigate("/products")}>Electronics</button>
          <button onClick={() => navigate("/products")}>Clothing</button>
          <button onClick={() => navigate("/products")}>Jewelry</button>
        </div>
      </div>

    </div>
  );
}

export default Home;