function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <img src={product.image} alt={product.title} width="100" />
      <h4>{product.title}</h4>
      <p>₹{product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;