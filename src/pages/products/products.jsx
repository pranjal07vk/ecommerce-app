import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";

function Products() {
  const { products, loading } = useProducts();

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      <h2>All Products</h2>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;