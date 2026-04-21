import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/api";

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container">
      
      {/* Navigation */}
      <div className="nav-header">
        <button className="btn btn-secondary" onClick={() => navigate("/cart")}>Cart</button>
        <button className="btn btn-secondary" onClick={() => navigate("/wishlist")}>Wishlist</button>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to My Store 🛍️</h1>
        <p>Find the best products at the best prices, delivered right to your door.</p>
        <button
          onClick={() => navigate("/products")}
          className="btn btn-primary text-xl mt-2"
        >
          Explore Products
        </button>
      </div>

      {/* Dynamic Categories */}
      <div className="mt-4 text-center">
        <h2 className="text-3xl mb-4">Shop by Category</h2>

        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              className="category-pill"
              onClick={() => navigate(`/products?category=${cat.slug}`)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;