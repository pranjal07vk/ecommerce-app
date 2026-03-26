import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Cart() {
  const { cartItems, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  

  console.log("Cart Page:", cartItems);

  return (
    <div>
      <h2>Cart Page</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>₹{item.price}</p>
            <p>Qty: {item.quantity}</p>
            <button onClick={() => decreaseQty(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(item.id)}>+</button>
          </div>
        ))
      )}

      <h3>Total: ₹{total.toFixed(2)}</h3>
      
    </div>
  );
}

export default Cart;