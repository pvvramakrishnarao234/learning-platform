import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar';
import Footer from '../components-a/Footer';
import React from 'react';
import Header from '../components-a/Header';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;