import React from 'react';
import Header from '../components-a/Header';
import AboutSection from '../components-a/AboutSection';
import StatsBanner from '../components-a/StatsBanner';
import MissionSection from '../components-a/MissionSection';
import TeamSection from '../components-a/TeamSection';
import ContactSection from '../components-a/ContactSection';
import Footer from '../components-a/Footer';

const About = () => {
  return (
    <div>

      <AboutSection />
      <StatsBanner />
      <MissionSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
};

export default About;