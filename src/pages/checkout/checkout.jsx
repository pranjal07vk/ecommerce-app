import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { formatCurrency } from "../../utils/helpers"; 

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
      <div className="container">
        <div className="card max-w-4xl mx-auto text-center py-8">
          <h2 className="text-3xl mb-4">Checkout</h2>
          <p className="text-xl text-muted">Your cart is empty 😢</p>
        </div>
      </div>
    );
  }

  // Step 5: Display cart items and totals with responsive inline styles
  return (
    <div className="container">
      <div className="card max-w-4xl mx-auto">
        <h2 className="text-3xl mb-4">Checkout</h2>

        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.productId || item.id}
              className="flex items-center gap-4 p-4 border rounded"
              style={{ borderColor: "var(--border-color)" }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
              <div style={{ flex: 1 }}>
                <h4 className="text-xl mb-1">{item.title}</h4>
                <p className="text-muted">Qty: {item.quantity}</p>
                <p className="text-muted">Price: {formatCurrency(item.price)}</p>
                <p className="font-semibold">
                  Total: {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 flex flex-col items-end gap-2" style={{ borderTop: "2px solid var(--border-color)" }}>
          <p className="text-muted">Subtotal: {formatCurrency(subtotal)}</p>
          <p className="text-muted">Tax (10%): {formatCurrency(tax)}</p>
          <h3 className="text-3xl font-bold mt-2">Total: {formatCurrency(total)}</h3>
          
          <button className="btn btn-success text-xl px-8 py-3 mt-4">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;