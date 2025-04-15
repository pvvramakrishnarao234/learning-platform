const {db, auth } = require('../config/firebase')
const {collection, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove} = require('firebase/firestore');

const jobPostsCollection = collection(db, 'jobPosts');
// Job Post Model
// class JobPost{
//     jobId: string;
//     title: string;
//     description: string;
//     creator: string; // Reference to user document ID
//     applicants?: string[];
//     tags?: string[];
//     createdAt?: Date;
//     updatedAt?: Date;
// }
  
  module.exports = JobPost;