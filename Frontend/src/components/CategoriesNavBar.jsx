"use client"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const CategoriesNavBar = () => {
// State variables
const [categories, setCategories] = useState([]);
const [subcategories, setSubcategories] = useState({});

// Fetch categories and subcategories
useEffect(() => {
  fetch('http://localhost:3001/api/v1/category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // <- move credentials outside headers
  })
    .then(response => response.json())
    .then(res => {
      if (res.status && Array.isArray(res.data)) {
        // Extract categories
        const fetchedCategories = res.data.map(cat => ({
          key: cat.key,
          label: cat.label,
        }));

        // Extract subcategories
        const fetchedSubcategories = {};
        res.data.forEach(cat => {
          fetchedSubcategories[cat.key] = cat.subCategories || [];
        });

        setCategories(fetchedCategories);
        setSubcategories(fetchedSubcategories);
      }
    })
    .catch(error => {
      console.error("Error fetching categories:", error);
    });
}, []);

  return (
    <div className="w-full border-b shadow-sm z-40">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-3 gap-8">
        <NavigationMenu>
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
      </div>
    </div>
  )
}

export default CategoriesNavBar