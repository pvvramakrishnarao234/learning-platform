import React from 'react';
import HeroSection from '../components-a/Homepage/HeroSection';
import FeaturedTutors from '../components-a/Homepage/FeaturedTutors';
// import StatsSection from '../components-a/StatsSection';    
import HowItWorksSection from '../components-a/Homepage/HowItWorksSection';
import CallToAction from '../components-a/Homepage/CallToAction';    
import TestimonialSection from '../components-a/Homepage/TestimonialSection';
import FindTutor from '../components-a/Homepage/FindTutor';
import TutorComponent from '../components-a/Homepage/TutorComponent';

const Homepage = () => {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <FindTutor
        title="Student Best Tutor"
        description="EduNexum connects with top educators across subjects & more!"
        imageSrc="/student-tutor.jpg"
        buttonText="Find a Tutor"
        buttonLink="#find-tutor"
      />
      <TutorComponent
        title="Become a Tutor & Earn"
        description="Turn your expertise into income by teaching worldwide..."
        imageSrc="/become-tutor.jpg"
        buttonText="Join as a Tutor Today"
        buttonLink="#become-tutor"
      />
      <FeaturedTutors />
      {/* <StatsSection /> */}
      <HowItWorksSection />
      <CallToAction />
      <TestimonialSection />
      {/* <Footer /> */}
    </div>
  );
};

export default Homepage;