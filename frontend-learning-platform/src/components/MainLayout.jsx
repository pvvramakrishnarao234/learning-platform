import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar';
import Footer from '../components-a/Footer';
import React from 'react';
import Header from '../components-a/Header';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const MainLayout = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      {(!user) ? <Header /> : <Navbar/>}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;