"use client"

import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import {
  Home,
  Info,
  HelpCircle,
  Phone,
  ShoppingCart,
  LogIn,
  LogOut,
} from "lucide-react"

const NavBar = () => {
  const [user, setUser] = useState(null)
  const { cartItems } = useCart();
  const location = useLocation()

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => setUser(null)

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/faqs", label: "FAQs", icon: HelpCircle },
    { to: "/contact", label: "Contact", icon: Phone },
  ]

  return (
    <div className="w-full bg-background border-b shadow-sm z-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Navigation Links */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {links.map(({ to, label, icon: Icon }) => (
              <NavigationMenuItem key={to}>
                <NavigationMenuLink asChild>
                  <Link
                    to={to}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
                      ${
                        location.pathname === to
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:bg-muted hover:text-primary"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
        <Link
          to="/cart"
          className="relative text-muteacd-foreground hover:text-primary hover:scale-110 transition-transform"
        >
          {/* Badge positioned absolutely */}
          <Badge
            className="absolute -top-3 -right-4 h-5 min-w-5 rounded-full px-1 text-xs font-mono tabular-nums z-10"
            variant="destructive"
          >
            {totalItems}
          </Badge>

          {/* Cart icon */}
          <ShoppingCart className="w-5 h-5" />
        </Link>

          {!user ? (
            <Link
              to="/login"
              className="text-muted-foreground hover:text-primary hover:scale-110 transition-transform"
            >
              <LogIn className="w-5 h-5" />
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-primary hover:scale-110 transition-transform"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar