import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-500 to-indigo-600 text-white py-20">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Unlock Your Learning Potential with LearnSphere
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Connect with top teachers, join webinars, and find opportunities tailored to you.
        </p>
        <div className="space-x-4">
          <Link
            to="/signup/student"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
          >
            Join as Student
          </Link>
          <Link
            to="/signup/teacher"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Join as Teacher
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;