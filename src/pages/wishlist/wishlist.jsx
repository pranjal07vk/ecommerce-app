import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { formatCurrency } from "../../utils/helpers"; 

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  console.log("Wishlist Page:", wishlistItems);

  return (
    <div className="container">
      <div className="card max-w-4xl mx-auto">
        <h2 className="text-3xl mb-4">Your Wishlist ❤️</h2>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-2xl text-muted">No items in wishlist</h3>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded" style={{ borderColor: 'var(--border-color)' }}>
                <img src={item.image} style={{ width: "80px", height: "80px", objectFit: "contain" }} />
                <div style={{ flex: 1 }}>
                  <h4 className="text-xl mb-1">{item.title}</h4>
                  <p className="font-semibold text-lg">{formatCurrency(item.price)}</p>
                </div>
                <button className="btn btn-danger" onClick={() => removeFromWishlist(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;