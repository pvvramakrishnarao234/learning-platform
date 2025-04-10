// components/findTutor/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, onClearFilters }) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Type to search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-full md:w-auto flex items-center space-x-4">
        <div className="text-xs text-gray-500">
          Filters applied: <span className="font-medium">Status: 1 selected | Gender: 1 selected | Recipients: 2 selected</span>
        </div>
        <button 
          onClick={onClearFilters}
          className="text-blue-600 text-xs hover:text-blue-800"
        >
          Clear all filters
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
