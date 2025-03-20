import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import WebinarCard from '../components/WebinarCard';

const WebinarsViewAll = () => {
  const { token } = useAuth();
  const [webinars, setWebinars] = useState([]);
  const [filters, setFilters] = useState({ search: '', date: '', teacher: '', tags: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const query = new URLSearchParams(filters).toString();
        const res = await fetch(`/api/webinars/all?${query}`);
        if (!res.ok) throw new Error('Failed to fetch webinars');
        const data = await res.json();
        setWebinars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWebinars();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = async (webinarId) => {
    try {
      const res = await fetch(`/api/webinars/${webinarId}/apply`, {
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
      <h2 className="text-3xl font-bold text-blue-600 mb-6">All Webinars</h2>
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
          name="teacher"
          placeholder="Teacher ID"
          value={filters.teacher}
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
        {webinars.map((webinar) => (
          <WebinarCard key={webinar.webinarId} webinar={webinar} onApply={handleApply} />
        ))}
      </div>
    </div>
  );
};

export default WebinarsViewAll;