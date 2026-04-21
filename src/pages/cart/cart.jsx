import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers"; 

function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  

  console.log("Cart Page:", cartItems);

  return (
    <div className="container">
      <div className="nav-header">
        <button className="btn btn-secondary" onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>

      <div className="card max-w-4xl mx-auto">
        <h2 className="text-3xl mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-2xl mb-2 text-muted">Your cart is empty 🛒</h3>
            <p className="mb-4">Add some products to continue shopping</p>
            <button className="btn btn-primary" onClick={() => navigate("/products")}>
              Shop Now
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded" style={{ borderColor: 'var(--border-color)' }}>
                <div style={{ flex: 1 }}>
                  <h4 className="text-xl font-semibold">{item.title}</h4>
                  <p className="text-muted">{formatCurrency(item.price)} each</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button className="btn btn-secondary btn-icon" onClick={() => decreaseQty(item.id)}>-</button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button className="btn btn-secondary btn-icon" onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <p className="font-bold w-24 text-right">{formatCurrency(item.price * item.quantity)}</p>

                  <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center mt-6 pt-6" style={{ borderTop: '2px solid var(--border-color)' }}>
              <h3 className="text-2xl">Total:</h3>
              <h3 className="text-3xl font-bold">{formatCurrency(total)}</h3>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="btn btn-success text-xl px-8 py-3" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;