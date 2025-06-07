"use client";

import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { Award, ShieldCheck, Lightbulb, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Award,
    title: "Trusted Quality",
    description: "We deliver top-quality products from verified sellers.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Your data and purchases are protected by industry standards.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description: "Cutting-edge technology makes your shopping easier and faster.",
  },
  {
    icon: DollarSign,
    title: "Investment Opportunity",
    description: "We’re open to investment opportunities. Reach us at invest@bluerays.tech",
  },
];

const About = () => {
  return (
    <div className="w-full min-h-screen bg-[#f9fbfd] text-gray-900 flex flex-col">
      {/* Header Section with 3D */}
      <section className="relative w-full text-white py-20 px-4 bg-blue-700 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 4] }} className="w-full h-full">
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} intensity={0.8} />
            <OrbitControls enableZoom={false} />
            <Float floatIntensity={2}>
              <mesh>
                <torusKnotGeometry args={[1.4, 0.4, 128, 32]} />
                <meshStandardMaterial color="#60a5fa" wireframe />
              </mesh>
            </Float>
          </Canvas>
        </div>
        <div className="relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Blue Rays Technologies LLC
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Empowering the future of digital commerce with technology, transparency, and trust.
          </motion.p>
        </div>
      </section>

      {/* About Description */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-blue-700">Who We Are</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Blue Rays Technologies LLC, we're on a mission to reshape e-commerce through cutting-edge solutions, unmatched customer service, and relentless innovation.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer shadow-md border border-gray-300 bg-white">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-4">
                    <motion.div whileHover={{ rotate: 12 }}>
                      <Icon className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <h3 className="font-semibold text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Investment Section */}
      <section className="bg-white py-16 px-4 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Interested in Investing?</h2>
          <p className="text-gray-700 mb-2">
            Blue Rays Technologies LLC is open to partnerships and funding collaborations.
          </p>
          <p className="text-blue-600 font-medium">
            📩 Contact us at:{" "}
            <a href="mailto:invest@bluerays.tech" className="underline">
              invest@bluerays.tech
            </a>
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;