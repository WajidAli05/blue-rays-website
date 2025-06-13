import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Electronics",
    image: "/src/assets/categories/electronics.jpg",
    description: "Discover the latest gadgets, phones, and accessories.",
  },
  {
    name: "Clothing",
    image: "/src/assets/categories/clothing.jpg",
    description: "Find stylish outfits for every occasion and season.",
  },
  {
    name: "Books",
    image: "/src/assets/categories/books.jpg",
    description: "Explore worlds, knowledge, and stories across genres.",
  },
  {
    name: "Home & Kitchen",
    image: "/src/assets/categories/kitchen.jpg",
    description: "Upgrade your home with modern and functional essentials.",
  },
  {
    name: "Sports & Outdoors",
    image: "/src/assets/categories/sports.jpg",
    description: "Gear up for adventure, fitness, and outdoor fun.",
  },
  {
    name: "Toys & Games",
    image: "/src/assets/categories/toys.jpg",
    description: "Fun, learning, and imagination for all ages.",
  },
  {
    name: "Health & Beauty",
    image: "/src/assets/categories/beauty.jpg",
    description: "Look and feel your best with wellness products.",
  },
  {
    name: "Digital Products",
    image: "/src/assets/categories/digital.jpg",
    description: "Instant access to software, e-books, and online courses.",
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const CategoryCards = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full px-6 py-16 bg-white z-10 mt-16 mb-20 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-12 z-10 relative">
        Shop by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-indigo-100 to-purple-100 hover:bg-blue-100"
          >
            <Card className="rounded-2xl overflow-hidden bg-transparent shadow-none">
              <CardContent className="p-5 flex flex-col h-full">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3 text-center">
                  {cat.name}
                </h3>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="rounded-lg object-cover w-full h-40 border"
                />
                <p className="text-sm text-gray-700 mt-4 mb-6 text-center">
                  {cat.description}
                </p>
                <Button
                  onClick={() =>
                    navigate(`/products/${cat.name.toLowerCase()}`)
                  }
                  className="bg-purple-600 hover:bg-purple-700 text-white mt-auto cursor-pointer"
                >
                  Explore {cat.name}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;