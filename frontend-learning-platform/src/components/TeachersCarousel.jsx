const TeachersCarousel = () => {
    const teachers = [
      { name: 'Jane Smith', rating: 4.8, subject: 'Mathematics' },
      { name: 'John Doe', rating: 4.9, subject: 'Physics' },
      { name: 'Emily Brown', rating: 4.7, subject: 'English' },
    ];
  
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Best Teachers</h2>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {teachers.map((teacher, index) => (
              <div key={index} className="min-w-[250px] bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4"></div> {/* Placeholder avatar */}
                <h3 className="text-xl font-semibold text-center text-gray-800">{teacher.name}</h3>
                <p className="text-gray-600 text-center">{teacher.subject}</p>
                <p className="text-yellow-500 text-center">Rating: {teacher.rating} ★</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TeachersCarousel;