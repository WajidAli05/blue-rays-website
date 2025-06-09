import React from 'react';
import HomeCarousal from '@/components/HomeCarousal';
import CategoryCards from '@/components/CategoryCards';
import SignInCTA from '@/components/SignInCTA';

const Home = () => {
  return (
    <div className="flex flex-col">
      <HomeCarousal />
      <CategoryCards />
      <SignInCTA />
    </div>
  );
};

export { Home };