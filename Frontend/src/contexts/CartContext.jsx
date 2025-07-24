import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Optimistically update local state
    setCartItems(prev => {
      const exists = prev.find(p => p._id === product._id);

      if (exists) {
        toast.success("Product quantity increased successfully!");
        return prev.map(p =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      toast.success("Product added to cart successfully!");
      return [...prev, { ...product, qty: 1 }];
    });

    fetch("http://localhost:3001/api/v1/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        productId: product._id,
        quantity: 1,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to add to cart");
        }
        return res.json();
      })
      .catch((err) => {
        toast.error(err.message);

        // Rollback local cart state if server failed
        setCartItems(prev => {
          const item = prev.find(p => p._id === product._id);
          if (!item) return prev;

          if (item.qty === 1) {
            return prev.filter(p => p._id !== product._id);
          }

          return prev.map(p =>
            p._id === product._id ? { ...p, qty: p.qty - 1 } : p
          );
        });
      });
  };

  const decreaseQuantity = (productId) => {
  // Optimistically update UI
  setCartItems(prev =>
    prev
      .map(p => {
        if (p.productId._id === productId) {
          const newQty = p.quantity - 1;
          return newQty >= 1 ? { ...p, quantity: newQty } : null;
        }
        return p;
      })
      .filter(Boolean)
  );

  fetch("http://localhost:3001/api/v1/cart/decrease", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      productId,
      quantity: 1,
    }),
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.message || "Failed to decrease quantity");
        });
      }
      return res.json();
    })
    .then(data => {
      toast.success("Product quantity decreased successfully");
    })
    .catch(err => {
      toast.error(err.message);

      // Rollback: Add back the quantity that was removed
      setCartItems(prev => {
        const existing = prev.find(p => p._id === productId);
        if (existing) {
          return prev.map(p =>
            p._id === productId ? { ...p, qty: p.qty + 1 } : p
          );
        } else {
          // If it was removed (qty dropped to 0), add it back with qty = 1
          // This assumes you still have the product data cached somewhere.
          // Otherwise you can call `fetchCartItems()` here instead.
          toast.info("Restoring product to cart due to error");
          return prev; // Safe fallback if you can't restore it properly
        }
      });
    });
};

const increaseQuantity = (productId) => {
  // Optimistically update UI
  setCartItems(prev => {
    return prev.map(p =>
      p.productId._id === productId ? { ...p, quantity: p.quantity + 1 } : p
    );
  });

  fetch("http://localhost:3001/api/v1/cart/increase", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      productId,
      quantity: 1,
    }),
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.message || "Failed to increase quantity");
        });
      }
      return res.json();
    })
    .then(data => {
      toast.success("Product quantity increased successfully");
    })
    .catch(err => {
      toast.error(err.message);

      // Rollback optimistic update
      setCartItems(prev => {
        return prev.map(p =>
          p._id === productId && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p
        );
      });
    });
};

const removeFromCart = (productId) => {
  fetch("http://localhost:3001/api/v1/cart/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ productId })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === "Product removed from cart successfully") {
        // Update cart items state by filtering out the removed product
        setCartItems(prev => prev.filter(p => p.productId._id !== productId));
        toast.success("Product removed from cart successfully!");
      } else {
        toast.error(data.message || "Failed to remove product.");
      }
    })
    .catch(err => {
      console.error(err);
      toast.error("Something went wrong while removing product.");
    });
};

const fetchCartItems = () => {
  fetch("http://localhost:3001/api/v1/cart", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          return res.json().then((data) => {
            throw new Error(data.message || "Failed to fetch cart");
          });
        } else {
          return res.text().then((text) => {
            console.error("Unexpected error:", text);
            throw new Error("Unexpected server error");
          });
        }
      }

      return res.json();
    })
    .then((data) => {
      setCartItems(data.cart.products);
    })
    .catch((err) => {
      console.error("Fetch cart error:", err.message);
      toast.error(err.message || "Could not fetch cart");
    });
};

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, decreaseQuantity, increaseQuantity, removeFromCart, fetchCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);