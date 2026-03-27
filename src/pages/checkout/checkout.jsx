import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  // Step 2: Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Step 3: Calculate tax and total
  const tax = subtotal * 0.1; // 10% dummy tax
  const total = subtotal + tax;

  // Step 4: Handle empty cart state
  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Checkout</h2>
        <p>Your cart is empty 😢</p>
      </div>
    );
  }

  // Step 5: Display cart items and totals with responsive inline styles
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Checkout</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {cartItems.map((item) => (
          <div
            key={item.productId}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              alignItems: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 5px 0" }}>{item.title}</h4>
              <p style={{ margin: "2px 0" }}>Qty: {item.quantity}</p>
              <p style={{ margin: "2px 0" }}>Price: ${item.price.toFixed(2)}</p>
              <p style={{ margin: "2px 0" }}>
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "5px",
        }}
      >
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax (10%): ${tax.toFixed(2)}</p>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;