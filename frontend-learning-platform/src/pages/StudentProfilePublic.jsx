import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import JobPostForm from '../components/JobPostForm';

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
        const [profileRes, jobsRes, webinarsRes] = await Promise.all([
          fetch('/api/profiles', { headers }),
          fetch('/api/jobs', { headers }),
          fetch('/api/webinars', { headers }), // Assuming student can see applied webinars
        ]);

        if (!profileRes.ok) throw new Error('Profile fetch failed');
        if (!jobsRes.ok) throw new Error('Jobs fetch failed');
        if (!webinarsRes.ok) throw new Error('Webinars fetch failed');

        const profileData = await profileRes.json();
        const jobsData = await jobsRes.json();
        const webinarsData = await webinarsRes.json();

        setProfile(profileData);
        setJobPosts(jobsData);
        setWebinarsApplied(webinarsData.filter(w => w.applicants.includes(user.id)));
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

  const handleJobPostSubmit = async (jobData) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(jobData),
      });
      if (!res.ok) throw new Error('Failed to create job post');
      const newJob = await res.json();
      setJobPosts([...jobPosts, newJob]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleJobPostUpdate = async (jobId, updates) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update job post');
      const updatedJob = await res.json();
      setJobPosts(jobPosts.map(j => (j.jobId === jobId ? updatedJob : j)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleJobPostDelete = async (jobId) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete job post');
      setJobPosts(jobPosts.filter(j => j.jobId !== jobId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWebinarApply = async (webinarId) => {
    try {
      const res = await fetch(`/api/webinars/${webinarId}/apply`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to apply for webinar');
      const updatedWebinars = await fetch('/api/webinars', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json());
      setWebinarsApplied(updatedWebinars.filter(w => w.applicants.includes(user.id)));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Student Dashboard</h2>

      {/* Profile Section */}
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
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">Save</button>
            <button type="button" onClick={() => setEditMode(false)} className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 ml-2">Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {profile.user.firstName} {profile.user.lastName}</p>
            <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Edit Profile</button>
          </div>
        )}
      </section>

      {/* Job Posts Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Job Posts</h3>
        <JobPostForm onSubmit={handleJobPostSubmit} />
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Your Job Posts</h4>
          {jobPosts.length > 0 ? (
            <ul className="space-y-4">
              {jobPosts.map((job) => (
                <li key={job.jobId} className="border p-4 rounded-md">
                  <p><strong>{job.title}</strong> - {job.description}</p>
                  <p><strong>Applicants:</strong> {job.applicants.map(a => `${a.firstName} ${a.lastName}`).join(', ') || 'None'}</p>
                  <button
                    onClick={() => handleJobPostUpdate(job.jobId, { title: 'Updated ' + job.title })}
                    className="mt-2 bg-yellow-600 text-white p-2 rounded-md hover:bg-yellow-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleJobPostDelete(job.jobId)}
                    className="mt-2 bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No job posts created yet.</p>
          )}
        </div>
      </section>

      {/* Webinars Applied Section */}
      <section>
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Webinars Applied</h3>
        {webinarsApplied.length > 0 ? (
          <ul className="space-y-2">
            {webinarsApplied.map((webinar) => (
              <li key={webinar.webinarId} className="border p-2 rounded-md">
                {webinar.title} - {new Date(webinar.startTime).toLocaleString()}
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