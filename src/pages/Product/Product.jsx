import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useLocation } from "react-router-dom";

function Products() {
  const { products, loading } = useProducts();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");

  useEffect(() => {
  if (categoryFromURL) {
    setCategory(categoryFromURL);
  }
}, [categoryFromURL]);
  

  //for searching
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  
  //filter states
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("");

  if (loading) return <h2>Loading...</h2>;

  if (!products || products.length === 0) {
    return <h2>No products available</h2>;  
  }

  //filter products based on search, category, and price range
  let filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  console.log(products);

  //category filtering
  if (category !== "all") {
  filteredProducts = filteredProducts.filter((product) =>
    product.category.toLowerCase().includes(category.toLowerCase())
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
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <button onClick={() => navigate("/cart")}>
        Go to Cart
      </button>

      <button onClick={() => navigate("/wishlist")}>
        Go to Wishlist
      </button>

      {cartItems.length > 0 && (
        <button
          onClick={() => navigate("/checkout")}
          style={{
            marginLeft: "10px",
            padding: "8px 15px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Checkout ({cartItems.length} items)
        </button>
)}

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
        </select>

        <select onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">All Prices</option>
          <option value="0-50">0 - 50</option>
          <option value="50-100">50 - 100</option>
          <option value="100-500">100+</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low-high">Price Low → High</option>
          <option value="high-low">Price High → Low</option>
        </select>
      </div>
      

      <h2>All Products</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
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