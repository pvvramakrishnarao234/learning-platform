import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">GET IN TOUCH</h2>
      <p className="text-lg mb-6">
        Interested to explore? Meet us in touch with our experts and experience a complete Digital Marketing Strategy for you.
      </p>
      <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Contact Us</button>
      <img src="/contact-image.jpg" alt="Contact" className="mt-6 mx-auto w-1/3" />
    </section>
  );
};

export default ContactSection;