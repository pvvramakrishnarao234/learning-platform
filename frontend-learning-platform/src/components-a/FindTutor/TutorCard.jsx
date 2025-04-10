import React,{ useState, useEffect }  from 'react';

const TutorCard = ({ tutor }) => {
    const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      const image = await import(`../../assets/FindTutors/${tutor.photo}`);
      setImagePath(image.default);
    };
    loadImage();
  }, [tutor.photo]);

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img 
          src={imagePath}
          alt={tutor.name} 
          className="w-full h-36 object-cover"
        />
        <button className="absolute top-2 right-2 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img 
            src={imagePath}
            alt={tutor.name} 
            className="w-12 h-12 object-cover rounded-full border-2 border-white shadow"
          />
          <div className="ml-2">
            <h3 className="font-semibold text-sm">{tutor.name}</h3>
            <p className="text-xs text-gray-500">{tutor.location}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-xs">{tutor.rating}</span>
            <span className="ml-2 text-xs text-gray-400">({tutor.reviews} reviews)</span>
          </div>
          <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Book Free Trial</div>
        </div>
        
        <div className="mb-2">
          {tutor.subjects.map((subject, index) => (
            <span key={index} className="text-xs text-gray-600 mr-1">
              {subject}
            </span>
          ))}
        </div>
        
        <p className="text-xs text-gray-600 mb-3">
          <span className="text-blue-600 font-medium">Tags: </span>
          {tutor.bio}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold">₹{tutor.price}</span>
            <span className="text-xs text-gray-500">/hr</span>
          </div>
          <button className="bg-orange-500 text-white text-xs px-4 py-1 rounded hover:bg-orange-600 transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
