  "use client"

  import React, { useState } from "react"
  import { Link } from "react-router-dom"
  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu"

  import {
    ShoppingCart,
    LogIn,
    LogOut,
  } from "lucide-react"

  // Example category & subcategory data
  const categories = [
    { key: "1", label: "Electronics" },
    { key: "2", label: "Clothing" },
    { key: "3", label: "Books" },
    { key: "4", label: "Home & Kitchen" },
    { key: "5", label: "Sports & Outdoors" },
    { key: "6", label: "Toys & Games" },
    { key: "7", label: "Health & Beauty" },
  ]

  const subcategories = {
    "1": ["Mobiles", "Laptops", "Cameras", "Headphones", "Accessories"],
    "2": ["Men", "Women", "Kids", "Footwear", "Accessories"],
    "3": ["Fiction", "Non-Fiction", "Academic", "Children's Books"],
    "4": ["Furniture", "Kitchenware", "Decor", "Lighting"],
    "5": ["Fitness", "Cycling", "Camping", "Outdoor Gear"],
    "6": ["Board Games", "Action Figures", "Puzzles"],
    "7": ["Skincare", "Haircare", "Supplements", "Makeup"],
  }

  const NavBar = () => {
    // Replace with actual auth logic later
    const [user, setUser] = useState(null)

    const handleLogout = () => {
      setUser(null)
    }

    return (
      <div className="border-b shadow-sm">
<       div className="flex items-center justify-between px-6 py-3 gap-8">
          {/* Category Menu */}
          <NavigationMenu posittion='popper'>
            <NavigationMenuList className="flex space-x-4">
              {categories.map((category) => (
                <NavigationMenuItem key={category.key}>
                  <NavigationMenuTrigger className="capitalize text-sm font-medium">
                    {category.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 ml-[-10px]">
                    <div className="grid grid-cols-2 gap-4 min-w-[300px] max-w-[500px]">
                      <div>
                        <h4 className="font-semibold text-base mb-2">
                          {category.label}
                        </h4>
                        <ul className="space-y-1">
                          {(subcategories[category.key] || []).map((sub, i) => (
                            <li key={i}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={`/category/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="text-sm text-muted-foreground hover:text-primary"
                                >
                                  {sub}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="hidden md:block">
                        <img
                          src={`/src/assets/banners/${category.key}.jpg`}
                          alt={`${category.label} Promo`}
                          className="rounded-md w-full h-[150px] object-cover"
                        />
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right-side Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-muted-foreground hover:text-primary">
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {!user ? (
              <Link to="/login" className="text-muted-foreground hover:text-primary">
                <LogIn className="w-5 h-5" />
              </Link>
            ) : (
              <button onClick={handleLogout} className="text-muted-foreground hover:text-primary">
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  export default NavBar