import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeacherProfileCard from '../components/TeacherProfileCard';

const TeacherProfilePublic = () => {
const { teacherId } = useParams();
const [profile, setProfile] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
const fetchProfile = async () => {
    try {
    const res = await fetch(`/api/profiles/teacher/${teacherId}`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    const data = await res.json();
    setProfile(data);
    } catch (err) {
    setError(err.message);
    } finally {
    setLoading(false);
    }
};
fetchProfile();
}, [teacherId]);

if (loading) return <div className="text-center mt-10">Loading...</div>;
if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

return (
<div className="py-16">
    <TeacherProfileCard profile={profile} />
</div>
);
};

export default TeacherProfilePublic;