import React from 'react';
import HeroSection from '../components-a/Homepage/HeroSection';
import FeaturedTutors from '../components-a/Homepage/FeaturedTutors';
import HowItWorksSection from '../components-a/Homepage/HowItWorksSection';
import CallToAction from '../components-a/Homepage/CallToAction';    
import TestimonialSection from '../components-a/Homepage/TestimonialSection';
import FindTutor from '../components-a/Homepage/FindTutor';
import TutorComponent from '../components-a/Homepage/TutorComponent';

const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <FindTutor/>
      <TutorComponent/>
      <FeaturedTutors />
      <HowItWorksSection />
      <CallToAction />
      <TestimonialSection />
    </div>
  );
};

export default Homepage;