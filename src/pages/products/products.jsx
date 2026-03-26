import useProducts from "../../hooks/useProducts";

function Products() {
  const { products, loading } = useProducts();

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>All Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h4>{product.title}</h4>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;