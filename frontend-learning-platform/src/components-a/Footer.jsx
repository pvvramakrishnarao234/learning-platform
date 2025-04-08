import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-6">
      <div className="flex justify-between flex-col md:flex-row space-y-4 md:space-y-0">
        <div>
          <h3 className="text-xl font-bold">EduNexum</h3>
          <p className="text-sm">Crafting digital experiences that drive exponential brand growth.</p>
          <div className="flex space-x-2 mt-2">
            <a href="#youtube"><i className="fab fa-youtube"></i></a>
            <a href="#facebook"><i className="fab fa-facebook"></i></a>
            <a href="#twitter"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
        <div className="flex space-x-6">
          <div>
            <h4 className="font-bold">Services</h4>
            <a href="#home" className="block text-sm hover:text-gray-300">Home</a>
            <a href="#about" className="block text-sm hover:text-gray-300">About Us</a>
            <a href="#portfolio" className="block text-sm hover:text-gray-300">Portfolio</a>
          </div>
          <div>
            <h4 className="font-bold">Legal</h4>
            <a href="#terms" className="block text-sm hover:text-gray-300">Terms</a>
            <a href="#privacy" className="block text-sm hover:text-gray-300">Cookies</a>
            <a href="#license" className="block text-sm hover:text-gray-300">License</a>
          </div>
          <div>
            <h4 className="font-bold">Contact</h4>
            <p className="text-sm">Bengaluru, 64204</p>
            <p className="text-sm">code@edunexum.com</p>
            <p className="text-sm">+91 8293928490</p>
            <a href="#whatsapp" className="text-sm hover:text-gray-300">WhatsApp</a>
          </div>
        </div>
      </div>
      <p className="text-center text-sm mt-4">© 2023 EduNexum. All rights reserved.</p>
    </footer>
  );
};

export default Footer;