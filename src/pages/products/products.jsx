import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useState } from "react";

function Products() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase())
);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>All Products</h2>

      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;