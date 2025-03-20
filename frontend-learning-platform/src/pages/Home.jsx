import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import TeachersCarousel from '../components/TeachersCarousel';
import ReviewsSection from '../components/ReviewsSection';
import MetricsSection from '../components/MetricsSection';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <TeachersCarousel />
      <ReviewsSection />
      <MetricsSection />
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Get Started?</h2>
        <div className="space-x-4">
          <Link
            to="/signup/student"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Join as Student
          </Link>
          <Link
            to="/signup/teacher"
            className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Join as Teacher
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;