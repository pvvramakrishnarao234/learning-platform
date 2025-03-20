import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StudentProfilePublic = () => {
  const { studentId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profiles/student/${studentId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch profile: ${res.statusText}`);
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [studentId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (!profile) return <div className="text-center mt-10 text-red-600">Profile not found</div>;

  return (
    <div className="py-16 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={profile.user.profilePicture || 'https://via.placeholder.com/150'}
            alt={`${profile.user.firstName} ${profile.user.lastName}`}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {profile.user.firstName} {profile.user.lastName}
            </h2>
            <p className="text-blue-600">{profile.user.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Jobs Posted</h3>
          {profile.jobsPosted && profile.jobsPosted.length > 0 ? (
            <ul className="space-y-2">
              {profile.jobsPosted.map((job) => (
                <li key={job._id} className="border p-4 rounded-md">
                  <h4 className="font-semibold text-gray-800">{job.title}</h4>
                  <p className="text-gray-600">{job.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No jobs posted yet.</p>
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Reviews</h3>
          <p className="text-gray-600">Coming soon...</p> {/* Placeholder for future review system */}
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePublic;