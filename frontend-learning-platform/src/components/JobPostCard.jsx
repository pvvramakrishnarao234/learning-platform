import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const JobPostCard = ({ job, onApply }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApply = () => {
    if (!user) {
      navigate('/signin');
    } else if (user.role === 'teacher') {
      onApply(job.jobId);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-600">{job.title}</h3>
      <p className="text-gray-600">{job.description}</p>
      <p><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
      <p><strong>Student:</strong> {job.creator.firstName} {job.creator.lastName}</p>
      <p><strong>Tags:</strong> {job.tags.join(', ') || 'None'}</p>
      {user?.role !== 'student' && (
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

export default JobPostCard;