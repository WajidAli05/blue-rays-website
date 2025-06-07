import React from 'react'
import NavBar from '@/components/NavBar';
import AnnouncementBar from '@/components/AnnouncementBar';

const Home = () => {
  const announcementText = "Welcome to our store! Enjoy exclusive discounts and offers.";
  return (
    <div className='container'>
      <AnnouncementBar text={announcementText} />
      <NavBar />
    </div>
  )
}

export { Home };