import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import JobPostForm from '../components/JobPostForm'; // Verify this import

const StudentDashboard = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);
  const [webinarsApplied, setWebinarsApplied] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        const [profileRes, jobsRes] = await Promise.all([
          fetch('/api/profiles', { headers }),
          fetch('/api/jobs', { headers }),
        ]);

        if (!profileRes.ok) throw new Error(`Profile fetch failed: ${profileRes.statusText}`);
        if (!jobsRes.ok) throw new Error(`Jobs fetch failed: ${jobsRes.statusText}`);

        const profileData = await profileRes.json();
        const jobsData = await jobsRes.json();

        setProfile(profileData);
        setJobPosts(jobsData);
        setWebinarsApplied(profileData.webinarsApplied || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profiles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setEditMode(false);
        setProfile(await res.json());
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleJobPostSubmit = async (jobData) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });
      if (res.ok) {
        const newJob = await res.json();
        setJobPosts([...jobPosts, newJob]);
      } else {
        throw new Error('Failed to create job post');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleConnect = () => {
    alert('Google Calendar integration coming soon...');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Student Dashboard</h2>

      {/* Profile Edit Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Profile</h3>
        {editMode ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <input
              type="text"
              name="firstName"
              value={profile.user.firstName}
              onChange={(e) => setProfile({ ...profile, user: { ...profile.user, firstName: e.target.value } })}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="lastName"
              value={profile.user.lastName}
              onChange={(e) => setProfile({ ...profile, user: { ...profile.user, lastName: e.target.value } })}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="profilePicture"
              value={profile.user.profilePicture}
              onChange={(e) => setProfile({ ...profile, user: { ...profile.user, profilePicture: e.target.value } })}
              className="w-full p-3 border rounded-md"
              placeholder="Profile Picture URL"
            />
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 ml-2"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {profile.user.firstName} {profile.user.lastName}</p>
            <p><strong>Email:</strong> {profile.user.email}</p>
            <p><strong>Picture:</strong> <img src={profile.user.profilePicture} alt="Profile" className="w-16 h-16 rounded-full" /></p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </section>

      {/* Google Connect */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Connect Google Account</h3>
        <button
          onClick={handleGoogleConnect}
          className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700"
        >
          Connect Google Calendar
        </button>
      </section>

      {/* Job Posts Management */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Job Posts</h3>
        <JobPostForm onSubmit={handleJobPostSubmit} />
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Your Job Posts</h4>
          {jobPosts.length > 0 ? (
            <ul className="space-y-2">
              {jobPosts.map((job) => (
                <li key={job._id} className="border p-2 rounded-md">
                  {job.title} - {job.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No job posts created yet.</p>
          )}
        </div>
      </section>

      {/* Webinars Applied */}
      <section>
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Webinars Applied</h3>
        {webinarsApplied.length > 0 ? (
          <ul className="space-y-2">
            {webinarsApplied.map((webinar) => (
              <li key={webinar._id} className="border p-2 rounded-md">
                {webinar.title} - {new Date(webinar.startTime).toLocaleString()} ({webinar.status})
              </li>
            ))}
          </ul>
        ) : (
          <p>No webinars applied yet.</p>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;