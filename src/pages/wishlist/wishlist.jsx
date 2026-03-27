import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  console.log("Wishlist Page:", wishlistItems);

  return (
    <div>
      <h2>Wishlist Page</h2>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlistItems.map((item) => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>₹{item.price}</p>
            <button onClick={() => removeFromWishlist(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;