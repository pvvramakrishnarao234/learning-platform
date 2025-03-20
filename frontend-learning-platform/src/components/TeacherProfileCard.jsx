const TeacherProfileCard = ({ profile }) => {
return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <img
        src={profile.user.profilePicture || 'https://via.placeholder.com/150'}
        alt={profile.user.firstName}
        className="w-32 h-32 rounded-full"
        />
        <div>
        <h2 className="text-2xl font-bold text-gray-800">
            {profile.user.firstName} {profile.user.lastName}
        </h2>
        <p className="text-gray-600">{profile.bio}</p>
        <p className="text-blue-600">{profile.user.email}</p>
        <p className="text-gray-600">Location: {profile.location || 'Not specified'}</p>
        <p className="text-gray-600">Timings: {profile.timings || 'Not specified'}</p>
        <p className="text-gray-600">Contact: {profile.contactNumber || 'Not specified'}</p>
        <p className="text-gray-600">Languages: {profile.languagesSpoken.join(', ') || 'Not specified'}</p>
        <p className="text-gray-600">Tags: {profile.tags.join(', ') || 'None'}</p>
        </div>
    </div>
    <div className="mt-6">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {profile.services.map((service, index) => (
            <div key={index} className="border p-4 rounded-md">
            <h4 className="font-semibold">{service.name}</h4>
            <p className="text-gray-600">{service.description}</p>
            <p className="text-green-600">${service.pricePerHour}/hour</p>
            </div>
        ))}
        </div>
    </div>
    <div className="mt-6">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Upcoming Webinars</h3>
        {profile.webinarsPosted.length > 0 ? (
        <ul className="space-y-2">
            {profile.webinarsPosted.map((webinar) => (
            <li key={webinar._id} className="text-gray-600">
                {webinar.title} - {new Date(webinar.startTime).toLocaleString()}
            </li>
            ))}
        </ul>
        ) : (
        <p className="text-gray-600">No upcoming webinars.</p>
        )}
    </div>
    {/* Placeholder for reviews */}
    <div className="mt-6">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Reviews</h3>
        <p className="text-gray-600">Coming soon...</p>
    </div>
    </div>
);
};

export default TeacherProfileCard;