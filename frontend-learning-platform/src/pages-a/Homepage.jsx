import React from 'react';
import HeroSection from '../components-a/HeroSection';
import TutorSection from '../components-a/TutorSection';    
import FeaturedTutors from '../components-a/FeaturedTutors';
import StatsSection from '../components-a/StatsSection';    
import HowItWorksSection from '../components-a/HowItWorksSection';
import CallToAction from '../components-a/CallToAction';    
import TestimonialSection from '../components-a/TestimonialSection';

const Homepage = () => {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <TutorSection
        title="Student Best Tutor"
        description="EduNexum connects with top educators across subjects & more!"
        imageSrc="/student-tutor.jpg"
        buttonText="Find a Tutor"
        buttonLink="#find-tutor"
      />
      <TutorSection
        title="Become a Tutor & Earn"
        description="Turn your expertise into income by teaching worldwide..."
        imageSrc="/become-tutor.jpg"
        buttonText="Join as a Tutor Today"
        buttonLink="#become-tutor"
      />
      <FeaturedTutors />
      <StatsSection />
      <HowItWorksSection />
      <CallToAction />
      <TestimonialSection />
      {/* <Footer /> */}
    </div>
  );
};

export default Homepage;