// General string sanitization utilities
const sanitizers = {
    toLower: (str) => typeof str === 'string' ? str.toLowerCase() : str,
    trim: (str) => typeof str === 'string' ? str.trim() : str,
    removeSpaces: (str) => typeof str === 'string' ? str.replace(/\s+/g, '') : str,
    // Add more sanitizers as needed
  };
  
  module.exports = sanitizers;