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
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"

const CategoriesNavBar = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/v1/category', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        const data = await res.json();

        if (data.status && Array.isArray(data.data)) {
          const fetchedCategories = data.data.map(cat => ({
            key: cat.key,
            label: cat.label,
          }));

          const fetchedSubcategories = {};
          data.data.forEach(cat => {
            fetchedSubcategories[cat.key] = cat.subCategories || [];
          });

          setCategories(fetchedCategories);
          setSubcategories(fetchedSubcategories);
        } else {
          throw new Error(data.message || "Invalid category data format");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCategory = (categoryKey) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedCategories(new Set());
  };

  if (loading) {
    return (
      <div className="w-full border-b shadow-sm z-40 bg-white dark:bg-gray-900">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 text-sm text-muted-foreground">
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full border-b shadow-sm z-40 bg-white dark:bg-gray-900">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 text-sm text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border-b shadow-sm z-40 bg-white dark:bg-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between py-3 gap-8">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-1">
              {categories.map((category) => (
                <NavigationMenuItem key={category.key}>
                  <NavigationMenuTrigger className="capitalize text-sm font-medium px-3 py-2">
                    {category.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-w-[300px] max-w-[500px]">
                      <div>
                        <h4 className="font-semibold text-base mb-2">
                          {category.label}
                        </h4>
                        <ul className="space-y-1">
                          {(subcategories[category.key] || []).map((sub, i) => (
                            <li key={i}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={`/sub-category/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="text-sm text-muted-foreground hover:text-primary block py-1"
                                >
                                  {sub}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="hidden lg:block">
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

        {/* Mobile Navigation Header */}
        <div className="lg:hidden flex items-center justify-between py-3">
          <span className="text-sm font-medium text-muted-foreground">Categories</span>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-muted-foreground hover:text-primary"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white dark:bg-gray-900">
            <div className="py-2 max-h-[70vh] overflow-y-auto">
              {categories.map((category) => (
                <div key={category.key} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                  <button
                    onClick={() => toggleCategory(category.key)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <span className="capitalize">{category.label}</span>
                    {expandedCategories.has(category.key) ? (
                      <ChevronDown size={16} className="text-muted-foreground" />
                    ) : (
                      <ChevronRight size={16} className="text-muted-foreground" />
                    )}
                  </button>
                  
                  {expandedCategories.has(category.key) && (
                    <div className="bg-gray-50 dark:bg-gray-800/50">
                      {(subcategories[category.key] || []).map((sub, i) => (
                        <Link
                          key={i}
                          to={`/sub-category/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={closeMobileMenu}
                          className="block px-8 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesNavBar;