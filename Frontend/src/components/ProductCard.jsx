import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext"

// Capitalize first letter of any string
const capitalize = str => str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

const ProductCard = ({ product }) => {
  //get addToCart function from CartContext
  const { addToCart } = useCart();

  if (!product) {
    return (
      <Card className="p-4">
        <CardContent>No product found.</CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="
        group w-full max-w-sm rounded-2xl border bg-white
        transition transform hover:scale-105 hover:drop-shadow-xl hover:bg-blue-600 hover:text-white
      "
    >
      <CardHeader className="p-0 mt-0">
        <img
          src={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..."} // shortened for brevity
          alt={product.name}
          className="rounded-t-2xl w-full h-52 object-cover"
        />
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold group-hover:text-white">
            {product.name}
          </CardTitle>
          <span className="font-bold text-primary group-hover:text-white">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{capitalize(product.category)}</Badge>
          <Badge variant="outline">{capitalize(product.sub_category)}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium group-hover:text-white">
            {product.availability}
          </span>

          <Button
            onClick={() => addToCart(product)}
            className="bg-white text-black hover:bg-gray-100 relative z-10 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;