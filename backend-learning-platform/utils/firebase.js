const admin = require('firebase-admin');
const serviceAccount = require('../config/firebaseServiceAccountKey.json'); // You need to add this

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
