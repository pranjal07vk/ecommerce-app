import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  

  console.log("Cart Page:", cartItems);

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "10px",
      marginBottom: "10px"
    }}>
      <h2>Cart Page</h2>

      {cartItems.length === 0 ? (
        <>
          <h3>Your cart is empty 🛒</h3>
          <p>Add some products to continue shopping</p>

          <button onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </>
      ) : (
        cartItems.map((item, index) => (
          <div key={item.id}>
            <h4>{item.title}</h4>

            <p>₹{item.price.toFixed(2)}</p>
            <p>Qty: {item.quantity}</p>

            <button onClick={() => decreaseQty(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(item.id)}>+</button>

            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <h3>Total: ₹{total.toFixed(2)}</h3>
      
    </div>
  );
}

export default Cart;