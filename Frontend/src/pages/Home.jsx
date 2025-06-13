"use client";

import React, { useEffect, useState } from "react";
import HomeCarousal from "@/components/HomeCarousal";
import CategoryCards from "@/components/CategoryCards";
import SignInCTA from "@/components/SignInCTA";
import Loader from "@/components/Loader";

const Home = () => {
  const [isPageReady, setIsPageReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (!isPageReady) setShowLoader(true);
    }, 300); // Show loader only if delay exceeds 300ms

    const frame = requestAnimationFrame(() => {
      setIsPageReady(true);
      setShowLoader(false);
    });

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!isPageReady && showLoader) {
    return <Loader size="lg" message="Loading homepage..." />;
  }

  return (
    <div className="flex flex-col">
      <HomeCarousal />
      <CategoryCards />
      <SignInCTA />
    </div>
  );
};

export { Home };