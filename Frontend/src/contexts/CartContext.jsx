import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(p => p._id === product._id);

      if (exists) {
        // ✅ Correct toast for increase
        toast.success("Product quantity increased successfully!");
        return prev.map(p =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      // ✅ Correct toast for new product
      toast.success("Product added to cart successfully!");
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const decreaseFromCart = (productId) => {
    setCartItems(prev => {
      const item = prev.find(p => p._id === productId);

      if (!item) return prev;

      if (item.qty === 1) {
        // ✅ Correct toast for remove at qty=1
        toast.success("Product removed from cart.");
        return prev.filter(p => p._id !== productId);
      }

      // ✅ Correct toast for decrease
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