// components/findTutor/TutorProfile.jsx
import React,{useState,useEffect} from 'react';

const TutorProfile = ({ tutor }) => {
  const [imagePath, setImagePath] = useState('');
  
  useEffect(() => {
    const loadImage = async () => {
      const image = await import(`../../assets/FindTutors/${tutor.photo}`);
      setImagePath(image.default);
    };
    loadImage();
  }, [tutor.photo]);
  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img 
            src={imagePath}
            alt={tutor.name}  
            className="w-12 h-12 object-cover rounded-full border-2 border-white shadow"
          />
          <div className="ml-3">
            <h3 className="font-semibold">{tutor.name}</h3>
            <p className="text-xs text-gray-500">{tutor.location}</p>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm">{tutor.rating}</span>
            <span className="ml-1 text-xs text-gray-400">({tutor.reviews} reviews)</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="ml-1 text-xs text-blue-600">{tutor.hoursCompleted.toLocaleString()} students</span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Years of teaching young & qualified school teachers with expertise 
            in teaching English with personal attention to school students. 
            Subjects taught: English, English speaking.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <p className="text-sm text-gray-600">
            "Gajji is an experienced and dedicated English teacher with over 5 years 
            of teaching experience. Her teaching style is interactive and 
            focused on practical application of language skills."
          </p>
        </div>
        
        <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-300">
          Contact Tutor
        </button>
      </div>
    </div>
  );
};

export default TutorProfile;