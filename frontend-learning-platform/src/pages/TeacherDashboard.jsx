import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import WebinarForm from '../components/WebinarForm';

const TeacherDashboard = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [webinars, setWebinars] = useState([]);
  const [jobsApplied, setJobsApplied] = useState([]);
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
        const [profileRes, webinarsRes, jobsRes] = await Promise.all([
          fetch('/api/profiles', { headers }),
          fetch('/api/webinars', { headers }),
          fetch('/api/jobs', { headers }), // Assuming teacher can see applied jobs
        ]);

        if (!profileRes.ok) throw new Error('Profile fetch failed');
        if (!webinarsRes.ok) throw new Error('Webinars fetch failed');
        if (!jobsRes.ok) throw new Error('Jobs fetch failed');

        const profileData = await profileRes.json();
        const webinarsData = await webinarsRes.json();
        const jobsData = await jobsRes.json();

        setProfile(profileData);
        setWebinars(webinarsData);
        setJobsApplied(jobsData.filter(job => job.applicants.includes(user.id)));
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
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      setEditMode(false);
      setProfile(await res.json());
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWebinarSubmit = async (webinarData) => {
    try {
      const res = await fetch('/api/webinars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(webinarData),
      });
      if (!res.ok) throw new Error('Failed to create webinar');
      const newWebinar = await res.json();
      setWebinars([...webinars, newWebinar]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWebinarUpdate = async (webinarId, updates) => {
    try {
      const res = await fetch(`/api/webinars/${webinarId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update webinar');
      const updatedWebinar = await res.json();
      setWebinars(webinars.map(w => (w.webinarId === webinarId ? updatedWebinar : w)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWebinarDelete = async (webinarId) => {
    try {
      const res = await fetch(`/api/webinars/${webinarId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete webinar');
      setWebinars(webinars.filter(w => w.webinarId !== webinarId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleJobApply = async (jobId) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to apply for job');
      const updatedJobs = await fetch('/api/jobs', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json());
      setJobsApplied(updatedJobs.filter(job => job.applicants.includes(user.id)));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Teacher Dashboard</h2>

      {/* Profile Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Profile</h3>
        {editMode ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <input
              type="text"
              name="bio"
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-3 border rounded-md"
            />
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">Save</button>
            <button type="button" onClick={() => setEditMode(false)} className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 ml-2">Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Bio:</strong> {profile.bio || 'Not set'}</p>
            <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Edit Profile</button>
          </div>
        )}
      </section>

      {/* Webinars Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Webinar Management</h3>
        <WebinarForm onSubmit={handleWebinarSubmit} />
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Your Webinars</h4>
          {webinars.length > 0 ? (
            <ul className="space-y-4">
              {webinars.map((webinar) => (
                <li key={webinar.webinarId} className="border p-4 rounded-md">
                  <p><strong>{webinar.title}</strong> - {new Date(webinar.startTime).toLocaleString()}</p>
                  <p>{webinar.description}</p>
                  <p><strong>Applicants:</strong> {webinar.applicants.map(a => `${a.firstName} ${a.lastName}`).join(', ') || 'None'}</p>
                  <button
                    onClick={() => handleWebinarUpdate(webinar.webinarId, { title: 'Updated ' + webinar.title })}
                    className="mt-2 bg-yellow-600 text-white p-2 rounded-md hover:bg-yellow-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleWebinarDelete(webinar.webinarId)}
                    className="mt-2 bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No webinars created yet.</p>
          )}
        </div>
      </section>

      {/* Applied Jobs Section */}
      <section>
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Applied Jobs</h3>
        {jobsApplied.length > 0 ? (
          <ul className="space-y-2">
            {jobsApplied.map((job) => (
              <li key={job.jobId} className="border p-2 rounded-md">{job.title}</li>
            ))}
          </ul>
        ) : (
          <p>No jobs applied yet.</p>
        )}
      </section>
    </div>
  );
};

export default TeacherDashboard;