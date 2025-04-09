// components/contact/FAQ.jsx
import React, { useState } from 'react';

const Accordion = ({ title, children, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-2 text-left font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg 
          className={`w-5 h-5 transition-transform transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 py-4 px-2' : 'max-h-0'}`}>
        <div className="text-gray-600 text-sm">{children}</div>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions?</h2>
            </div>
            
            <div className="md:w-2/3">
              <Accordion title="SkillsFuture Credit">
                SkillsFuture Credit consists of credits which Singapore Citizens can use to pay for out-of-pocket course fees for attending work-skills related courses. The credits can be used on top of existing course fee subsidies provided by the Government.
              </Accordion>
              
              <Accordion title="Opening Skills Future Credit of $500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion>
              
              <Accordion title="Skills Future Credit Top Up 2020">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion>
              
              <Accordion title="Additional Skills Future Credit Top Up for 40 to 60">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion>
              
              <Accordion title="Skills Future Credit Expiry">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion>
              
              <Accordion title="Skills Future Credit Top Up & Expiry Summary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion>
              
              <Accordion title="SkillsFuture Funding & Subsidy">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion>
              
              <Accordion title="Skills Future Training Subsidy (On or after 1 Jan 2022)">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion>
              
              <Accordion title="SkillsFuture Credit Courses">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;