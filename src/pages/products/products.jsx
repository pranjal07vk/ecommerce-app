import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";

function Products() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>All Products</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      
    </div>
  );
}

export default Products;