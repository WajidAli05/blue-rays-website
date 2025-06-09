import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SignInCTA = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-gradient-to-br from-indigo-100 to-purple-100 py-16 px-4 mt-20 mb-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-800 mb-4">
          Ready to start shopping?
        </h2>
        <p className="text-gray-700 mb-6 text-sm sm:text-base">
          Sign in now to explore top deals, exclusive products, and more.
        </p>
        <Button
          onClick={() => navigate("/login")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-sm sm:text-base rounded-xl cursor-pointer transition-all duration-200"
        >
          Sign in to Shop
        </Button>
      </div>
    </motion.section>
  );
};

export default SignInCTA;