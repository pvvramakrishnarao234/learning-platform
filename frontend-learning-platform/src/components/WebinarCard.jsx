import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const WebinarCard = ({ webinar, onApply }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApply = () => {
    if (!user) {
      navigate('/signin');
    } else if (user.role === 'student') {
      onApply(webinar.webinarId);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-600">{webinar.title}</h3>
      <p className="text-gray-600">{webinar.description}</p>
      <p><strong>Start:</strong> {new Date(webinar.startTime).toLocaleString()}</p>
      <p><strong>End:</strong> {new Date(webinar.endTime).toLocaleString()}</p>
      <p><strong>Teacher:</strong> {webinar.creator.firstName} {webinar.creator.lastName}</p>
      <p><strong>Tags:</strong> {webinar.tags.join(', ') || 'None'}</p>
      {user?.role !== 'teacher' && (
        <button
          onClick={handleApply}
          className="mt-2 bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-300"
        >
          Apply
        </button>
      )}
    </div>
  );
};

export default WebinarCard;