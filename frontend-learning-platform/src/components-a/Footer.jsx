import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-6">
      <div className="flex justify-between flex-col md:flex-row space-y-4 md:space-y-0">
        <div>
          <h3 className="text-xl font-bold">EduNexum</h3>
          <p className="text-sm">© 2023 EduNexum. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <div>
            <h4 className="font-bold">Services</h4>
            <a href="#home" className="block text-sm hover:text-gray-300">Home</a>
            <a href="#about" className="block text-sm hover:text-gray-300">About Us</a>
          </div>
          <div>
            <h4 className="font-bold">Legal</h4>
            <a href="#terms" className="block text-sm hover:text-gray-300">Terms</a>
            <a href="#privacy" className="block text-sm hover:text-gray-300">Privacy</a>
            <a href="#cookies" className="block text-sm hover:text-gray-300">Cookies</a>
          </div>
          <div>
            <h4 className="font-bold">Contact</h4>
            <p className="text-sm">Email: support@edunexum.com</p>
            <p className="text-sm">Phone: +91-1234567890</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;