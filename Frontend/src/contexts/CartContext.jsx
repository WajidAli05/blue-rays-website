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

    // Call backend using fetch (no axios)
    fetch("http://localhost:3001/api/v1/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // send cookies if using JWT in cookie
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
      .then((data) => {
        console.log("Cart updated on server:", data.cart);
        // Optional: sync cartItems with backend if needed
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

  const decreaseFromCart = (productId) => {
    setCartItems(prev => {
      const item = prev.find(p => p._id === productId);

      if (!item) return prev;

      if (item.qty === 1) {
        toast.success("Product removed from cart.");
        return prev.filter(p => p._id !== productId);
      }

      toast.success("Product quantity decreased successfully.");
      return prev.map(p =>
        p._id === productId ? { ...p, qty: p.qty - 1 } : p
      );
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(p => p._id !== id));
    toast.success("Product removed from cart successfully!");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, decreaseFromCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);