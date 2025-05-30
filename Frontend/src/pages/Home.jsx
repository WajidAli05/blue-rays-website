import React from 'react'
import Carousal from '@/components/Carousal';
import NavBar from '@/components/NavBar';

const Home = () => {
  return (
    <div className='container'>
      <NavBar />
      <Carousal />
    </div>
  )
}

export { Home };