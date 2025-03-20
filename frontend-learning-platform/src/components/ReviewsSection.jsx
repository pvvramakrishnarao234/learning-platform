const ReviewsSection = () => {
    const reviews = [
      { name: 'Alice', text: 'LearnSphere helped me find an amazing tutor!', role: 'Student' },
      { name: 'Bob', text: 'Great platform to connect with students.', role: 'Teacher' },
    ];
  
    return (
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 italic">"{review.text}"</p>
                <p className="mt-4 text-blue-600 font-semibold">{review.name} ({review.role})</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ReviewsSection;