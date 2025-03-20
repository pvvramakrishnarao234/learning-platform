import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import JobPostCard from '../components/JobPostCard';

const JobsViewAll = () => {
  const { token } = useAuth();
  const [jobPosts, setJobPosts] = useState([]);
  const [filters, setFilters] = useState({ search: '', date: '', tags: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const query = new URLSearchParams(filters).toString();
        const res = await fetch(`/api/jobs/all?${query}`);
        if (!res.ok) throw new Error('Failed to fetch job posts');
        const data = await res.json();
        setJobPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobPosts();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = async (jobId) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to apply');
      alert('Applied successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="py-16 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">All Job Posts</h2>
      <div className="mb-6 space-y-4">
        <input
          type="text"
          name="search"
          placeholder="Search by title"
          value={filters.search}
          onChange={handleFilterChange}
          className="w-full p-3 border rounded-md"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="w-full p-3 border rounded-md"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={filters.tags}
          onChange={handleFilterChange}
          className="w-full p-3 border rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobPosts.map((job) => (
          <JobPostCard key={job.jobId} job={job} onApply={handleApply} />
        ))}
      </div>
    </div>
  );
};

export default JobsViewAll;