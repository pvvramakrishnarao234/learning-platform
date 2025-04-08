import React from 'react';

const TutorSection = ({ title, description, imageSrc, buttonText, buttonLink }) => {
  return (
    <section className="bg-gray-100 py-12 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg mb-6">{description}</p>
      <img src={imageSrc} alt="Tutor" className="mx-auto w-1/4 mb-6" />
      <a href={buttonLink} className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
        {buttonText}
      </a>
    </section>
  );
};

export default TutorSection;