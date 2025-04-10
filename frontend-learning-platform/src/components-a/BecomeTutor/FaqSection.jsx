// components/FaqSection.jsx
import React, { useState } from 'react';

const FaqItem = ({ title, content, isOpen, toggleFaq }) => {
  return (
    <div className="border-b border-gray-200">
      <button 
        className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none"
        onClick={toggleFaq}
      >
        <span className="font-medium">{title}</span>
        <span className="ml-6">
          {isOpen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      
      {isOpen && (
        <div className="pb-4 px-2 text-sm text-gray-600">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const faqs = [
    {
      title: "SkillsFuture Credit",
      content: "SkillsFuture Credit consists of credits which Singapore Citizens can use to pay for part of pocket costs for attending work skills related courses. The credit is available for all Singapore Citizens aged 25 years and above."
    },
    {
      title: "Opening Skills Future Credit of $500",
      content: "All Singaporeans aged 25 and above receive an opening credit of $500 that can be used for approved courses."
    },
    {
      title: "Skills Future Credit Top Up 2020",
      content: "In 2020, eligible Singaporeans received an additional top-up to their SkillsFuture Credit."
    },
    {
      title: "Additional Skills Future Credit Top Up for 40 to 60",
      content: "Singaporeans aged 40 to 60 receive additional credit to support their mid-career development."
    },
    {
      title: "Skills Future Credit Expiry",
      content: "SkillsFuture Credits have specific expiry dates. Check your account for the latest information."
    },
    {
      title: "Skills Future Credit Top Up & Expiry Summary",
      content: "A comprehensive overview of all top-ups and their respective expiry dates."
    },
    {
      title: "SkillsFuture Funding & Subsidy",
      content: "Information about additional funding and subsidies available beyond the SkillsFuture Credit."
    },
    {
      title: "Skills Future Training Subsidy (On or after 1 Jan 2022)",
      content: "Details about training subsidies available for courses starting January 1, 2022 or later."
    },
    {
      title: "SkillsFuture Credit Courses",
      content: "Information about which courses are eligible for SkillsFuture Credit usage."
    }
  ];
  
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Frequently Asked Questions?</h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem 
              key={index}
              title={faq.title}
              content={faq.content}
              isOpen={openIndex === index}
              toggleFaq={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;