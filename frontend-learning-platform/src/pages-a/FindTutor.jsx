import React, { useState, useEffect } from 'react';
import Hero from '../components-a/FindTutor/Hero';
import SearchBar from '../components-a/FindTutor/SearchBar';
import TutorCard from '../components-a/FindTutor/TutorCard';
import TutorProfile from '../components-a/FindTutor/TutorProfile';
import Pagination from '../components-a/FindTutor/Pagination';
import TutorsCount from '../components-a/FindTutor/TutorsCount';
import tutorsData from '../assets/tutors-data.json'; // Import JSON data

const FindTutor = () => {
  const [tutors, setTutors] = useState([]); // State for all tutors
  const [filteredTutors, setFilteredTutors] = useState([]); // State for filtered tutors
  const [selectedTutor, setSelectedTutor] = useState(null); // State for selected tutor
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering
  const tutorsPerPage = 6; // Number of tutors per page

  // Initialize tutors data from JSON
  useEffect(() => {
    if (tutorsData && tutorsData.tutors) {
      setTutors(tutorsData.tutors); // Set all tutors
      setFilteredTutors(tutorsData.tutors); // Set filtered tutors
      setSelectedTutor(tutorsData.tutors[0]); // Select the first tutor by default
    }
  }, []);

  // Filter tutors based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTutors(tutors); // Reset to all tutors if search term is empty
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = tutors.filter((tutor) =>
        tutor.name.toLowerCase().includes(term) ||
        tutor.subjects.some((subject) => subject.toLowerCase().includes(term))
      );
      setFilteredTutors(filtered); // Update filtered tutors
    }
    setCurrentPage(1); // Reset to the first page
  }, [searchTerm, tutors]);

  // Get current tutors for pagination
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor);
  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle tutor selection
  const handleTutorSelect = (tutor) => {
    setSelectedTutor(tutor);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setFilteredTutors(tutors);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main>
        <Hero />

        <div className="container mx-auto px-4 py-8">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onClearFilters={handleClearFilters}
          />

          <TutorsCount count={filteredTutors.length} />

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentTutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    onClick={() => handleTutorSelect(tutor)}
                    className="cursor-pointer"
                  >
                    <TutorCard tutor={tutor} />
                  </div>
                ))}
              </div>

              {filteredTutors.length > 0 ? (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No tutors found matching your search criteria.</p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 text-blue-600 underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            <div className="lg:w-1/4 mt-6 lg:mt-0">
              {selectedTutor && <TutorProfile tutor={selectedTutor} />}

              <div className="mt-6 bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                <h3 className="font-semibold mb-3">Popular Filters</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="native" className="mr-2" />
                    <label htmlFor="native" className="text-sm">Native English speakers</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="business" className="mr-2" />
                    <label htmlFor="business" className="text-sm">Business English</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="conversation" className="mr-2" />
                    <label htmlFor="conversation" className="text-sm">Conversation Practice</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="ielts" className="mr-2" />
                    <label htmlFor="ielts" className="text-sm">IELTS Preparation</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="toefl" className="mr-2" />
                    <label htmlFor="toefl" className="text-sm">TOEFL Preparation</label>
                  </div>
                </div>

                <h3 className="font-semibold mt-6 mb-3">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">₹0</span>
                  <span className="text-sm text-gray-600">₹2000</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  className="w-full"
                />

                <h3 className="font-semibold mt-6 mb-3">Tutor Nationality</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="indian" className="mr-2" />
                    <label htmlFor="indian" className="text-sm">Indian</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="american" className="mr-2" />
                    <label htmlFor="american" className="text-sm">American</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="british" className="mr-2" />
                    <label htmlFor="british" className="text-sm">British</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="australian" className="mr-2" />
                    <label htmlFor="australian" className="text-sm">Australian</label>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded mt-6 hover:bg-blue-700 transition duration-300">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindTutor;