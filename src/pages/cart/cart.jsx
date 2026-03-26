import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

function Cart() {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <h2>Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index}>
            <h4>{item.title}</h4>
            <p>₹{item.price}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;