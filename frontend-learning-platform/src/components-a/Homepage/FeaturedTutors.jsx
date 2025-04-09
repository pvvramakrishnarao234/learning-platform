import React from 'react';

const TutorCard = ({ name, rating, price, imageSrc }) => (
  <div className="bg-white p-4 rounded shadow-md text-center">
    <img src={imageSrc} alt={name} className="w-full h-40 object-cover mb-4" />
    <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-yellow-500">{'★'.repeat(rating)}</p>
    <p className="text-gray-600">₹{price}/hr</p>
    <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">Try Now</button>
  </div>
);

const FeaturedTutors = () => {
  const tutors = [
    { name: 'Manisha', rating: 4, price: 500, imageSrc: '/tutor1.jpg' },
    { name: 'Manish', rating: 5, price: 600, imageSrc: '/tutor2.jpg' },
    { name: 'Manoj', rating: 4, price: 450, imageSrc: '/tutor3.jpg' },
  ];

  return (
    <section className="flex flex-col justify-center min-h-screen py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Tutors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.name} {...tutor} />
        ))}
      </div>
      <a href="#browse" className="text-blue-600 mt-4 inline-block hover:text-blue-800 text-center block">Browse All Tutors</a>
    </section>
  );
};

export default FeaturedTutors;