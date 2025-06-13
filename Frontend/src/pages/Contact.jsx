"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

function ContactForm() {
  return (
    <form className="grid gap-4 w-full">
      <input
        type="text"
        placeholder="Your name"
        className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Your email"
        className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <textarea
        placeholder="Your message"
        rows={5}
        className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
      />
      <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-fit px-6">
        Send Message
      </Button>
    </form>
  );
}

const Contact = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    // Set a timer to show the loader only if loading takes more than 300ms
    const loaderTimer = setTimeout(() => {
      if (!isPageReady) setShowLoader(true);
    }, 300);

    // Simulate immediate readiness (like page layout and 3D rendering mounting)
    const renderReady = requestAnimationFrame(() => {
      setIsPageReady(true);
      setShowLoader(false);
    });

    return () => {
      clearTimeout(loaderTimer);
      cancelAnimationFrame(renderReady);
    };
  }, []);

  if (!isPageReady && showLoader) {
    return <Loader size="lg" message="Preparing contact page..." />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Hero Section with Text Left and 3D Model Right */}
      <section className="w-full bg-blue-700 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Get in touch with us</h1>
            <p className="text-blue-100 text-lg max-w-md">
              Whether you're a customer or investor, we’d love to hear from you.
            </p>
          </motion.div>

          {/* 3D Model */}
          <div className="w-full h-64 md:h-72 lg:h-80">
            <Canvas camera={{ position: [0, 0, 3] }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 2]} />
              <Float floatIntensity={1.5}>
                <mesh>
                  <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                  <meshStandardMaterial color="#93c5fd" wireframe />
                </mesh>
              </Float>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate />
            </Canvas>
          </div>
        </div>
      </section>

      {/* Main Contact Area */}
      <section className="max-w-6xl mx-auto px-6 py-16 w-full grid gap-12 lg:grid-cols-2">
        {/* Form */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Send Us a Message</h2>
          <ContactForm />
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="w-full space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Contact Details</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3 hover:text-blue-600 transition">
              <Mail className="w-5 h-5 text-blue-600" />
              <span>support@bluerays.tech</span>
            </div>
            <div className="flex items-center gap-3 hover:text-blue-600 transition">
              <Phone className="w-5 h-5 text-blue-600" />
              <span>+1 (800) 777‑BLUE</span>
            </div>
            <div className="flex items-center gap-3 hover:text-blue-600 transition">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>123 Blue Rays Ave, Silicon Valley, CA</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;