import { useAuth } from '../contexts/AuthContext';

const ProfileSettings = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center mt-10 text-red-600">Please sign in to view this page.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Profile Settings</h2>
      <div className="space-y-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p className="text-gray-500">This is a placeholder page. Add your profile settings form here.</p>
      </div>
    </div>
  );
};

export default ProfileSettings;