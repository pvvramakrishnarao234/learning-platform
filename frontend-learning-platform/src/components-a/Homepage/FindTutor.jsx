import React from 'react';
import tutorsection from '../../assets/Homepage/tutor.png'; // Adjust the path as necessary

const FindTutor = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={tutorsection} // Replace with your image path or URL
            alt="Student"
            className="w-auto h-auto max-h-96 object-cover "
          />
        </div>

        {/* Right Section - Text Content */}
        <div className="text-center md:text-left space-y-4 w-full md:w-1/2">
          <span className="text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full text-sm">
            Student
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            THE BEST TUTOR FOR YOU.
          </h1>
          <p className="text-gray-600 text-base">
            Need expert guidance? Edunexum connects you with top educators across:
          </p>
          <ul className="text-gray-600 space-y-2 list-none pl-5">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> School & College Subjects (Math, Science, English & more)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Technology (AI, Programming, Data Science, Cybersecurity)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Finance & Business (Stock Market, Investing, Accounting)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Life Skills & Hobbies (Music, Art, Photography, Language Learning)
            </li>
          </ul>
          <p className="text-gray-500 italic mt-4 text-sm">
            <a href="#" className="underline text-blue-600 hover:text-blue-800">
              Learn at your own pace, anytime, anywhere!
            </a>
          </p>
          <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300">
            Find a Tutor
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindTutor;


