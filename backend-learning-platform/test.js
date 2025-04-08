const bcrypt = require('bcryptjs');

const storedHash = '$2a$10$MXpFo36ktV0LApS7bHL1f.UlCXfiUPT75vVfE1U6.xya9dlKWJDRG'; // Replace with hash from MongoDB
const password = "SecurePass456!";

bcrypt.compare(password, storedHash).then(result => {
  console.log('Password match:', result);
});
