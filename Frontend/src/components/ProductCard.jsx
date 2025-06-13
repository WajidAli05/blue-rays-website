import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

// Capitalize first letter of any string
const capitalize = str => str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

const ProductCard = ({ product, onAddToCart }) => {
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
        //   src={product.image_link?.[0] || "https://via.placeholder.com/300"}
          src={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAAAQIEAwUGB//EADkQAAIBAwEEBggDCQEAAAAAAAABAwIEERIFMWGRIUFCUYGSExQVIjJxcsGCobEjM0NEUlNUouEG/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9VAnIZAGxAJgDEwEwAkZL3AJksbEwJZLGyWAmSxslgJkMpkMBMgpksCQAAPcAWQyAAxZBsAEwE2AE5BsnIAxZBsTATJYMlgJkspkMBMhlMlgSyWUyWAhAAHtiyLPEWQKyJizxFkB5E2LIsgMlgJgDJb6BslsBNkhkTAWSWNkt9ACZLGyWAmSxslgGQEAHrhknIZArIsiyLIFZJYZEAZBiJywG2S2DbJAMibBiATJY6iGAMljbJYAyGNksAAQAetkMk5EBWQyTkWQKbFkWRMBtksMiYAxMGJgJibBslsAZI2JgLJIMTYCb6CWMTAQAAHpagySAFCFkTYDA32+yZZqFU5Y6U+73jTTsJdq4b+VGPuB42RM91bEg65ZXyK9i2vXXI/FAfPibPofY1p3yeYPYtp3y+YD5wTPonsW0fXL5iXsK26pJV4oD51iPfq2BC/hnkXzSZxr/APP1L93cp/VR/wBA8QT3mm/sprKqmmXS1V8Lpe8ysBCATAAEAHq+hk4cw9DJw5mwCjF6CThzD0EnDmbMAEebI3S+htPgSrq4o+G4lX42FxV7zMzqCti2jerdcy88lrat8v5ip+CMGodLCPTo2re9c78qO9G0rt75f9UeVSaYmRXp0Xtw98n5I70XMz31swRGqMDVTLW99bOiqqe9t+JxpOqA8rb0VUjg046NX2PJ9Wl4cz3dq74vH7GAo8/1aXhzB20ncuZuaEBg9Wk7lzGbRgbCW6uo6aQ0hGeqqXqRxrkuF2XyNukWkD5q4u5aa3rtbhcVRqX5GZ7QoT96ian6oa19j6euLLObhA+cW0LfrmpXzeDrRfW73Tx+dHuOJdwvQruXIDzoruB/xo/MjXFcw/3o/MjuoaV2VyLpip/pXICo7mBY/bxedGmO6t/8iLzo400UrsrkdaUkRWii7g6pE/py/wBDqrqN7qZH+Br9ThSWgM+0ZnW6PcdKWd5i1Gu/7JiKisibEJgPICAD2NAaDRoFpIrPoE6DS6CXQBlcZDjNboJ0AZHGS6DW6CXQBl0DVJ3dBLpKOaRaDGACLTHqOeRagOd284Mp3meTgwEDAQAIAA+maFgYEUsCaAAEycAACa6CGkMAIaIaQABDRLAAJJYAUcpDi0ABCYhAAgAAP//Z"}
          alt={product.name}
          className="rounded-t-2xl w-full h-52 object-cover"
        />
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
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
            onClick={(e) => {
              e.stopPropagation(); // prevents event bubbling
              onAddToCart?.(product);
            }}
            className="bg-white text-black hover:bg-gray-100 z-10 relative"
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