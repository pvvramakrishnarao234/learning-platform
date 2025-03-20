import { useState } from 'react';

const WebinarForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    startTime: initialData.startTime || '',
    endTime: initialData.endTime || '',
    link: initialData.link || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Webinar Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="datetime-local"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="datetime-local"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="url"
        name="link"
        placeholder="Webinar Link"
        value={formData.link}
        onChange={handleChange}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
      >
        {initialData._id ? 'Update Webinar' : 'Create Webinar'}
      </button>
    </form>
  );
};

export default WebinarForm;