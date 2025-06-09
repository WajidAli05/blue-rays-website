import React from 'react';
import HomeCarousal from '@/components/HomeCarousal';
import CategoryCards from '@/components/CategoryCards';

const Home = () => {
  return (
    <div className="flex flex-col">
      <HomeCarousal />
      <CategoryCards />
    </div>
  );
};

export { Home };