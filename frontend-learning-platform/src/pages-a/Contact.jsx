// pages/Contact.jsx
import React from 'react';
import Hero from '../components-a/Contact/Hero';
import ContactForm from '../components-a/Contact/ContactForm';
import FAQ from '../components-a/Contact/Faq';

const Contact = () => {
  return (
      <main className="min-h-screen flex flex-col flex-grow">
        <Hero />
        <ContactForm />
        <FAQ />
      </main>
  );
};

export default Contact;