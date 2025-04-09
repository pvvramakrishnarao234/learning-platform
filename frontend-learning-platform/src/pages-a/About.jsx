import React from 'react';
import Hero from '../components-a/About/Hero';
import AboutSection from '../components-a/About/AboutSection';
import Stats from  '../components-a/About/Stats';
import MissionSection from '../components-a/About/MissionSection';
import TeamSection from '../components-a/About/TeamSection';
import ContactSection from '../components-a/About/ContactSection';
import Navbar from '../components-a/Header';
import Footer from '../components-a/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col flex-grow">
        <Hero />
        <Stats />
        <AboutSection />
        <MissionSection />
        <TeamSection />
        <ContactSection />

    </div>
  );
};

export default About;