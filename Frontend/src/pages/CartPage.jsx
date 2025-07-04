"use client"

import React from "react"
import { useCart } from "@/contexts/CartContext"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const CartPage = () => {
  const { cartItems, addToCart, decreaseFromCart, removeFromCart } = useCart()
  const navigate = useNavigate()

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>
      <Separator />

      {cartItems.length > 0 ? (
        <>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm text-center font-medium">
            You’re one step away from completing your order!
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-4 border rounded-lg p-4 shadow-sm bg-white dark:bg-zinc-900"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => decreaseFromCart(item._id)} 
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-md font-semibold">{item.qty}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCart(item._id)} 
                        className="ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Subtotal */}
          <div className="text-right text-lg font-bold mt-6">
            Subtotal: ${subtotal.toFixed(2)}
          </div>

          {/* Proceed to Shipping */}
          <div>
            <Button
              className="w-full mt-4 text-lg py-6"
              disabled={cartItems.length === 0}
              onClick={() => navigate('/shipping')}
            >
              Proceed to Shipping
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center mt-12 px-4 py-6 border border-red-500 bg-red-100 text-red-700 rounded-md font-medium">
          Your cart is empty. Please add some products to continue.
        </div>
      )}
    </div>
  )
}

export default CartPage