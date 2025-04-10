// pages/BecomeTutor.jsx
import React from 'react';
import HeroSection from '../components-a/BecomeTutor/Hero';
import StatsSection from '../components-a/BecomeTutor/StatsSection';
import HowItWorks from '../components-a/BecomeTutor/HowItWorks';
import FaqSection from '../components-a/BecomeTutor/FaqSection';
import CtaSection from '../components-a/BecomeTutor/CtaSection';

const BecomeTutor = () => {
  return (
      <main className="min-h-screen">
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <FaqSection />
        <CtaSection />
      </main>
  );
};

export default BecomeTutor;