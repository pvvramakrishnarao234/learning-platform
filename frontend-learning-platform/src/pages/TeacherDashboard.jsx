import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import WebinarForm from '../components/WebinarForm';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [webinars, setWebinars] = useState([]);
  const [jobsApplied, setJobsApplied] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, webinarsRes] = await Promise.all([
          fetch('/api/profiles', { headers: { 'Authorization': `Bearer ${document.cookie.split('token=')[1]}` } }),
          fetch('/api/webinars', { headers: { 'Authorization': `Bearer ${document.cookie.split('token=')[1]}` } }),
        ]);
        if (!profileRes.ok || !webinarsRes.ok) throw new Error('Failed to fetch data');
        const profileData = await profileRes.json();
        const webinarsData = await webinarsRes.json();
        setProfile(profileData);
        setWebinars(webinarsData.filter(w => w.creator === user.id));
        setJobsApplied(profileData.jobsApplied || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === 'teacher') fetchData();
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profiles', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('token=')[1]}`,
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

  const handleWebinarSubmit = async (webinarData) => {
    try {
      const res = await fetch('/api/webinars', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('token=')[1]}`,
        },
        body: JSON.stringify(webinarData),
      });
      if (res.ok) {
        const newWebinar = await res.json();
        setWebinars([...webinars, newWebinar]);
      } else {
        throw new Error('Failed to create webinar');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user || user.role !== 'teacher') {
    return <div className="text-center mt-10 text-red-600">Access denied. Teachers only.</div>;
  }
  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Teacher Dashboard</h2>
      
      {/* Profile Edit Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Profile</h3>
        {editMode ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <input type="text" name="bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="text" name="location" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="text" name="timings" value={profile.timings} onChange={(e) => setProfile({ ...profile, timings: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="text" name="contactNumber" value={profile.contactNumber} onChange={(e) => setProfile({ ...profile, contactNumber: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="text" name="languagesSpoken" value={profile.languagesSpoken.join(',')} onChange={(e) => setProfile({ ...profile, languagesSpoken: e.target.value.split(',') })} className="w-full p-3 border rounded-md" />
            <input type="text" name="tags" value={profile.tags.join(',')} onChange={(e) => setProfile({ ...profile, tags: e.target.value.split(',') })} className="w-full p-3 border rounded-md" />
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">Save</button>
            <button type="button" onClick={() => setEditMode(false)} className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 ml-2">Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>Timings:</strong> {profile.timings}</p>
            <p><strong>Contact:</strong> {profile.contactNumber}</p>
            <p><strong>Languages:</strong> {profile.languagesSpoken.join(', ')}</p>
            <p><strong>Tags:</strong> {profile.tags.join(', ')}</p>
            <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Edit Profile</button>
          </div>
        )}
      </section>

      {/* Webinar Management */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Webinar Management</h3>
        <WebinarForm onSubmit={handleWebinarSubmit} />
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Your Webinars</h4>
          {webinars.length > 0 ? (
            <ul className="space-y-2">
              {webinars.map((webinar) => (
                <li key={webinar._id} className="border p-2 rounded-md">
                  {webinar.title} - {new Date(webinar.startTime).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No webinars created yet.</p>
          )}
        </div>
      </section>

      {/* Applied Jobs */}
      <section>
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Applied Jobs</h3>
        {jobsApplied.length > 0 ? (
          <ul className="space-y-2">
            {jobsApplied.map((job) => (
              <li key={job._id} className="border p-2 rounded-md">{job.title}</li>
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