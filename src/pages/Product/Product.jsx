import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useLocation } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");

  useEffect(() => {
    if (categoryFromURL) {
      setCategory(categoryFromURL);
    } else {
      setCategory("all");
    }
  }, [categoryFromURL]);

  //for searching
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const { products, categories, loading, error } = useProducts(category);

  // We will handle loading inside the JSX so filters don't disappear

  //error handling
  if (error) return <h2>{error}</h2>;

  if (!products || products.length === 0) {
    return <h2>No products available</h2>;  
  }

  let filteredProducts = [...products];

  if (debouncedSearch) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }


  //price-based
  if (priceRange === "0-50") {
    filteredProducts = filteredProducts.filter((p) => p.price <= 50);
  } else if (priceRange === "50-100") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price > 50 && p.price <= 100
    );
  } else if (priceRange === "100-500") {
    filteredProducts = filteredProducts.filter((p) => p.price > 100);
  }

  //sorting
  if (sort === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container">
      <div className="nav-header flex items-center">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/cart")}>
          Cart
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/wishlist")}>
          Wishlist
        </button>

        {cartItems.length > 0 && (
          <button
            className="btn btn-success"
            onClick={() => navigate("/checkout")}
          >
            Checkout ({cartItems.length} items)
          </button>
        )}
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* category filter */}
        <select
          value={category}
          onChange={(e) => {
            const selected = e.target.value;
            setCategory(selected);

            if (selected === "all") {
              navigate("/products");
            } else {
              navigate(`/products?category=${selected}`);
            }
          }}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">All Prices</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-500">$100+</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low-high">Price Low → High</option>
          <option value="high-low">Price High → Low</option>
        </select>
      </div>

      <h2 className="text-3xl mb-4 text-center">
        {category !== "all" ? `Category: ${category}` : "All Products"}
      </h2>

      <div className="product-grid">
        {loading ? (
          <div className="text-center w-full mt-4 text-xl text-muted">
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center w-full mt-4 text-muted">
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Products;